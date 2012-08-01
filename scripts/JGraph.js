// Rishi Ghan & Hetang Shah
// Trying to create a general purpose graphing class 
// July 26, 2012

function JGraph (pData, pCanvas, options){

	if(!(this instanceof JGraph)) {
		return new JGraph();
	}
	
	// are these private vars?
	this.graphData = pData || null;
	this.canvasObj = null;
	
	// can you write comments to explain what you did?
	
	if(arguments.length === 1) {
		this.graphData = options['data'] || null;
		pCanvas = options['canvas'];
	}
	
	if (pCanvas instanceof HTMLElement){
		this.canvasObj = pCanvas;
	} else if (typeof pCanvas == 'string') {
		this.canvasObj = document.getElementById(pCanvas);
	} else {
		this.canvasObj = null;
	};
}
//end the class definition

//sums up the elements in an array
JGraph.prototype.sum = function(arr) {
	var sum = 0;
	for(var i=0; i<arr.length; i++) {
		sum+= arr[i];
	}
	return sum;
};

// draws a pie chart when you supply an array and a canvas id
JGraph.prototype.pie =  function(pData, pCanvas){
	var canvasObj = this.canvasObj;
	var graphData = pData || this.graphData;
	
	if(pCanvas) {
		if (pCanvas instanceof HTMLElement){
			canvasObj = pCanvas;
		} else if (typeof pCanvas == 'string') {
			canvasObj = document.getElementById(pCanvas);
		};
	}	
	
	if(!canvasObj) {
		throw {
			name: 'JGraph Error',
			message: 'No Canvas Object defined'			
		};
	}
	
	if(!graphData) {
		throw {
			name: 'JGraph Error',
			message: 'No Graph points given'			
		};
	}
	var totaldatapoints = this.sum(graphData);
	 
	// loop through data points array and calculate percentages.
	for (var i=0; i < graphData.length; i++) {
		percentages[i] = Math.ceil((graphData[i]/totaldatapoints) *100); // percentages
		angles[i] = Math.ceil((graphData[i]/totaldatapoints) *360);  //angles
		console.log(angles[i]);
	};
	
	// find the fucking canvas element
	context = canvasObj.getContext("2d");
	
	// co-ordinates (where should they be initialized ?) 
	var x = canvas.width / 2,
	  y = canvas.height / 2,
	  //startAngle = 0,
	  //endAngle = 0,
	  radius = 100, // this should be customizable.
	  counterclockwise = true;
	
	/*	loop through the angles array and draw arcs, bitch.
    	also show the edges of the pie slices ?
		draw a line back to the arc */
	for(var j=1; j<=angles.length;j++){
		context.beginPath(); 
		context.arc(x,y,radius,angles[j-1], angles[0], counterclockwise);
		context.lineTo(x,y);
		//context.fillText(percentages[i]);
		context.stroke();  
    };
	context.closePath();
};	