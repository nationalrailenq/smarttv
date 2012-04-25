var KeyHandler = {
	blocked		:	true,
	tvKey		:	null,
	hasPage		:	'splash',
	prevPage 	: 	[],
	hasView		:	null,
	prevView 	: 	[],
	hasSubView		:	null,
	prevSubView 	: 	[]
}
KeyHandler.init = function() {
	
	/*For testing on Opera Browser*/
/*
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
    
    if (window.VK_PAGE_UP === undefined) window.VK_PAGE_UP = 0;
    if (window.VK_PAGE_DOWN === undefined) window.VK_PAGE_DOWN = 0;

	*/
	//$(body).unbind('mousemove').bind('mousemove',function(){
	//	alert('Mouse Move');
	//});
};
KeyHandler.keyName = function(keyCode)
{
	switch(keyCode)
	{
		case VK_BACK: return 'VK_BACK'; break;
		case VK_UP: return 'VK_UP'; break;
		case VK_DOWN: return 'VK_DOWN'; break;
		case VK_LEFT: return 'VK_LEFT'; break;
		case VK_RIGHT: return 'VK_RIGHT'; break;
		case VK_ENTER: return 'VK_ENTER'; break;
  
		case VK_RED: return 'VK_RED'; break;
		case VK_GREEN: return 'VK_GREEN'; break; 
		case VK_YELLOW: return 'VK_YELLOW'; break;
		case VK_BLUE: return 'VK_BLUE'; break;
		case VK_REWIND: return 'VK_REWIND'; break;
		case VK_PAUSE: return 'VK_PAUSE'; break;
		case VK_FAST_FWD: return 'VK_FAST_FWD'; break;
		case VK_PLAY: return 'VK_PLAY'; break;
		case VK_STOP: return 'VK_STOP'; break;
	
		case VK_1: return 'VK_1'; break;
		case VK_2: return 'VK_2'; break;
		case VK_3: return 'VK_3'; break; 
		case VK_4: return 'VK_4'; break;
		case VK_5: return 'VK_5'; break;
		case VK_6: return 'VK_6'; break; 
		case VK_7: return 'VK_7'; break;
		case VK_8: return 'VK_8'; break; 
		case VK_9: return 'VK_9'; break; 
		case VK_0: return 'VK_0'; break; 
		default:
			return 'UNKNOWN'; break;
	}
};
KeyHandler.initClicks = function(page)
{	
	$('.footer').find('div').each(function(){
		
		$(this).unbind('mousedown').bind('mousedown',function()
		{
			if(!KeyHandler.blocked && !Alert.visible && !KeyHandler.hasSubView) 
			{
				alert('click');
				if($(this).hasClass('btn-A'))
				{
					KeyHandler.processKey(VK_RED);
				}
				else if($(this).hasClass('btn-B'))
				{
					KeyHandler.processKey(VK_GREEN);
				}
				else if($(this).hasClass('btn-C'))
				{
					KeyHandler.processKey(VK_YELLOW);
				}
				else if($(this).hasClass('btn-D'))
				{
					KeyHandler.processKey(VK_BLUE);
				}
			}
			if($(this).hasClass('btn-exit'))
			{
				SS.quit();
			}
			else if($(this).hasClass('btn-back'))
			{
				KeyHandler.processKey(VK_BACK);
			}
		});
	});
	
	$('.alerBox-footer .alerBox-btn-enter').unbind('mousedown').bind('mousedown',function(){
		KeyHandler.processKey(VK_ENTER);
	});
	
	$('#'+page).find('.view, .subview').each(function(i){
		KeyHandler.initClicksHover(this);
	});
	//$('.link').unbind('mouseover').bind('mouseover',function(){return false;});
	KeyHandler.initClicksHover($('#header'));
	
	
	
	$('input').each(function(index, element) {
        $(this).unbind('mousedown').bind('mousedown',function(){
			KeyHandler.processClick($(this).parent('div'));
			//return false;
			alert('click>>' + $(this).attr('id'));
		}).unbind('focus').bind('focus',function(){
			alert('focus>>' + $(this).attr('id'));
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
			//alert('subview');
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
			//alert($(this).attr('id'));
			if($(this).is(':visible'))
			{
				$(this).unbind('mousedown').bind('mousedown',function()
				{
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
							KeyHandler.processClick(this);
						}
					}
				});
				/*
				$(this).unbind('mouseover').bind('mouseover',function()
				{
					//alert('Mouse Over');
					if(!KeyHandler.blocked && !Alert.visible) 
					{
						//alert($(this).attr('subview') + ' !=' + KeyHandler.hasSubView)
						if($(this).attr('view') != KeyHandler.hasView && !KeyHandler.hasSubView)
						{
							KeyHandler.changeView(KeyHandler.hasPage,$(this).attr('view'));
						}
						else if($(this).attr('subview') && $(this).attr('subview') != KeyHandler.hasSubView)
						{
							alert('change to subview');
							KeyHandler.changeView(KeyHandler.hasPage,KeyHandler.hasView,$(this).attr('subview'));
						}
						if(!KeyHandler.hasSubView || $(this).attr('subview') == KeyHandler.hasSubView)
						{
							KeyHandler.processClick(this,true);
						}
					}
				});
				*/
			}
		});
}
KeyHandler.processClick = function(target,dontClick){
	var m_page = this.hasPage;
	var m_view = this.hasView;
	var m_subview = this.hasSubView;
	
	//alert('Clicked/Hover on ==' + $(target).attr('id') + ' ' + m_page + '>>' + m_view + '>>' + m_subview);
	
	
	if(!KeyHandler.blocked && !Alert.visible) 
	{
		//alert('HERE')
		//hover click preselect link
		Nav.selectId($(target).attr('id'),true);
		//Send Enter event on clicked link (If not hover)
		if(!dontClick) 
		{
			alert('CLICK');
			//Nav.selectId($(target).attr('id'),true);
			KeyHandler.processKey(VK_ENTER,true);
		}
	}
	
};
KeyHandler.viewBack = function(isReturn)
{
	if(this.prevPage.length > 0 && this.prevView.length > 0 && this.prevSubView.length > 0)
	{
		//alert('BACK::' + KeyHandler.hasPage + ' >>' + KeyHandler.hasView + ' >>' +KeyHandler.hasSubView)
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
		
		//alert('AFTER BACK::' + KeyHandler.hasPage + ' >>' + KeyHandler.hasView + ' >>' +KeyHandler.hasSubView)
	}
	else
	{
		//alert('Exit');
		//SS.quit();
	}
}
KeyHandler.changeView = function(page, view, subview, force) {
	//alert('KeyHandler.changeView ' + page + ' ' + view + '  ' + subview)
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
			$(body).addClass(subview);
		}

		Nav.init();
		
	}
};
KeyHandler.block = function(b) {
	KeyHandler.blocked = b;
};

