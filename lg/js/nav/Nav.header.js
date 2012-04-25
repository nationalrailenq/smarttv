Nav.header = function(key)
{
	Nav.generic(key);
	switch(key)
	{
		case 38:
			break;
		case 40:
			switch(KeyHandler.hasPage)
			{
				case 'journeyPage':
					KeyHandler.changeView('journeyPage','journeySearch');
					break;
				case 'deparrPage':
					KeyHandler.changeView('deparrPage','deparrSearch');
					break;
				case 'departurePage':
					KeyHandler.changeView('departurePage','departureTable');
					break;
				case 'arrivalsPage':
					KeyHandler.changeView('arrivalsPage','arrivalTable');
					break;
				case 'departureDetPage':
					KeyHandler.changeView('departureDetPage','departureDetTable');
					break;
				case 'journeyResPage':
					KeyHandler.changeView('journeyResPage','outTable');
					break;
				case 'journeyResDetPage':
					KeyHandler.changeView('journeyResDetPage','journeyResDetTable');
					break;
				case '':
					break;
			}
			
			break;
		case 37:
			Nav.iterateLinks('prev');	
			break;
		case 39:
			Nav.iterateLinks('next');
			break;
		case 13:
			var selLink = $(this.links[this.selected]);
			switch(selLink.attr('id'))
			{
				case 'menujourneyPage':
					if(KeyHandler.hasPage != 'journeyPage') Nav.resetJourneySearch();
					KeyHandler.changeView('journeyPage','journeySearch');
					break;
				case 'menudeparrPage':
					if(KeyHandler.hasPage != 'deparrPage') Nav.resetDepArrSearch();
					KeyHandler.changeView('deparrPage','deparrSearch');
					break;
				default:
					break;
			}
			break;
		case 404:
		case 405:
		case 403:
		case 406:
			switch(KeyHandler.hasPage)
			{
				case 'journeyPage':
					Nav.journeyPage(key);
					break;
				case 'deparrPage':
					Nav.deparrPage(key);
					break;
				case 'departurePage':
					Nav.departurePage(key);
					break;
				case 'arrivalsPage':
					Nav.arrivalPage(key);
					break;
				case 'departureDetPage':
					Nav.departureDetTable(key);
					break;
				case 'journeyResPage':
					Nav.journeyResPage(key);
					break;
				case 'journeyResDetPage':
					Nav.journeyResDetTable(key);
					break;
				case '':
					break;
			}
			break;
		default:
			break;
	}
}