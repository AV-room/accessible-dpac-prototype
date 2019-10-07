jQuery(document).ready(function($) {
		
	var 
		bf = $('#banner-fade')
	, bf2 = $('#banner-fade2')
	;

	bf[0] && bf.bjqs({
		height      : 124,
		width       : 728,
		responsive  : true,
		// animation values
		animtype : 'fade', // accepts 'fade' or 'slide'
		animduration : 450, // how fast the animation are
		animspeed : 4000, // the delay between each slide
		automatic : true, // automatic
		
		// control and marker configuration
		showcontrols : false, // show next and prev controls
		centercontrols : true, // center controls verically
		nexttext : 'Next', // Text for 'next' button (can use HTML)
		prevtext : 'Prev', // Text for 'previous' button (can use HTML)
		showmarkers : true, // Show individual slide markers
		centermarkers : false, // Center markers horizontally
		
		// interaction values
		keyboardnav : true, // enable keyboard navigation
		hoverpause : true, // pause the slider on hover
		
		// presentational options
		usecaptions : false, // show captions for images using the image title tag
		randomstart : false // start slider at random slide
	});


	bf2[0] && bf2.bjqs({
		height      : 124,
		width       : 728,
		responsive  : true,
		// animation values
		animtype : 'fade', // accepts 'fade' or 'slide'
		animduration : 450, // how fast the animation are
		animspeed : 4000, // the delay between each slide
		automatic : true, // automatic
		
		// control and marker configuration
		showcontrols : false, // show next and prev controls
		centercontrols : true, // center controls verically
		nexttext : 'Next', // Text for 'next' button (can use HTML)
		prevtext : 'Prev', // Text for 'previous' button (can use HTML)
		showmarkers : true, // Show individual slide markers
		centermarkers : false, // Center markers horizontally
		
		// interaction values
		keyboardnav : true, // enable keyboard navigation
		hoverpause : true, // pause the slider on hover
		
		// presentational options
		usecaptions : false, // show captions for images using the image title tag
		randomstart : false // start slider at random slide
	});

	$('.fancybox') && $('.fancybox').fancybox && $('.fancybox').fancybox({width:800});

});
