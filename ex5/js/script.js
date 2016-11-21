// Author: Vincent Diener

// Gets called when the user clicks a link. Depending on which link was clicked, a section will be shown.
function selectSection(linkID) {
	// First, hide all sections.
	document.getElementById("hintergrund").style.display='none';
	document.getElementById("idee").style.display='none';
	document.getElementById("namensgebung").style.display='none';
	document.getElementById("entwicklung").style.display='none';
	document.getElementById("reaktion").style.display='none';
				
	// Then show the section with the ID the user selected from the menu.
	if (linkID == 0) {
		document.getElementById("hintergrund").style.display='block';
	} else if (linkID == 1) {
		document.getElementById("idee").style.display='block';
	} else if (linkID == 2) {
		document.getElementById("namensgebung").style.display='block';
	} else if (linkID == 3) {
		document.getElementById("entwicklung").style.display='block';
	} else if (linkID == 4) {
		document.getElementById("reaktion").style.display='block';
	}
}

// Calling this function clears the use_mobile cookie.
// When the user reloads the page, he will be asked to choose a page version again.
function clearPreferences() {
	document.cookie = "use_mobile=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	alert("Removed preferences cookie.");
}

// Snippet to retrieve value of a cookie with the given name.
// Copied from http://www.w3schools.com/js/js_cookies.asp			
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
} 
			
// Check if user is on a mobile device and handle appropriately.
function selectFittingCSS() {
	// Prepare to dynamically load CSS.
	var fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
				
	// Sniff the user agent and match it with a regex. It's better to use libraries like "wurfl.io"
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		// Check for preferences-cookie.
		var preference = getCookie("use_mobile");
		if (preference == "") {
			// User is on mobile device and preferece cookie is not set. Ask if they want to use the mobile version.
			var useMobile = confirm("Hey there! You are using a mobile device. Do you want to be redirected to the mobile version of this website?");
			if (useMobile == true) {
				// User is on a mobile device and wants to use the mobile version.
				fileref.setAttribute("href", "css/style_mobile.css");
				// Remember choice.
				document.cookie="use_mobile=yes";
			} else {
				// User is on a mobile device but wants to use the regular version.
				fileref.setAttribute("href", "css/style.css");
				// Remember choice.
				document.cookie="use_mobile=no";
			}
		} else if (preference == "yes") {
			// Preference cookie set to "yes". Use mobile version.
			fileref.setAttribute("href", "css/style_mobile.css");
		} else {
			// Preference cookie set to "no". Use regular version.
			fileref.setAttribute("href", "css/style.css");					
		}
	} else {
		// User is not on a mobile device. Choose normal stylesheet.
		fileref.setAttribute("href", "css/style.css");
				
		// Don't show preferences button.
		document.getElementById("preferenceButton").style.display='none';
	}
			
	// Load CSS.
	document.getElementsByTagName("head")[0].appendChild(fileref);
}