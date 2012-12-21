//= require jquery_ujs
//= require datepicker.js
$(document).ready(function() { 
	// Possible defunct
	add_fields = function (target, association, content) {
		console.log("target " + target)
		console.log("association " + association)
		console.log("content " + content)
	    var new_id = new Date().getTime();
	    var regexp = new RegExp("new_" + association, "g");
		console.log("new_id " + new_id)
		console.log("$(target) " + $(target))
	    $(target).append(content.replace(regexp, new_id));
	}

	$('body').on('click', 'a.remove_fields', function () {
	    $(this).prev("input[type=hidden]").val("1");
	    $(this).closest(".fields").hide();
	    return false;
	});
	
	$('input.date').datepicker({
		format: 'mm/dd/yyyy'
	});
	
	$('input.datetime').datepicker({
		format: 'hh:ii:ss'
	});
});
