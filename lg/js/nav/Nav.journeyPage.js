Nav.recentJourneys = function(key)
{
	//Nav.generic(key);
        
	switch(key)
	{
		case 37:		
			Nav.iterateLinks('prev');
			break;
		case 39:
			Nav.iterateLinks('next');
			break;
		case 38:
			if(!Nav.iterateLinks('up',false,3))
			{
				KeyHandler.changeView('journeyPage','journeySearch');
			}
			break;
		case 40:
			Nav.iterateLinks('down',false,3);
			break;
		case 13:
			var selLink = $(this.links[this.selected]);
			Nav.goRecentJourney(selLink);
			break;
		default:
			break;
	}
}
Nav.journeyPage = function(key)
{
	Nav.generic(key);
        if(Nav.tools == 1)
        {
            return;
        };
	switch(key)
	{
		case 37:
			var selLink = $(Nav.links[Nav.selected]);
			switch(selLink.attr('id'))
			{
				case 'fromStation':
				case 'addReturn':
				case 'toStation':
					break;
				case 'fastTrains':
					Nav.selectId('outDate');
					break;
				case 'outDate':
					Nav.selectId('fromStation');
					break;
				case 'btnPlanJourney':
					if($('#addReturn').hasClass('checked'))
					{
						Nav.selectId('retDate');
					}
					else
					{
						Nav.selectId('addReturn');
					}
					break;
				case 'retDate':
					Nav.selectId('addReturn');
					break;
			}
			break;
		case 39:
			var selLink = $(Nav.links[Nav.selected]);
			switch(selLink.attr('id'))
			{
				case 'fastTrains':
				case 'btnPlanJourney':
					break;
				case 'fromStation':
					Nav.selectId('outDate');
					break;
				case 'outDate':
					Nav.selectId('fastTrains');
					break;
				case 'toStation':
					Nav.selectId('outDate');
					break;
				case 'addReturn':
					if($('#addReturn').hasClass('checked'))
					{
						Nav.selectId('retDate');
					}
					else
					{
						Nav.selectId('btnPlanJourney');
					}
					break;
				case 'retDate':
					Nav.selectId('btnPlanJourney');
					break;
			}
			break;
		case 38:
			var selLink = $(Nav.links[Nav.selected]);
			switch(selLink.attr('id'))
			{
				case 'fromStation':
				case 'outDate':
				case 'fastTrains':
					KeyHandler.changeView('journeyPage','header');
					break;
				case 'toStation':
					Nav.selectId('fromStation');
					break;
				case 'btnPlanJourney':
					Nav.selectId('fastTrains');
					break;
				case 'addReturn':
					Nav.selectId('toStation');
					break;
				case 'retDate':
					Nav.selectId('outDate');
					break;
			}
			break;
		case 40:
			var selLink = $(Nav.links[Nav.selected]);
			switch(selLink.attr('id'))
			{
				case 'fromStation':
					Nav.selectId('toStation');
					break;
				case 'outDate':
					if($('#addReturn').hasClass('checked'))
					{
						Nav.selectId('retDate');
					}
					else
					{
						KeyHandler.changeView('journeyPage','recentJourneys');
					}
					break;
				case 'fastTrains':
					Nav.selectId('btnPlanJourney');
					break;
				case 'toStation':
					Nav.selectId('addReturn');
					break;
				case 'btnPlanJourney':
				case 'addReturn':
				case 'retDate':
					KeyHandler.changeView('journeyPage','recentJourneys');
					break;
			}
			break;
		case 37:
			break;
		case 39:
			break;
		case 13:
			var selLink = $(this.links[this.selected]);
			switch(selLink.attr('id'))
			{
				case 'addReturn':
					Nav.addReturn(selLink);
					break;
				case 'btnPlanJourney':
					Nav.planJourney(selLink);
					break;
                                case 'fromStation':
					$('#fromStation').attr('data-code','');
					break;
				case 'toStation':
					$('#toStation').attr('data-code')
					break;
				default:
					break;
			}
			break;
		default:
			break;
	}
}

