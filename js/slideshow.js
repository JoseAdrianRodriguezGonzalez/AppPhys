jQuery(document).ready(function($){
	
	alert("Hola");
	$("#slideshow img:gt(0)").hide();

	setInterval(function() { 
	  $('#slideshow  img:first')
	    .fadeOut(1000)
	    .next()
	    .fadeIn(1000)
	    .end()
	    .appendTo('#slideshow');
	},  3000);

}