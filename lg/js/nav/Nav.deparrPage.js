Nav.stationChooserPage = function(keycode)
{
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_LEFT:
			Nav.iterateLinks('prev');
			break;
		case KeyHandler.tvKey.KEY_RIGHT:
			Nav.iterateLinks('next');
			break;
		case KeyHandler.tvKey.KEY_UP:
			Nav.iterateLinks('prev');
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			Nav.iterateLinks('next');
			break;
		case KeyHandler.tvKey.KEY_ENTER:
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
Nav.recentDepArr = function(keycode)
{
	//Nav.generic(keycode);
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_LEFT:
			Nav.iterateLinks('prev');
			break;
		case KeyHandler.tvKey.KEY_RIGHT:
			Nav.iterateLinks('next');
			break;
		case KeyHandler.tvKey.KEY_UP:
			if(!Nav.iterateLinks('up',false,3))
			{
				KeyHandler.changeView('deparrPage','deparrSearch');
			}
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			Nav.iterateLinks('down',false,3);
			break;
		case KeyHandler.tvKey.KEY_ENTER:
			var selLink = $(this.links[this.selected]);
			Nav.goRecentStation(selLink);
			break;
		default:
			break;
	}
}
Nav.deparrPage = function(keycode)
{
	Nav.generic(keycode);
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_UP:
			KeyHandler.changeView('deparrPage','header');
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			KeyHandler.changeView('deparrPage','recentDepArr');
			break;
		case KeyHandler.tvKey.KEY_LEFT:
			Nav.iterateLinks('prev');	
			break;
		case KeyHandler.tvKey.KEY_RIGHT:
			Nav.iterateLinks('next');
			break;
		case KeyHandler.tvKey.KEY_ENTER:
			switch($(this.links[this.selected]).attr('id'))
			{
				case 'btnLiveArrivals':
					Nav.searchArrivals();
					break
				case 'btnLiveDepartures':
					Nav.searchDepartures();
					break
				default:
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
	$('#searchStation').removeClass('clear').attr('code','').find('input:first').val('').addClass('selected');
}
Nav.goRecentStation = function(selLink)
{
	$('#searchStation').addClass('clear').attr('code',selLink.attr('code')).find('input:first').val($('.station > h2',selLink).html());

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
		alert('???')
		Alert.show('Please choose station');
		return false;
	}
	
	//alert('search arrivals');
	if((!$('#searchStation').attr('code') || $('#searchStation').attr('code') == '') && $('input',$('#searchStation')).val() != '')
	{
		NRE.findStation($('input',$('#searchStation')).val(),function(data){
			var list = Loader.stationSearch(data);
			if(list=='')
			{
				Alert.show('Can not find any matching stations for "'+$('input',$('#searchStation')).val()+'". Please try with different keywords.')
				return false;
			}
			$('#stChTable').html(list).data('callback',function(code,text){
				$('#searchStation').attr('code',code);
				$('input',$('#searchStation')).val(text)
				Nav.searchArrivals();
			});
			KeyHandler.changeView('stationChooserPage','stChTable');
			//Scroller.init('stChTable');
			
			$('.detHeader',$('#stationChooserPage')).html('<H1>Arrivals station</H1>');
			$('#disambiguationCode',$('#stationChooserPage')).html($('input',$('#searchStation')).val())
		});
	}
	
	if(!$('#searchStation').attr('code') || $('#searchStation').attr('code') == '')
	{
		//Alert.show('Please choose station');
		return false;
	}
	else
	{
		RecentSaved.save('deparrSearch',{'from':{'code':$('#searchStation').attr('code'),'text':$('input',$('#searchStation')).val()},'arrival':true});
		
		NRE.GetArrivalBoard($('#searchStation').attr('code'),function(xmlDoc){
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
	
	if((!$('#searchStation').attr('code') || $('#searchStation').attr('code') == '') && $('input',$('#searchStation')).val() != '')
	{
		NRE.findStation($('input',$('#searchStation')).val(),function(data){
			var list = Loader.stationSearch(data);
			if(list=='')
			{
				Alert.show('Can not find any matching stations for "'+$('input',$('#searchStation')).val()+'". Please try with different keywords.')
				return false;
			}
			$('#stChTable').html(list).data('callback',function(code,text){
				$('#searchStation').attr('code',code);
				$('input',$('#searchStation')).val(text)
				Nav.searchDepartures();
			});
			KeyHandler.changeView('stationChooserPage','stChTable');
			//Scroller.init('stChTable');
			
			$('.detHeader',$('#stationChooserPage')).html('<H1>Departures station</H1>');
			$('#disambiguationCode',$('#stationChooserPage')).html($('input',$('#searchStation')).val())
		});
	}
	
	if(!$('#searchStation').attr('code') || $('#searchStation').attr('code') == '')
	{
		//Alert.show('Please choose station');
		return false;
	}
	else
	{
		RecentSaved.save('deparrSearch',{'from':{'code':$('#searchStation').attr('code'),'text':$('input',$('#searchStation')).val()},'departure':true});
		
		NRE.GetDepartureBoard($('#searchStation').attr('code'),function(xmlDoc){
			var list = Loader.DepartureBoard(xmlDoc);
			//alert(list)
			$('#departureTable').html(list);
			KeyHandler.changeView('departurePage','departureTable');
			//Scroller.init('departureTable');
			$('.detHeader',$('#departurePage')).html('<h1>' + $('#searchStation > input',$('#deparrPage')).val() + ' - departures</H1><H4>Last updated: '+(new Date()).format('HH:MM')+'</H4>')
		});
	}
}