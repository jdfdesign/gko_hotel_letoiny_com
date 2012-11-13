(function($) {
    // Shorthand to make it a little easier to call public rails functions from within rails.js
    var gecko;

    $.gecko = gecko = {

        // Link elements bound by jquery-ujs
        paginationSelector: '.pagination a:not([disabled])',

        //= ShowError
        showErrorMessage: function(message) {
            //show error message
            $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>" + $.mobile.pageLoadErrorMessage + "</h1></div>")
            .css({
                "display": "block",
                "opacity": 0.96,
                "top": $window.scrollTop() + 100
            })
            .appendTo(settings.pageContainer)
            .delay(800)
            .fadeOut(400,
            function() {
                $(this).remove();
            });
        },

        //= Loader
        //////////////////////////////////////////////////////
        /**
         * Adds a loading animation in to the specified container.
         */
        attachLoading: function(cont, msg, dur, callback) {
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
        },

        /**
         * Removes loading animation from page. Invokes the callback function once
         * completed.
         */
        removeLoading: function(cont, dur, callback) {
            if (typeof(cont) == "undefined") {cont = "body";}
						if (typeof(dur) == undefined) {dur = 500;}
            if (typeof(callback) == 'undefined') {
                callback = function() { $(this).remove(); };
            }

            $(cont + ' .ui-loader').fadeOut(dur, callback);
						$('html').removeClass( "ui-loading" );
        },

        init_flash_messages: function() {
            $('.flash').fadeIn(550);
            $('.flash_close').click(function(e) {
                $(this).parent().fadeOut({
                    duration: 330
                });
                e.preventDefault();
            });
        },

        //= Pagination
        //////////////////////////////////////////////////////
        // Enable pagination
        enablePagination: function(selector) {
            // TODO: mark site as js-enabled to avoid this function or let it particular for each site ?
            $(selector).live('click.rails',
            function(e) {
                var link = $(this);
                link.attr('data-remote', 'true');
                $.rails.handleRemote(link);
                return false;
            })
            .live("ajax:beforeSend.rails",
            function(xhr, settings) {
                gecko.attachLoading("body");
            })
            .live("ajax:success.rails",
            function(data, status, xhr) {
                $(this).trigger('paginate');
            })
            .live("ajax:error.rails",
            function(xhr, status, error) {

                })
            .live("ajax:complete.rails",
            function(xhr, status) {
                gecko.removeLoading("body");
            });
        },

        // Disable pagination
        disablePagination: function(selector) {
            $(selector).die('rails');
        },

        //= Utils
        //////////////////////////////////////////////////////

        /* Get the screen size depending of screen orientation */
        getScreenSize: function() {
            var orientation = jQuery.event.special.orientationchange.orientation(),
            port = orientation === "portrait",
            winHeightMin = port ? 480: 320,
            winWidthMin = port ? 320: 480,
            screenHeight = port ? screen.availHeight: screen.availWidth,
            screenWidth = port ? screen.availWidth: screen.availHeight,
            winHeight = Math.max(winHeightMin, $(window).height()),
            winWidth = Math.max(winWidthMin, $(window).width()),
            pageSize = {
                width: Math.min(screenWidth, winWidth),
                height: Math.min(screenHeight, winHeight)
            };
            return pageSize;
        },
        centerDialog: function(el) {
            var obj = $(el);
						var screenSize = gecko.getScreenSize();
            var halfsc = screenSize.height / 2;
            var halfh = $(el).height() / 2;

            var halfscrn = screenSize.width / 2;
            var halfobj = $(el).width() / 2;

            var goRight = halfscrn - halfobj;
            var goBottom = halfsc - halfh;

            $(el).css({
                left: goRight
            }).css({
                top: goBottom
            });
        },

        get_number_from_string: function(str) {
            return str.replace(/[^\d]+/g, '');
        },

        // parse anything into a number
        parseValue: function(val) {
            if (typeof val === 'number') {
                return val;
            } else if (typeof val === 'string') {
                var arr = val.match(/\-?\d/g);
                return arr && arr.constructor === Array ? parseInt(arr.join(''), 10) : 0;
            } else {
                return 0;
            }
        },

        // timestamp abstraction
        timestamp: function() {
            return new Date().getTime();
        }
    };

    // for logging to the firebug console, put in 1 line so it can easily remove for production
    log = function(message) {
			if( (window.console && window.console.log) ){
				window.console.log(message);
			}
    };

    $.ajaxSetup({
        dataType: 'script'
    });
})(jQuery);
