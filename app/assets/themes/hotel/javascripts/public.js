//= require jquery
//= require jquery_ujs
//= require gko/public/jquery.grid.responsive.js
//= require flexslider/jquery.flexslider.js
//= require twitter.bootstrap.2.3.1/bootstrap/transition.js
//= require twitter.bootstrap.2.3.1/bootstrap/alert.js
//= require twitter.bootstrap.2.3.1/bootstrap/button.js
//= require twitter.bootstrap.2.3.1/bootstrap/collapse.js
//= require twitter.bootstrap.2.3.1/bootstrap/dropdown.js
//= require twitter.bootstrap.2.3.1/bootstrap/modal.js
//= require twitter.bootstrap.2.3.1/bootstrap/tooltip.js
//= require twitter.bootstrap.2.3.1/bootstrap/carousel.js 
//= require twitter.bootstrap.2.2.1/bootstrap-datepicker.js
//= require twitter.bootstrap.2.2.1/bootstrap-timepicker.js
//= require twitter.bootstrap.2.2.1/bootstrap-image-gallery.js 

//= require flexslider/jquery.flexslider.js
jQuery(function($){

var ANUBIS = window.ANUBIS || {};

/* ==================================================
   Navigation
================================================== */
  ANUBIS.navigation = function(){ 
		/*$('ul.nav li.dropdown').hover(function () {
			$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
		}, function () {
			$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
		}); */
		/*********************/
    /* Left Nav Fly Outs */ 
    /*********************/

    if ( $('.nav-fly-out').size() > 0 ){ 
      $('.nav-fly-out').hide();
      if ($(window).width() > breakpoint) {
        $('.nav-menu > li > a').hover( 
          function(){
            $(this).siblings('.nav-fly-out').show();
          },
          function(){
            $(this).siblings('.nav-fly-out').hide();
          }
        ); 
      }
    }
    
    		$('.nav li.dropdown').on('click.dropdown.data-api', function (e) {
    			if ($(window).width() > breakpoint) {
    				e.preventDefault();
    				e.stopPropagation();
    				var url = $(this).find('a:first').attr("href");
    				if(window.document.location.host) {
    				window.location = "http://" + window.document.location.host + url;	
    				}
    				else {
    					window.location = "http://" + window.location.hostname + url;
    				}

    				return false;
    			}
}  

/* ==================================================
   DropDown 
================================================== */

/* ANUBIS.dropDown = function(){
	$('.dropmenu').on('click', function(e){
		$(this).toggleClass('open');
		
		$('.dropmenu-active').stop().slideToggle(350, 'easeOutExpo');
		
		e.preventDefault();
	});
	
	$('.dropmenu-active a').on('click', function(e){
		var dropdown = $(this).parents('.dropdown');
		var selected = dropdown.find('.dropmenu .selected');
		var newSelect = $(this).html();
		
		$('.dropmenu').removeClass('open');
		$('.dropmenu-active').slideUp(350, 'easeOutExpo');
		
		selected.html(newSelect);
		
		e.preventDefault();
	});
}   */ 


/* ==================================================
   Contact Form
================================================== */

ANUBIS.contactForm = function(){
	$("#contact-submit").on('click',function() {
		$contact_form = $('#contact-form');
		
		var fields = $contact_form.serialize();
		
		$.ajax({
			type: "POST",
			url: "_include/php/contact.php",
			data: fields,
			dataType: 'json',
			success: function(response) {
				
				if(response.status){
					$('#contact-form input').val('');
					$('#contact-form textarea').val('');
				}
				
				$('#response').empty().html(response.html);
			}
		});
		return false;
	});
}


/* ==================================================
   Map
================================================== */

ANUBIS.map = function(){
	if($('.map').length > 0)
	{

		$('.map').each(function(i,e){

			$map = $(e);
			$map_id = $map.attr('id');
			$map_lat = $map.attr('data-mapLat');
			$map_lon = $map.attr('data-mapLon');
			$map_zoom = parseInt($map.attr('data-mapZoom'));
			$map_title = $map.attr('data-mapTitle');
			
			
			
			var latlng = new google.maps.LatLng($map_lat, $map_lon);			
			var options = { 
				scrollwheel: false,
				draggable: false, 
				zoomControl: false,
				disableDoubleClickZoom: false,
				disableDefaultUI: true,
				zoom: $map_zoom,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			var styles = [ 
							{
								// Insert Here Your Custom Style if you Want Colorize the Map
							}
						];
			
			var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
			
			var map = new google.maps.Map(document.getElementById($map_id), options);
		
			var image = '_include/img/map-marker.png';
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				title: $map_title,
				icon: image
			});
			
			map.mapTypes.set('map_style', styledMap);
  			map.setMapTypeId('map_style');
			
			var contentString = '<p><strong>Company Name</strong><br>Address here</p>';
       
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			
			google.maps.event.addListener(marker, 'click', function() {
      			infowindow.open(map,marker);
    		});

		});
	}	
}

/* ==================================================
   Flickr Widget
================================================== */

ANUBIS.flickr = function(){
	// check if flickr_list exists
	if($('.flickr-list').length > 0){
		
		// cycling all the flickr_list
		$('.flickr-list').each(function(){
			$count = $(this).attr('data-count'); // set photos counts by attribute data-count
			
			// append ul into flickr_list
			$(this).html('<ul></ul>');
			
			$(this).find('ul').jflickrfeed({
				limit: $count, // photos limit
				itemTemplate: '<li><a href="{{link}}" title="{{title}}" target="_blank"><span class="overlay"></span><i class="font-icon-search"></i><img src="{{image_m}}" alt="{{title}}" title="{{title}}" /></a></li>', // list html template
				qstrings: {
					id: '52617155@N08' // your Flickr ID 
				}
			});
		}); 
	}
}

/* ==================================================
   Twitter Widget
================================================== */

ANUBIS.twitter = function(){
	// check if twitter_list exists
	if($('.twitter-list').length > 0){
		
		// cycling all the twitter_list  
		$(".twitter-list").each(function(){
			$count = $(this).attr('data-count'); // set tweet counts by attribute data-count
			
			$(this).tweet({
				join_text: '',
				username: "Bluxart", // your Twitter ID
				count: $count, // tweets limit
				view_text: "View on Twitter" // alt text
			});	
		});
	}	
}

/* ==================================================
   Tooltip
================================================== */

ANUBIS.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
}


/* ==================================================
	flexslider
================================================== */

ANUBIS.flexslider = function(){
	$('#carousel').flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		itemWidth: 210,
		itemMargin: 5,
		minItems: 2,
		maxItems: 4
	});
}
/* ==================================================
   Tooltip
================================================== */

