$(document).ready(function() {
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
        scrollpane_api.getContentPane().find("#content").html(content_html);
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
                dest[slide_orientation] = $.gecko.parseValue(el.css(slide_orientation)) - el.height();
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
			
					Galleria.get(0).rescale(available_size.w, available_size.h, e);
				}

        if (wasPlaying) {
            gallery.start();
        };
				var h = ( 70 * available_size.h / getScreenSize().h) + '%';
        if(!isHome) {
					slider.css("height",h);
				}
        $('#content').css('width', Math.max(300, available_size.w - 310));
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
				$('.tooltip').tooltip();
        getAvailableSize(); 
        //init_ajax();
        gallery = init_slideshow($('#background-slideshow'), {
            width: available_size.w,
            height: available_size.h
        }).bind(Galleria.SHOW_THUMBS,
        function(e) {
					slide.hide(slider);
        });

 				$("#content .images img").bind(clickevent, function(e) {
	        e.preventDefault();
					diaporama_container = $('<div id="diaporama_container" style="width:800px;height:600px;"></div>').insertBefore($("#main"));
		      diaporama_container.lightbox({
						centered: true, 
						onLoad: function() {
							var sd = $("#content .images:first").clone().appendTo(diaporama_container);
							init_slideshow(sd, {
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
        
				// Enable ajax on form to send register user to bronto
				$("#new_table_inquiry").attr("data-remote", true);
				$("#new_hotel_inquiry").attr("data-remote", true);
				
				// Home stuff
				if(!isHome) {   
					var rand = Math.floor(Math.random()*colors.length);           
				  $('#wrapper-wide-main').css("background", colors[rand]);

	        if (sliderTab != 1) {
	            slider.prepend("<div id='content-tab' class='ui-corner-top'></div");
	            sliderTab = slider.find("#content-tab");
	        }
	        if ($("#content-scroll") != 1) {
	            $("#content").wrapInner("<div id='content-scroll' style='max-width:500px;'></div");
							//$("#content").wrapInner("<div id='content-scroll'></div");
	        }
					slide.init();
	        init_scrollpane();
				} else {
				 // $('#wrapper-wide-main').css("display", "none");
				 // start the ticker 
						$('#js-news').ticker( { titleText:'News'});
				}
        
        rescale();

        // Handle window.resize or orientationchange event
        $(window).bind("throttledresize",
        function(e) {
            rescale(e);
        });

				// Enchance collapsibles
		    $("div[data-role='collapsible']").collapsible({collapsed:true});
    }
    //End init
    /////////////////////////////////////////////////
    var clickevent = ($.support.touch ? 'touchstart': 'click'),
		slider = $("#wrapper-wide-main"),
		diaporama_container,
		colors = ["#49bce7","#5dd2cd","#aee14f"],
    headerHeight = $('#wrapper-wide-header').outerHeight(),
    footerHeight = $('#wrapper-wide-footer').outerHeight(),
    sliderTab = $("#content-tab"),
    slide_open = true,
    slide_orientation = "bottom",
    slide_duration = 300,
    body = $("body"),  
		isHome = (body.attr('id') == 'home'),
    scrollpane = $('#content'),
    scrollpane_api,
    gallery,
    available_size = {
        w: 896,
        h: 600
    };
    //arbitrary
    /////////////////////////////////////////////////
    init();

});