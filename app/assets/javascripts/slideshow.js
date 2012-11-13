
init_slideshow = function(target, s) {
    Galleria.HIDE_THUMBS = 'g_hide_thumbs';
    Galleria.SHOW_THUMBS = 'g_show_thumbs';
    return target.galleria({
        transition: "pulse",
        transitionSpeed: 500,
        imageCrop: true,
        thumbCrop: true,
        carousel: false,
				show_counter: false,
				show_info: false,
        _locale: {
            show_thumbnails: "Show thumbnails",
            hide_thumbnails: "Hide thumbnails",
            play: "Play slideshow",
            pause: "Pause slideshow",
            enter_fullscreen: "Enter fullscreen",
            exit_fullscreen: "Exit fullscreen",
            popout_image: "Popout image",
            showing_image: "Showing image %s of %s"
        },
        _showFullscreen: true,
        _showPopout: false,
        _showProgress: true,
        _showTooltip: true,
        width: s.width,
        height: s.height,
        fullscreen: s.fullscreen,
				clickevent: $.support.touch ? 'touchstart': 'click',

        extend: function(s) {
            this.addElement("bar", "fullscreen", "play", "popout", "thumblink", "s1", "s2", "s3", "s4", "progress");
            this.append({
                stage: "progress",
                container: ["bar", "tooltip"],
                bar: ["fullscreen", "play", "popout", "thumblink", "info", "s1", "s2", "s3", "s4"]
            });
            this.prependChild("info", "counter");
            var self = this,
            thumbs = this.$("thumbnails-container"),
            thumbBtn = this.$("thumblink"),
            fsBtn = this.$("fullscreen"),
            playBtn = this.$("play"),
            popout = this.$("popout"),
            btnBar = this.$("bar"),
            progressBar = this.$("progress"),
            locale = s._locale,
            thumbsOpen = false,
            fs = false,
            autoplay = !!s.autoplay,
            playing = false,
            scale_thumbs = function() {
                thumbs.height(self.getStageHeight()).width(self.getStageWidth()).css("top", thumbsOpen ? 0: -self.getStageHeight())
            },
            animate_thumbs = function() {
                if (thumbsOpen && playing) {
									self.play();
								}
                else {
                    playing = autoplay;
                    self.pause();
                }
								self.trigger({
									type: thumbsOpen ? Galleria.HIDE_THUMBS : Galleria.SHOW_THUMBS
                });
                thumbs.animate({
                    top: thumbsOpen ? -self.getStageHeight() : 0
                },
                {
                    easing: "galleria",
                    duration: 400,
                    complete: function() {
                        self.defineTooltip("thumblink", thumbsOpen ? locale.show_thumbnails: locale.hide_thumbnails);
                        thumbBtn[thumbsOpen ? "removeClass": "addClass"]("open");
                        thumbsOpen = !thumbsOpen
                    }
                })
            };
            scale_thumbs();
            s._showTooltip && self.bindTooltip({
                thumbBtn: locale.show_thumbnails,
                fullscreen: locale.enter_fullscreen,
                play: locale.play,
                popout: locale.popout_image,
                caption: function() {
                    var j = self.getData(),
                    ha = "";
                    if (j) {
                        if (j.title && j.title.length) ha += "<strong>" + j.title + "</strong>";
                        if (j.description &&
                        j.description.length) ha += "<br>" + j.description
                    }
                    return ha
                },
                counter: function() {
                    return locale.showing_image.replace(/\%s/, self.getIndex() + 1).replace(/\%s/, self.getDataLength())
                }
            });
            s.showInfo || this.$("info").hide();
            this.bind("play",
            function() {
                autoplay = true;
                playBtn.addClass("playing")
            });
            this.bind("pause",
            function() {
                autoplay = false;
                playBtn.removeClass("playing");
                progressBar.width(0)
            });
            s._showProgress && this.bind("progress",
            function(j) {
                progressBar.width(j.percent / 100 * this.getStageWidth())
            });
            this.bind("loadstart",
            function(j) {
                j.cached || this.$("loader").show()
            });
            this.bind("loadfinish",
            function() {
                progressBar.width(0);
                this.$("loader").hide();
                this.refreshTooltip("counter", "caption")
            });
            this.bind(Galleria.THUMBNAIL,
            function(e) {
                $(e.thumbTarget).hover(function() {
                    self.setInfo(e.thumbOrder);
                    self.setCounter(e.thumbOrder)
                },
                function() {
                    self.setInfo();
                    self.setCounter()
                }).bind(s.clickevent, function() {
                    animate_thumbs();
                });
            });

            thumbBtn.bind(s.clickevent, animate_thumbs);

            this.bind("fullscreen_enter",
            function() {
                fs = true;
                self.setOptions("transition", false);
                fsBtn.addClass("open");
                btnBar.css("bottom", 0);
                this.defineTooltip("fullscreen", locale.exit_fullscreen);
                Galleria.TOUCH || this.addIdleState(btnBar,
                {
                    bottom: -31
                })
            });
            this.bind("fullscreen_exit",
            function() {
                fs = false;
                Galleria.utils.clearTimer("bar");
                self.setOptions("transition", s.transition);
                fsBtn.removeClass("open");
                btnBar.css("bottom", 0);
                this.defineTooltip("fullscreen", locale.enter_fullscreen);
                Galleria.TOUCH || this.removeIdleState(btnBar, {
                    bottom: -31
                })
            });
            this.bind("rescale", scale_thumbs);
            if (!Galleria.TOUCH) {
                this.addIdleState(this.get("image-nav-left"), {
                    left: -36
                });
                this.addIdleState(this.get("image-nav-right"), {
                    right: -36
                })
            }

            if (s._showPopout) popout.bind(s.clickevent, function(j) {
                self.openLightbox();
                j.preventDefault()
            });
            else {
                popout.remove();
                if (s._showFullscreen) {
                    this.$("s4").remove();
                    this.$("info").css("right", 40);
                    fsBtn.css("right", 0)
                }
            }
            playBtn.bind(s.clickevent, function() {
                self.defineTooltip("play", autoplay ? locale.play: locale.pause);
                if (autoplay) self.pause();
                else {
                    thumbsOpen && thumbBtn.s.clickevent;
                    self.play()
                }
            });
            if (s._showFullscreen) fsBtn.bind(s.clickevent, function() {
                fs ? self.exitFullscreen() : self.enterFullscreen()
            });
            else {
                fsBtn.remove();
                if (s._show_popout) {
                    this.$("s4").remove();
                    this.$("info").css("right", 40);
                    popout.css("right", 0)
                }
            }
            if (!s._showFullscreen && !s._showPopout) {
                this.$("s3,s4").remove();
                this.$("info").css("right", 10)
            }
            s.autoplay && this.trigger("play")
        }
    })
}