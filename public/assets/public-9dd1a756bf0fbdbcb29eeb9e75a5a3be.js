!function(e){e(document).ready(function(){}),e.supersized=function(t){e("body").append('<div id="supersized-loader"></div><ul id="supersized"></ul>');var i="#supersized",n=this;n.$el=e(i),n.el=i,vars=e.supersized.vars,n.$el.data("supersized",n),api=n.$el.data("supersized"),n.init=function(){e.supersized.vars=e.extend(e.supersized.vars,e.supersized.themeVars),e.supersized.vars.options=e.extend({},e.supersized.defaultOptions,e.supersized.themeOptions,t),n.options=e.supersized.vars.options,n._build()},n._build=function(){for(var t,i,s=0,a="",o="",r="";s<=n.options.slides.length-1;){switch(n.options.slide_links){case"num":t=s;break;case"name":t=n.options.slides[s].title;break;case"blank":t=""}a=a+'<li class="slide-'+s+'"></li>',s==n.options.start_slide-1?(n.options.slide_links&&(o=o+'<li class="slide-link-'+s+' current-slide"><a>'+t+"</a></li>"),n.options.thumb_links&&(i=n.options.slides[s].thumb?n.options.slides[s].thumb:n.options.slides[s].image,r=r+'<li class="thumb'+s+' current-thumb"><img src="'+i+'"/></li>')):(n.options.slide_links&&(o=o+'<li class="slide-link-'+s+'" ><a>'+t+"</a></li>"),n.options.thumb_links&&(i=n.options.slides[s].thumb?n.options.slides[s].thumb:n.options.slides[s].image,r=r+'<li class="thumb'+s+'"><img src="'+i+'"/></li>')),s++}n.options.slide_links&&e(vars.slide_list).html(o),n.options.thumb_links&&vars.thumb_tray.length&&e(vars.thumb_tray).append('<ul id="'+vars.thumb_list.replace("#","")+'">'+r+"</ul>"),e(n.el).append(a),n.options.thumbnail_navigation&&(prevThumb=vars.current_slide-1<0?n.options.slides.length-1:vars.current_slide-1,e(vars.prev_thumb).show().html(e("<img/>").attr("src",n.options.slides[prevThumb].image)),nextThumb=vars.current_slide==n.options.slides.length-1?0:vars.current_slide+1,e(vars.next_thumb).show().html(e("<img/>").attr("src",n.options.slides[nextThumb].image))),n._start()},n._start=function(){vars.current_slide=n.options.start_slide?n.options.start_slide-1:Math.floor(Math.random()*n.options.slides.length);var t=n.options.new_window?' target="_blank"':"";if(3==n.options.performance?n.$el.addClass("speed"):(1==n.options.performance||2==n.options.performance)&&n.$el.addClass("quality"),n.options.random){arr=n.options.slides;for(var i,s,a=arr.length;a;i=parseInt(Math.random()*a),s=arr[--a],arr[a]=arr[i],arr[i]=s);n.options.slides=arr}if(n.options.slides.length>1){if(n.options.slides.length>2){loadPrev=vars.current_slide-1<0?n.options.slides.length-1:vars.current_slide-1;var o=n.options.slides[loadPrev].url?"href='"+n.options.slides[loadPrev].url+"'":"",r=e('<img src="'+n.options.slides[loadPrev].image+'"/>'),l=n.el+" li:eq("+loadPrev+")";r.appendTo(l).wrap("<a "+o+t+"></a>").parent().parent().addClass("image-loading prevslide"),r.load(function(){e(this).data("origWidth",e(this).width()).data("origHeight",e(this).height()),n.resizeNow()})}}else n.options.slideshow=0;o=api.getField("url")?"href='"+api.getField("url")+"'":"";var d=e('<img src="'+api.getField("image")+'"/>'),c=n.el+" li:eq("+vars.current_slide+")";if(d.appendTo(c).wrap("<a "+o+t+"></a>").parent().parent().addClass("image-loading activeslide"),d.load(function(){n._origDim(e(this)),n.resizeNow(),n.launch(),"undefined"!=typeof theme&&"function"==typeof theme._init&&theme._init()}),n.options.slides.length>1){loadNext=vars.current_slide==n.options.slides.length-1?0:vars.current_slide+1,o=n.options.slides[loadNext].url?"href='"+n.options.slides[loadNext].url+"'":"";var u=e('<img src="'+n.options.slides[loadNext].image+'"/>'),p=n.el+" li:eq("+loadNext+")";u.appendTo(p).wrap("<a "+o+t+"></a>").parent().parent().addClass("image-loading"),u.load(function(){e(this).data("origWidth",e(this).width()).data("origHeight",e(this).height()),n.resizeNow()})}n.$el.css("visibility","hidden"),e(".load-item").hide()},n.launch=function(){n.$el.css("visibility","visible"),e("#supersized-loader").remove(),"undefined"!=typeof theme&&"function"==typeof theme.beforeAnimation&&theme.beforeAnimation("next"),e(".load-item").show(),n.options.keyboard_nav&&e(document.documentElement).keyup(function(e){return vars.in_animation?!1:(37==e.keyCode||40==e.keyCode?(clearInterval(vars.slideshow_interval),n.prevSlide()):39==e.keyCode||38==e.keyCode?(clearInterval(vars.slideshow_interval),n.nextSlide()):32!=e.keyCode||vars.hover_pause||(clearInterval(vars.slideshow_interval),n.playToggle()),void 0)}),n.options.slideshow&&n.options.pause_hover&&e(n.el).hover(function(){return vars.in_animation?!1:(vars.hover_pause=!0,vars.is_paused||(vars.hover_pause="resume",n.playToggle()),void 0)},function(){"resume"==vars.hover_pause&&(n.playToggle(),vars.hover_pause=!1)}),n.options.slide_links&&e(vars.slide_list+"> li").click(function(){return index=e(vars.slide_list+"> li").index(this),targetSlide=index+1,n.goTo(targetSlide),!1}),n.options.thumb_links&&e(vars.thumb_list+"> li").click(function(){return index=e(vars.thumb_list+"> li").index(this),targetSlide=index+1,api.goTo(targetSlide),!1}),n.options.slideshow&&n.options.slides.length>1&&(n.options.autoplay&&n.options.slides.length>1?vars.slideshow_interval=setInterval(n.nextSlide,n.options.slide_interval):vars.is_paused=!0,e(".load-item img").bind("contextmenu mousedown",function(){return!1})),e(window).resize(function(){n.resizeNow()})},n.resizeNow=function(){return n.$el.each(function(){return e("img",n.el).each(function(){function t(e){e?(thisSlide.width()<a||thisSlide.width()<n.options.min_width)&&(thisSlide.width()*s>=n.options.min_height?(thisSlide.width(n.options.min_width),thisSlide.height(thisSlide.width()*s)):i()):n.options.min_height>=o&&!n.options.fit_landscape?a*s>=n.options.min_height||a*s>=n.options.min_height&&1>=s?(thisSlide.width(a),thisSlide.height(a*s)):s>1?(thisSlide.height(n.options.min_height),thisSlide.width(thisSlide.height()/s)):thisSlide.width()<a&&(thisSlide.width(a),thisSlide.height(thisSlide.width()*s)):(thisSlide.width(a),thisSlide.height(a*s))}function i(e){e?thisSlide.height()<o&&(thisSlide.height()/s>=n.options.min_width?(thisSlide.height(n.options.min_height),thisSlide.width(thisSlide.height()/s)):t(!0)):n.options.min_width>=a?o/s>=n.options.min_width||s>1?(thisSlide.height(o),thisSlide.width(o/s)):1>=s&&(thisSlide.width(n.options.min_width),thisSlide.height(thisSlide.width()*s)):(thisSlide.height(o),thisSlide.width(o/s))}thisSlide=e(this);var s=(thisSlide.data("origHeight")/thisSlide.data("origWidth")).toFixed(2),a=n.$el.width(),o=n.$el.height();n.options.fit_always?o/a>s?t():i():o<=n.options.min_height&&a<=n.options.min_width?o/a>s?n.options.fit_landscape&&1>s?t(!0):i(!0):n.options.fit_portrait&&s>=1?i(!0):t(!0):a<=n.options.min_width?o/a>s?n.options.fit_landscape&&1>s?t(!0):i():n.options.fit_portrait&&s>=1?i():t(!0):o<=n.options.min_height?o/a>s?n.options.fit_landscape&&1>s?t():i(!0):n.options.fit_portrait&&s>=1?i(!0):t():o/a>s?n.options.fit_landscape&&1>s?t():i():n.options.fit_portrait&&s>=1?i():t(),thisSlide.parents("li").hasClass("image-loading")&&e(".image-loading").removeClass("image-loading"),n.options.horizontal_center&&e(this).css("left",(a-e(this).width())/2),n.options.vertical_center&&e(this).css("top",(o-e(this).height())/2)}),n.options.image_protect&&e("img",n.el).bind("contextmenu mousedown",function(){return!1}),!1})},n.nextSlide=function(){if(vars.in_animation||!api.options.slideshow)return!1;vars.in_animation=!0,clearInterval(vars.slideshow_interval);var t=(n.options.slides,n.$el.find(".activeslide"));e(".prevslide").removeClass("prevslide"),t.removeClass("activeslide").addClass("prevslide"),vars.current_slide+1==n.options.slides.length?vars.current_slide=0:vars.current_slide++;var i=e(n.el+" li:eq("+vars.current_slide+")");n.$el.find(".prevslide"),1==n.options.performance&&n.$el.removeClass("quality").addClass("speed"),loadSlide=!1,loadSlide=vars.current_slide==n.options.slides.length-1?0:vars.current_slide+1;var s=n.el+" li:eq("+loadSlide+")";if(!e(s).html()){var a=n.options.new_window?' target="_blank"':"";imageLink=n.options.slides[loadSlide].url?"href='"+n.options.slides[loadSlide].url+"'":"";var o=e('<img src="'+n.options.slides[loadSlide].image+'"/>');o.appendTo(s).wrap("<a "+imageLink+a+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden"),o.load(function(){n._origDim(e(this)),n.resizeNow()})}switch(1==n.options.thumbnail_navigation&&(prevThumb=vars.current_slide-1<0?n.options.slides.length-1:vars.current_slide-1,e(vars.prev_thumb).html(e("<img/>").attr("src",n.options.slides[prevThumb].image)),nextThumb=loadSlide,e(vars.next_thumb).html(e("<img/>").attr("src",n.options.slides[nextThumb].image))),"undefined"!=typeof theme&&"function"==typeof theme.beforeAnimation&&theme.beforeAnimation("next"),n.options.slide_links&&(e(".current-slide").removeClass("current-slide"),e(vars.slide_list+"> li").eq(vars.current_slide).addClass("current-slide")),i.css("visibility","hidden").addClass("activeslide"),n.options.transition){case 0:case"none":i.css("visibility","visible"),vars.in_animation=!1,n.afterAnimation();break;case 1:case"fade":i.animate({opacity:0},0).css("visibility","visible").animate({opacity:1,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 2:case"slideTop":i.animate({top:-n.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 3:case"slideRight":i.animate({left:n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 4:case"slideBottom":i.animate({top:n.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 5:case"slideLeft":i.animate({left:-n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 6:case"carouselRight":i.animate({left:n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()}),t.animate({left:-n.$el.width(),avoidTransforms:!1},n.options.transition_speed);break;case 7:case"carouselLeft":i.animate({left:-n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()}),t.animate({left:n.$el.width(),avoidTransforms:!1},n.options.transition_speed)}return!1},n.prevSlide=function(){if(vars.in_animation||!api.options.slideshow)return!1;vars.in_animation=!0,clearInterval(vars.slideshow_interval);var t=(n.options.slides,n.$el.find(".activeslide"));e(".prevslide").removeClass("prevslide"),t.removeClass("activeslide").addClass("prevslide"),0==vars.current_slide?vars.current_slide=n.options.slides.length-1:vars.current_slide--;var i=e(n.el+" li:eq("+vars.current_slide+")");n.$el.find(".prevslide"),1==n.options.performance&&n.$el.removeClass("quality").addClass("speed"),loadSlide=vars.current_slide;var s=n.el+" li:eq("+loadSlide+")";if(!e(s).html()){var a=n.options.new_window?' target="_blank"':"";imageLink=n.options.slides[loadSlide].url?"href='"+n.options.slides[loadSlide].url+"'":"";var o=e('<img src="'+n.options.slides[loadSlide].image+'"/>');o.appendTo(s).wrap("<a "+imageLink+a+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden"),o.load(function(){n._origDim(e(this)),n.resizeNow()})}switch(1==n.options.thumbnail_navigation&&(prevThumb=0==loadSlide?n.options.slides.length-1:loadSlide-1,e(vars.prev_thumb).html(e("<img/>").attr("src",n.options.slides[prevThumb].image)),nextThumb=vars.current_slide==n.options.slides.length-1?0:vars.current_slide+1,e(vars.next_thumb).html(e("<img/>").attr("src",n.options.slides[nextThumb].image))),"undefined"!=typeof theme&&"function"==typeof theme.beforeAnimation&&theme.beforeAnimation("prev"),n.options.slide_links&&(e(".current-slide").removeClass("current-slide"),e(vars.slide_list+"> li").eq(vars.current_slide).addClass("current-slide")),i.css("visibility","hidden").addClass("activeslide"),n.options.transition){case 0:case"none":i.css("visibility","visible"),vars.in_animation=!1,n.afterAnimation();break;case 1:case"fade":i.animate({opacity:0},0).css("visibility","visible").animate({opacity:1,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 2:case"slideTop":i.animate({top:n.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 3:case"slideRight":i.animate({left:-n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 4:case"slideBottom":i.animate({top:-n.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 5:case"slideLeft":i.animate({left:n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 6:case"carouselRight":i.animate({left:-n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()}),t.animate({left:0},0).animate({left:n.$el.width(),avoidTransforms:!1},n.options.transition_speed);break;case 7:case"carouselLeft":i.animate({left:n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()}),t.animate({left:0},0).animate({left:-n.$el.width(),avoidTransforms:!1},n.options.transition_speed)}return!1},n.playToggle=function(){return vars.in_animation||!api.options.slideshow?!1:(vars.is_paused?(vars.is_paused=!1,"undefined"!=typeof theme&&"function"==typeof theme.playToggle&&theme.playToggle("play"),vars.slideshow_interval=setInterval(n.nextSlide,n.options.slide_interval)):(vars.is_paused=!0,"undefined"!=typeof theme&&"function"==typeof theme.playToggle&&theme.playToggle("pause"),clearInterval(vars.slideshow_interval)),!1)},n.goTo=function(t){if(vars.in_animation||!api.options.slideshow)return!1;var i=n.options.slides.length;return 0>t?t=i:t>i&&(t=1),t=i-t+1,clearInterval(vars.slideshow_interval),"undefined"!=typeof theme&&"function"==typeof theme.goTo&&theme.goTo(),vars.current_slide==i-t?(vars.is_paused||(vars.slideshow_interval=setInterval(n.nextSlide,n.options.slide_interval)),!1):(i-t>vars.current_slide?(vars.current_slide=i-t-1,vars.update_images="next",n._placeSlide(vars.update_images)):i-t<vars.current_slide&&(vars.current_slide=i-t+1,vars.update_images="prev",n._placeSlide(vars.update_images)),n.options.slide_links&&(e(vars.slide_list+"> .current-slide").removeClass("current-slide"),e(vars.slide_list+"> li").eq(i-t).addClass("current-slide")),n.options.thumb_links&&(e(vars.thumb_list+"> .current-thumb").removeClass("current-thumb"),e(vars.thumb_list+"> li").eq(i-t).addClass("current-thumb")),void 0)},n._placeSlide=function(t){var i=n.options.new_window?' target="_blank"':"";if(loadSlide=!1,"next"==t){loadSlide=vars.current_slide==n.options.slides.length-1?0:vars.current_slide+1;var s=n.el+" li:eq("+loadSlide+")";if(!e(s).html()){var i=n.options.new_window?' target="_blank"':"";imageLink=n.options.slides[loadSlide].url?"href='"+n.options.slides[loadSlide].url+"'":"";var a=e('<img src="'+n.options.slides[loadSlide].image+'"/>');a.appendTo(s).wrap("<a "+imageLink+i+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden"),a.load(function(){n._origDim(e(this)),n.resizeNow()})}n.nextSlide()}else if("prev"==t){loadSlide=vars.current_slide-1<0?n.options.slides.length-1:vars.current_slide-1;var s=n.el+" li:eq("+loadSlide+")";if(!e(s).html()){var i=n.options.new_window?' target="_blank"':"";imageLink=n.options.slides[loadSlide].url?"href='"+n.options.slides[loadSlide].url+"'":"";var a=e('<img src="'+n.options.slides[loadSlide].image+'"/>');a.appendTo(s).wrap("<a "+imageLink+i+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden"),a.load(function(){n._origDim(e(this)),n.resizeNow()})}n.prevSlide()}},n._origDim=function(e){e.data("origWidth",e.width()).data("origHeight",e.height())},n.afterAnimation=function(){return 1==n.options.performance&&n.$el.removeClass("speed").addClass("quality"),vars.update_images&&(setPrev=vars.current_slide-1<0?n.options.slides.length-1:vars.current_slide-1,vars.update_images=!1,e(".prevslide").removeClass("prevslide"),e(n.el+" li:eq("+setPrev+")").addClass("prevslide")),vars.in_animation=!1,!vars.is_paused&&n.options.slideshow&&(vars.slideshow_interval=setInterval(n.nextSlide,n.options.slide_interval),n.options.stop_loop&&vars.current_slide==n.options.slides.length-1&&n.playToggle()),"undefined"!=typeof theme&&"function"==typeof theme.afterAnimation&&theme.afterAnimation(),!1},n.getField=function(e){return n.options.slides[vars.current_slide][e]},n.init()},e.supersized.vars={thumb_tray:"#thumb-tray",thumb_list:"#thumb-list",slide_list:"#slide-list",current_slide:0,in_animation:!1,is_paused:!1,hover_pause:!1,slideshow_interval:!1,update_images:!1,options:{}},e.supersized.defaultOptions={slideshow:1,autoplay:1,start_slide:1,stop_loop:0,random:0,slide_interval:5e3,transition:1,transition_speed:750,new_window:1,pause_hover:0,keyboard_nav:1,performance:1,image_protect:1,fit_always:0,fit_landscape:0,fit_portrait:1,min_width:0,min_height:0,horizontal_center:1,vertical_center:1,slide_links:1,thumb_links:1,thumbnail_navigation:0},e.fn.supersized=function(t){return this.each(function(){new e.supersized(t)})}}(jQuery),window.console||(console={log:function(){}}),jQuery(function(e){"use strict";var t=window.THEME||{};t.fix=function(){if(navigator.userAgent.match(/IEMobile\/10\.0/)){var e=document.createElement("style");e.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")),document.getElementsByTagName("head")[0].appendChild(e)}},t.carousel=function(){e(".carousel").each(function(){var t=e(this);t.find(".item").length>1?t.carousel({interval:3e3}):(t.find(".carousel-control").each(function(){e(this).css({display:"none"})}),t.find(".carousel-indicators").each(function(){e(this).css({display:"none"})}))})},t.supersized=function(){e.supersized({slide_interval:3e3,transition:3,transition_speed:1200,slides:supersized_slides})},e(document).ready(function(){t.fix(),t.carousel(),t.supersized()})});