Nav.header = function(keycode)
{
	Nav.generic(keycode);
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_UP:
			break;
		case KeyHandler.tvKey.KEY_DOWN:
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
		case KeyHandler.tvKey.KEY_LEFT:
			Nav.iterateLinks('prev');	
			break;
		case KeyHandler.tvKey.KEY_RIGHT:
			Nav.iterateLinks('next');
			break;
		case KeyHandler.tvKey.KEY_ENTER:
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
		case KeyHandler.tvKey.KEY_GREEN:
		case KeyHandler.tvKey.KEY_YELLOW:
		case KeyHandler.tvKey.KEY_RED:
		case KeyHandler.tvKey.KEY_BLUE:
			switch(KeyHandler.hasPage)
			{
				case 'journeyPage':
					Nav.journeyPage(keycode);
					break;
				case 'deparrPage':
					Nav.deparrPage(keycode);
					break;
				case 'departurePage':
					Nav.departurePage(keycode);
					break;
				case 'arrivalsPage':
					Nav.arrivalPage(keycode);
					break;
				case 'departureDetPage':
					Nav.departureDetTable(keycode);
					break;
				case 'journeyResPage':
					Nav.journeyResPage(keycode);
					break;
				case 'journeyResDetPage':
					Nav.journeyResDetTable(keycode);
					break;
				case '':
					break;
			}
			break;
		default:
			break;
	}
}