KeyHandler.processKey = function(key,mouse) {
	if(KeyHandler.hasSubView == 'keypad' || KeyHandler.hasSubView == 'autoComplete')
	{
		if(key == 27) key = VK_ENTER;
	}
	
	try
	{
		var keycode = key;
		if( Alert.visible && (keycode == VK_ENTER || keycode == VK_BACK) ){
			Alert.hide();
			return false;
		}
		if(!KeyHandler.blocked && !Alert.visible) 
		{
			KeyHandler.blocked = true;
			Nav.all(keycode);
			if(KeyHandler.hasSubView)
			{
				switch(KeyHandler.hasSubView){
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
				switch((KeyHandler.hasView ? KeyHandler.hasView : KeyHandler.hasPage)){
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
			KeyHandler.blocked = false;
		}
		else {
			alert("blocked key: " + keycode);
		}
		
		alert('Key Pressed :: ' + key + '>' + KeyHandler.keyName(key) + ' Page:: ' + KeyHandler.hasPage + ' View :: ' + KeyHandler.hasView + ' SubView :: ' + KeyHandler.hasSubView + ' SelectedId::' + $(Nav.links[Nav.selected]).attr('id') + ' SelectedSubId::' + $(Nav.sublinks[Nav.subselected]).attr('id'));
	}
	catch(e)
	{
		KeyHandler.blocked = false;
		Alert.show(e);
	}
};