Nav.recentStationsAdd = function()
{
	$('#homeRecentStations').html('<div class="deparrHeader"><h1>Recent stations</h1></div>' + RecentSaved.get('deparrSearch',3,'home'));
	$('#recentDepArr').html('<div class="deparrHeader"><h1>Recent stations</h1></div>' + RecentSaved.get('deparrSearch',9,'deparr'));	
}
Nav.recentJourneysAdd = function()
{
	$('#homeRecentJourneys').html('<div class="deparrHeader"><h1>Recently viewed journeys</h1></div>' + RecentSaved.get('journeySearch',3,'home'));
	$('#recentJourneys').html('<div class="deparrHeader"><h1>Recently viewed journeys</h1></div>' + RecentSaved.get('journeySearch',6,'deparr'));	
}
Nav.resetJourneySearch = function()
{
	$('#journeySearch',$('#journeyPage')).find('.link:not(#fromStation)').removeClass('selected, active, lastselected');
	
	$('#fromStation').addClass('selected').removeClass('clear').attr('data-code','').find('input:first').val('');
	$('div.inputClick',$('#fromStation')).html('');
	$('#toStation').removeClass('clear').attr('data-code','').find('input:first').val('');
	$('div.inputClick',$('#toStation')).html('');
	
	$('#outDate').data('date',Utils.interval15min(new Date()));
	$('#retDate').data('date',Utils.interval15min(new Date()));
	$('[data-rel="Datepad"]').each(function(){
		$(this).parents('td:first').find('.dt').html($(this).data('date').format("dd mmm yyyy"));
		$(this).parents('td:first').find('.tm').html($(this).data('date').format("HH:MM"));
	});
	if($('#addReturn.link').hasClass('checked'))
	{
		Nav.addReturn($('#addReturn.link'));
	}
	$('#fastTrains.checkbox.link').removeClass('checked');
}
Nav.goRecentJourney = function(selLink)
{
	$('#fromStation').addClass('clear').attr('data-code',selLink.attr('data-code')).find('input:first').val($('.from > h2',selLink).html());
	$('div.inputClick',$('#fromStation')).html($('.from > h2',selLink).html());
	$('#toStation').addClass('clear').attr('data-code',selLink.attr('retcode')).find('input:first').val($('.to > h2',selLink).html());
	$('div.inputClick',$('#toStation')).html($('.to > h2',selLink).html());

	var oDt = null;
	try
	{
		oDt = Utils.stringToDateJS(selLink.attr('outDate'));
	}
	catch(e) {}
	if(!oDt) oDt = Utils.interval15min(Nav.fixDate(new Date()));
	oDt = Nav.fixDate(oDt);
	oDt = Utils.interval15min(oDt);
	$('#outDate').data('date',oDt);
	
	if(selLink.attr('return')=='true')
	{
		var rDt = null;
		try {
			rDt = Utils.stringToDateJS(selLink.attr('retDate'));
		} catch(e) {}
		if(!rDt) rDt = Utils.interval15min(Nav.fixDate(new Date()));
		//SS.log('retDate=='+ rDt)
		rDt = Nav.fixDate(rDt);
		rDt = Utils.interval15min(rDt);
		$('#retDate').data('date',rDt);	
		if(!$('#addReturn.link').hasClass('checked')) Nav.addReturn($('#addReturn.link'));
	}
	else if($('#addReturn.link').hasClass('checked'))
	{
		Nav.addReturn($('#addReturn.link'));
	}
	$('[data-rel="Datepad"]').each(function(){
		//SS.log($(this).data('date'));
		if(!$(this).data('date')) $(this).data('date',new Date());
		$(this).parents('td:first').find('.dt').html($(this).data('date').format("dd mmm yyyy"));
		$(this).parents('td:first').find('.tm').html($(this).data('date').format("HH:MM"));
	});

	$('#journeySearch',$('#journeyPage')).find('.link:not(#btnPlanJourney)').removeClass('selected, active, lastselected');
	$('#journeySearch',$('#journeyPage')).find('#btnPlanJourney.link').addClass('selected');

	KeyHandler.changeView('journeyPage','journeySearch');
}
Nav.fixDate = function(date)
{
	if(!date) date = new Date();
	var now = new Date();
	//SS.log(now.getTime() > date.getTime() + 'Date::' + date + ' >> Now::' + now)
	if(now.getTime() > date.getTime())
	{
		if(date.getHours() > now.getHours())
		{
			now.setHours(date.getHours(),date.getMinutes(),0,0)
		}		
		//SS.log('Date::' + date + ' >> Now::' + now)
		return now;
	}
	else
	{
		//SS.log('Date::' + date + ' >> Now::' + now)
		return date;
	}
}
Nav.addReturn = function(selLink)
{
	if(selLink.hasClass('checked'))
	{
		selLink.removeClass('checked');
		selLink.html('<h2>Add return journey</h2>');
		$('#retDate').addClass('hidden');
		selLink.parents('td:first').next('td').hide();
		Nav.init();
	}
	else
	{
		selLink.addClass('checked');
		selLink.html('<h2>Remove return journey</h2>');
		$('#retDate').removeClass('hidden');
		
		var dt = Utils.interval15min($('#outDate').data('date').DateAdd('h',2));
		$('#retDate').data('date',dt);
		$('#retDate').parents('td:first').find('.dt').html(dt.format("d mmm yyyy"));
		$('#retDate').parents('td:first').find('.tm').html(dt.format("HH:MM"));
		
		selLink.parents('td:first').next('td').show();
		Nav.init();
	}
}
Nav.planJourney = function()
{
	if(this.hasSubView == 'datepad') { Utils.DatePad(false); return true; }
	if($('input',$('#fromStation')).val() == '' || $('input',$('#toStation')).val() == '')
	{
		Alert.show('Please choose from and to stations');
		return false;
	}
	if((!$('#fromStation').attr('data-code') || $('#fromStation').attr('data-code') == '') && $('input',$('#fromStation')).val() != '')
	{
		NRE.findStation($('input',$('#fromStation')).val(),function(data){
			var list = Loader.stationSearch(data);
			if(list=='')
			{
				var srch = $('input',$('#fromStation')).val();
				if(srch.length >= 35)
				{
					srch = srch.substring(0,31)+' ...';
				}
				Alert.show('Can not find any matching stations for "'+srch+'". Please try with different keywords.');
				return false;
			}
			
			$('#stChTable').html(list).data('callback',function(code,text){
				$('#fromStation').attr('data-code',code);
				$('input',$('#fromStation')).val(text);
				$('div.inputClick',$('#fromStation')).html(text);
				Nav.planJourney();
			});
			KeyHandler.changeView('stationChooserPage','stChTable');
			//Scroller.init('stChTable');
			
			$('.detHeader',$('#stationChooserPage')).html('<H1>From station</H1>');
			$('#disambiguationCode',$('#stationChooserPage')).html($('input',$('#fromStation')).val())
		});
		return false;
	}
	
	if((!$('#toStation').attr('data-code') || $('#toStation').attr('data-code') == '') && $('input',$('#toStation')).val() != '')
	{
		NRE.findStation($('input',$('#toStation')).val(),function(data){
			var list = Loader.stationSearch(data);
			if(list=='')
			{
				var srch = $('input',$('#toStation')).val();
				if(srch.length >= 35)
				{
					srch = srch.substring(0,31)+' ...';
				}
				Alert.show('Can not find any matching stations for "'+srch+'". Please try with different keywords.');
				if(KeyHandler.hasPage == 'stationChooserPage')
				{
					KeyHandler.viewBack();
				}
				return false;
			};
			$('#stChTable').html(list).data('callback',function(code,text){
				$('#toStation').attr('data-code',code);
				$('input',$('#toStation')).val(text);
				$('div.inputClick',$('#toStation')).html(text);
				Nav.planJourney();
			});
			KeyHandler.changeView('stationChooserPage','stChTable',null,true);
			//Scroller.init('stChTable');
			
			$('.detHeader',$('#stationChooserPage')).html('<H1>To station</H1>');
			$('#disambiguationCode',$('#stationChooserPage')).html($('input',$('#toStation')).val())
		});
		return false;
	}
	
	if(!$('#fromStation').attr('data-code') || $('#fromStation').attr('data-code') == '' || !$('#toStation').attr('data-code') || $('#toStation').attr('data-code') == '')
	{
		//Alert.show('Please choose from and to stations');
		return false;
	}
	else
	{
		RecentSaved.save('journeySearch',
			{
				'from':{
					'code':$('#fromStation').attr('data-code'),
					'text':$('input',$('#fromStation')).val()},
				'to':{
					'code':$('#toStation').attr('data-code'),
					'text':$('input',$('#toStation')).val()},
				'outDate':$('#outDate').data('date'),
				'isReturn':$('#addReturn').hasClass('checked'),
				'retDate':$('#retDate').data('date')
			}
		);
		
		var fromGrp = !isNaN(parseInt($('#fromStation').attr('data-code')));
		var toGrp = !isNaN(parseInt($('#toStation').attr('data-code')));
		
		//SS.log(toGrp + '=' + '!isNaN(parseInt($("#fromStation").attr("data-code")));' + parseInt($('#fromStation').attr('data-code')));
		NRE.GetRealtimeJourneyPlanRequest($('#fromStation').attr('data-code'),fromGrp, $('#toStation').attr('data-code'),toGrp, Utils.GetUTCTimestamp($('#outDate').data('date')), $('#fastTrains').hasClass('checked'), function(xmlDoc){
			//SS.log('here');
			var list = Loader.RealtimeJourneyPlan(xmlDoc,'out');
			//SS.log(list);
			if($('ul.error',$('<div>'+list+'</div>')).length <= 0)
			{
				$('#h_from',$('#journeyResPage')).html($('#fromStation > input:first').val());
				$('#h_to',$('#journeyResPage')).html($('#toStation > input:first').val());
				if(!$('#outDate').data('date')) $('#outDate').data('date',Utils.interval15min(Nav.fixDate(new Date())));
				$('#h_date',$('#journeyResPage')).html($('#outDate').data('date').format('dd mmm yyyy'));
				$('#h_time',$('#journeyResPage')).html($('#outDate').data('date').format('HH:MM'));
				
				$('#outTable').data('date',$('#outDate').data('date'));
				
				$('#outTable').html(list);
				//SS.log('Change to outTable');
				KeyHandler.changeView('journeyResPage','outTable');
				//Scroller.init('outTable');
			
				if($('#addReturn').hasClass('checked'))
				{
					$('#h_retdate',$('#journeyResPage')).html('-');
					$('#h_rettime',$('#journeyResPage')).html('-');
				
					$('#retTable').addClass('hidden').parents('.grid:first').hide();
					$('.earlier.return, .later.return').hide();
					$('#retHeader').hide();
					$('#addReturnResPage').show();
					
					//Return
					var fromGrp = !isNaN(parseInt($('#fromStation').attr('data-code')));
					var toGrp = !isNaN(parseInt($('#toStation').attr('data-code')));
					NRE.GetRealtimeJourneyPlanRequest($('#toStation').attr('data-code'),toGrp, $('#fromStation').attr('data-code'),fromGrp, Utils.GetUTCTimestamp($('#retDate').data('date')), $('#fastTrains').hasClass('checked'), function(xmlDoc){
						var list = Loader.RealtimeJourneyPlan(xmlDoc,'ret');
						////SS.log(list);
						
						if($('ul.error',$('<div>'+list+'</div>')).length <= 0)
						{
							if(!$('#retDate').data('date')) $('#retDate').data('date',Utils.interval15min(Nav.fixDate(new Date())) );
							$('#h_retdate',$('#journeyResPage')).html($('#retDate').data('date').format('dd mmm yyyy'));
							$('#h_rettime',$('#journeyResPage')).html($('#retDate').data('date').format('HH:MM'));
							
							$('#retTable').data('date',$('#retDate').data('date'));
							
							$('#retTable').removeClass('hidden').parents('.grid:first').show();
							$('.earlier.return, .later.return').show();
							$('#retHeader').show();
							$('#addReturnResPage').hide();
							
							$('#retTable').html(list);
							//KeyHandler.changeView('journeyResPage','outTable');
							//Scroller.init('retTable');
						}
						else
						{
							SS.log('API error::' + list);
							Alert.show($('ul.error > li',$('<div>'+list+'</div>')).html());
						}
					});
				}
				else
				{
					$('#h_retdate',$('#journeyResPage')).html('-');
					$('#h_rettime',$('#journeyResPage')).html('-');
				
					$('#retTable').addClass('hidden').parents('.grid:first').hide();
					$('.earlier.return, .later.return').hide();
					$('#retHeader').hide();
					$('#addReturnResPage').show();
				}
			}
			else
			{
				SS.log('API error::' + list);
				Alert.show($('ul.error > li',$('<div>'+list+'</div>')).html());
			}
		});
	
	}
}