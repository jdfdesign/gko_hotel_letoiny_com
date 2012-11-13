//= require gko/gko.utils.js
//= require gko/gko.galleria
//= require jquery.mousewheel.js
//= require jquery.jscrollpane.min.js
//= require jquery.lightbox.js
//= require webcam.js 
//= require slideshow2.js
//= require flexslider/jquery.flexslider.js
$(document).ready(function() { 
	/////////////////////////////////////////////////
  var clickevent = ($.support.touch ? 'touchstart': 'click'),
	slider = $("#content-container"),
	diaporama_container,
	colors = ["#49bce7","#5dd2cd","#aee14f"],
  headerHeight = $('#header-container').outerHeight(),
  footerHeight = $('#footer-container').outerHeight(),
  sliderTab = $("#main-column-tab"),
  slide_open = true,
  slide_orientation = "bottom",
  slide_duration = 300,
  body = $("body"),  
	isHome = (body.attr('id') == 'home'),
  scrollpane = $('#main-column'),
  scrollpane_api,
  gallery,
  available_size = {
      w: 896,
      h: 600
  };
	/**
	 * Adds a loading animation in to the specified container.
	 */
	attachLoading = function(cont, msg, dur, callback) {
	    if (typeof(cont) == "undefined") {cont = "body";}
			container = $(cont);
	    if (typeof(callback) == "undefined") {callback = function() {};}
	    if (typeof(dur) == "undefined") {dur = 500;} 
			if (typeof(msg) == "undefined") {msg = "Please wait...";} 
	    loader = $(cont + ' .ui-loader');
	    if (loader > 0) {
	        loader.fadeIn(callback);
	    }
	    else { 
	        container.append("<div class='ui-loader ui-body-a ui-corner-all'><span class='ui-icon ui-icon-loading spin'></span>" + "<h1>" + msg + "</h1>" + "</div>");
	        loader = $(cont + ' .ui-loader');
					loader.css({
						'z-index': 10000, 
						'top': 100
					});
	        loader.hide().fadeIn(dur, callback);

	    }
			$('html').addClass( "ui-loading" );
	}

	/**
	 * Removes loading animation from page. Invokes the callback function once
	 * completed.
	 */
	removeLoading = function(cont, dur, callback) {
	    if (typeof(cont) == "undefined") {cont = "body";}
			if (typeof(dur) == undefined) {dur = 500;}
	    if (typeof(callback) == 'undefined') {
	        callback = function() { $(this).remove(); };
	    }

	    $(cont + ' .ui-loader').fadeOut(dur, callback);
			$('html').removeClass( "ui-loading" );
	}
    ///////////////////////////////////////////////// 
	ticker = function() {
		setTimeout(function(){
			$('#ticker li:first').animate( {marginTop: '-120px'}, 800, function()
			{
				$(this).detach().appendTo('ul#ticker').removeAttr('style');	
			});
			ticker();
		}, 3000);
	};
	
    /////////////////////////////////////////////////
    refresh_slideshow = function(images_html) {
        //gallery.html(images_html);
        //gallery.load();
    }
    /////////////////////////////////////////////////
    init_scrollpane = function() {
        scrollpane.jScrollPane({
            //Needed for mobile device
            showArrows: true,
						autoReinitialise: true
        });
        scrollpane_api = scrollpane.data('jsp');
    }
    /////////////////////////////////////////////////
    refresh_scrollpane = function(content_html) {
        scrollpane_api.getContentPane().find("#main-column").html(content_html);
        scrollpane_api.reinitialise();
    }
    /////////////////////////////////////////////////
    var slide = {
        init: function() {
            sliderTab.bind('click',
            function() {
                if (!slide_open) {
                    slide.show(slider);
                } else {
                    slide.hide(slider);
                }
            });
        }
        ,
        show: function(el) {
            if (slide_open) {
                return;
            }
            slide_open = !slide_open;
            var pos = {};
            pos[slide_orientation] = footerHeight;
            slide.move(el, pos);
            sliderTab.removeClass("closed");
        }
        ,
        hide: function(el) {
            if (!slide_open) {
                return;
            }
            slide_open = !slide_open;

            var dest = {};
            if (slide_orientation == "right" || slide_orientation == "left") {
                dest[slide_orientation] = -el.width();
            }
            else {
                dest[slide_orientation] = parseValue(el.css(slide_orientation)) - el.height();
            }
            slide.move(el, dest);
            sliderTab.addClass("closed");
        },
        move: function(el, options) {
            el.stop().animate(options, {
                queue: false,
                duration: slide_duration
            });
        }
    }

    refresh_page = function(title, body, images) {
        //log("refresh_page: title, body, images" + images);
        refresh_scrollpane(images + "<h1>" + title + "</h1>" + body);
    }
    //End rescale
    rescale = function(e) {
        getAvailableSize();

        //$( "." + $.mobile.activePageClass ).css( "min-height", getScreenHeight() );
        var wasPlaying = gallery.isPlaying;
        if (wasPlaying) {
            gallery.stop();
        };

				var gallery_container = gallery.find('.galleria-container:first');
				if(!gallery_container.hasClass('fullscreen')) {
	        // Hack ! galleria is buggy when rescale
	        // Just rescale the gallery if no width or height are set in its parents dom selector
					//log("rescale available_size " + available_size.w);
					
					gallery_container.css({
						width: available_size.w,
						height: available_size.h
					});
			
				//	Galleria.get(0).rescale(available_size.w, available_size.h, e);
				}

        if (wasPlaying) {
            gallery.start();
        };
				var h = ( 70 * available_size.h / getScreenSize().h) + '%';
        if(!isHome) {
					slider.css("height",h);
				}
        $('#main-column').css('width', Math.max(300, available_size.w - 310));
    }

    /////////////////////////////////////////////////
    getScreenSize = function() {
        var orientation = jQuery.event.special.orientationchange.orientation(),
        port = orientation === "portrait",
        winHeightMin = port ? 480 : 320,
        winWidthMin = port ? 320 : 480,
        screenHeight = port ? screen.availHeight : screen.availWidth,
        screenWidth = port ? screen.availWidth : screen.availHeight,
        winHeight = Math.max(winHeightMin, $(window).height()),
        winWidth = Math.max(winWidthMin, $(window).width()),
        pageSize = {
            w: winWidth,//Math.min(screenWidth, winWidth),
            h: winHeight//Math.min(screenHeight, winHeight)
        };
				//log("port" + port + "getScreenSize screenWidth " + screenWidth + " winWidth " + winWidth);
        return pageSize;
    }
    /////////////////////////////////////////////////
    getAvailableSize = function() {
        var size = getScreenSize();
        available_size.w = size.w;
        available_size.h = size.h - headerHeight - footerHeight;
    }
    //End rescale
    /////////////////////////////////////////////////
    init = function() {
				$('input:[type="text"].date, input:[type="text"].datetime').datepicker();
        getAvailableSize(); 
		Carousel.addTheme();
				
        gallery = Carousel.init($('#background-slideshow'), available_size.h,{
            width: available_size.w,
            height: available_size.h
        }).bind(Galleria.SHOW_THUMBS,
        function(e) {
			slide.hide(slider);
        }).bind(Galleria.READY, function(e){
			$(this).data("enterFullscreen");
		});

 				$("#main-column .galleria img").bind(clickevent, function(e) {
	        e.preventDefault();
					diaporama_container = $('<div id="diaporama_container" style="width:800px;height:600px;"></div>').insertBefore($("#content"));
		      diaporama_container.lightbox({
						centered: true, 
						onLoad: function() {
							var sd = $("#main-column .galleria:first").clone().appendTo(diaporama_container);
							Carousel.init(sd, {
			            width: 800,
			            height: 600
			        }); 
						},
						onClose: function() {
							clearTimeout();
							diaporama_container.fadeOut().remove();
						}
					});
				})

		    $('#newsletter_registration').bind(clickevent, function(e) {  
					newsletter_container = $('<div id="newsletter_container" style="width:360px;min-height:30px;padding:14px;"><label for="newsletter_registration_email">Email</label><input id="newsletter_registration_email" maxlength="255" name="newsletter_registration_email" size="50" type="email" value=""><a id="ok_newsletter_registration">OK</a></div>').insertAfter($("#content-container"));
					
					$("#ok_newsletter_registration").bind(clickevent, function(e) {
						var email = $("#newsletter_registration_email").val();
						$("body").append('<img src="http://app.bronto.com/public/?q=direct_add&fn=Public_DirectAddForm&id=ajxwyhlmsdoqtqrxcnqhcvdxmslabha&email='+email+'" width="0" height="0" border="0" alt=""/>');
						newsletter_container.trigger('close');  
					  });
		      newsletter_container.lightbox({
						centered: true, 
						onLoad: function() { 
	
						},
						onClose: function() {
							newsletter_container.fadeOut().remove();
						}
					});
					e.preventDefault();
		    });
		
				// Enable ajax on form to send register user to bronto
				//------------------------------------------------------- 
				$("#new_table_inquiry").attr("data-remote", true);
				$("#new_hotel_inquiry").attr("data-remote", true);
				
				$("a[data-remote], form[data-remote]")
				.bind("ajax:beforeSend", function(event,xhr) {attachLoading("body")})
				.bind("ajax:complete", function(event, xhr, status){removeLoading("body")});

				
				// Home stuff 
				//-------------------------------------------------------
				if(!isHome) {   
					var rand = Math.floor(Math.random()*colors.length);           
				  $('#content-container').css("background", colors[rand]);

	        if (sliderTab != 1) {
	            slider.prepend("<div id='main-column-tab' class='ui-corner-top'></div");
	            sliderTab = slider.find("#main-column-tab");
	        }
	        if ($("#main-column-scroll") != 1) {
	            $("#main-column").wrapInner("<div id='main-scroll' style='max-width:500px;'></div");
							//$("#main-column").wrapInner("<div id='main-scroll'></div");
	        }
					slide.init();
	        init_scrollpane();
				} else {
				 	// start the ticker 
				 	ticker();
				}
        
				//------------------------------------------------------- 
        rescale();

        // Handle window.resize or orientationchange event
        $(window).bind("throttledresize",
        function(e) {
            rescale(e);
        });
    }
//End init
	var homepop;
    
	if($('body').attr('id') == 'home') {
		homepop = $('<div id="webcam_container" style="width:420px;height:220px;background: #49BCE7"><p class="close" style="padding: 12px;text-align:right;color:#fff;margin-bottom:0px;opacity:0.9;font-size: 14px;font-weight: normal;">x</p><p style="padding: 0 24px 12px 24px;text-align:left;color:#fff">Easy steps to get a great deal at Le Toiny:<br/><br/>-Call us and ask for Claire and Maria Tel: (800) 680 0832<br/>-Let’s have a chat about your stay<br/>-Get your personalized offer<br/>-Seal the deal<br/><br/><i>Be happy !</i></p></div>').insertAfter($("#body-container"));
      	homepop.lightbox({
			showOverlay: false,
			centered: true, 
			onClose: function() {
				$(this).fadeOut().remove();
			}
		});
	}
	
    //arbitrary
    /////////////////////////////////////////////////
    init();

	$('.carousel').flexslider({
		animation: "slide",
		controlNav: false,
	   animationLoop: false,
	   itemWidth: 210,
	   itemMargin: 5,
	   minItems: 2,
	   maxItems: 4
	 });

});