ANUBIS.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
}
/* ==================================================
	Init
================================================== */



$(document).ready(function(){
	// Call placeholder.js to enable Placeholder Property for IE9
	/*Modernizr.load([
	{
		test: Modernizr.input.placeholder,
		nope: '_include/js/placeholder.js', 
		complete : function() {
				if (!Modernizr.input.placeholder) {
						Placeholders.init({
						live: true,
						hideOnFocus: false,
						className: "yourClass",
						textColor: "#999"
						});    
				}
		}
	}
	]); */
	
 // ANUBIS.utils();
	
 // ANUBIS.getSize();
 // ANUBIS.centerImg();
	
 // ANUBIS.mobileNav();
 // ANUBIS.listenerMenu();
 // ANUBIS.subMenu();
 ANUBIS.navigation();
 //ANUBIS.dropDown();
 ANUBIS.flexslider();
 // ANUBIS.people();
 // ANUBIS.portfolio();
 // ANUBIS.accordion();
 // ANUBIS.toggle();
 // ANUBIS.toolTip();
 // ANUBIS.fancyBox();
 // ANUBIS.map();
 // ANUBIS.flickr();
 // ANUBIS.twitter();
 // ANUBIS.contactForm();
 // ANUBIS.scrollToTop();
 // ANUBIS.changeOpacity();
});

});
