var Nav = {
	links : [],
	selected : 0,
	sublinks : [],
	subselected : 0
}
Nav.init = function(){
	
	var prevSelectedLink = this.links[this.selected];
	
	var compare = function(a,b)
	{
		//SS.log($(a).attr('id') + '::' + ($(a).attr('data-tabindex')?$(a).attr('data-tabindex'):999) + ' - ' + $(b).attr('id') + '::' + ($(b).attr('data-tabindex')?$(b).attr('data-tabindex'):999))
		return parseInt(($(a).attr('data-tabindex')?$(a).attr('data-tabindex'):999)) - parseInt(($(b).attr('data-tabindex')?$(b).attr('data-tabindex'):999));
	}
	
	if(KeyHandler.hasSubView)
	{
		this.subselected = 0;
		this.sublinks = [];
		this.sublinks.length = 0;
		this.sublinks = new Array();
		
		var div = $('#' + KeyHandler.hasSubView);
		var checkDiv = $('<div>' + div.html() + '</div>'); //Fix for 2010
		var checklinks = $('.link:not(.hidden)',checkDiv); //Fix for 2010
		this.sublinks = [];
		//this.sublinks = $('.link:not(.hidden)',div);
		for(i=0;i<checklinks.length; i++)
		{
			this.sublinks[i] = (document.getElementById( $(checklinks[i]).attr('id') ));
		}		
		this.sublinks.sort(compare);
		$.each(this.sublinks, function(i){
			$(this).attr('data-tabindex',i);
		});
		this.subselected = $('.link.selected:not(.hidden)',div).attr('data-tabindex');
		if(!this.subselected)
		{
			this.subselected = $('.link.lastselected:not(.hidden)',div).attr('data-tabindex');
			if(!this.subselected)
			{
				this.subselected = $('.link.active:not(.hidden)',div).attr('data-tabindex');
				if(!this.subselected)
				{
					this.subselected = 0;
				}
			}
			$(this.sublinks[this.subselected]).removeClass('lastselected').addClass('selected')
			if(SS.device == 'philips')
			{
				SS.setFocus($(this.sublinks[this.subselected]).attr('id'));
				SS.setHover($(this.sublinks[this.subselected]).attr('id'));
			}
		}
		SS.log('sublinks initialized');
	}
	else
	{
		this.subselected = 0;
		this.sublinks = [];
		this.sublinks.length = 0;
		this.sublinks = new Array();
	}
	
	var viewDiv = (KeyHandler.hasView ? KeyHandler.hasView : KeyHandler.hasPage);
	if(viewDiv)
	{
		var div = $('#' + viewDiv);
		var checkDiv = $('<div>' + div.html() + '</div>'); //Fix for 2010
		var checklinks = $('.link:not(.hidden)',checkDiv); //Fix for 2010
		
		this.selected = 0;
		this.links = [];
		this.links.length = 0;
		this.links = new Array();
		
		//this.links = $('.link:not(.hidden)',div);
		//SS.log('LINKS Length::::: ' + checklinks.length)
		for(i=0;i<checklinks.length; i++)
		{
			this.links[i] = (document.getElementById( $(checklinks[i]).attr('id') ));
		}
		//SS.log(div.html() + ' :::: ' + this.links.length)
		this.links.sort(compare);
		$.each(this.links, function(i){
			$(this).attr('data-tabindex',i);
		});

		this.selected = $('.link.selected:not(.hidden)',div).attr('data-tabindex');
		if(!this.selected)
		{
			this.selected = $('.link.lastselected:not(.hidden)',div).attr('data-tabindex');
			if(!this.selected)
			{
				this.selected = $('.link.active:not(.hidden)',div).attr('data-tabindex');
				if(!this.selected)
				{
					this.selected = 0;
				}
			}
			$(this.links[this.selected]).removeClass('lastselected').addClass('selected');
			if(SS.device == 'philips')
			{
				SS.setFocus($(this.links[this.selected]).attr('id'));
				SS.setHover($(this.links[this.selected]).attr('id'));
			}
			//SS.log($(this.links[this.selected]).parent().html());
		}
		//SS.log($(this.links[this.selected]).attr('id') + '>>' + $(this.links[this.selected]).attr('data-tabindex') )
		
		if(KeyHandler.hasView) Scroller.init(KeyHandler.hasView);
	}
	
	if(SS.device == 'philips')
	{
		if(prevSelectedLink != this.links[this.selected])
			Nav.initKeypad();
	}
	
	KeyHandler.initClicks(KeyHandler.hasPage)
	return true;
};
Nav.selectId = function(id,mouse)
{
	var prevSelSub = $(this.sublinks[this.subselected]);
	var prevSel = $(this.links[this.selected]);
	if(KeyHandler.hasSubView)
	{
		for(i=0;i<this.sublinks.length;i++)
		{
			if($(this.sublinks[i]).attr('id') == id)
			{
				this.subselected = i;
				break;
			}
		}
		
		prevSelSub.removeClass('selected');
		if(SS.device == 'philips')
		{
			SS.offFocus(prevSel.attr('id'));
			SS.offHover(prevSel.attr('id'));
		}
		$(this.sublinks[this.subselected]).addClass('selected');
		if(SS.device == 'philips')
		{
			SS.setFocus($(this.sublinks[this.subselected]).attr('id'));
			SS.setHover($(this.sublinks[this.subselected]).attr('id'));
		}
	}
	else
	{
		
		
		for(i=0;i<this.links.length;i++)
		{
			if($(this.links[i]).attr('id') == id)
			{
				this.selected = i;
				break;
			}
		}
		
		prevSel.removeClass('selected');
		if(SS.device == 'philips')
		{
			SS.offFocus(prevSel.attr('id'));
			SS.offHover(prevSel.attr('id'));
		}
		$(this.links[this.selected]).addClass('selected');
		if(SS.device == 'philips')
		{
			SS.setFocus($(this.links[this.selected]).attr('id'));
			SS.setHover($(this.links[this.selected]).attr('id'));
		}
		if(!mouse)
		{
			Scroller.scroll(KeyHandler.hasView);
		}
	}
	
	if(SS.device == 'philips')
	{
		Nav.initKeypad();
	}
}
Nav.iterateLinks = function(direction, loop, colNb)
{
	////SS.log('Nav.iterateLinks');
	var ret = true;
	if(KeyHandler.hasSubView)
	{
		////SS.log('Nav.iterateLinks SubView');
		var prevSel = $(this.sublinks[this.subselected])
		
		switch(direction)
		{
			case 'prev':
				if(this.subselected > 0) { this.subselected--; } else if(loop) { this.subselected = this.sublinks.length-1; } else ret = false;
				break;
			case 'next':
				if(this.subselected < this.sublinks.length-1) { this.subselected++; } else if(loop) { this.subselected = 0; } else ret = false;
				break;
			default:
				break;
		}
		if(ret)
		{
			prevSel.removeClass('selected');
			if(SS.device == 'philips')
			{
				SS.offFocus(prevSel.attr('id'));
				SS.offHover(prevSel.attr('id'));
			}
			$(this.sublinks[this.subselected]).addClass('selected');
			if(SS.device == 'philips')
			{
				SS.setFocus($(this.sublinks[this.subselected]).attr('id'));
				SS.setHover($(this.sublinks[this.subselected]).attr('id'));
			}
		}
	}
	else
	{
		////SS.log('Nav.iterateLinks View');
		var prevSel = $(this.links[this.selected]);
		
		switch(direction)
		{
			case 'prev':
				if(this.selected > 0) { this.selected--; } else if(loop) { this.selected = this.links.length-1; } else ret = false;
				break;
			case 'next':
				if(this.selected < this.links.length-1) { this.selected++; } else if(loop) { this.selected = 0; } else ret = false;
				break;
			case 'up':
				var newSel = parseInt(this.selected) - parseInt(colNb);
				
				if(newSel >= 0) { 
					this.selected = newSel;//-= colNb; 
				} 
				else
				{ 
					ret = false;
				}
				break;
			case 'down':
				var newSel = parseInt(this.selected) + parseInt(colNb);
				
				if( newSel <= (this.links.length-1)) { 
					this.selected = newSel;// += parseInt(colNb); 
					ret = true;
				} 
				else
				{ 
					SS.log('here?????')
					ret = false;
				}
				break;
			default:
				break;
		}
		if(this.selected > this.links.length-1)
		{
			this.selected = this.links.length-1;
		}
		if(ret) {
			if($(this.links[this.selected]).attr('id') !== undefined)
			{
				if(SS.device == 'philips')
				{
					SS.offFocus(prevSel.attr('id'));
					SS.offHover(prevSel.attr('id'));
				}
				prevSel.removeClass('selected');				
				$(this.links[this.selected]).addClass('selected');
				if(SS.device == 'philips')
				{
					SS.setFocus($(this.links[this.selected]).attr('id'));
					SS.setHover($(this.links[this.selected]).attr('id'));
				}
				var cl = $('body').attr('class');
				Scroller.scroll(KeyHandler.hasView);
				
				if(SS.device == 'philips')
				{
					Nav.initKeypad();
				}
			}
		}
	}
	return ret;
}
Nav.initKeypad = function()
{
	if($(this.links[this.selected]).attr('data-rel') == 'Keypad')
				{
					SS.log(' ############# Got Keypad')
					if($(this.links[this.selected]).data('opened') != true)
						{
							Utils.Keypad(true,
								function(){
									//Setup Autocomplete
									Autocomplete.init($(Nav.links[Nav.selected]));
								},
								function(){
									//On Change
									Autocomplete.change($(Nav.links[Nav.selected]));
								});
						}
				}
}
Nav.generic = function(key){
	switch(key)
	{
		case 13:
			////SS.log('LINK::' + $(this.links[this.selected]).attr('data-rel'));
			switch($(this.links[this.selected]).attr('data-rel'))
			{
				case 'Keypad':
					if(SS.device != 'philips')
					{
						if($(this.links[this.selected]).data('opened') != true)
						{
							Utils.Keypad(true,
								function(){
									//Setup Autocomplete
									Autocomplete.init($(Nav.links[Nav.selected]));
								},
								function(){
									//On Change
									Autocomplete.change($(Nav.links[Nav.selected]));
								});
						}
					}
					break;
				case 'Datepad':

					if($(this.links[this.selected]).attr('opened') != true)
					{
						var minDate = new Date();
						if($(this.links[this.selected]).attr('id')=='retDate')
						{
							minDate = Utils.interval15min($('#outDate').data('date'));
						}
						//SS.log('MINDATE::::' + minDate)
						Utils.DatePad(true,null,function(date){
							
							//SS.log(date + '::::' + $(Nav.links[Nav.selected]).data('date'));				
							$(Nav.links[Nav.selected]).parents('td:first').find('.dt').html(date.substring(0,11).trim());
							$(Nav.links[Nav.selected]).parents('td:first').find('.tm').html(date.substring(11).trim());
							
							if($(Nav.links[Nav.selected]).attr('id')=='outDate'
							&& $('#retDate').data('date').getTime() < $('#outDate').data('date').getTime())
							{
								$('#retDate').data('date',$('#outDate').data('date').DateAdd('h',2));
								$('#retDate').parents('td:first').find('.dt').html($('#retDate').data('date').format("dd mmm yyyy"));
								$('#retDate').parents('td:first').find('.tm').html($('#retDate').data('date').format("HH:MM"));
							}
							//SS.log('callback')
						},minDate);
					}
					break;
				case 'Checkbox':
					if($(this.links[this.selected]).hasClass('checked'))
					{
						$(this.links[this.selected]).removeClass('checked');
					}
					else
					{
						$(this.links[this.selected]).addClass('checked')
					}
					break;
				default:
					break;
			}
			break;
		default:
			break;
	}
}
Nav.all = function(key){
	switch(key)
	{
		case 461:
			if(KeyHandler.hasSubView != 'datepad' && KeyHandler.hasSubView != 'keypad' && KeyHandler.hasSubView != 'autoComplete')
			{
				KeyHandler.viewBack(true);
			}			
			break;
		default:
			break;
	}
}

