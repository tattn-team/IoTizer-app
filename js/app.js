// Global Settings
var ncmb = null;

// Set up
$(function() {
	$.getJSON("settings.json", function(data) {
		ncmb = new NCMB(data.application_key, data.client_key);
		console.log(ncmb);
	});
});


