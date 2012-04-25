var Utils = {
	Keypads : [],
	Datepads : [],
	dayNames : new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat"),
	monthNames : [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
}
var charTimer = null;
var onCharacter = function(){
	//alert('onChar????')
	clearTimeout(charTimer);
	charTimer = setTimeout(function(){ $(Nav.links[Nav.selected]).trigger('change'); },100);
}
Utils.Keypad = function(show,ready,change)
{
	var field = $(Nav.links[Nav.selected]);
	var fieldId = field.attr('id');
	var fieldInput = field.children('input:first');
	
	if(show)
	{
		alert('keypad show')
		field.addClass('clear');
		fieldInput.val('');
		field.attr('data-code','');
		//already open
		if(field.data('opened')) return;
		
		fieldInput.removeAttr('disabled');
		//Show
		//if(!this.Keypads[fieldId]) {
			fieldInput.attr('id',fieldId+'_input');
			//Add hidden field if don't have one (for focus redirect)
			//if($('#hiddenInput').length < 1) $('body').append('<input id="hiddenInput" style="border:none; width:1px; height:1px; position:absolute; bottom:0px; left:-1px; z-index:0;"/>');

			this.Keypads[fieldId] = $(fieldId)
			IME.newIME(fieldId+'_input',{xPosition:(640*(SS.device == 'samsung' ? 1 : 1.33)),yPosition:(70*(SS.device == 'samsung' ? 1 : 1.33)),clear:true,onReady:ready,lang:'en'});//new IMEShell(fieldId+'_input', ready, 'en');
//			this.Keypads[fieldId].IME.readyGo
			//this.Keypads[fieldId] = new IMEShell(fieldId+'_input', ready, 'en');
			//this.Keypads[fieldId].setKeypadPos(600,70);
		//}
		field.data({'opened':true}).addClass('clear');
		
		KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,'keypad');
		
		$(fieldInput,field).unbind('change, keyup').bind('change, keyup',function(){
			alert('field change');
			if(change) change();
		});
		
		/*if(SS.device == 'philips')
		{
			$('#'+fieldId+'_input').unbind('keyup').bind('keyup',function(){
				//alert('onchange');
				//$(Nav.links[Nav.selected]).trigger('change');
			});
		}*/
		
		
		fieldInput.focus();
	}
	else
	{
		//alert('keypad hide')
		//Close
		if(!field.data('opened')) return;
		field.data('opened',false);
		fieldInput.attr('disabled','disabled');
		$('#hiddenInput').focus();
		
		this.Keypads[fieldId] = false;
		//alert('Field VAL>> '+fieldInput.val());
		if(fieldInput.val() == '')
		{
			field.removeClass('clear');
			field.attr('data-code','');
		}
		$(fieldInput,field).unbind('change, keyup');
		fieldInput.blur();
		if(SS.device == 'philips')
		{
			IME.onEnter();
		}
		else
		{
			IME.exitIME();
		}
		Autocomplete.hide($(Nav.links[Nav.selected]),true);
		//KeyHandler.viewBack();
		KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,null)
	}
}
Utils.interval15min = function(date)
{
	if(!date) date = new Date();
	if(date.getMinutes() != 0)
	{
		if(date.getMinutes() <= 15) date.setMinutes(15,0,0);
		else if(date.getMinutes() <= 30) date.setMinutes(30,0,0);
		else if(date.getMinutes() <= 45) date.setMinutes(45,0,0);
		else if(date.getMinutes() <= 59) date.setHours(date.getHours()+1,0,0,0);
	}
	return date;
}
Utils.DatePad = function(show,date,onclose,minDate)
{
	var field = $(Nav.links[Nav.selected]);
	var fieldId = field.attr('id');
	
	if(show)
	{
		if(!date) 
		{
			date = Utils.interval15min(field.data('date'));
			//alert('field' + field.data('date'))
		}
		if(!date) 
		{
			date = Utils.interval15min(new Date());
			//alert('NEW DATE')
		}

		//already open
		//alert('IsOpen??' + this.Datepads[fieldId].visible)
		//if(field.data('opened')) return;
		
		
		
		//Show
		if(!this.Datepads[fieldId]) {
			//Add hidden field if don't have one (for focus redirect)
			if($('#hiddenInput').length < 1) $('body').append('<input id="hiddenInput" style="border:none; width:1px; height:1px; position:absolute; bottom:0px; left:-1px; z-index:0;"/>');
			
			//;
			//$('body').append(this.Datepads[fieldId]);
			//alert('minD::'+(minDate ? minDate : new Date()))
			this.Datepads[fieldId] = new Datepicker(
				fieldId,
				{
					date : date, 
					minDate : Utils.interval15min( (minDate ? minDate : new Date())),
					maxDate : Utils.interval15min((new Date()).DateAdd('d',82)),
					format : 'dd mmm yyyy HH:MM', 
					top : 220,
					left : 285,
					onClose : function (date)
					{
						field.data('date',Utils.Datepads[fieldId].date);						
						if(onclose) onclose(date);
						$('#hiddenInput').focus();
						KeyHandler.viewBack();
					} 
				}
			);
		}
		else if(this.Datepads[fieldId].visible)
		{
			return false;
		}
		
		//field.data({'opened':true,date:date});
		field.data({date:date});
		
		KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView, 'datepad');	
		
		field.focus();
		//this.Datepads[fieldId].date = date;//data('date',date)
		this.Datepads[fieldId].show(Utils.interval15min(Nav.fixDate(date)), (minDate ? Utils.interval15min( Nav.fixDate(minDate) ) : new Date()));
		//this.Datepads[fieldId].sfDatepicker('show').css({'z-index':99,'position':'absolute','top':'60px','left':'170px'});
		
	}
	else
	{		
		//alert('OnClose IsOpen??' + field.data('opened'))
		//alert(this.Datepads[fieldId].data('date'));
		//Close
		//if(!field.data('opened')) return;
		//field.data('opened',false);
		if(this.Datepads[fieldId].visible)
		{
			//alert('OnClose IsOpen??' + field.data('opened'))
			//this.Datepads[fieldId].hide();
	//		this.Datepads[fieldId].sfDatepicker('hide');
			$('#hiddenInput').focus();
			
			KeyHandler.viewBack();
		}
	}
}
Utils.format = function(str){
	for(i = 1; i < arguments.length; i++){
		str = str.replace('{' + (i) + '}', arguments[i]);
	}
	return str;
}
Utils.GetUTCTimestamp = function(date)
{
	if(date==null || !date) date = Utils.interval15min(Nav.fixDate(new Date()));
	return date.getUTCFullYear() + '-' + 
	((date.getUTCMonth()+1) < 10 ? '0' + (date.getUTCMonth()+1) : (date.getUTCMonth()+1)) + '-' + 
	(date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate()) + 'T' +
	(date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()) + ':' +
	(date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()) + ':' +
	'00.000000+00:00';
	
//	2012-01-13T10:10:27.6092804+00:00
}
Utils.GetTimeDiff = function(date1, date2) {
	if (date2 == "On time")
		return date2;

	dt1 = Utils.stringToDate('2008-09-19 ' + date1 + ':00');
	dt2 = Utils.stringToDate('2008-09-19 ' + date2 + ':00');

	var diff;

	if (dt1 > dt2) {
		diff = new Date(dt1 - dt2);
	} else {
		diff = new Date(dt2 - dt1);
	}

	return diff;
}	

