// Rishi Ghan & Hetang Shah
// Trying to create a general purpose graphing class 
// July 26, 2012

function JGraph (pData, pCanvas, colors, label, optionsVal){

	if(!(this instanceof JGraph)) {
		return new JGraph();
	};
	
	this.graphData = pData || null;
	this.canvasObj = null;
	this.computedPoints = [];
	this.colors = colors || [];
	this.label = label || [];
	
	if(arguments.length === 1) {
		this.graphData = pData['data'] || null;
		pCanvas = pData['canvas'];
		this.colors = pData['colors'] || [];
		this.label = pData['label'] || [];
	};

	if (pCanvas instanceof HTMLElement){
		this.canvasObj = pCanvas;
	} else if (typeof pCanvas == 'string') {
		this.canvasObj = document.getElementById(pCanvas);
	} else {
		this.canvasObj = null;
	};
}
//end the class definition

JGraph.prototype = {
	sum : function(arr,i) {	//sums up the elements in an array
		var sum = 0;
		if(!i) {
			i = arr.length;
		};
		for (var j = 0; j < i; j++) {
		  sum += arr[j];
		};
		return sum;
	},
	pie : function(pData, pCanvas){ // draws a pie chart when you supply an array and a canvas id (Here Points array and canvas id / object is optional)
		var canvasObj = this.canvasObj,
			graphData = pData || this.graphData;

		this.computedPoints = []
		
		if(pCanvas) {
			if (pCanvas instanceof HTMLElement){
				canvasObj = pCanvas;
			} else if (typeof pCanvas == 'string') {
				canvasObj = document.getElementById(pCanvas);
			};
		};	
		
		if(!canvasObj) {
			throw {
				name: 'JGraph Error',
				message: 'No Canvas Object defined'			
			};
		};
		
		if(!graphData) {
			throw {
				name: 'JGraph Error',
				message: 'No Graph points given'			
			};
		};
		
		var totaldatapoints = this.sum(graphData);
		 
		// loop through data points array and calculate percentages.
		for (var i=0; i<graphData.length; i++) {
			var computedPoint = Math.ceil((graphData[i] * 360) / totaldatapoints);
			this.computedPoints[i] = computedPoint;
		};
		
		if (canvasObj.getContext) {
			// find the fucking canvas element 
			context = canvasObj.getContext("2d");

			for (var i = 0; i < graphData.length; i++) {
				this.drawSegment(canvasObj, context, graphData, i);
			};
		};
	},
	degreesToRadians : function (degrees) {
		return (degrees * Math.PI)/180;
	},
	drawSegment : function (canvas, context, graphData, i) {
		context.save();
		var centerX = Math.floor(canvas.width / 2);
		var centerY = Math.floor(canvas.height / 2);
		var radius = (centerX > centerY)? centerY : centerX;

		var startingAngle = this.degreesToRadians(this.sum(this.computedPoints, i));
		var arcSize = this.degreesToRadians(this.computedPoints[i]);
		var endingAngle = startingAngle + arcSize;

		context.beginPath();
		context.moveTo(centerX, centerY);
		context.arc(centerX, centerY, radius, 
					startingAngle, endingAngle, false);
		context.lineTo(centerX,centerY);
		context.closePath();
		
		if(this.colors[i]) {
			context.fillStyle = this.colors[i];
		} else {
			context.fillStyle = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
		};
		context.fill();

		context.restore();

		this.drawSegmentLabel(canvas, context, graphData, i);
	},
	drawSegmentLabel : function (canvas, context, graphData, i) {
		context.save();
		var x = Math.floor(canvas.width / 2);
		var y = Math.floor(canvas.height / 2);
		var angle = this.degreesToRadians(this.sum(this.computedPoints, i));

		context.translate(x, y);
		context.rotate(angle);
		var dx = Math.floor(canvas.width * 0.5) - 10;
		var dy = Math.floor(canvas.height * 0.05);

		context.textAlign = "right";
		var fontSize = Math.floor(canvas.height / 25);
		context.font = fontSize + "pt Helvetica";

		if(this.label[i]){
			context.fillText(this.label[i], dx, dy);
		} else {
			context.fillText(graphData[i], dx, dy);
		}

	   context.restore();
	}
};