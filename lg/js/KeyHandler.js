var KeyHandler = {
	blocked		:	true,
	tvKey		:	null,
	hasPage		:	'splash',
	prevPage 	: 	[],
	hasView		:	null,
	prevView 	: 	[],
	hasSubView		:	null,
	prevSubView 	: 	[],
	mouseKeypadTimer: null
}
KeyHandler.init = function() {
	
	/*For testing on Opera Browser*/
	KeyHandler.initKeys();

	/*$(body).unbind('mousemove').bind('mousemove',function(event){
		ev = event || window.event; 
		SS.log('Mouse Move :Mouse X:'+ev.pageX + ' Mouse Y:'+ev.pageY);
	});
	*/
};
KeyHandler.initClicks = function(page)
{	
	$('.footer').find('div').each(function(){
		//alert($(this).html());
		$(this).unbind('click').bind('click',function()
		{
			if(!KeyHandler.blocked && !Alert.visible && !KeyHandler.hasSubView) 
			{
				SS.log('click');
				if($(this).hasClass('btn-A'))
				{
					KeyHandler.processKey(403);
				}
				else if($(this).hasClass('btn-B'))
				{
					KeyHandler.processKey(404);
				}
				else if($(this).hasClass('btn-C'))
				{
					KeyHandler.processKey(405);
				}
				else if($(this).hasClass('btn-D'))
				{
					KeyHandler.processKey(406);
				}
			}
			if($(this).hasClass('btn-exit'))
			{
				SS.quit();
			}
			else if($(this).hasClass('btn-back'))
			{
				KeyHandler.processKey(461);
			}
		});
	});
	
	$('.alerBox-footer .alerBox-btn-enter').unbind('click').bind('click',function(){
		KeyHandler.processKey(13);
	});
	
	$('#'+page).find('.view, .subview').each(function(i){
		KeyHandler.initClicksHover(this);
	});
	//$('.link').unbind('mouseover').bind('mouseover',function(){return false;});
	KeyHandler.initClicksHover($('#header'));
	
	KeyHandler.backHover($('#footer'));
	
	$('input').each(function(index, element) {
        $(this).unbind('click').bind('click',function(){
			KeyHandler.processClick($(this).parent('div'));
			//return false;
			SS.log('click>>' + $(this).attr('id'));
		}).unbind('focus').bind('focus',function(){
			SS.log('focus>>' + $(this).attr('id'));
			//$(this).blur();
			//return false;
		});
    });
};
KeyHandler.initClicksHover = function(_this)
{	
	//if(SS.device == 'philips') return false;
		if($(_this).hasClass('subview'))
		{
			//SS.log('subview');
			var m_subview = $(_this).attr('id');
		}
		else
		{
			var m_view = $(_this).attr('id');
		}
		$(_this).find('.link').each(function(i)
		{
			if(m_subview) 
			{
				$(this).attr('subview',m_subview);
			}
			else
			{
				$(this).attr('view',m_view);
			}
			//SS.log($(this).attr('id'));
			if($(this).is(':visible'))
			{
				
				$(this).unbind('mouseover').bind('mouseover',function(e)
				{
					if(SS.device == 'philips')
					{
						if(KeyHandler.blocked == true)
						{
							e.stopPropagation();
							e.preventDefault();
							return false;
						}
					}
					console.log('Mouse Over, blocked? ' + KeyHandler.blocked);
					if(!KeyHandler.blocked && !Alert.visible) 
					{
						//SS.log($(this).attr('subview') + ' !=' + KeyHandler.hasSubView)
						if($(this).attr('view') != KeyHandler.hasView && (!KeyHandler.hasSubView || (SS.device == 'philips' && KeyHandler.hasSubView == 'keypad' && $(this).attr('subview') != 'autoComplete') ) )
						{
							if(KeyHandler.hasSubView == 'keypad')
							{
								console.log('####### Hide on over #########');
								Autocomplete.hide($(Nav.links[Nav.selected]));
                                                                
								Utils.Keypad(false);
								$('#autoComplete').hide();
							}
							console.log('########## 1')
							KeyHandler.changeView(KeyHandler.hasPage,$(this).attr('view'));
						}
						else if($(this).attr('subview') && $(this).attr('subview') != KeyHandler.hasSubView)
						{
							console.log('change to subview');
							SS.log('########## 2')
							KeyHandler.changeView(KeyHandler.hasPage,KeyHandler.hasView,$(this).attr('subview'));
						}
						if($(this).attr('id') != $(Nav.links[Nav.selected]).attr('id') && KeyHandler.hasSubView == 'keypad' && $(this).attr('subview') != 'autoComplete')
						{
							if(SS.device == 'philips')
							{
								SS.log('####### Hide on over #########');
								Autocomplete.hide($(Nav.links[Nav.selected]));
								Utils.Keypad(false);
								$('#autoComplete').hide();
							}
						}
						if(!KeyHandler.hasSubView || $(this).attr('subview') == KeyHandler.hasSubView)
						{
							KeyHandler.processClick(this,true);
						}
					}
				});
				
				$(this).unbind('click').bind('click',function()
				{
					SS.log('Mousedown');
					if(!KeyHandler.blocked && !Alert.visible) 
					{
						if($(this).attr('view') != KeyHandler.hasView && !KeyHandler.hasSubView)
						{
							KeyHandler.changeView(KeyHandler.hasPage,$(this).attr('view'));
						}
						else if($(this).attr('subview') && $(this).attr('subview') != KeyHandler.hasSubView)
						{
							KeyHandler.changeView(KeyHandler.hasPage,KeyHandler.hasView,$(this).attr('subview'));
						}
						
						if(!KeyHandler.hasSubView || $(this).attr('subview') == KeyHandler.hasSubView)
						{
							KeyHandler.processClick(this,false);
						}

					}
				});				
			}
		});
}
KeyHandler.mouseKeypadCheck = function() {
	console.log('check time');
	if( $('#VirtualKeyboard').css('display') == 'none' || $('#VirtualKeyboard').css('visibility') == 'hidden'){
		//keyboard is gone this cycle
		KeyHandler.processKey(461);
		//SS.activeInput = false;
	} else {
		//keyboard still up
		KeyHandler.mouseKeypadTimer = window.setTimeout("KeyHandler.mouseKeypadCheck();", 500);
	}
	
};
KeyHandler.backHover = function(_this)
{
    $(_this).find('.link').each(function(i)
		{
			//SS.log($(this).attr('id'));
			if($(this).is(':visible'))
			{
				$(this).unbind('mouseover').bind('mouseover',function()
				{
                                    $(this).css('color','#FFCC00')
				});
                                $(this).unbind('mouseout').bind('mouseout',function()
				{
                                    $(this).css('color','#EEEEEE')
				});
			}
		});
}
KeyHandler.processClick = function(target,dontClick)
{

	
	
	var m_page = this.hasPage;
	var m_view = this.hasView;
	var m_subview = this.hasSubView;
	
	SS.log((dontClick ? 'HOVER' : 'CLICK') + '==' + $(target).attr('id') + ' ' + m_page + '>>' + m_view + '>>' + m_subview);
	
	
	if(!KeyHandler.blocked && !Alert.visible) 
	{
		SS.log('HERE' + dontClick)
		//hover click preselect link
		Nav.selectId($(target).attr('id'),true);
		if(!dontClick) 
		{
			KeyHandler.processKey(13);
		}
	}
	
};
KeyHandler.viewBack = function(isReturn)
{
	if(this.prevPage.length > 0 && this.prevView.length > 0 && this.prevSubView.length > 0)
	{
		//SS.log('BACK::' + KeyHandler.hasPage + ' >>' + KeyHandler.hasView + ' >>' +KeyHandler.hasSubView)
		if(isReturn)
		{
			if(this.hasSubView == 'keypad') { Utils.Keypad(false); return true; }
			if(this.hasSubView == 'datepad') { Utils.DatePad(false); return true; }
			if(this.hasSubView == 'autoComplete') { Autocomplete.hide($(Nav.links[Nav.selected])); return true; }
		}
		var page = this.prevPage.pop()[1];
		var view = this.prevView.pop()[1];
		var subview = this.prevSubView.pop()[1];
		
		if(!this.hasSubView)
		{
			while(this.hasPage == page && this.prevPage.length > 0)
			{
				page = this.prevPage.pop()[1];
				view = this.prevView.pop()[1];
				subview = this.prevSubView.pop()[1];
			}
		}
		
		
		KeyHandler.changeView(page, view, subview);
		this.prevPage.pop();
		this.prevView.pop();
		this.prevSubView.pop();
		
		//SS.log('AFTER BACK::' + KeyHandler.hasPage + ' >>' + KeyHandler.hasView + ' >>' +KeyHandler.hasSubView)
	}
	else
	{
		//SS.log('Exit');
		SS.quit();
	}
}
KeyHandler.changeView = function(page, view, subview, force) 
{
	SS.log('KeyHandler.changeView ' + page + ' ' + view + '  ' + subview)
	/* no change if nothing to select */
	if(subview && (subview != 'keypad' && subview != 'datepad'))
	{
		if($('#' + subview).find('.link').length <= 0) return false;
	}
	
	if(view && (subview != 'keypad' && subview != 'datepad'))
	{
		if($('#' + view).find('.link').length <= 0) return false;
	}
	/* END  no change if nothing to select */
	if(this.hasPage != 'splash')
	{
		if(KeyHandler.hasSubView)
		{
			$(Nav.sublinks[Nav.subselected]).removeClass('selected').addClass('lastselected');
		}
		var viewDiv = (KeyHandler.hasView ? KeyHandler.hasView : KeyHandler.hasPage);
		if(viewDiv)
		{

			$(Nav.links[Nav.selected]).removeClass('selected').addClass('lastselected');
		}
		
		this.prevPage.push([page,this.hasPage]);
		this.prevView.push([view,this.hasView]);
		this.prevSubView.push([subview,this.hasSubView]);
		
		/*
		if(!this.hasSubView && this.prevPage.length > 2)
		{
			if(page != this.prevPage[this.prevPage.length-2])
			{
				this.prevPage.pop();
				this.prevView.pop();
				this.prevSubView.pop();
			}
		}*/
	}
	if(this.hasPage != page || this.hasView != view || this.hasSubView != subview || force)
	{
		if(this.hasPage != page)
		{
			this.hasPage = page;
			if(this.prevPage.length > 0)
			{
				if((this.prevPage[this.prevPage.length-1][1]))
				{
					$(body).removeClass(this.prevPage[this.prevPage.length-1][1]);
				}
			}
			$(body).addClass(page);
			
			if(this.hasPage == 'deparrPage' || this.hasPage == 'arrivalsPage' || this.hasPage == 'departurePage' || this.hasPage == 'departureDetPage')
			{
				$('#menujourneyPage').removeClass('active');
				$('#menudeparrPage').addClass('active');
			}
			else if(this.hasPage == 'journeyPage' || this.hasPage == 'journeyResPage' || this.hasPage == 'journeyResDetPage')
			{
				$('#menujourneyPage').addClass('active');
				$('#menudeparrPage').removeClass('active');
			}
			
			//$('div.navButton[id!=menu' + this.hasPage+']').removeClass('active');
			//$('div.navButton[id=menu' + this.hasPage+']').addClass('active');
			
			if(page == 'homePage')
			{
				Nav.recentStationsAdd();
				Nav.recentJourneysAdd();
			}
			if(page == 'deparrPage')
			{
				Nav.recentStationsAdd();
			}
			if(page == 'journeyPage')
			{
				Nav.recentJourneysAdd();
			}
		}
		if(this.hasView != view)
		{
			this.hasView = view;
			if(this.prevView.length > 0)
			{
				if((this.prevView[this.prevView.length-1][1]))
				{
					//$(body).removeClass(this.prevView[this.prevView.length-1][1]);
				}
			}
			

			

			//$(body).addClass(view);
		}
		if(this.hasSubView != subview)
		{
			this.hasSubView = subview;
			if(this.prevSubView.length > 0)
			{
				if(this.prevSubView[this.prevSubView.length-1][1])
				{
					$(body).removeClass(this.prevSubView[this.prevSubView.length-1][1]);
				}
			}
			if(subview)
			{
				$(body).addClass(subview);
			}
		}

		Nav.init();
		
		
	}
};
KeyHandler.block = function(b) {
	KeyHandler.blocked = b;
};


