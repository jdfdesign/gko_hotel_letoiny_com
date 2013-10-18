!function(e,t){var i=function(){var t=e(document).data("events");return t&&t.click&&e.grep(t.click,function(e){return"rails"===e.namespace}).length};i()&&e.error("jquery-ujs has already been loaded!");var s;e.rails=s={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input:file",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(t){var i=e('meta[name="csrf-token"]').attr("content");i&&t.setRequestHeader("X-CSRF-Token",i)},fire:function(t,i,s){var n=e.Event(i);return t.trigger(n,s),n.result!==!1},confirm:function(e){return confirm(e)},ajax:function(t){return e.ajax(t)},href:function(e){return e.attr("href")},handleRemote:function(i){var n,a,o,r,d,l,h,c;if(s.fire(i,"ajax:before")){if(r=i.data("cross-domain"),d=r===t?null:r,l=i.data("with-credentials")||null,h=i.data("type")||e.ajaxSettings&&e.ajaxSettings.dataType,i.is("form")){n=i.attr("method"),a=i.attr("action"),o=i.serializeArray();var u=i.data("ujs:submit-button");u&&(o.push(u),i.data("ujs:submit-button",null))}else i.is(s.inputChangeSelector)?(n=i.data("method"),a=i.data("url"),o=i.serialize(),i.data("params")&&(o=o+"&"+i.data("params"))):(n=i.data("method"),a=s.href(i),o=i.data("params")||null);c={type:n||"GET",data:o,dataType:h,beforeSend:function(e,n){return n.dataType===t&&e.setRequestHeader("accept","*/*;q=0.5, "+n.accepts.script),s.fire(i,"ajax:beforeSend",[e,n])},success:function(e,t,s){i.trigger("ajax:success",[e,t,s])},complete:function(e,t){i.trigger("ajax:complete",[e,t])},error:function(e,t,s){i.trigger("ajax:error",[e,t,s])},xhrFields:{withCredentials:l},crossDomain:d},a&&(c.url=a);var p=s.ajax(c);return i.trigger("ajax:send",p),p}return!1},handleMethod:function(i){var n=s.href(i),a=i.data("method"),o=i.attr("target"),r=e("meta[name=csrf-token]").attr("content"),d=e("meta[name=csrf-param]").attr("content"),l=e('<form method="post" action="'+n+'"></form>'),h='<input name="_method" value="'+a+'" type="hidden" />';d!==t&&r!==t&&(h+='<input name="'+d+'" value="'+r+'" type="hidden" />'),o&&l.attr("target",o),l.hide().append(h).appendTo("body"),l.submit()},disableFormElements:function(t){t.find(s.disableSelector).each(function(){var t=e(this),i=t.is("button")?"html":"val";t.data("ujs:enable-with",t[i]()),t[i](t.data("disable-with")),t.prop("disabled",!0)})},enableFormElements:function(t){t.find(s.enableSelector).each(function(){var t=e(this),i=t.is("button")?"html":"val";t.data("ujs:enable-with")&&t[i](t.data("ujs:enable-with")),t.prop("disabled",!1)})},allowAction:function(e){var t,i=e.data("confirm"),n=!1;return i?(s.fire(e,"confirm")&&(n=s.confirm(i),t=s.fire(e,"confirm:complete",[n])),n&&t):!0},blankInputs:function(t,i,s){var n,a,o=e(),r=i||"input,textarea";return t.find(r).each(function(){n=e(this),a=n.is(":checkbox,:radio")?n.is(":checked"):n.val(),a==!!s&&(o=o.add(n))}),o.length?o:!1},nonBlankInputs:function(e,t){return s.blankInputs(e,t,!0)},stopEverything:function(t){return e(t.target).trigger("ujs:everythingStopped"),t.stopImmediatePropagation(),!1},callFormSubmitBindings:function(i,s){var n=i.data("events"),a=!0;return n!==t&&n.submit!==t&&e.each(n.submit,function(e,t){return"function"==typeof t.handler?a=t.handler(s):void 0}),a},disableElement:function(e){e.data("ujs:enable-with",e.html()),e.html(e.data("disable-with")),e.bind("click.railsDisable",function(e){return s.stopEverything(e)})},enableElement:function(e){e.data("ujs:enable-with")!==t&&(e.html(e.data("ujs:enable-with")),e.data("ujs:enable-with",!1)),e.unbind("click.railsDisable")}},s.fire(e(document),"rails:attachBindings")&&(e.ajaxPrefilter(function(e,t,i){e.crossDomain||s.CSRFProtection(i)}),e(document).delegate(s.linkDisableSelector,"ajax:complete",function(){s.enableElement(e(this))}),e(document).delegate(s.linkClickSelector,"click.rails",function(i){var n=e(this),a=n.data("method"),o=n.data("params");return s.allowAction(n)?(n.is(s.linkDisableSelector)&&s.disableElement(n),n.data("remote")!==t?!i.metaKey&&!i.ctrlKey||a&&"GET"!==a||o?(s.handleRemote(n)===!1&&s.enableElement(n),!1):!0:n.data("method")?(s.handleMethod(n),!1):void 0):s.stopEverything(i)}),e(document).delegate(s.inputChangeSelector,"change.rails",function(t){var i=e(this);return s.allowAction(i)?(s.handleRemote(i),!1):s.stopEverything(t)}),e(document).delegate(s.formSubmitSelector,"submit.rails",function(i){var n=e(this),a=n.data("remote")!==t,o=s.blankInputs(n,s.requiredInputSelector),r=s.nonBlankInputs(n,s.fileInputSelector);return s.allowAction(n)?o&&n.attr("novalidate")==t&&s.fire(n,"ajax:aborted:required",[o])?s.stopEverything(i):a?r?(setTimeout(function(){s.disableFormElements(n)},13),s.fire(n,"ajax:aborted:file",[r])):!e.support.submitBubbles&&e().jquery<"1.7"&&s.callFormSubmitBindings(n,i)===!1?s.stopEverything(i):(s.handleRemote(n),!1):(setTimeout(function(){s.disableFormElements(n)},13),void 0):s.stopEverything(i)}),e(document).delegate(s.formInputClickSelector,"click.rails",function(t){var i=e(this);if(!s.allowAction(i))return s.stopEverything(t);var n=i.attr("name"),a=n?{name:n,value:i.val()}:null;i.closest("form").data("ujs:submit-button",a)}),e(document).delegate(s.formSubmitSelector,"ajax:beforeSend.rails",function(t){this==t.target&&s.disableFormElements(e(this))}),e(document).delegate(s.formSubmitSelector,"ajax:complete.rails",function(t){this==t.target&&s.enableFormElements(e(this))}),e(function(){csrf_token=e("meta[name=csrf-token]").attr("content"),csrf_param=e("meta[name=csrf-param]").attr("content"),e('form input[name="'+csrf_param+'"]').val(csrf_token)}))}(jQuery),/* =========================================================
 * bootstrap-datepicker.js
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function(e){function t(){return new Date(Date.UTC.apply(Date,arguments))}var i=function(t,i){var a=this;switch(this.element=e(t),this.language=i.language||this.element.data("date-language")||"en",this.language=this.language in s?this.language:"en",this.isRTL=s[this.language].rtl||!1,this.format=n.parseFormat(i.format||this.element.data("date-format")||"mm/dd/yyyy"),this.isInline=!1,this.isInput=this.element.is("input"),this.component=this.element.is(".date")?this.element.find(".add-on"):!1,this.hasInput=this.component&&this.element.find("input").length,this.component&&0===this.component.length&&(this.component=!1),this._attachEvents(),this.forceParse=!0,"forceParse"in i?this.forceParse=i.forceParse:"dateForceParse"in this.element.data()&&(this.forceParse=this.element.data("date-force-parse")),this.picker=e(n.template).appendTo(this.isInline?this.element:"body").on({click:e.proxy(this.click,this),mousedown:e.proxy(this.mousedown,this)}),this.isInline?this.picker.addClass("datepicker-inline"):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.isRTL&&(this.picker.addClass("datepicker-rtl"),this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")),e(document).on("mousedown",function(t){0===e(t.target).closest(".datepicker").length&&a.hide()}),this.autoclose=!1,"autoclose"in i?this.autoclose=i.autoclose:"dateAutoclose"in this.element.data()&&(this.autoclose=this.element.data("date-autoclose")),this.keyboardNavigation=!0,"keyboardNavigation"in i?this.keyboardNavigation=i.keyboardNavigation:"dateKeyboardNavigation"in this.element.data()&&(this.keyboardNavigation=this.element.data("date-keyboard-navigation")),this.viewMode=this.startViewMode=0,i.startView||this.element.data("date-start-view")){case 2:case"decade":this.viewMode=this.startViewMode=2;break;case 1:case"year":this.viewMode=this.startViewMode=1}this.todayBtn=i.todayBtn||this.element.data("date-today-btn")||!1,this.todayHighlight=i.todayHighlight||this.element.data("date-today-highlight")||!1,this.weekStart=(i.weekStart||this.element.data("date-weekstart")||s[this.language].weekStart||0)%7,this.weekEnd=(this.weekStart+6)%7,this.startDate=-1/0,this.endDate=1/0,this.daysOfWeekDisabled=[],this.setStartDate(i.startDate||this.element.data("date-startdate")),this.setEndDate(i.endDate||this.element.data("date-enddate")),this.setDaysOfWeekDisabled(i.daysOfWeekDisabled||this.element.data("date-days-of-week-disabled")),this.fillDow(),this.fillMonths(),this.update(),this.showMode(),this.isInline&&this.show()};i.prototype={constructor:i,_events:[],_attachEvents:function(){this._detachEvents(),this.isInput?this._events=[[this.element,{focus:e.proxy(this.show,this),keyup:e.proxy(this.update,this),keydown:e.proxy(this.keydown,this)}]]:this.component&&this.hasInput?this._events=[[this.element.find("input"),{focus:e.proxy(this.show,this),keyup:e.proxy(this.update,this),keydown:e.proxy(this.keydown,this)}],[this.component,{click:e.proxy(this.show,this)}]]:this.element.is("div")?this.isInline=!0:this._events=[[this.element,{click:e.proxy(this.show,this)}]];for(var t,i,s=0;s<this._events.length;s++)t=this._events[s][0],i=this._events[s][1],t.on(i)},_detachEvents:function(){for(var e,t,i=0;i<this._events.length;i++)e=this._events[i][0],t=this._events[i][1],e.off(t);this._events=[]},show:function(t){this.picker.show(),this.height=this.component?this.component.outerHeight():this.element.outerHeight(),this.update(),this.place(),e(window).on("resize",e.proxy(this.place,this)),t&&(t.stopPropagation(),t.preventDefault()),this.element.trigger({type:"show",date:this.date})},hide:function(){this.isInline||(this.picker.hide(),e(window).off("resize",this.place),this.viewMode=this.startViewMode,this.showMode(),this.isInput||e(document).off("mousedown",this.hide),this.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())&&this.setValue(),this.element.trigger({type:"hide",date:this.date}))},remove:function(){this._detachEvents(),this.picker.remove(),delete this.element.data().datepicker},getDate:function(){var e=this.getUTCDate();return new Date(e.getTime()+6e4*e.getTimezoneOffset())},getUTCDate:function(){return this.date},setDate:function(e){this.setUTCDate(new Date(e.getTime()-6e4*e.getTimezoneOffset()))},setUTCDate:function(e){this.date=e,this.setValue()},setValue:function(){var e=this.getFormattedDate();this.isInput?this.element.prop("value",e):(this.component&&this.element.find("input").prop("value",e),this.element.data("date",e))},getFormattedDate:function(e){return void 0==e&&(e=this.format),n.formatDate(this.date,e,this.language)},setStartDate:function(e){this.startDate=e||-1/0,this.startDate!==-1/0&&(this.startDate=n.parseDate(this.startDate,this.format,this.language)),this.update(),this.updateNavArrows()},setEndDate:function(e){this.endDate=e||1/0,1/0!==this.endDate&&(this.endDate=n.parseDate(this.endDate,this.format,this.language)),this.update(),this.updateNavArrows()},setDaysOfWeekDisabled:function(t){this.daysOfWeekDisabled=t||[],e.isArray(this.daysOfWeekDisabled)||(this.daysOfWeekDisabled=this.daysOfWeekDisabled.split(/,\s*/)),this.daysOfWeekDisabled=e.map(this.daysOfWeekDisabled,function(e){return parseInt(e,10)}),this.update(),this.updateNavArrows()},place:function(){if(!this.isInline){var t=parseInt(this.element.parents().filter(function(){return"auto"!=e(this).css("z-index")}).first().css("z-index"))+10,i=this.component?this.component.offset():this.element.offset();this.picker.css({top:i.top+this.height,left:i.left,zIndex:t})}},update:function(){var e,t=!1;arguments&&arguments.length&&("string"==typeof arguments[0]||arguments[0]instanceof Date)?(e=arguments[0],t=!0):e=this.isInput?this.element.prop("value"):this.element.data("date")||this.element.find("input").prop("value"),this.date=n.parseDate(e,this.format,this.language),t&&this.setValue(),this.viewDate=this.date<this.startDate?new Date(this.startDate):this.date>this.endDate?new Date(this.endDate):new Date(this.date),this.fill()},fillDow:function(){for(var e=this.weekStart,t="<tr>";e<this.weekStart+7;)t+='<th class="dow">'+s[this.language].daysMin[e++%7]+"</th>";t+="</tr>",this.picker.find(".datepicker-days thead").append(t)},fillMonths:function(){for(var e="",t=0;12>t;)e+='<span class="month">'+s[this.language].monthsShort[t++]+"</span>";this.picker.find(".datepicker-months td").html(e)},fill:function(){var i=new Date(this.viewDate),a=i.getUTCFullYear(),o=i.getUTCMonth(),r=this.startDate!==-1/0?this.startDate.getUTCFullYear():-1/0,d=this.startDate!==-1/0?this.startDate.getUTCMonth():-1/0,l=1/0!==this.endDate?this.endDate.getUTCFullYear():1/0,h=1/0!==this.endDate?this.endDate.getUTCMonth():1/0,c=this.date.valueOf(),u=new Date;this.picker.find(".datepicker-days thead th:eq(1)").text(s[this.language].months[o]+" "+a),this.picker.find("tfoot th.today").text(s[this.language].today).toggle(this.todayBtn!==!1),this.updateNavArrows(),this.fillMonths();var p=t(a,o-1,28,0,0,0,0),m=n.getDaysInMonth(p.getUTCFullYear(),p.getUTCMonth());p.setUTCDate(m),p.setUTCDate(m-(p.getUTCDay()-this.weekStart+7)%7);var f=new Date(p);f.setUTCDate(f.getUTCDate()+42),f=f.valueOf();for(var g,v=[];p.valueOf()<f;)p.getUTCDay()==this.weekStart&&v.push("<tr>"),g="",p.getUTCFullYear()<a||p.getUTCFullYear()==a&&p.getUTCMonth()<o?g+=" old":(p.getUTCFullYear()>a||p.getUTCFullYear()==a&&p.getUTCMonth()>o)&&(g+=" new"),this.todayHighlight&&p.getUTCFullYear()==u.getFullYear()&&p.getUTCMonth()==u.getMonth()&&p.getUTCDate()==u.getDate()&&(g+=" today"),p.valueOf()==c&&(g+=" active"),(p.valueOf()<this.startDate||p.valueOf()>this.endDate||-1!==e.inArray(p.getUTCDay(),this.daysOfWeekDisabled))&&(g+=" disabled"),v.push('<td class="day'+g+'">'+p.getUTCDate()+"</td>"),p.getUTCDay()==this.weekEnd&&v.push("</tr>"),p.setUTCDate(p.getUTCDate()+1);this.picker.find(".datepicker-days tbody").empty().append(v.join(""));var b=this.date.getUTCFullYear(),y=this.picker.find(".datepicker-months").find("th:eq(1)").text(a).end().find("span").removeClass("active");b==a&&y.eq(this.date.getUTCMonth()).addClass("active"),(r>a||a>l)&&y.addClass("disabled"),a==r&&y.slice(0,d).addClass("disabled"),a==l&&y.slice(h+1).addClass("disabled"),v="",a=10*parseInt(a/10,10);var w=this.picker.find(".datepicker-years").find("th:eq(1)").text(a+"-"+(a+9)).end().find("td");a-=1;for(var k=-1;11>k;k++)v+='<span class="year'+(-1==k||10==k?" old":"")+(b==a?" active":"")+(r>a||a>l?" disabled":"")+'">'+a+"</span>",a+=1;w.html(v)},updateNavArrows:function(){var e=new Date(this.viewDate),t=e.getUTCFullYear(),i=e.getUTCMonth();switch(this.viewMode){case 0:this.startDate!==-1/0&&t<=this.startDate.getUTCFullYear()&&i<=this.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),1/0!==this.endDate&&t>=this.endDate.getUTCFullYear()&&i>=this.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:this.startDate!==-1/0&&t<=this.startDate.getUTCFullYear()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),1/0!==this.endDate&&t>=this.endDate.getUTCFullYear()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}},click:function(i){i.stopPropagation(),i.preventDefault();var s=e(i.target).closest("span, td, th");if(1==s.length)switch(s[0].nodeName.toLowerCase()){case"th":switch(s[0].className){case"switch":this.showMode(1);break;case"prev":case"next":var a=n.modes[this.viewMode].navStep*("prev"==s[0].className?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,a);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,a)}this.fill();break;case"today":var o=new Date;o=t(o.getFullYear(),o.getMonth(),o.getDate(),0,0,0),this.showMode(-2);var r="linked"==this.todayBtn?null:"view";this._setDate(o,r)}break;case"span":if(!s.is(".disabled")){if(this.viewDate.setUTCDate(1),s.is(".month")){var d=s.parent().find("span").index(s);this.viewDate.setUTCMonth(d),this.element.trigger({type:"changeMonth",date:this.viewDate})}else{var l=parseInt(s.text(),10)||0;this.viewDate.setUTCFullYear(l),this.element.trigger({type:"changeYear",date:this.viewDate})}this.showMode(-1),this.fill()}break;case"td":if(s.is(".day")&&!s.is(".disabled")){var h=parseInt(s.text(),10)||1,l=this.viewDate.getUTCFullYear(),d=this.viewDate.getUTCMonth();s.is(".old")?0===d?(d=11,l-=1):d-=1:s.is(".new")&&(11==d?(d=0,l+=1):d+=1),this._setDate(t(l,d,h,0,0,0,0))}}},_setDate:function(e,t){t&&"date"!=t||(this.date=e),t&&"view"!=t||(this.viewDate=e),this.fill(),this.setValue(),this.element.trigger({type:"changeDate",date:this.date});var i;this.isInput?i=this.element:this.component&&(i=this.element.find("input")),i&&(i.change(),!this.autoclose||t&&"date"!=t||this.hide())},moveMonth:function(e,t){if(!t)return e;var i,s,n=new Date(e.valueOf()),a=n.getUTCDate(),o=n.getUTCMonth(),r=Math.abs(t);if(t=t>0?1:-1,1==r)s=-1==t?function(){return n.getUTCMonth()==o}:function(){return n.getUTCMonth()!=i},i=o+t,n.setUTCMonth(i),(0>i||i>11)&&(i=(i+12)%12);else{for(var d=0;r>d;d++)n=this.moveMonth(n,t);i=n.getUTCMonth(),n.setUTCDate(a),s=function(){return i!=n.getUTCMonth()}}for(;s();)n.setUTCDate(--a),n.setUTCMonth(i);return n},moveYear:function(e,t){return this.moveMonth(e,12*t)},dateWithinRange:function(e){return e>=this.startDate&&e<=this.endDate},keydown:function(e){if(this.picker.is(":not(:visible)"))return 27==e.keyCode&&this.show(),void 0;var t,i,s,n=!1;switch(e.keyCode){case 27:this.hide(),e.preventDefault();break;case 37:case 39:if(!this.keyboardNavigation)break;t=37==e.keyCode?-1:1,e.ctrlKey?(i=this.moveYear(this.date,t),s=this.moveYear(this.viewDate,t)):e.shiftKey?(i=this.moveMonth(this.date,t),s=this.moveMonth(this.viewDate,t)):(i=new Date(this.date),i.setUTCDate(this.date.getUTCDate()+t),s=new Date(this.viewDate),s.setUTCDate(this.viewDate.getUTCDate()+t)),this.dateWithinRange(i)&&(this.date=i,this.viewDate=s,this.setValue(),this.update(),e.preventDefault(),n=!0);break;case 38:case 40:if(!this.keyboardNavigation)break;t=38==e.keyCode?-1:1,e.ctrlKey?(i=this.moveYear(this.date,t),s=this.moveYear(this.viewDate,t)):e.shiftKey?(i=this.moveMonth(this.date,t),s=this.moveMonth(this.viewDate,t)):(i=new Date(this.date),i.setUTCDate(this.date.getUTCDate()+7*t),s=new Date(this.viewDate),s.setUTCDate(this.viewDate.getUTCDate()+7*t)),this.dateWithinRange(i)&&(this.date=i,this.viewDate=s,this.setValue(),this.update(),e.preventDefault(),n=!0);break;case 13:this.hide(),e.preventDefault();break;case 9:this.hide()}if(n){this.element.trigger({type:"changeDate",date:this.date});var a;this.isInput?a=this.element:this.component&&(a=this.element.find("input")),a&&a.change()}},showMode:function(e){e&&(this.viewMode=Math.max(0,Math.min(2,this.viewMode+e))),this.picker.find(">div").hide().filter(".datepicker-"+n.modes[this.viewMode].clsName).css("display","block"),this.updateNavArrows()}},e.fn.datepicker=function(t){var s=Array.apply(null,arguments);return s.shift(),this.each(function(){var n=e(this),a=n.data("datepicker"),o="object"==typeof t&&t;a||n.data("datepicker",a=new i(this,e.extend({},e.fn.datepicker.defaults,o))),"string"==typeof t&&"function"==typeof a[t]&&a[t].apply(a,s)})},e.fn.datepicker.defaults={},e.fn.datepicker.Constructor=i;var s=e.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today"}},n={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(e){return 0===e%4&&0!==e%100||0===e%400},getDaysInMonth:function(e,t){return[31,n.isLeapYear(e)?29:28,31,30,31,30,31,31,30,31,30,31][t]},validParts:/dd?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[-`{-~\t\n\r]+/g,parseFormat:function(e){var t=e.replace(this.validParts,"\0").split("\0"),i=e.match(this.validParts);if(!t||!t.length||!i||0==i.length)throw new Error("Invalid date format.");return{separators:t,parts:i}},parseDate:function(n,a,o){if(n instanceof Date)return n;if(/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(n)){var r,d,l=/([-+]\d+)([dmwy])/,h=n.match(/([-+]\d+)([dmwy])/g);n=new Date;for(var c=0;c<h.length;c++)switch(r=l.exec(h[c]),d=parseInt(r[1]),r[2]){case"d":n.setUTCDate(n.getUTCDate()+d);break;case"m":n=i.prototype.moveMonth.call(i.prototype,n,d);break;case"w":n.setUTCDate(n.getUTCDate()+7*d);break;case"y":n=i.prototype.moveYear.call(i.prototype,n,d)}return t(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),0,0,0)}var u,p,r,h=n&&n.match(this.nonpunctuation)||[],n=new Date,m={},f=["yyyy","yy","M","MM","m","mm","d","dd"],g={yyyy:function(e,t){return e.setUTCFullYear(t)},yy:function(e,t){return e.setUTCFullYear(2e3+t)},m:function(e,t){for(t-=1;0>t;)t+=12;for(t%=12,e.setUTCMonth(t);e.getUTCMonth()!=t;)e.setUTCDate(e.getUTCDate()-1);return e},d:function(e,t){return e.setUTCDate(t)}};if(g.M=g.MM=g.mm=g.m,g.dd=g.d,n=t(n.getFullYear(),n.getMonth(),n.getDate(),0,0,0),h.length==a.parts.length){for(var c=0,v=a.parts.length;v>c;c++){if(u=parseInt(h[c],10),r=a.parts[c],isNaN(u))switch(r){case"MM":p=e(s[o].months).filter(function(){var e=this.slice(0,h[c].length),t=h[c].slice(0,e.length);return e==t}),u=e.inArray(p[0],s[o].months)+1;break;case"M":p=e(s[o].monthsShort).filter(function(){var e=this.slice(0,h[c].length),t=h[c].slice(0,e.length);return e==t}),u=e.inArray(p[0],s[o].monthsShort)+1}m[r]=u}for(var b,c=0;c<f.length;c++)b=f[c],b in m&&!isNaN(m[b])&&g[b](n,m[b])}return n},formatDate:function(t,i,n){var a={d:t.getUTCDate(),m:t.getUTCMonth()+1,M:s[n].monthsShort[t.getUTCMonth()],MM:s[n].months[t.getUTCMonth()],yy:t.getUTCFullYear().toString().substring(2),yyyy:t.getUTCFullYear()};a.dd=(a.d<10?"0":"")+a.d,a.mm=(a.m<10?"0":"")+a.m;for(var t=[],o=e.extend([],i.separators),r=0,d=i.parts.length;d>r;r++)o.length&&t.push(o.shift()),t.push(a[i.parts[r]]);return t.join("")},headTemplate:'<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'};n.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+n.headTemplate+"<tbody></tbody>"+n.footTemplate+"</table>"+"</div>"+'<div class="datepicker-months">'+'<table class="table-condensed">'+n.headTemplate+n.contTemplate+n.footTemplate+"</table>"+"</div>"+'<div class="datepicker-years">'+'<table class="table-condensed">'+n.headTemplate+n.contTemplate+n.footTemplate+"</table>"+"</div>"+"</div>",e.fn.datepicker.DPGlobal=n}(window.jQuery),/* =========================================================
 * bootstrap-timepicker.js
 * http://www.github.com/jdewit/bootstrap-timepicker
 * =========================================================
 * Copyright 2012
 *
 * Created By:
 * Joris de Wit @joris_dewit
 *
 * Contributions By:
 * Gilbert @mindeavor
 * Koen Punt info@koenpunt.nl
 * Nek
 * Chris Martin
 * Dominic Barnes contact@dominicbarnes.us
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function(e){"use strict";var t=function(t,i){this.$element=e(t),this.options=e.extend({},e.fn.timepicker.defaults,i,this.$element.data()),this.minuteStep=this.options.minuteStep||this.minuteStep,this.secondStep=this.options.secondStep||this.secondStep,this.showMeridian=this.options.showMeridian||this.showMeridian,this.showSeconds=this.options.showSeconds||this.showSeconds,this.showInputs=this.options.showInputs||this.showInputs,this.disableFocus=this.options.disableFocus||this.disableFocus,this.template=this.options.template||this.template,this.modalBackdrop=this.options.modalBackdrop||this.modalBackdrop,this.defaultTime=this.options.defaultTime||this.defaultTime,this.open=!1,this.init()};t.prototype={constructor:t,init:function(){this.template?this.$element.on({focus:e.proxy(this.showWidget,this),click:e.proxy(this.showWidget,this),blur:e.proxy(this.blurElement,this)}):this.$element.on({focus:e.proxy(this.highlightUnit,this),click:e.proxy(this.highlightUnit,this),keypress:e.proxy(this.elementKeypress,this),blur:e.proxy(this.blurElement,this)}),this.$widget=e(this.getTemplate()).appendTo("body"),this.$widget.on("click",e.proxy(this.widgetClick,this)),this.showInputs&&this.$widget.find("input").on({click:function(){this.select()},keypress:e.proxy(this.widgetKeypress,this),change:e.proxy(this.updateFromWidgetInputs,this)}),this.setDefaultTime(this.defaultTime)},showWidget:function(t){if(t.stopPropagation(),t.preventDefault(),!this.open){this.$element.trigger("show"),this.disableFocus&&this.$element.blur();var i=e.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});this.updateFromElementVal(),e("html").trigger("click.timepicker.data-api").one("click.timepicker.data-api",e.proxy(this.hideWidget,this)),"modal"===this.template?this.$widget.modal("show").on("hidden",e.proxy(this.hideWidget,this)):(this.$widget.css({top:i.top+i.height,left:i.left}),this.open||this.$widget.addClass("open")),this.open=!0,this.$element.trigger("shown")}},hideWidget:function(){this.$element.trigger("hide"),"modal"===this.template?this.$widget.modal("hide"):this.$widget.removeClass("open"),this.open=!1,this.$element.trigger("hidden")},widgetClick:function(t){t.stopPropagation(),t.preventDefault();var i=e(t.target).closest("a").data("action");i&&(this[i](),this.update())},widgetKeypress:function(t){var i=e(t.target).closest("input").attr("name");switch(t.keyCode){case 9:this.showMeridian?"meridian"==i&&this.hideWidget():this.showSeconds?"second"==i&&this.hideWidget():"minute"==i&&this.hideWidget();break;case 27:this.hideWidget();break;case 38:switch(i){case"hour":this.incrementHour();break;case"minute":this.incrementMinute();break;case"second":this.incrementSecond();break;case"meridian":this.toggleMeridian()}this.update();break;case 40:switch(i){case"hour":this.decrementHour();break;case"minute":this.decrementMinute();break;case"second":this.decrementSecond();break;case"meridian":this.toggleMeridian()}this.update()}},elementKeypress:function(e){switch(this.$element.get(0),e.keyCode){case 0:break;case 9:this.updateFromElementVal(),this.showMeridian?"meridian"!=this.highlightedUnit&&(e.preventDefault(),this.highlightNextUnit()):this.showSeconds?"second"!=this.highlightedUnit&&(e.preventDefault(),this.highlightNextUnit()):"minute"!=this.highlightedUnit&&(e.preventDefault(),this.highlightNextUnit());break;case 27:this.updateFromElementVal();break;case 37:this.updateFromElementVal(),this.highlightPrevUnit();break;case 38:switch(this.highlightedUnit){case"hour":this.incrementHour();break;case"minute":this.incrementMinute();break;case"second":this.incrementSecond();break;case"meridian":this.toggleMeridian()}this.updateElement();break;case 39:this.updateFromElementVal(),this.highlightNextUnit();break;case 40:switch(this.highlightedUnit){case"hour":this.decrementHour();break;case"minute":this.decrementMinute();break;case"second":this.decrementSecond();break;case"meridian":this.toggleMeridian()}this.updateElement()}0!==e.keyCode&&8!==e.keyCode&&9!==e.keyCode&&46!==e.keyCode&&e.preventDefault()},setValues:function(e){if(this.showMeridian){var t=e.split(" "),i=t[0].split(":");this.meridian=t[1]}else var i=e.split(":");this.hour=parseInt(i[0],10),this.minute=parseInt(i[1],10),this.second=parseInt(i[2],10),isNaN(this.hour)&&(this.hour=0),isNaN(this.minute)&&(this.minute=0),this.showMeridian?(this.hour>12?this.hour=12:this.hour<1&&(this.hour=1),"am"==this.meridian||"a"==this.meridian?this.meridian="AM":("pm"==this.meridian||"p"==this.meridian)&&(this.meridian="PM"),"AM"!=this.meridian&&"PM"!=this.meridian&&(this.meridian="AM")):this.hour>=24?this.hour=23:this.hour<0&&(this.hour=0),this.minute<0?this.minute=0:this.minute>=60&&(this.minute=59),this.showSeconds&&(isNaN(this.second)?this.second=0:this.second<0?this.second=0:this.second>=60&&(this.second=59)),""!=this.$element.val()&&this.updateElement(),this.updateWidget()},setMeridian:function(e){"a"==e||"am"==e||"AM"==e?this.meridian="AM":"p"==e||"pm"==e||"PM"==e?this.meridian="PM":this.updateWidget(),this.updateElement()},setDefaultTime:function(e){if(e){if("current"===e){var t=new Date,i=t.getHours(),s=Math.floor(t.getMinutes()/this.minuteStep)*this.minuteStep,n=Math.floor(t.getSeconds()/this.secondStep)*this.secondStep,a="AM";this.showMeridian&&(0===i?i=12:i>=12?(i>12&&(i-=12),a="PM"):a="AM"),this.hour=i,this.minute=s,this.second=n,this.meridian=a}else"value"===e?this.setValues(this.$element.val()):this.setValues(e);""!=this.$element.val()&&this.updateElement(),this.updateWidget()}else this.hour=0,this.minute=0,this.second=0},formatTime:function(e,t,i,s){return e=10>e?"0"+e:e,t=10>t?"0"+t:t,i=10>i?"0"+i:i,e+":"+t+(this.showSeconds?":"+i:"")+(this.showMeridian?" "+s:"")},getTime:function(){return this.formatTime(this.hour,this.minute,this.second,this.meridian)},setTime:function(e){this.setValues(e),this.update()},update:function(){this.updateElement(),this.updateWidget()},blurElement:function(){this.highlightedUnit=void 0,this.updateFromElementVal()},updateElement:function(){var e=this.getTime();switch(this.$element.val(e).change(),this.highlightedUnit){case"hour":this.highlightHour();break;case"minute":this.highlightMinute();break;case"second":this.highlightSecond();break;case"meridian":this.highlightMeridian()}},updateWidget:function(){this.showInputs?(this.$widget.find("input.bootstrap-timepicker-hour").val(this.hour<10?"0"+this.hour:this.hour),this.$widget.find("input.bootstrap-timepicker-minute").val(this.minute<10?"0"+this.minute:this.minute),this.showSeconds&&this.$widget.find("input.bootstrap-timepicker-second").val(this.second<10?"0"+this.second:this.second),this.showMeridian&&this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)):(this.$widget.find("span.bootstrap-timepicker-hour").text(this.hour),this.$widget.find("span.bootstrap-timepicker-minute").text(this.minute<10?"0"+this.minute:this.minute),this.showSeconds&&this.$widget.find("span.bootstrap-timepicker-second").text(this.second<10?"0"+this.second:this.second),this.showMeridian&&this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))},updateFromElementVal:function(){var e=this.$element.val();e&&(this.setValues(e),this.updateWidget())},updateFromWidgetInputs:function(){var t=e("input.bootstrap-timepicker-hour",this.$widget).val()+":"+e("input.bootstrap-timepicker-minute",this.$widget).val()+(this.showSeconds?":"+e("input.bootstrap-timepicker-second",this.$widget).val():"")+(this.showMeridian?" "+e("input.bootstrap-timepicker-meridian",this.$widget).val():"");this.setValues(t)},getCursorPosition:function(){var e=this.$element.get(0);if("selectionStart"in e)return e.selectionStart;if(document.selection){e.focus();var t=document.selection.createRange(),i=document.selection.createRange().text.length;return t.moveStart("character",-e.value.length),t.text.length-i}},highlightUnit:function(){this.$element.get(0),this.position=this.getCursorPosition(),this.position>=0&&this.position<=2?this.highlightHour():this.position>=3&&this.position<=5?this.highlightMinute():this.position>=6&&this.position<=8?this.showSeconds?this.highlightSecond():this.highlightMeridian():this.position>=9&&this.position<=11&&this.highlightMeridian()},highlightNextUnit:function(){switch(this.highlightedUnit){case"hour":this.highlightMinute();break;case"minute":this.showSeconds?this.highlightSecond():this.highlightMeridian();break;case"second":this.highlightMeridian();break;case"meridian":this.highlightHour()}},highlightPrevUnit:function(){switch(this.highlightedUnit){case"hour":this.highlightMeridian();break;case"minute":this.highlightHour();break;case"second":this.highlightMinute();break;case"meridian":this.showSeconds?this.highlightSecond():this.highlightMinute()}},highlightHour:function(){this.highlightedUnit="hour",this.$element.get(0).setSelectionRange(0,2)},highlightMinute:function(){this.highlightedUnit="minute",this.$element.get(0).setSelectionRange(3,5)},highlightSecond:function(){this.highlightedUnit="second",this.$element.get(0).setSelectionRange(6,8)},highlightMeridian:function(){this.highlightedUnit="meridian",this.showSeconds?this.$element.get(0).setSelectionRange(9,11):this.$element.get(0).setSelectionRange(6,8)},incrementHour:function(){if(this.showMeridian)if(11===this.hour)this.toggleMeridian();else if(12===this.hour)return this.hour=1;return 23===this.hour?this.hour=0:(this.hour=this.hour+1,void 0)},decrementHour:function(){if(this.showMeridian){if(1===this.hour)return this.hour=12;12===this.hour&&this.toggleMeridian()}return 0===this.hour?this.hour=23:(this.hour=this.hour-1,void 0)},incrementMinute:function(){var e=this.minute+this.minuteStep-this.minute%this.minuteStep;e>59?(this.incrementHour(),this.minute=e-60):this.minute=e},decrementMinute:function(){var e=this.minute-this.minuteStep;0>e?(this.decrementHour(),this.minute=e+60):this.minute=e},incrementSecond:function(){var e=this.second+this.secondStep-this.second%this.secondStep;e>59?(this.incrementMinute(),this.second=e-60):this.second=e},decrementSecond:function(){var e=this.second-this.secondStep;0>e?(this.decrementMinute(),this.second=e+60):this.second=e},toggleMeridian:function(){this.meridian="AM"===this.meridian?"PM":"AM",this.update()},getTemplate:function(){if(this.options.templates[this.options.template])return this.options.templates[this.options.template];if(this.showInputs)var e='<input type="text" name="hour" class="bootstrap-timepicker-hour" maxlength="2"/>',t='<input type="text" name="minute" class="bootstrap-timepicker-minute" maxlength="2"/>',i='<input type="text" name="second" class="bootstrap-timepicker-second" maxlength="2"/>',s='<input type="text" name="meridian" class="bootstrap-timepicker-meridian" maxlength="2"/>';else var e='<span class="bootstrap-timepicker-hour"></span>',t='<span class="bootstrap-timepicker-minute"></span>',i='<span class="bootstrap-timepicker-second"></span>',s='<span class="bootstrap-timepicker-meridian"></span>';var n,a='<table class="'+(this.showSeconds?"show-seconds":"")+" "+(this.showMeridian?"show-meridian":"")+'">'+"<tr>"+'<td><a href="#" data-action="incrementHour"><i class="icon-chevron-up"></i></a></td>'+'<td class="separator">&nbsp;</td>'+'<td><a href="#" data-action="incrementMinute"><i class="icon-chevron-up"></i></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><i class="icon-chevron-up"></i></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="icon-chevron-up"></i></a></td>':"")+"</tr>"+"<tr>"+"<td>"+e+"</td> "+'<td class="separator">:</td>'+"<td>"+t+"</td> "+(this.showSeconds?'<td class="separator">:</td><td>'+i+"</td>":"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td>'+s+"</td>":"")+"</tr>"+"<tr>"+'<td><a href="#" data-action="decrementHour"><i class="icon-chevron-down"></i></a></td>'+'<td class="separator"></td>'+'<td><a href="#" data-action="decrementMinute"><i class="icon-chevron-down"></i></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><i class="icon-chevron-down"></i></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><i class="icon-chevron-down"></i></a></td>':"")+"</tr>"+"</table>";switch(this.options.template){case"modal":n='<div class="bootstrap-timepicker modal hide fade in" style="top: 30%; margin-top: 0; width: 200px; margin-left: -100px;" data-backdrop="'+(this.modalBackdrop?"true":"false")+'">'+'<div class="modal-header">'+'<a href="#" class="close" data-dismiss="modal">×</a>'+"<h3>Pick a Time</h3>"+"</div>"+'<div class="modal-content">'+a+"</div>"+'<div class="modal-footer">'+'<a href="#" class="btn btn-primary" data-dismiss="modal">Ok</a>'+"</div>"+"</div>";break;case"dropdown":n='<div class="bootstrap-timepicker dropdown-menu">'+a+"</div>"}return n}},e.fn.timepicker=function(i){return this.each(function(){var s=e(this),n=s.data("timepicker"),a="object"==typeof i&&i;n||s.data("timepicker",n=new t(this,a)),"string"==typeof i&&n[i]()})},e.fn.timepicker.defaults={minuteStep:15,secondStep:15,disableFocus:!1,defaultTime:"current",showSeconds:!1,showInputs:!0,showMeridian:!0,template:"dropdown",modalBackdrop:!1,templates:{}},e.fn.timepicker.Constructor=t}(window.jQuery),$(document).ready(function(){add_fields=function(e,t,i){var s=(new Date).getTime(),n=new RegExp("new_"+t,"g");$(e).append(i.replace(n,s)),$("input.date").datepicker({format:"mm/dd/yyyy"}),$("input.datetime").datepicker({format:"hh:ii:ss"}),$("input.timepicker").timepicker({})},$("body").on("click","a.remove_fields",function(){return $(this).prev("input[type=hidden]").val("1"),$(this).closest("tr").hide(),!1}),$("input.date").datepicker({format:"mm/dd/yyyy"}),$("input.datetime").datepicker({format:"hh:ii:ss"}),$("input.timepicker").timepicker({})});