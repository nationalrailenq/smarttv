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
	
	switch(SS.device)
	{
		case "samsung":
			this.tvKey = new Common.API.TVKeyValue();
			break;
		case "lg":
			this.tvKey = new KeyHandler.TVKeyValue();		
			break;
		case "philips":
			break;
		case "googletv":
			break;
		default:
			break;
	}
};
KeyHandler.initClicks = function(page)
{
	$('.footer').find('DIV').each(function(){
		
		$(this).unbind('click').bind('click',function()
		{
			if(!KeyHandler.blocked && !Alert.visible && !KeyHandler.hasSubView) 
			{
				if($(this).hasClass('btn-A'))
				{
					KeyHandler.processKey(KeyHandler.tvKey.KEY_RED);
				}
				else if($(this).hasClass('btn-B'))
				{
					KeyHandler.processKey(KeyHandler.tvKey.KEY_GREEN);
				}
				else if($(this).hasClass('btn-C'))
				{
					KeyHandler.processKey(KeyHandler.tvKey.KEY_YELLOW);
				}
				else if($(this).hasClass('btn-D'))
				{
					KeyHandler.processKey(KeyHandler.tvKey.KEY_BLUE);
				}
			}
			if($(this).hasClass('btn-exit'))
			{
				SS.quit();
				//KeyHandler.processKey(KeyHandler.tvKey.KEY_EXIT);
			}
			else if($(this).hasClass('btn-back'))
			{
				KeyHandler.processKey(KeyHandler.tvKey.KEY_RETURN);
			}
		});
	});
	
	$('.alerBox-footer .alerBox-btn-enter').unbind('click').bind('click',function(){
		KeyHandler.processKey(KeyHandler.tvKey.KEY_ENTER);
	});
	
	$('#'+page).find('.view, .subview').each(function(i){
		KeyHandler.initClicksHover(this);
	});
	KeyHandler.initClicksHover($('#header'));
};
KeyHandler.initClicksHover = function(_this)
{
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
				$(this).unbind('click').bind('click',function()
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
		Nav.selectId($(target).attr('id'),true);
		if(!dontClick) KeyHandler.processKey(KeyHandler.tvKey.KEY_ENTER)
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
		SS.quit();
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
			
			//$('DIV.navButton[id!=menu' + this.hasPage+']').removeClass('active');
			//$('DIV.navButton[id=menu' + this.hasPage+']').addClass('active');
			
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


KeyHandler.processKey = function(key) {
	try
	{
		alert('Key Pressed :: ' + key + ' Page:: ' + this.hasPage + ' View :: ' + this.hasView + ' SubView :: ' + this.hasSubView + ' SelectedId::' + $(Nav.links[Nav.selected]).attr('id') + ' SelectedSubId::' + $(Nav.sublinks[Nav.subselected]).attr('id'));
		var keycode = key;
		if( Alert.visible && (keycode == KeyHandler.tvKey.KEY_ENTER || keycode == KeyHandler.tvKey.KEY_RETURN) ){
			Alert.hide();
			return false;
		}
		if(!this.blocked && !Alert.visible) 
		{
			Nav.all(keycode);
			if(this.hasSubView)
			{
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
			////alert("blocked key: " + keycode);
		}
	}
	catch(e)
	{
		Alert.show(e);
	}
};

