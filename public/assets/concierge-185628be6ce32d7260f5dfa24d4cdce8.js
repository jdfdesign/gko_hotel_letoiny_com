(function(e,t){var n=function(){var t=e(document).data("events");return t&&t.click&&e.grep(t.click,function(e){return e.namespace==="rails"}).length};n()&&e.error("jquery-ujs has already been loaded!");var r;e.rails=r={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input:file",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(t){var n=e('meta[name="csrf-token"]').attr("content");n&&t.setRequestHeader("X-CSRF-Token",n)},fire:function(t,n,r){var i=e.Event(n);return t.trigger(i,r),i.result!==!1},confirm:function(e){return confirm(e)},ajax:function(t){return e.ajax(t)},href:function(e){return e.attr("href")},handleRemote:function(n){var i,s,o,u,a,f,l,c;if(r.fire(n,"ajax:before")){u=n.data("cross-domain"),a=u===t?null:u,f=n.data("with-credentials")||null,l=n.data("type")||e.ajaxSettings&&e.ajaxSettings.dataType;if(n.is("form")){i=n.attr("method"),s=n.attr("action"),o=n.serializeArray();var h=n.data("ujs:submit-button");h&&(o.push(h),n.data("ujs:submit-button",null))}else n.is(r.inputChangeSelector)?(i=n.data("method"),s=n.data("url"),o=n.serialize(),n.data("params")&&(o=o+"&"+n.data("params"))):(i=n.data("method"),s=r.href(n),o=n.data("params")||null);c={type:i||"GET",data:o,dataType:l,beforeSend:function(e,i){return i.dataType===t&&e.setRequestHeader("accept","*/*;q=0.5, "+i.accepts.script),r.fire(n,"ajax:beforeSend",[e,i])},success:function(e,t,r){n.trigger("ajax:success",[e,t,r])},complete:function(e,t){n.trigger("ajax:complete",[e,t])},error:function(e,t,r){n.trigger("ajax:error",[e,t,r])},xhrFields:{withCredentials:f},crossDomain:a},s&&(c.url=s);var p=r.ajax(c);return n.trigger("ajax:send",p),p}return!1},handleMethod:function(n){var i=r.href(n),s=n.data("method"),o=n.attr("target"),u=e("meta[name=csrf-token]").attr("content"),a=e("meta[name=csrf-param]").attr("content"),f=e('<form method="post" action="'+i+'"></form>'),l='<input name="_method" value="'+s+'" type="hidden" />';a!==t&&u!==t&&(l+='<input name="'+a+'" value="'+u+'" type="hidden" />'),o&&f.attr("target",o),f.hide().append(l).appendTo("body"),f.submit()},disableFormElements:function(t){t.find(r.disableSelector).each(function(){var t=e(this),n=t.is("button")?"html":"val";t.data("ujs:enable-with",t[n]()),t[n](t.data("disable-with")),t.prop("disabled",!0)})},enableFormElements:function(t){t.find(r.enableSelector).each(function(){var t=e(this),n=t.is("button")?"html":"val";t.data("ujs:enable-with")&&t[n](t.data("ujs:enable-with")),t.prop("disabled",!1)})},allowAction:function(e){var t=e.data("confirm"),n=!1,i;return t?(r.fire(e,"confirm")&&(n=r.confirm(t),i=r.fire(e,"confirm:complete",[n])),n&&i):!0},blankInputs:function(t,n,r){var i=e(),s,o,u=n||"input,textarea";return t.find(u).each(function(){s=e(this),o=s.is(":checkbox,:radio")?s.is(":checked"):s.val(),o==!!r&&(i=i.add(s))}),i.length?i:!1},nonBlankInputs:function(e,t){return r.blankInputs(e,t,!0)},stopEverything:function(t){return e(t.target).trigger("ujs:everythingStopped"),t.stopImmediatePropagation(),!1},callFormSubmitBindings:function(n,r){var i=n.data("events"),s=!0;return i!==t&&i.submit!==t&&e.each(i.submit,function(e,t){if(typeof t.handler=="function")return s=t.handler(r)}),s},disableElement:function(e){e.data("ujs:enable-with",e.html()),e.html(e.data("disable-with")),e.bind("click.railsDisable",function(e){return r.stopEverything(e)})},enableElement:function(e){e.data("ujs:enable-with")!==t&&(e.html(e.data("ujs:enable-with")),e.data("ujs:enable-with",!1)),e.unbind("click.railsDisable")}},r.fire(e(document),"rails:attachBindings")&&(e.ajaxPrefilter(function(e,t,n){e.crossDomain||r.CSRFProtection(n)}),e(document).delegate(r.linkDisableSelector,"ajax:complete",function(){r.enableElement(e(this))}),e(document).delegate(r.linkClickSelector,"click.rails",function(n){var i=e(this),s=i.data("method"),o=i.data("params");if(!r.allowAction(i))return r.stopEverything(n);i.is(r.linkDisableSelector)&&r.disableElement(i);if(i.data("remote")!==t)return(n.metaKey||n.ctrlKey)&&(!s||s==="GET")&&!o?!0:(r.handleRemote(i)===!1&&r.enableElement(i),!1);if(i.data("method"))return r.handleMethod(i),!1}),e(document).delegate(r.inputChangeSelector,"change.rails",function(t){var n=e(this);return r.allowAction(n)?(r.handleRemote(n),!1):r.stopEverything(t)}),e(document).delegate(r.formSubmitSelector,"submit.rails",function(n){var i=e(this),s=i.data("remote")!==t,o=r.blankInputs(i,r.requiredInputSelector),u=r.nonBlankInputs(i,r.fileInputSelector);if(!r.allowAction(i))return r.stopEverything(n);if(o&&i.attr("novalidate")==t&&r.fire(i,"ajax:aborted:required",[o]))return r.stopEverything(n);if(s)return u?(setTimeout(function(){r.disableFormElements(i)},13),r.fire(i,"ajax:aborted:file",[u])):!e.support.submitBubbles&&e().jquery<"1.7"&&r.callFormSubmitBindings(i,n)===!1?r.stopEverything(n):(r.handleRemote(i),!1);setTimeout(function(){r.disableFormElements(i)},13)}),e(document).delegate(r.formInputClickSelector,"click.rails",function(t){var n=e(this);if(!r.allowAction(n))return r.stopEverything(t);var i=n.attr("name"),s=i?{name:i,value:n.val()}:null;n.closest("form").data("ujs:submit-button",s)}),e(document).delegate(r.formSubmitSelector,"ajax:beforeSend.rails",function(t){this==t.target&&r.disableFormElements(e(this))}),e(document).delegate(r.formSubmitSelector,"ajax:complete.rails",function(t){this==t.target&&r.enableFormElements(e(this))}),e(function(){csrf_token=e("meta[name=csrf-token]").attr("content"),csrf_param=e("meta[name=csrf-param]").attr("content"),e('form input[name="'+csrf_param+'"]').val(csrf_token)}))})(jQuery),!function(e){function t(){return new Date(Date.UTC.apply(Date,arguments))}function n(){var e=new Date;return t(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())}var r=function(t,n){var r=this;this.element=e(t),this.language=n.language||this.element.data("date-language")||"en",this.language=this.language in i?this.language:"en",this.isRTL=i[this.language].rtl||!1,this.format=s.parseFormat(n.format||this.element.data("date-format")||"mm/dd/yyyy"),this.isInline=!1,this.isInput=this.element.is("input"),this.component=this.element.is(".date")?this.element.find(".add-on"):!1,this.hasInput=this.component&&this.element.find("input").length,this.component&&this.component.length===0&&(this.component=!1),this._attachEvents(),this.forceParse=!0,"forceParse"in n?this.forceParse=n.forceParse:"dateForceParse"in this.element.data()&&(this.forceParse=this.element.data("date-force-parse")),this.picker=e(s.template).appendTo(this.isInline?this.element:"body").on({click:e.proxy(this.click,this),mousedown:e.proxy(this.mousedown,this)}),this.isInline?this.picker.addClass("datepicker-inline"):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.isRTL&&(this.picker.addClass("datepicker-rtl"),this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")),e(document).on("mousedown",function(t){e(t.target).closest(".datepicker").length===0&&r.hide()}),this.autoclose=!1,"autoclose"in n?this.autoclose=n.autoclose:"dateAutoclose"in this.element.data()&&(this.autoclose=this.element.data("date-autoclose")),this.keyboardNavigation=!0,"keyboardNavigation"in n?this.keyboardNavigation=n.keyboardNavigation:"dateKeyboardNavigation"in this.element.data()&&(this.keyboardNavigation=this.element.data("date-keyboard-navigation")),this.viewMode=this.startViewMode=0;switch(n.startView||this.element.data("date-start-view")){case 2:case"decade":this.viewMode=this.startViewMode=2;break;case 1:case"year":this.viewMode=this.startViewMode=1}this.todayBtn=n.todayBtn||this.element.data("date-today-btn")||!1,this.todayHighlight=n.todayHighlight||this.element.data("date-today-highlight")||!1,this.weekStart=(n.weekStart||this.element.data("date-weekstart")||i[this.language].weekStart||0)%7,this.weekEnd=(this.weekStart+6)%7,this.startDate=-Infinity,this.endDate=Infinity,this.daysOfWeekDisabled=[],this.setStartDate(n.startDate||this.element.data("date-startdate")),this.setEndDate(n.endDate||this.element.data("date-enddate")),this.setDaysOfWeekDisabled(n.daysOfWeekDisabled||this.element.data("date-days-of-week-disabled")),this.fillDow(),this.fillMonths(),this.update(),this.showMode(),this.isInline&&this.show()};r.prototype={constructor:r,_events:[],_attachEvents:function(){this._detachEvents(),this.isInput?this._events=[[this.element,{focus:e.proxy(this.show,this),keyup:e.proxy(this.update,this),keydown:e.proxy(this.keydown,this)}]]:this.component&&this.hasInput?this._events=[[this.element.find("input"),{focus:e.proxy(this.show,this),keyup:e.proxy(this.update,this),keydown:e.proxy(this.keydown,this)}],[this.component,{click:e.proxy(this.show,this)}]]:this.element.is("div")?this.isInline=!0:this._events=[[this.element,{click:e.proxy(this.show,this)}]];for(var t=0,n,r;t<this._events.length;t++)n=this._events[t][0],r=this._events[t][1],n.on(r)},_detachEvents:function(){for(var e=0,t,n;e<this._events.length;e++)t=this._events[e][0],n=this._events[e][1],t.off(n);this._events=[]},show:function(t){this.picker.show(),this.height=this.component?this.component.outerHeight():this.element.outerHeight(),this.update(),this.place(),e(window).on("resize",e.proxy(this.place,this)),t&&(t.stopPropagation(),t.preventDefault()),this.element.trigger({type:"show",date:this.date})},hide:function(t){if(this.isInline)return;this.picker.hide(),e(window).off("resize",this.place),this.viewMode=this.startViewMode,this.showMode(),this.isInput||e(document).off("mousedown",this.hide),this.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())&&this.setValue(),this.element.trigger({type:"hide",date:this.date})},remove:function(){this._detachEvents(),this.picker.remove(),delete this.element.data().datepicker},getDate:function(){var e=this.getUTCDate();return new Date(e.getTime()+e.getTimezoneOffset()*6e4)},getUTCDate:function(){return this.date},setDate:function(e){this.setUTCDate(new Date(e.getTime()-e.getTimezoneOffset()*6e4))},setUTCDate:function(e){this.date=e,this.setValue()},setValue:function(){var e=this.getFormattedDate();this.isInput?this.element.prop("value",e):(this.component&&this.element.find("input").prop("value",e),this.element.data("date",e))},getFormattedDate:function(e){return e==undefined&&(e=this.format),s.formatDate(this.date,e,this.language)},setStartDate:function(e){this.startDate=e||-Infinity,this.startDate!==-Infinity&&(this.startDate=s.parseDate(this.startDate,this.format,this.language)),this.update(),this.updateNavArrows()},setEndDate:function(e){this.endDate=e||Infinity,this.endDate!==Infinity&&(this.endDate=s.parseDate(this.endDate,this.format,this.language)),this.update(),this.updateNavArrows()},setDaysOfWeekDisabled:function(t){this.daysOfWeekDisabled=t||[],e.isArray(this.daysOfWeekDisabled)||(this.daysOfWeekDisabled=this.daysOfWeekDisabled.split(/,\s*/)),this.daysOfWeekDisabled=e.map(this.daysOfWeekDisabled,function(e){return parseInt(e,10)}),this.update(),this.updateNavArrows()},place:function(){if(this.isInline)return;var t=parseInt(this.element.parents().filter(function(){return e(this).css("z-index")!="auto"}).first().css("z-index"))+10,n=this.component?this.component.offset():this.element.offset();this.picker.css({top:n.top+this.height,left:n.left,zIndex:t})},update:function(){var e,t=!1;arguments&&arguments.length&&(typeof arguments[0]=="string"||arguments[0]instanceof Date)?(e=arguments[0],t=!0):e=this.isInput?this.element.prop("value"):this.element.data("date")||this.element.find("input").prop("value"),this.date=s.parseDate(e,this.format,this.language),t&&this.setValue(),this.date<this.startDate?this.viewDate=new Date(this.startDate):this.date>this.endDate?this.viewDate=new Date(this.endDate):this.viewDate=new Date(this.date),this.fill()},fillDow:function(){var e=this.weekStart,t="<tr>";while(e<this.weekStart+7)t+='<th class="dow">'+i[this.language].daysMin[e++%7]+"</th>";t+="</tr>",this.picker.find(".datepicker-days thead").append(t)},fillMonths:function(){var e="",t=0;while(t<12)e+='<span class="month">'+i[this.language].monthsShort[t++]+"</span>";this.picker.find(".datepicker-months td").html(e)},fill:function(){var n=new Date(this.viewDate),r=n.getUTCFullYear(),o=n.getUTCMonth(),u=this.startDate!==-Infinity?this.startDate.getUTCFullYear():-Infinity,a=this.startDate!==-Infinity?this.startDate.getUTCMonth():-Infinity,f=this.endDate!==Infinity?this.endDate.getUTCFullYear():Infinity,l=this.endDate!==Infinity?this.endDate.getUTCMonth():Infinity,c=this.date.valueOf(),h=new Date;this.picker.find(".datepicker-days thead th:eq(1)").text(i[this.language].months[o]+" "+r),this.picker.find("tfoot th.today").text(i[this.language].today).toggle(this.todayBtn!==!1),this.updateNavArrows(),this.fillMonths();var p=t(r,o-1,28,0,0,0,0),d=s.getDaysInMonth(p.getUTCFullYear(),p.getUTCMonth());p.setUTCDate(d),p.setUTCDate(d-(p.getUTCDay()-this.weekStart+7)%7);var v=new Date(p);v.setUTCDate(v.getUTCDate()+42),v=v.valueOf();var m=[],g;while(p.valueOf()<v){p.getUTCDay()==this.weekStart&&m.push("<tr>"),g="";if(p.getUTCFullYear()<r||p.getUTCFullYear()==r&&p.getUTCMonth()<o)g+=" old";else if(p.getUTCFullYear()>r||p.getUTCFullYear()==r&&p.getUTCMonth()>o)g+=" new";this.todayHighlight&&p.getUTCFullYear()==h.getFullYear()&&p.getUTCMonth()==h.getMonth()&&p.getUTCDate()==h.getDate()&&(g+=" today"),p.valueOf()==c&&(g+=" active");if(p.valueOf()<this.startDate||p.valueOf()>this.endDate||e.inArray(p.getUTCDay(),this.daysOfWeekDisabled)!==-1)g+=" disabled";m.push('<td class="day'+g+'">'+p.getUTCDate()+"</td>"),p.getUTCDay()==this.weekEnd&&m.push("</tr>"),p.setUTCDate(p.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(m.join(""));var y=this.date.getUTCFullYear(),b=this.picker.find(".datepicker-months").find("th:eq(1)").text(r).end().find("span").removeClass("active");y==r&&b.eq(this.date.getUTCMonth()).addClass("active"),(r<u||r>f)&&b.addClass("disabled"),r==u&&b.slice(0,a).addClass("disabled"),r==f&&b.slice(l+1).addClass("disabled"),m="",r=parseInt(r/10,10)*10;var w=this.picker.find(".datepicker-years").find("th:eq(1)").text(r+"-"+(r+9)).end().find("td");r-=1;for(var E=-1;E<11;E++)m+='<span class="year'+(E==-1||E==10?" old":"")+(y==r?" active":"")+(r<u||r>f?" disabled":"")+'">'+r+"</span>",r+=1;w.html(m)},updateNavArrows:function(){var e=new Date(this.viewDate),t=e.getUTCFullYear(),n=e.getUTCMonth();switch(this.viewMode){case 0:this.startDate!==-Infinity&&t<=this.startDate.getUTCFullYear()&&n<=this.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.endDate!==Infinity&&t>=this.endDate.getUTCFullYear()&&n>=this.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:this.startDate!==-Infinity&&t<=this.startDate.getUTCFullYear()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.endDate!==Infinity&&t>=this.endDate.getUTCFullYear()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}},click:function(n){n.stopPropagation(),n.preventDefault();var r=e(n.target).closest("span, td, th");if(r.length==1)switch(r[0].nodeName.toLowerCase()){case"th":switch(r[0].className){case"switch":this.showMode(1);break;case"prev":case"next":var i=s.modes[this.viewMode].navStep*(r[0].className=="prev"?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,i);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,i)}this.fill();break;case"today":var o=new Date;o=t(o.getFullYear(),o.getMonth(),o.getDate(),0,0,0),this.showMode(-2);var u=this.todayBtn=="linked"?null:"view";this._setDate(o,u)}break;case"span":if(!r.is(".disabled")){this.viewDate.setUTCDate(1);if(r.is(".month")){var a=r.parent().find("span").index(r);this.viewDate.setUTCMonth(a),this.element.trigger({type:"changeMonth",date:this.viewDate})}else{var f=parseInt(r.text(),10)||0;this.viewDate.setUTCFullYear(f),this.element.trigger({type:"changeYear",date:this.viewDate})}this.showMode(-1),this.fill()}break;case"td":if(r.is(".day")&&!r.is(".disabled")){var l=parseInt(r.text(),10)||1,f=this.viewDate.getUTCFullYear(),a=this.viewDate.getUTCMonth();r.is(".old")?a===0?(a=11,f-=1):a-=1:r.is(".new")&&(a==11?(a=0,f+=1):a+=1),this._setDate(t(f,a,l,0,0,0,0))}}},_setDate:function(e,t){if(!t||t=="date")this.date=e;if(!t||t=="view")this.viewDate=e;this.fill(),this.setValue(),this.element.trigger({type:"changeDate",date:this.date});var n;this.isInput?n=this.element:this.component&&(n=this.element.find("input")),n&&(n.change(),this.autoclose&&(!t||t=="date")&&this.hide())},moveMonth:function(e,t){if(!t)return e;var n=new Date(e.valueOf()),r=n.getUTCDate(),i=n.getUTCMonth(),s=Math.abs(t),o,u;t=t>0?1:-1;if(s==1){u=t==-1?function(){return n.getUTCMonth()==i}:function(){return n.getUTCMonth()!=o},o=i+t,n.setUTCMonth(o);if(o<0||o>11)o=(o+12)%12}else{for(var a=0;a<s;a++)n=this.moveMonth(n,t);o=n.getUTCMonth(),n.setUTCDate(r),u=function(){return o!=n.getUTCMonth()}}while(u())n.setUTCDate(--r),n.setUTCMonth(o);return n},moveYear:function(e,t){return this.moveMonth(e,t*12)},dateWithinRange:function(e){return e>=this.startDate&&e<=this.endDate},keydown:function(e){if(this.picker.is(":not(:visible)")){e.keyCode==27&&this.show();return}var t=!1,n,r,i,s,o;switch(e.keyCode){case 27:this.hide(),e.preventDefault();break;case 37:case 39:if(!this.keyboardNavigation)break;n=e.keyCode==37?-1:1,e.ctrlKey?(s=this.moveYear(this.date,n),o=this.moveYear(this.viewDate,n)):e.shiftKey?(s=this.moveMonth(this.date,n),o=this.moveMonth(this.viewDate,n)):(s=new Date(this.date),s.setUTCDate(this.date.getUTCDate()+n),o=new Date(this.viewDate),o.setUTCDate(this.viewDate.getUTCDate()+n)),this.dateWithinRange(s)&&(this.date=s,this.viewDate=o,this.setValue(),this.update(),e.preventDefault(),t=!0);break;case 38:case 40:if(!this.keyboardNavigation)break;n=e.keyCode==38?-1:1,e.ctrlKey?(s=this.moveYear(this.date,n),o=this.moveYear(this.viewDate,n)):e.shiftKey?(s=this.moveMonth(this.date,n),o=this.moveMonth(this.viewDate,n)):(s=new Date(this.date),s.setUTCDate(this.date.getUTCDate()+n*7),o=new Date(this.viewDate),o.setUTCDate(this.viewDate.getUTCDate()+n*7)),this.dateWithinRange(s)&&(this.date=s,this.viewDate=o,this.setValue(),this.update(),e.preventDefault(),t=!0);break;case 13:this.hide(),e.preventDefault();break;case 9:this.hide()}if(t){this.element.trigger({type:"changeDate",date:this.date});var u;this.isInput?u=this.element:this.component&&(u=this.element.find("input")),u&&u.change()}},showMode:function(e){e&&(this.viewMode=Math.max(0,Math.min(2,this.viewMode+e))),this.picker.find(">div").hide().filter(".datepicker-"+s.modes[this.viewMode].clsName).css("display","block"),this.updateNavArrows()}},e.fn.datepicker=function(t){var n=Array.apply(null,arguments);return n.shift(),this.each(function(){var i=e(this),s=i.data("datepicker"),o=typeof t=="object"&&t;s||i.data("datepicker",s=new r(this,e.extend({},e.fn.datepicker.defaults,o))),typeof t=="string"&&typeof s[t]=="function"&&s[t].apply(s,n)})},e.fn.datepicker.defaults={},e.fn.datepicker.Constructor=r;var i=e.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today"}},s={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(e){return e%4===0&&e%100!==0||e%400===0},getDaysInMonth:function(e,t){return[31,s.isLeapYear(e)?29:28,31,30,31,30,31,31,30,31,30,31][t]},validParts:/dd?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[-`{-~\t\n\r]+/g,parseFormat:function(e){var t=e.replace(this.validParts,"\0").split("\0"),n=e.match(this.validParts);if(!t||!t.length||!n||n.length==0)throw new Error("Invalid date format.");return{separators:t,parts:n}},parseDate:function(n,s,o){if(n instanceof Date)return n;if(/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(n)){var u=/([-+]\d+)([dmwy])/,a=n.match(/([-+]\d+)([dmwy])/g),f,l;n=new Date;for(var c=0;c<a.length;c++){f=u.exec(a[c]),l=parseInt(f[1]);switch(f[2]){case"d":n.setUTCDate(n.getUTCDate()+l);break;case"m":n=r.prototype.moveMonth.call(r.prototype,n,l);break;case"w":n.setUTCDate(n.getUTCDate()+l*7);break;case"y":n=r.prototype.moveYear.call(r.prototype,n,l)}}return t(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),0,0,0)}var a=n&&n.match(this.nonpunctuation)||[],n=new Date,h={},p=["yyyy","yy","M","MM","m","mm","d","dd"],d={yyyy:function(e,t){return e.setUTCFullYear(t)},yy:function(e,t){return e.setUTCFullYear(2e3+t)},m:function(e,t){t-=1;while(t<0)t+=12;t%=12,e.setUTCMonth(t);while(e.getUTCMonth()!=t)e.setUTCDate(e.getUTCDate()-1);return e},d:function(e,t){return e.setUTCDate(t)}},v,m,f;d.M=d.MM=d.mm=d.m,d.dd=d.d,n=t(n.getFullYear(),n.getMonth(),n.getDate(),0,0,0);if(a.length==s.parts.length){for(var c=0,g=s.parts.length;c<g;c++){v=parseInt(a[c],10),f=s.parts[c];if(isNaN(v))switch(f){case"MM":m=e(i[o].months).filter(function(){var e=this.slice(0,a[c].length),t=a[c].slice(0,e.length);return e==t}),v=e.inArray(m[0],i[o].months)+1;break;case"M":m=e(i[o].monthsShort).filter(function(){var e=this.slice(0,a[c].length),t=a[c].slice(0,e.length);return e==t}),v=e.inArray(m[0],i[o].monthsShort)+1}h[f]=v}for(var c=0,y;c<p.length;c++)y=p[c],y in h&&!isNaN(h[y])&&d[y](n,h[y])}return n},formatDate:function(t,n,r){var s={d:t.getUTCDate(),m:t.getUTCMonth()+1,M:i[r].monthsShort[t.getUTCMonth()],MM:i[r].months[t.getUTCMonth()],yy:t.getUTCFullYear().toString().substring(2),yyyy:t.getUTCFullYear()};s.dd=(s.d<10?"0":"")+s.d,s.mm=(s.m<10?"0":"")+s.m;var t=[],o=e.extend([],n.separators);for(var u=0,a=n.parts.length;u<a;u++)o.length&&t.push(o.shift()),t.push(s[n.parts[u]]);return t.join("")},headTemplate:'<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'};s.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+s.headTemplate+"<tbody></tbody>"+s.footTemplate+"</table>"+"</div>"+'<div class="datepicker-months">'+'<table class="table-condensed">'+s.headTemplate+s.contTemplate+s.footTemplate+"</table>"+"</div>"+'<div class="datepicker-years">'+'<table class="table-condensed">'+s.headTemplate+s.contTemplate+s.footTemplate+"</table>"+"</div>"+"</div>",e.fn.datepicker.DPGlobal=s}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.timepicker.defaults,n,this.$element.data()),this.minuteStep=this.options.minuteStep||this.minuteStep,this.secondStep=this.options.secondStep||this.secondStep,this.showMeridian=this.options.showMeridian||this.showMeridian,this.showSeconds=this.options.showSeconds||this.showSeconds,this.showInputs=this.options.showInputs||this.showInputs,this.disableFocus=this.options.disableFocus||this.disableFocus,this.template=this.options.template||this.template,this.modalBackdrop=this.options.modalBackdrop||this.modalBackdrop,this.defaultTime=this.options.defaultTime||this.defaultTime,this.open=!1,this.init()};t.prototype={constructor:t,init:function(){this.template?this.$element.on({focus:e.proxy(this.showWidget,this),click:e.proxy(this.showWidget,this),blur:e.proxy(this.blurElement,this)}):this.$element.on({focus:e.proxy(this.highlightUnit,this),click:e.proxy(this.highlightUnit,this),keypress:e.proxy(this.elementKeypress,this),blur:e.proxy(this.blurElement,this)}),this.$widget=e(this.getTemplate()).appendTo("body"),this.$widget.on("click",e.proxy(this.widgetClick,this)),this.showInputs&&this.$widget.find("input").on({click:function(){this.select()},keypress:e.proxy(this.widgetKeypress,this),change:e.proxy(this.updateFromWidgetInputs,this)}),this.setDefaultTime(this.defaultTime)},showWidget:function(t){t.stopPropagation(),t.preventDefault();if(this.open)return;this.$element.trigger("show"),this.disableFocus&&this.$element.blur();var n=e.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});this.updateFromElementVal(),e("html").trigger("click.timepicker.data-api").one("click.timepicker.data-api",e.proxy(this.hideWidget,this)),this.template==="modal"?this.$widget.modal("show").on("hidden",e.proxy(this.hideWidget,this)):(this.$widget.css({top:n.top+n.height,left:n.left}),this.open||this.$widget.addClass("open")),this.open=!0,this.$element.trigger("shown")},hideWidget:function(){this.$element.trigger("hide"),this.template==="modal"?this.$widget.modal("hide"):this.$widget.removeClass("open"),this.open=!1,this.$element.trigger("hidden")},widgetClick:function(t){t.stopPropagation(),t.preventDefault();var n=e(t.target).closest("a").data("action");n&&(this[n](),this.update())},widgetKeypress:function(t){var n=e(t.target).closest("input").attr("name");switch(t.keyCode){case 9:this.showMeridian?n=="meridian"&&this.hideWidget():this.showSeconds?n=="second"&&this.hideWidget():n=="minute"&&this.hideWidget();break;case 27:this.hideWidget();break;case 38:switch(n){case"hour":this.incrementHour();break;case"minute":this.incrementMinute();break;case"second":this.incrementSecond();break;case"meridian":this.toggleMeridian()}this.update();break;case 40:switch(n){case"hour":this.decrementHour();break;case"minute":this.decrementMinute();break;case"second":this.decrementSecond();break;case"meridian":this.toggleMeridian()}this.update()}},elementKeypress:function(e){var t=this.$element.get(0);switch(e.keyCode){case 0:break;case 9:this.updateFromElementVal(),this.showMeridian?this.highlightedUnit!="meridian"&&(e.preventDefault(),this.highlightNextUnit()):this.showSeconds?this.highlightedUnit!="second"&&(e.preventDefault(),this.highlightNextUnit()):this.highlightedUnit!="minute"&&(e.preventDefault(),this.highlightNextUnit());break;case 27:this.updateFromElementVal();break;case 37:this.updateFromElementVal(),this.highlightPrevUnit();break;case 38:switch(this.highlightedUnit){case"hour":this.incrementHour();break;case"minute":this.incrementMinute();break;case"second":this.incrementSecond();break;case"meridian":this.toggleMeridian()}this.updateElement();break;case 39:this.updateFromElementVal(),this.highlightNextUnit();break;case 40:switch(this.highlightedUnit){case"hour":this.decrementHour();break;case"minute":this.decrementMinute();break;case"second":this.decrementSecond();break;case"meridian":this.toggleMeridian()}this.updateElement()}e.keyCode!==0&&e.keyCode!==8&&e.keyCode!==9&&e.keyCode!==46&&e.preventDefault()},setValues:function(e){if(this.showMeridian){var t=e.split(" "),n=t[0].split(":");this.meridian=t[1]}else var n=e.split(":");this.hour=parseInt(n[0],10),this.minute=parseInt(n[1],10),this.second=parseInt(n[2],10),isNaN(this.hour)&&(this.hour=0),isNaN(this.minute)&&(this.minute=0);if(this.showMeridian){this.hour>12?this.hour=12:this.hour<1&&(this.hour=1);if(this.meridian=="am"||this.meridian=="a")this.meridian="AM";else if(this.meridian=="pm"||this.meridian=="p")this.meridian="PM";this.meridian!="AM"&&this.meridian!="PM"&&(this.meridian="AM")}else this.hour>=24?this.hour=23:this.hour<0&&(this.hour=0);this.minute<0?this.minute=0:this.minute>=60&&(this.minute=59),this.showSeconds&&(isNaN(this.second)?this.second=0:this.second<0?this.second=0:this.second>=60&&(this.second=59)),this.$element.val()!=""&&this.updateElement(),this.updateWidget()},setMeridian:function(e){e=="a"||e=="am"||e=="AM"?this.meridian="AM":e=="p"||e=="pm"||e=="PM"?this.meridian="PM":this.updateWidget(),this.updateElement()},setDefaultTime:function(e){if(e){if(e==="current"){var t=new Date,n=t.getHours(),r=Math.floor(t.getMinutes()/this.minuteStep)*this.minuteStep,i=Math.floor(t.getSeconds()/this.secondStep)*this.secondStep,s="AM";this.showMeridian&&(n===0?n=12:n>=12?(n>12&&(n-=12),s="PM"):s="AM"),this.hour=n,this.minute=r,this.second=i,this.meridian=s}else e==="value"?this.setValues(this.$element.val()):this.setValues(e);this.$element.val()!=""&&this.updateElement(),this.updateWidget()}else this.hour=0,this.minute=0,this.second=0},formatTime:function(e,t,n,r){return e=e<10?"0"+e:e,t=t<10?"0"+t:t,n=n<10?"0"+n:n,e+":"+t+(this.showSeconds?":"+n:"")+(this.showMeridian?" "+r:"")},getTime:function(){return this.formatTime(this.hour,this.minute,this.second,this.meridian)},setTime:function(e){this.setValues(e),this.update()},update:function(){this.updateElement(),this.updateWidget()},blurElement:function(){this.highlightedUnit=undefined,this.updateFromElementVal()},updateElement:function(){var e=this.getTime();this.$element.val(e).change();switch(this.highlightedUnit){case"hour":this.highlightHour();break;case"minute":this.highlightMinute();break;case"second":this.highlightSecond();break;case"meridian":this.highlightMeridian()}},updateWidget:function(){this.showInputs?(this.$widget.find("input.bootstrap-timepicker-hour").val(this.hour<10?"0"+this.hour:this.hour),this.$widget.find("input.bootstrap-timepicker-minute").val(this.minute<10?"0"+this.minute:this.minute),this.showSeconds&&this.$widget.find("input.bootstrap-timepicker-second").val(this.second<10?"0"+this.second:this.second),this.showMeridian&&this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)):(this.$widget.find("span.bootstrap-timepicker-hour").text(this.hour),this.$widget.find("span.bootstrap-timepicker-minute").text(this.minute<10?"0"+this.minute:this.minute),this.showSeconds&&this.$widget.find("span.bootstrap-timepicker-second").text(this.second<10?"0"+this.second:this.second),this.showMeridian&&this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))},updateFromElementVal:function(e){var t=this.$element.val();t&&(this.setValues(t),this.updateWidget())},updateFromWidgetInputs:function(){var t=e("input.bootstrap-timepicker-hour",this.$widget).val()+":"+e("input.bootstrap-timepicker-minute",this.$widget).val()+(this.showSeconds?":"+e("input.bootstrap-timepicker-second",this.$widget).val():"")+(this.showMeridian?" "+e("input.bootstrap-timepicker-meridian",this.$widget).val():"");this.setValues(t)},getCursorPosition:function(){var e=this.$element.get(0);if("selectionStart"in e)return e.selectionStart;if(document.selection){e.focus();var t=document.selection.createRange(),n=document.selection.createRange().text.length;return t.moveStart("character",-e.value.length),t.text.length-n}},highlightUnit:function(){var e=this.$element.get(0);this.position=this.getCursorPosition(),this.position>=0&&this.position<=2?this.highlightHour():this.position>=3&&this.position<=5?this.highlightMinute():this.position>=6&&this.position<=8?this.showSeconds?this.highlightSecond():this.highlightMeridian():this.position>=9&&this.position<=11&&this.highlightMeridian()},highlightNextUnit:function(){switch(this.highlightedUnit){case"hour":this.highlightMinute();break;case"minute":this.showSeconds?this.highlightSecond():this.highlightMeridian();break;case"second":this.highlightMeridian();break;case"meridian":this.highlightHour()}},highlightPrevUnit:function(){switch(this.highlightedUnit){case"hour":this.highlightMeridian();break;case"minute":this.highlightHour();break;case"second":this.highlightMinute();break;case"meridian":this.showSeconds?this.highlightSecond():this.highlightMinute()}},highlightHour:function(){this.highlightedUnit="hour",this.$element.get(0).setSelectionRange(0,2)},highlightMinute:function(){this.highlightedUnit="minute",this.$element.get(0).setSelectionRange(3,5)},highlightSecond:function(){this.highlightedUnit="second",this.$element.get(0).setSelectionRange(6,8)},highlightMeridian:function(){this.highlightedUnit="meridian",this.showSeconds?this.$element.get(0).setSelectionRange(9,11):this.$element.get(0).setSelectionRange(6,8)},incrementHour:function(){
if(this.showMeridian)if(this.hour===11)this.toggleMeridian();else if(this.hour===12)return this.hour=1;if(this.hour===23)return this.hour=0;this.hour=this.hour+1},decrementHour:function(){if(this.showMeridian){if(this.hour===1)return this.hour=12;this.hour===12&&this.toggleMeridian()}if(this.hour===0)return this.hour=23;this.hour=this.hour-1},incrementMinute:function(){var e=this.minute+this.minuteStep-this.minute%this.minuteStep;e>59?(this.incrementHour(),this.minute=e-60):this.minute=e},decrementMinute:function(){var e=this.minute-this.minuteStep;e<0?(this.decrementHour(),this.minute=e+60):this.minute=e},incrementSecond:function(){var e=this.second+this.secondStep-this.second%this.secondStep;e>59?(this.incrementMinute(),this.second=e-60):this.second=e},decrementSecond:function(){var e=this.second-this.secondStep;e<0?(this.decrementMinute(),this.second=e+60):this.second=e},toggleMeridian:function(){this.meridian=this.meridian==="AM"?"PM":"AM",this.update()},getTemplate:function(){if(this.options.templates[this.options.template])return this.options.templates[this.options.template];if(this.showInputs)var e='<input type="text" name="hour" class="bootstrap-timepicker-hour" maxlength="2"/>',t='<input type="text" name="minute" class="bootstrap-timepicker-minute" maxlength="2"/>',n='<input type="text" name="second" class="bootstrap-timepicker-second" maxlength="2"/>',r='<input type="text" name="meridian" class="bootstrap-timepicker-meridian" maxlength="2"/>';else var e='<span class="bootstrap-timepicker-hour"></span>',t='<span class="bootstrap-timepicker-minute"></span>',n='<span class="bootstrap-timepicker-second"></span>',r='<span class="bootstrap-timepicker-meridian"></span>';var i='<table class="'+(this.showSeconds?"show-seconds":"")+" "+(this.showMeridian?"show-meridian":"")+'">'+"<tr>"+'<td><a href="#" data-action="incrementHour"><i class="icon-chevron-up"></i></a></td>'+'<td class="separator">&nbsp;</td>'+'<td><a href="#" data-action="incrementMinute"><i class="icon-chevron-up"></i></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><i class="icon-chevron-up"></i></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="icon-chevron-up"></i></a></td>':"")+"</tr>"+"<tr>"+"<td>"+e+"</td> "+'<td class="separator">:</td>'+"<td>"+t+"</td> "+(this.showSeconds?'<td class="separator">:</td><td>'+n+"</td>":"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td>'+r+"</td>":"")+"</tr>"+"<tr>"+'<td><a href="#" data-action="decrementHour"><i class="icon-chevron-down"></i></a></td>'+'<td class="separator"></td>'+'<td><a href="#" data-action="decrementMinute"><i class="icon-chevron-down"></i></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><i class="icon-chevron-down"></i></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><i class="icon-chevron-down"></i></a></td>':"")+"</tr>"+"</table>",s;switch(this.options.template){case"modal":s='<div class="bootstrap-timepicker modal hide fade in" style="top: 30%; margin-top: 0; width: 200px; margin-left: -100px;" data-backdrop="'+(this.modalBackdrop?"true":"false")+'">'+'<div class="modal-header">'+'<a href="#" class="close" data-dismiss="modal">×</a>'+"<h3>Pick a Time</h3>"+"</div>"+'<div class="modal-content">'+i+"</div>"+'<div class="modal-footer">'+'<a href="#" class="btn btn-primary" data-dismiss="modal">Ok</a>'+"</div>"+"</div>";break;case"dropdown":s='<div class="bootstrap-timepicker dropdown-menu">'+i+"</div>"}return s}},e.fn.timepicker=function(n){return this.each(function(){var r=e(this),i=r.data("timepicker"),s=typeof n=="object"&&n;i||r.data("timepicker",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.timepicker.defaults={minuteStep:15,secondStep:15,disableFocus:!1,defaultTime:"current",showSeconds:!1,showInputs:!0,showMeridian:!0,template:"dropdown",modalBackdrop:!1,templates:{}},e.fn.timepicker.Constructor=t}(window.jQuery),$(document).ready(function(){add_fields=function(e,t,n){var r=(new Date).getTime(),i=new RegExp("new_"+t,"g");$(e).append(n.replace(i,r)),$("input.date").datepicker({format:"mm/dd/yyyy"}),$("input.datetime").datepicker({format:"mm/dd/yyyy hh:ii"})},$("body").on("click","a.remove_fields",function(){return $(this).prev("input[type=hidden]").val("1"),$(this).closest("tr").hide(),!1}),$("input.date").datepicker({format:"mm/dd/yyyy"}),$("input.datetime").datepicker({format:"hh:ii:ss"}),$("input.timepicker").timepicker({}),$("input, select, textarea").change(function(){console.log("ccc")})});