Utils.GetTimeLate = function(date1, date2) {
	if (date2 == "On time")
		return false;
	else if (date2 == "Cancelled")
		return true;
	else if (date2 == "Delayed")
		return true;
		
	//alert('date1:' + date1 + ' >> date2:'+date2)
	dt1 = Utils.stringToDate('2008-09-19 ' + date1 + ':00');
	dt2 = Utils.stringToDate('2008-09-19 ' + date2 + ':00');

	if (dt1 > dt2) {
		return false
	} else {
		return true;
	}
}	

Utils.stringToDate = function(string) {
		var matches;
		if (matches = string.match(/^(\d{4,4})-(\d{2,2})-(\d{2,2}) (\d{2,2}):(\d{2,2}):(\d{2,2})/)) {
			return new Date(matches[1], matches[2] - 1, matches[3], matches[4], matches[5], matches[6]);
		} else {
			return null;
		};
}
Utils.stringToDateJS = function(string) {
		var matches;
		if (matches = string.match(/^(\d{4,4})-(\d{2,2})-(\d{2,2})T(\d{2,2}):(\d{2,2}):(\d{2,2})/)) {
			return new Date(matches[1], matches[2] - 1, matches[3], matches[4], matches[5], matches[6]);
		} else {
			return null;
		};
}
Utils.stringToDateNRE = function(string) {
		var matches;
		if (matches = string.match(/^(\d{4,4})-(\d{2,2})-(\d{2,2})T(\d{2,2}):(\d{2,2}):(\d{2,2}).(\d{3,3})/)) {
			return new Date(matches[1], matches[2] - 1, matches[3], matches[4], matches[5], matches[6]);
		} else {
			return null;
		};
}
Utils.getTimeState = function(date1, date2, late)
{
	if (date2 == "On time")
		return '<h2 class="red">' + date2 + '</h2>';
	else if (date2 == "Cancelled")
		return '<h2 class="red">' + date2 + '</h2>';
	else if (date2 == "Delayed")
		return '<h2 class="red">' + date2 + '</h2>';
	else{
		var diff = Utils.GetTimeDiff(date1, date2);
		//06:58 <br><span>5 minutes late</span>
		if(late==true)
			return 	'<h2>' + date2 + '</h2><h4' + (diff.getMinutes() >= 5 ? ' class="red"':'') + '>' + diff.getMinutes() + ' minutes late</h4>';
		else
			return 	'<h2>' + date2 + '</h2><h4>' + diff.getMinutes() + ' minutes early</h4>';
	}
}
Utils.getTimeDifference = function(date1, date2)
{
	var d = date2.getTime() - date1.getTime();
 
    var hours = Math.floor(d / 1000 / 60 / 60);
    d -= hours*1000*60*60;
	
	var mins = Math.floor(d / 1000 / 60);
    d -= mins*1000*60;
	
	//var mins = d/1000/60;
	//var hours = Math.floor(mins/60);
	//var mins = mins - hours * 60;
	
	var s = "000000000" + Math.abs(mins);
    mins =  s.substr(s.length-2);
	
	return 	Math.abs(hours)+'h ' +mins+'m';
}
Utils.dateWithin = function(beginDate, endDate, checkDate) {
	var b, e, c;
	b = Date.parse(beginDate);
	e = Date.parse(endDate);
	c = Date.parse(checkDate);
	if ((c <= e && c >= b)) {
		return true;
	}
	return false;
}
Utils.querystring = function(key) {
	var re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
	var r = [], m;
	while ((m = re.exec(document.location.search)) != null) r.push(m[1]);
	return r;
}