KeyHandler.processKey = function(key) 
{
	window.clearTimeout(KeyHandler.mouseKeypadTimer);
	try
	{

		if(SS.device == 'philips')
		{
			if(key == 27) key = 13;
		}
		SS.log('START Key Pressed :: ' + key + '>' + KeyHandler.keyName(key) + ' Page:: ' + KeyHandler.hasPage + ' View :: ' + KeyHandler.hasView + ' SubView :: ' + KeyHandler.hasSubView + ' SelectedId::' + $(Nav.links[Nav.selected]).attr('id') + ' SelectedSubId::' + $(Nav.sublinks[Nav.subselected]).attr('id'));
		var keycode = key;
		
		if( Alert.visible && (keycode == 13 || keycode == 461) ){
			Alert.hide();
			return false;
		}
		
		if(!this.blocked && !Alert.visible) 
		{
			console.log('key');
			Nav.all(keycode);
			if( $('#VirtualKeyboard').css('display') == 'none' || $('#VirtualKeyboard').css('visibility') == 'hidden'){
				if (this.hasSubView == 'keypad'){
					this.hasSubView = null;
				}
			} else {
				this.hasSubView = 'keypad';
			}
			if(this.hasSubView)
			{
				console.log(this.hasSubView);
				switch(this.hasSubView){
					case 'datepad':
						Nav.datepad(keycode);
						break;
					case 'keypad':
						Nav.keypad(keycode);
						break;
					case 'autoComplete':
						Nav.autoComplete(keycode);
						break;
					default:
						break;
				}
			}
			else
			{
				console.log(this.hasView + " or " + this.hasPage);
				switch((this.hasView ? this.hasView : this.hasPage)){
					case 'mainButtons':
						Nav.homePage(keycode);
						break;
					case 'homeRecentJourneys':
						Nav.homeRecentJourneys(keycode);
						break;
					case 'homeRecentStations':
						Nav.homeRecentStations(keycode);
						break;
					case 'journeySearch':
						Nav.journeyPage(keycode);
						break;
					case 'recentJourneys':
						Nav.recentJourneys(keycode);
						break;
					case 'deparrSearch':
						Nav.deparrPage(keycode);
						break;
					case 'recentDepArr':
						Nav.recentDepArr(keycode);
						break;
					case 'header':
						Nav.header(keycode);
						break;
					case 'departureTable':
						Nav.departurePage(keycode);
						break;
					case 'arrivalTable':
						Nav.arrivalPage(keycode);
						break;
					case 'departureDetTable':
						Nav.departureDetTable(keycode);
						break;
					case 'journeyResDetTable':
						Nav.journeyResDetTable(keycode);
						break;
					case 'outTable':
					case 'retTable':
					case 'addReturnView':			
						Nav.journeyResPage(keycode);
						break;
					case 'earlieroutward':
					case 'earlierreturn':
					case 'lateroutward':
					case 'laterreturn':
						Nav.journeyResEarlierLater(keycode);
						break;
					case 'stChTable':
						Nav.stationChooserPage(keycode);
						break;		
					default:
						break;
				}
			}
		}
		else {
			console.log("blocked key: " + keycode);
		}
		console.log('END Key Pressed :: ' + key + '>' + KeyHandler.keyName(key) + ' Page:: ' + KeyHandler.hasPage + ' View :: ' + KeyHandler.hasView + ' SubView :: ' + KeyHandler.hasSubView + ' SelectedId::' + $(Nav.links[Nav.selected]).attr('id') + ' SelectedSubId::' + $(Nav.sublinks[Nav.subselected]).attr('id'));
	}
	catch(e)
	{
		Alert.show(e);
	}
};
KeyHandler.initKeys = function()
{
	if(SS.device != 'philips') return false;
	if (window.VK_BACK === undefined) { SS.log('!!! VK_BACK unsuported!!!'); }
	if (window.VK_UP === undefined) { SS.log('!!! VK_UP unsuported!!!'); }
	if (window.VK_DOWN === undefined) { SS.log('!!! VK_DOWN unsuported!!!'); }
	if (window.VK_LEFT === undefined) { SS.log('!!! VK_LEFT unsuported!!!'); }
	if (window.VK_RIGHT === undefined) { SS.log('!!! VK_RIGHT unsuported!!!'); }
	if (window.VK_ENTER === undefined) { SS.log('!!! VK_ENTER unsuported!!!'); }

	if (window.VK_RED === undefined) { SS.log('!!! VK_RED unsuported!!!'); }
    if (window.VK_GREEN === undefined) { SS.log('!!! VK_GREEN unsuported!!!'); }
    if (window.VK_YELLOW === undefined) { SS.log('!!! VK_YELLOW unsuported!!!'); }
    if (window.VK_BLUE === undefined) { SS.log('!!! VK_BLUE unsuported!!!'); }
    if (window.VK_REWIND === undefined) { SS.log('!!! VK_REWIND unsuported!!!'); }
    if (window.VK_PAUSE === undefined) { SS.log('!!! VK_PAUSE unsuported!!!'); }
    if (window.VK_FAST_FWD === undefined) { SS.log('!!! VK_FAST_FWD unsuported!!!'); }
    if (window.VK_PLAY === undefined) { SS.log('!!! VK_PLAY unsuported!!!'); } 
    if (window.VK_STOP === undefined) { SS.log('!!! VK_STOP unsuported!!!'); }
	
    if (window.VK_1 === undefined) { SS.log('!!! VK_1 unsuported!!!'); }
    if (window.VK_2 === undefined) { SS.log('!!! VK_2 unsuported!!!'); }
    if (window.VK_3 === undefined) { SS.log('!!! VK_3 unsuported!!!'); }
    if (window.VK_4 === undefined) { SS.log('!!! VK_4 unsuported!!!'); }
    if (window.VK_5 === undefined) { SS.log('!!! VK_5 unsuported!!!'); }
    if (window.VK_6 === undefined) { SS.log('!!! VK_6 unsuported!!!'); }
    if (window.VK_7 === undefined) { SS.log('!!! VK_7 unsuported!!!'); }
    if (window.VK_8 === undefined) { SS.log('!!! VK_8 unsuported!!!'); }
    if (window.VK_9 === undefined) { SS.log('!!! VK_9 unsuported!!!'); }
    if (window.VK_0 === undefined) { SS.log('!!! VK_0 unsuported!!!'); }

	if (window.VK_BACK === undefined) window.VK_BACK = 98; 
	if (window.VK_UP === undefined) window.VK_UP = 38;
	if (window.VK_DOWN === undefined) window.VK_DOWN = 40;
	if (window.VK_LEFT === undefined) window.VK_LEFT = 37;
	if (window.VK_RIGHT === undefined) window.VK_RIGHT = 39;
	if (window.VK_ENTER === undefined) window.VK_ENTER = 13;
  
	if (window.VK_RED === undefined) window.VK_RED = 114; 
    if (window.VK_GREEN === undefined) window.VK_GREEN = 103; 
    if (window.VK_YELLOW === undefined) window.VK_YELLOW = 121; 
    if (window.VK_BLUE === undefined) window.VK_BLUE = 98; 
    if (window.VK_REWIND === undefined) window.VK_REWIND = 0; 
    if (window.VK_PAUSE === undefined) window.VK_PAUSE = 0; 
    if (window.VK_FAST_FWD === undefined) window.VK_FAST_FWD = 0; 
    if (window.VK_PLAY === undefined) window.VK_PLAY = 0; 
    if (window.VK_STOP === undefined) window.VK_STOP = 0; 
	
    if (window.VK_1 === undefined) window.VK_1 = 49; 
    if (window.VK_2 === undefined) window.VK_2 = 50; 
    if (window.VK_3 === undefined) window.VK_3 = 51; 
    if (window.VK_4 === undefined) window.VK_4 = 52; 
    if (window.VK_5 === undefined) window.VK_5 = 53; 
    if (window.VK_6 === undefined) window.VK_6 = 54; 
    if (window.VK_7 === undefined) window.VK_7 = 55; 
    if (window.VK_8 === undefined) window.VK_8 = 56; 
    if (window.VK_9 === undefined) window.VK_9 = 57; 
    if (window.VK_0 === undefined) window.VK_0 = 48; 
}
KeyHandler.keyName = function(keyCode)
{
	if(SS.device != 'philips') return 'na';
	switch(keyCode)
	{
		case 461: return '461'; break;
		case 38: return '38'; break;
		case 40: return '40'; break;
		case 37: return '37'; break;
		case 39: return '39'; break;
		case 13: return '13'; break;
  
		case 403: return '403'; break;
		case 404: return '404'; break; 
		case 405: return '405'; break;
		case 406: return '406'; break;
		case 412: return '412'; break;
		case 19: return '19'; break;
		case 417: return '417'; break;
		case 415: return '415'; break;
		case 413: return '413'; break;
	
		case 49: return '49'; break;
		case 50: return '50'; break;
		case 51: return '51'; break; 
		case 52: return '52'; break;
		case 53: return '53'; break;
		case 54: return '54'; break; 
		case 55: return '55'; break;
		case 56: return '56'; break; 
		case 57: return '57'; break; 
		case 48: return '48'; break; 
                case HASH(0x861dea8): return 'HASH(0x861dea8)';break;
		default:
			return 'UNKNOWN'; break;
	}
};