// Array for accelerometer values.
var accWindow = [];

// Debug output set to true from the beginning.
var debug = true;

// Average of last X accelerometer values (X set by user in start()).
var avg = 0;

// Values for small and big font (overwritten by user in start()).
var smallFont = 1.5;
var bigFont = 3.5;

// Start responsive font size scaling using accelerometer values. Text in elements marked with the class "responsiveText" are scaled up if certain threshold is used.
// The parameters are: int accWindowLength, float accWindowThreshold, float smallFont, float bigFontSize
//    accWindowLength: Number of accelerometer values to use for calculating an average. 100 can take between 0.5 and 3.5 seconds, depending on the device.
//    accWindowThreshold: If the average exceeds this threshold, the font size is increased.
//    smallFont: Font size for the "standing" font.
//    bigFontSize: Font size for the "walking" font.

function start(accWindowLength, accThreshold, smallFontSize, bigFontSize) {
	
	// Set small and big font size.
	smallFont = smallFontSize;
	bigFont = bigFontSize;
	
	// Assume "standing" as default state.
	userStanding();
	
	// Set debug text to "waiting" until enough values are collected. Will stay on this if no accelerometer is present on the device.
	document.getElementById('debug').innerHTML = "Waiting for accelerometer values.";
	
	// Set accelerometer event.
	window.ondevicemotion = function(event) { 
		// Calculate sum of (absolute) accelerometer x, y and z values.
		var ax = event.acceleration.x
		var ay = event.acceleration.y
		var az = event.acceleration.z	
		var accSum = Math.abs(ax) + Math.abs(ay) + Math.abs(az);
		
		// Add sum to array and return if the number of collected values is too small.
		accWindow.push(accSum);
		if (accWindow.length < accWindowLength) {
			return;
		}
		
		// Enough values have been collected. Calculate average over all values.
		var allAccSum = 0;
		for (i = 0; i < accWindow.length; i++) {
			allAccSum += accWindow[i];
		}
		
		avg = allAccSum / accWindow.length;
		
		// Round average.
		avg = Math.ceil(avg * 10000) / 10000;
		
		// Empty array. (No sliding window!)
		accWindow = [];
			
		// Classify: Depending on the threshold set by the user and the calculated average, classify as "walking" or "standing".
		if (avg > accThreshold) {
			userMoving();
		} else {
			userStanding();
		}
	}
}

// Start responsive font size scaling
function stop() {
	
	// Assume "standing" as default state.
	userStanding();
	
	// Tell user library is inactive.
	document.getElementById('debug').innerHTML = "Library turned off.";
	
	window.ondevicemotion = function(event) { 
		// Do nothing on device motion.
	}
}

// Called when classification was "walking".
function userMoving() {
	// Set debug output to show average value.
	document.getElementById('debug').innerHTML = "User is moving.<br>" + avg;
	
	// Set all elements using the "responsiveText" class to big font size set by user.
    var paragraphs = document.getElementsByClassName("responsiveText");　　　　
    for (var i = 0; i < paragraphs.length; i++) {　　　　
		paragraphs[i].style.fontSize = bigFont+ 'em';　　　　
    }
}


function userStanding() {
	// Set debug output to show average value.
	document.getElementById('debug').innerHTML = "User is standing.<br>" + avg;

	// Set all elements using the "responsiveText" class to small font size set by user.
    var paragraphs = document.getElementsByClassName("responsiveText");　　　　
    for (var i = 0; i < paragraphs.length; i++) {　　　　
		paragraphs[i].style.fontSize = smallFont + 'em';　　　　
    }
}

// Toggle visibility of debig paragraph.
function toggleDebug() {
	debug = !debug;
	
	if (debug) {
		document.getElementById('debug').style.visibility = 'visible';
	} else {
		document.getElementById('debug').style.visibility = 'hidden';
	}
}

