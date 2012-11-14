$(document).ready(function() {
    /////////////////////////////////////////////////
    init_webcam = function() {
	    $('#webcam').bind(clickevent, function(e) {  
				webcam_container = $('<div id="webcam_container" style="width:340px;height:260px;"></div>').insertBefore($("#main"));
	      webcam_container.lightbox({
					centered: true, 
					onLoad: function() { 
						loadImage();
					},
					onClose: function() {
						clearTimeout();
						webcam_container.fadeOut().remove();
					}
				});
				e.preventDefault();
	    });
    }

		loadImage = function() { 
      clearTimeout();
			var	$img	= webcam_container.find("img:first");
			//$loading = $('<span class="loading"></span>').appendTo(webcam_container);

			$('<img/>').load(function() {
				//$loading.remove();
				var $theImage = $(this);
				$theImage.css({position:'absolute', width:320, height:240, left: 10, top:10}).fadeIn('slow', function() {
 					$img.remove();
					setTimeout ("loadImage()", 300 );
				});
 				$theImage.appendTo(webcam_container); 
 				var now = new Date();
 				uniq_stamp = now.getHours()+'-'+now.getMinutes()+'-'+now.getSeconds();
      }).attr('src', 'http://64.117.46.71:4554/-wvhttp-01-/GetStillImage?'+ uniq_stamp);
    };
    /////////////////////////////////////////////////
    var clickevent = ($.support.touch ? 'touchstart': 'click'),
		webcam_container,
		uniq_stamp;

    /////////////////////////////////////////////////
    init_webcam();
});