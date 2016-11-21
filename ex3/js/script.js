

function changeButton() {
	document.getElementById("button1").value = document.getElementById('text1').value;
}

function printValue(sliderID, textbox) {
	var x = document.getElementById(textbox);
	var y = document.getElementById(sliderID);
	x.value = y.value;
}