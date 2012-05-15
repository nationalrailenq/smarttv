Nav.stationChooserPage = function(key)
{
	switch(key)
	{
		case 37:
			Nav.iterateLinks('prev');
			break;
		case 39:
			Nav.iterateLinks('next');
			break;
		case 38:
			Nav.iterateLinks('prev');
			break;
		case 40:
			Nav.iterateLinks('next');
			break;
		case 13:
			var selLink = $(this.links[this.selected]);
			
			var code = selLink.attr('id');
			var text = selLink.attr('text');
			
			$('#stChTable').data('callback')(code,text);
			//Nav.goRecentStation(selLink);
			break;
		default:
			break;
	}
}
Nav.recentDepArr = function(key)
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
				KeyHandler.changeView('deparrPage','deparrSearch');
			}
			break;
		case 40:
			Nav.iterateLinks('down',false,3);
			break;
		case 13:
			var selLink = $(this.links[this.selected]);
			Nav.goRecentStation(selLink);
			break;
		default:
			break;
	}
}
Nav.deparrPage = function(key)
{
	Nav.generic(key);
	switch(key)
	{
		case 38:
			KeyHandler.changeView('deparrPage','header');
			break;
		case 40:
			KeyHandler.changeView('deparrPage','recentDepArr');
			break;
		case 37:
			Nav.iterateLinks('prev');	
			break;
		case 39:
			Nav.iterateLinks('next');
			break;
		case 13:
			console.log('daparrPage: ' + $(this.links[this.selected]).attr('id'));
			switch($(this.links[this.selected]).attr('id'))
			{
				case 'btnLiveArrivals':
					Nav.searchArrivals();
					break
				case 'btnLiveDepartures':
					Nav.searchDepartures();
					break
				case 'searchStation':
					
					break
				default:
					console.log('no need to do something');
					break;
			}
			break;
		default:
			break;
	}
}
Nav.resetDepArrSearch = function()
{
	$('#deparrSearch',$('#deparrPage')).find('.link:not(#searchStation)').removeClass('selected, active, lastselected');
	$('#searchStation').removeClass('clear').attr('data-code','').find('input:first').val('').addClass('selected');
	
	$('div.inputClick',$('#searchStation')).html('');
}
Nav.goRecentStation = function(selLink)
{
	$('#searchStation').addClass('clear').attr('data-code',selLink.attr('data-code')).find('input:first').val($('.station > h2',selLink).html());
	$('div.inputClick',$('#searchStation')).html($('.station > h2',selLink).html());

	if(selLink.attr('arrival')=='true')
	{
		$('#deparrSearch',$('#deparrPage')).find('.link:not(#btnLiveArrivals)').removeClass('selected, active, lastselected');
		$('#deparrSearch',$('#deparrPage')).find('#btnLiveArrivals.link').addClass('selected');
	}
	else
	{
		$('#deparrSearch',$('#deparrPage')).find('.link:not(#btnLiveDepartures)').removeClass('selected, active, lastselected');
		$('#deparrSearch',$('#deparrPage')).find('#btnLiveDepartures.link').addClass('selected');
	}
	KeyHandler.changeView('deparrPage','deparrSearch');
}
Nav.searchArrivals = function()
{
	if($('input',$('#searchStation')).val() == '')
	{
		//SS.log('???')
		Alert.show('Please choose station');
		return false;
	}
	
	//SS.log('search arrivals');
	if((!$('#searchStation').attr('data-code') || $('#searchStation').attr('data-code') == '') && $('input',$('#searchStation')).val() != '')
	{
		NRE.findStation($('input',$('#searchStation')).val(),function(data){
			var list = Loader.stationSearch(data);
			if(list=='')
			{
				var srch = $('input',$('#searchStation')).val();
				if(srch.length >= 35)
				{
					srch = srch.substring(0,31)+' ...';
				}
				Alert.show('Can not find any matching stations for "'+srch+'". Please try with different keywords.')
				return false;
			}
			$('#stChTable').html(list).data('callback',function(code,text){
				$('#searchStation').attr('data-code',code);
				$('input',$('#searchStation')).val(text)
				$('div.inputClick',$('#searchStation')).html(text);
				Nav.searchArrivals();
			});
			KeyHandler.changeView('stationChooserPage','stChTable');
			//Scroller.init('stChTable');
			
			$('.detHeader',$('#stationChooserPage')).html('<H1>Arrivals station</H1>');
			$('#disambiguationCode',$('#stationChooserPage')).html($('input',$('#searchStation')).val())
		});
	}
	
	if(!$('#searchStation').attr('data-code') || $('#searchStation').attr('data-code') == '')
	{
		//Alert.show('Please choose station');
		return false;
	}
	else
	{
		RecentSaved.save('deparrSearch',{'from':{'code':$('#searchStation').attr('data-code'),'text':$('input',$('#searchStation')).val()},'arrival':true});
		
		NRE.GetArrivalBoard($('#searchStation').attr('data-code'),function(xmlDoc){
			var list = Loader.ArrivalBoard(xmlDoc);
			$('#arrivalTable').html(list);
			KeyHandler.changeView('arrivalsPage','arrivalTable');
			//Scroller.init('arrivalTable');
			$('.detHeader:first',$('#arrivalsPage')).html('<h1>' + $('#searchStation > input:first',$('#deparrPage')).val() + ' - arrivals</H1><H4>Last updated: '+(new Date()).format('HH:MM')+'</H4>')
		});
	}
}
Nav.searchDepartures = function()
{
	if($('input',$('#searchStation')).val() == '')
	{
		Alert.show('Please choose station');
		return false;
	}
	
	if((!$('#searchStation').attr('data-code') || $('#searchStation').attr('data-code') == '') && $('input',$('#searchStation')).val() != '')
	{
		NRE.findStation($('input',$('#searchStation')).val(),function(data){
			var list = Loader.stationSearch(data);
			if(list=='')
			{
				var srch = $('input',$('#searchStation')).val();
				if(srch.length >= 35)
				{
					srch = srch.substring(0,31)+' ...';
				}
				Alert.show('Can not find any matching stations for "'+srch+'". Please try with different keywords.')
				return false;
			}
			$('#stChTable').html(list).data('callback',function(code,text){
				$('#searchStation').attr('data-code',code);
				$('input',$('#searchStation')).val(text);
				$('div.inputClick',$('#searchStation')).html(text);
				Nav.searchDepartures();
			});
			KeyHandler.changeView('stationChooserPage','stChTable');
			//Scroller.init('stChTable');
			
			$('.detHeader',$('#stationChooserPage')).html('<H1>Departures station</H1>');
			$('#disambiguationCode',$('#stationChooserPage')).html($('input',$('#searchStation')).val())
		});
	}
	
	if(!$('#searchStation').attr('data-code') || $('#searchStation').attr('data-code') == '')
	{
		//Alert.show('Please choose station');
		return false;
	}
	else
	{
		RecentSaved.save('deparrSearch',{'from':{'code':$('#searchStation').attr('data-code'),'text':$('input',$('#searchStation')).val()},'departure':true});
		
		NRE.GetDepartureBoard($('#searchStation').attr('data-code'),function(xmlDoc){
			var list = Loader.DepartureBoard(xmlDoc);
			//SS.log(list)
			$('#departureTable').html(list);
			KeyHandler.changeView('departurePage','departureTable');
			//Scroller.init('departureTable');
			$('.detHeader',$('#departurePage')).html('<h1>' + $('#searchStation > input',$('#deparrPage')).val() + ' - departures</H1><H4>Last updated: '+(new Date()).format('HH:MM')+'</H4>')
		});
	}
}