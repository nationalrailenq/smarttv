Nav.departurePage = function(key)
{
	//Nav.generic(key);
	switch(key)
	{
		case 38:
			if(!Nav.iterateLinks('prev'))
			{
				KeyHandler.changeView('departurePage','header');
			}
			break;
		case 40:
			Nav.iterateLinks('next');
			break;
		case 37:
			break;
		case 39:
			break;
		case 13:
			Nav.searchDeparturesDetail();
			break;
		case 404:
			$('#searchStation').removeClass('clear').attr('data-code','').find('input:first').val('').addClass('selected');
			$('div.inputClick',$('#searchStation')).html('');
			KeyHandler.changeView('deparrPage','deparrSearch');
			break;
		case 405:
			Nav.searchArrivals();
			break;
		default:
			break;
	}
}

Nav.searchDeparturesDetail = function()
{
	//SS.log('search departures details:::' + $(this.links[this.selected]).attr('id') + '>>>' + $(this.links[this.selected]).attr('serviceID'));
	
	NRE.GetServiceDetails($(this.links[this.selected]).attr('serviceID'),function(xmlDoc){
		//SS.log('got service det')
		var list = Loader.ServiceDetails(xmlDoc);
		if($('ul.error',$('<div>'+list+'</div>')).length <= 0)
		{
			//SS.log(list)
			$('#departureDetTable').html(list);
			//SS.log('change view');
			KeyHandler.changeView('departureDetPage','departureDetTable');
			//Scroller.init('departureDetTable');
			
			
			$('.detHeader',$('#departureDetPage')).html('<H1>' + $('ul.link:first > li.col2',$('#departureDetTable')).find('h2:first').html() + ' to ' + $('ul.link:last > li.col2',$('#departureDetTable')).find('h2:first').html() + '</H1><H4>Last updated: '+(new Date()).format('HH:MM')+'</H4>')
		}
		else
		{
			Alert.show($('ul.error > li',$('<div>'+list+'</div>')).html());
		}
	});
}