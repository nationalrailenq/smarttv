var Datepicker = function(field, options)
{
	var m_this = this;
	
	this.top = 170;
	this.left = 235;
	this.date = new Date();
	this.tempDate = new Date();
	this.minDate = null;
	this.maxDate = null;
	this.format = 'dd mmm yyyy';
	this.onClose = function(){};
	this.onReady = function(){};
	this.field = null;
	this.bodyKeyHandler = null;
	this.links = ['dp-year','dp-month','dp-day','dp-hour','dp-minute'];
	this.selected = 0;
	this.visible = false;
	this.minInterval = 15;

	this.init = function(field, options)
	{
		m_this.top = (options.top ? options.top : m_this.top);
		m_this.left = (options.left ? options.left : m_this.left);
		m_this.date = new Date((options.date ? options.date : new Date()).getTime());		
		m_this.tempDate = new Date(m_this.date.getTime());
		m_this.minDate = (options.minDate ? options.minDate : m_this.minDate);
		m_this.maxDate = (options.maxDate ? options.maxDate : m_this.maxDate);
		m_this.format = (options.format ? options.format : m_this.format);
		m_this.onClose = (options.onClose ? options.onClose : m_this.onClose);
		m_this.onReady = (options.onReady ? options.onReady : m_this.onReady);
		m_this.bodyKeyHandler = document.getElementsByTagName('body')[0].onkeydown;
		
		m_this.field = document.getElementById('datePicker_' + field);
		if(!m_this.field) {
			m_this.field = document.createElement("div");
			m_this.field.id = 'datePicker_' + field;
			m_this.field.style.display = 'none';
			m_this.field.style.top = m_this.top;
			m_this.field.style.left = m_this.left;
			m_this.field.setAttribute("class", 'dp-datepicker'); //For Most Browsers
			m_this.field.setAttribute("className", 'dp-datepicker'); //For IE; harmless to other browsers.	
			document.getElementsByTagName('body')[0].appendChild(m_this.field);
		}
		m_this.field.style.display = 'none';
		m_this.selected = 2;
		m_this.m_draw();
		m_this.m_drawnumbers();
		m_this.m_select(m_this.selected);
	}
	this.m_select = function(index)
	{
		for(i=0; i<m_this.links.length; i++)
		{
			var f = document.getElementById(m_this.links[i]);
			if(i==index)
			{
				f.setAttribute("class", 'dp-field selected');
				f.setAttribute("className", 'dp-field selected');
			}
			else
			{
				f.setAttribute("class", 'dp-field');
				f.setAttribute("className", 'dp-field');
			}
		}
	}
	this.m_drawnumbers = function()
	{
		for(i=0; i<m_this.links.length; i++)
		{
			var f = document.getElementById(m_this.links[i]);
			switch(m_this.links[i])
			{
				case 'dp-year':
					SS.putInnerHTML(f, m_this.tempDate.format('yyyy'));
					break;
				case 'dp-month':
					SS.putInnerHTML(f, m_this.tempDate.format('mm'));
					break;
				case 'dp-day':
					SS.putInnerHTML(f, m_this.tempDate.format('dd'));
					break;
				case 'dp-hour':
					SS.putInnerHTML(f, m_this.tempDate.format('HH'));
					break;
				case 'dp-minute':
					SS.putInnerHTML(f, m_this.tempDate.format('MM'));
					break;
			}
		}
	}
	this.m_draw = function()
	{
		var html = '<a id="dp-a" href="javascript:void(0);" onkeydown=""></a><div class="dp-header">Choose date & time</div>' +
		'<div class="dp-titles">' +
			'<div class="dp-title">Year</div>' +
			'<div class="dp-title">Month</div>' +
			'<div class="dp-title">Day</div>' +
			'<div class="dp-title">Hour</div>' +
			'<div class="dp-title">Minute</div>' +
		'</div>' +
		'<div class="dp-arrows dp-up">' +
			'<div id="dp-year-up" class="dp-arrow"></div>' +
			'<div id="dp-month-up" class="dp-arrow"></div>' +
			'<div id="dp-day-up" class="dp-arrow"></div>' +
			'<div id="dp-hour-up" class="dp-arrow"></div>' +
			'<div id="dp-minute-up" class="dp-arrow"></div>' +
		'</div>' +
		'<div class="dp-fields">' +
			'<div id="dp-year" class="dp-field selected">' + m_this.tempDate.format('yyyy') + '</div>' +
			'<div id="dp-month" class="dp-field">' + m_this.tempDate.format('dd') + '</div>' +
			'<div id="dp-day" class="dp-field">' + m_this.tempDate.format('mm') + '</div>' +
			'<div id="dp-hour" class="dp-field">' + m_this.tempDate.format('HH') + '</div>' +
			'<div id="dp-minute" class="dp-field">' + m_this.tempDate.format('MM') + '</div>' +
		'</div>' +
		'<div class="dp-arrows dp-down">' +
			'<div id="dp-year-down" class="dp-arrow"></div>' +
			'<div id="dp-month-down" class="dp-arrow"></div>' +
			'<div id="dp-day-down" class="dp-arrow"></div>' +
			'<div id="dp-hour-down" class="dp-arrow"></div>' +
			'<div id="dp-minute-down" class="dp-arrow"></div>' +
		'</div>' +
		'<div class="dp-footer">' +
			'<DIV class="dp-btn-left"></DIV>' +
			'<DIV class="dp-btn-right"></DIV>' +
			'<DIV class="dp-btn-up"></DIV>' +
			'<DIV class="dp-btn-down"></DIV>' +
			'<DIV class="dp-btn-back"><h3>Cancel</h3></DIV>' +
			'<DIV class="dp-btn-enter"><h3>Select</h3></DIV>' +
		'</div>';
		
		SS.putInnerHTML(m_this.field, html);
		
		$(m_this.field).find('.dp-footer').find('DIV').each(function(){
			$(this).unbind('click').bind('click',function()
			{	
				if($(this).hasClass('dp-btn-left'))
				{
					m_this.keydown(null,KeyHandler.tvKey.KEY_LEFT);
				}
				else if($(this).hasClass('dp-btn-right'))
				{
					m_this.keydown(null,KeyHandler.tvKey.KEY_RIGHT);
				}
				else if($(this).hasClass('dp-btn-up'))
				{
					m_this.keydown(null,KeyHandler.tvKey.KEY_UP);
				}
				else if($(this).hasClass('dp-btn-down'))
				{
					m_this.keydown(null,KeyHandler.tvKey.KEY_DOWN);
				}
				else if($(this).hasClass('dp-btn-back'))
				{
					m_this.keydown(null,KeyHandler.tvKey.KEY_RETURN);
				}
				else if($(this).hasClass('dp-btn-enter'))
				{
					m_this.keydown(null,KeyHandler.tvKey.KEY_ENTER);
				}
			});
		});
		
		$(m_this.field).find('.dp-fields').find('DIV.dp-field').each(function(i){
			$(this).unbind('mouseover').bind('mouseover',function()
			{	
				m_this.selected = i;
				m_this.m_select(m_this.selected);
			});
		});
		
		$(m_this.field).find('.dp-arrows.dp-up').find('DIV.dp-arrow').each(function(i){
			$(this).unbind('mouseover').bind('mouseover',function()
			{	
				m_this.selected = i;
				m_this.m_select(m_this.selected);
			});
			$(this).unbind('click').bind('click',function()
			{	
				m_this.selected = i;
				m_this.m_select(m_this.selected);
				m_this.keydown(null,KeyHandler.tvKey.KEY_UP);
			});
		});
		
		$(m_this.field).find('.dp-arrows.dp-down').find('DIV.dp-arrow').each(function(i){
			$(this).unbind('mouseover').bind('mouseover',function()
			{	
				m_this.selected = i;
				m_this.m_select(m_this.selected);
			});
			$(this).unbind('click').bind('click',function()
			{	
				m_this.selected = i;
				m_this.m_select(m_this.selected);
				m_this.keydown(null,KeyHandler.tvKey.KEY_DOWN);
			});
		});
	}
	this.show = function(date,minDate)
	{
		if(m_this.visible) return;
		
		m_this.date = new Date(date.getTime());
		if(minDate) m_this.minDate = minDate;
		m_this.tempDate = new Date(m_this.date.getTime());
		document.getElementsByTagName('body')[0].appendChild(m_this.field);
		document.getElementById('dp-a').onkeydown = function(e,kc) { m_this.keydown(e,kc); }
		m_this.field.style.display = 'block';
		document.getElementById('dp-a').focus();
		m_this.visible = true;
		
		m_this.selected = 2;
		m_this.m_drawnumbers();
		m_this.m_select(m_this.selected);
		
		m_this.onReady();
	}
	this.hide = function(key)
	{
		if(!m_this.visible) return;

		document.getElementById('dp-a').blur();
		document.getElementById('dp-a').onkeydown = null;
		m_this.field.style.display = 'none';
		document.getElementsByTagName('body')[0].removeChild(m_this.field);
		m_this.visible = false;
		
		/*
		if(event)
		{
			alert('Buble')
			//bubling don't occure cos we removed element from DOM
			document.getElementsByTagName('body')[0].dispatchEvent(event);
		}
		
		if(key)
		{
			alert('here');
			KeyHandler.processKey(key);
		}*/

		
		
	}
	this.keydown = function(e,kc)
	{
		if(!m_this.visible) return;
		if(e) e.stopPropagation();
		var keycode = (e ? e.keyCode : kc);
		switch(keycode)
		{
			case KeyHandler.tvKey.KEY_LEFT:
				//alert('left');
				m_this.selected--;
				m_this.selected = m_this.selected < 0 ? m_this.links.length-1 : m_this.selected;
				m_this.m_select(m_this.selected);
				break;
			case KeyHandler.tvKey.KEY_RIGHT:
				//alert('right');
				m_this.selected++;
				m_this.selected = m_this.selected > m_this.links.length-1 ? 0 : m_this.selected;
				m_this.m_select(m_this.selected);
				break;
			case KeyHandler.tvKey.KEY_UP:
				//alert('up');
				switch(m_this.links[m_this.selected])
				{
					case 'dp-year':
						m_this.DateAddSub('y',1);
						break;
					case 'dp-month':
						m_this.DateAddSub('m',1);
						break;
					case 'dp-day':
						m_this.DateAddSub('d',1);
						break;
					case 'dp-hour':
						m_this.DateAddSub('h',1);
						break;
					case 'dp-minute':
						m_this.DateAddSub('mi',m_this.minInterval);
						break;
				}
				m_this.m_drawnumbers();
				break;
			case KeyHandler.tvKey.KEY_DOWN:
				//alert('down');
				switch(m_this.links[m_this.selected])
				{
					case 'dp-year':
						m_this.DateAddSub('y',-1);
						break;
					case 'dp-month':
						m_this.DateAddSub('m',-1);
						break;
					case 'dp-day':
						m_this.DateAddSub('d',-1);
						break;
					case 'dp-hour':
						m_this.DateAddSub('h',-1);
						break;
					case 'dp-minute':
						m_this.DateAddSub('mi',(-1)*m_this.minInterval);
						break;
				}
				m_this.m_drawnumbers();
				break;
			case KeyHandler.tvKey.KEY_ENTER:
				//alert('enter');
				m_this.hide();
				m_this.date = new Date(m_this.tempDate.getTime());
				m_this.onClose(m_this.date.format(m_this.format));
				
				break;
			case KeyHandler.tvKey.KEY_RETURN:
				//alert('return');
				m_this.hide();
				m_this.tempDate = new Date(m_this.date.getTime());
				m_this.onClose(m_this.date.format(m_this.format));
				
				break;
			default:
				break;
		}
	}
	this.DateAddSub = function(timeU,byMany) 
	{
		switch(timeU) {
			case "ms": m_this.tempDate.setMilliseconds(m_this.tempDate.getMilliseconds() + byMany); break;
			case "s": m_this.tempDate.setSeconds(m_this.tempDate.getSeconds() + byMany); break;
			case "mi": m_this.tempDate.setMinutes(m_this.tempDate.getMinutes() + byMany); break;
			case "h": m_this.tempDate.setHours(m_this.tempDate.getHours() + byMany); break;
			case "d": m_this.tempDate.setDate(m_this.tempDate.getDate() + byMany); break;
			case "m": m_this.tempDate.setMonth(m_this.tempDate.getMonth() + byMany); break;
			case "y": m_this.tempDate.setFullYear(m_this.tempDate.getFullYear() + byMany); break;
		}
		
		if(m_this.minDate)
		{
			m_this.tempDate = m_this.tempDate < m_this.minDate ? new Date(m_this.minDate.getTime()) : m_this.tempDate;
		}
		if(m_this.maxDate)
		{
			m_this.tempDate = m_this.tempDate > m_this.maxDate ? new Date(m_this.maxDate.getTime()) : m_this.tempDate;
		}
	}
	
	
	
	
	//Initialize if field given
	if(field) this.init(field, options);
}
