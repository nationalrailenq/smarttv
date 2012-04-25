Nav.departurePage = function(keycode)
{
	//Nav.generic(keycode);
	switch(keycode)
	{
		case VK_UP:
			if(!Nav.iterateLinks('prev'))
			{
				KeyHandler.changeView('departurePage','header');
			}
			break;
		case VK_DOWN:
			Nav.iterateLinks('next');
			break;
		case VK_LEFT:
			break;
		case VK_RIGHT:
			break;
		case VK_ENTER:
			Nav.searchDeparturesDetail();
			break;
		case VK_GREEN:
			$('#searchStation').attr('data-code','').find('input:first').val('').addClass('selected');
			KeyHandler.changeView('deparrPage','deparrSearch');
			break;
		case VK_YELLOW:
			Nav.searchArrivals();
			break;
		default:
			break;
	}
}

Nav.searchDeparturesDetail = function()
{
	//alert('search departures details:::' + $(this.links[this.selected]).attr('id') + '>>>' + $(this.links[this.selected]).attr('serviceID'));
	
	NRE.GetServiceDetails($(this.links[this.selected]).attr('serviceID'),function(xmlDoc){
		//alert('got service det')
		var list = Loader.ServiceDetails(xmlDoc);
		if($('ul.error',$('<div>'+list+'</div>')).length <= 0)
		{
			//alert(list)
			$('#departureDetTable').html(list);
			//alert('change view');
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