String.prototype.removeBreaks = function() {
	return this.replace(/(\r\n|\n|\r)/gm,"");
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}

Date.prototype.DateAdd = function(timeU,byMany) {
	var millisecond=1;
	var second=millisecond*1000;
	var minute=second*60;
	var hour=minute*60;
	var day=hour*24;
	var year=day*365;

	var newDate;
	var dVal=this.getTime();
	switch(timeU) {
		case "ms": newDate=new Date(dVal+millisecond*byMany); break;
		case "s": newDate=new Date(dVal+second*byMany); break;
		case "mi": newDate=new Date(dVal+minute*byMany); break;
		case "h": newDate=new Date(dVal+hour*byMany); break;
		case "d": newDate=new Date(dVal+day*byMany); break;
		case "y": newDate=new Date(dVal+year*byMany); break;
	}
	
	return newDate;
}
Date.prototype.DateSubstract = function(timeU,byMany) {
	var millisecond=1;
	var second=millisecond*1000;
	var minute=second*60;
	var hour=minute*60;
	var day=hour*24;
	var year=day*365;

	var newDate;
	var dVal=this.getTime();
	switch(timeU) {
		case "ms": newDate=new Date(dVal-millisecond*byMany); break;
		case "s": newDate=new Date(dVal-second*byMany); break;
		case "mi": newDate=new Date(dVal-minute*byMany); break;
		case "h": newDate=new Date(dVal-hour*byMany); break;
		case "d": newDate=new Date(dVal-day*byMany); break;
		case "y": newDate=new Date(dVal-year*byMany); break;
	}
	return newDate;
}