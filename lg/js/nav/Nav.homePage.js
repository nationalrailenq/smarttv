Nav.homeRecentJourneys = function(keycode)
{
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_UP:
			if(!Nav.iterateLinks('prev'))
			{
				//Go Back
				KeyHandler.changeView('homePage','mainButtons');
			}
			break;
		case KeyHandler.tvKey.KEY_RIGHT:
			KeyHandler.changeView('homePage','mainButtons');
			Nav.homePage(KeyHandler.tvKey.KEY_RIGHT);
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			Nav.iterateLinks('next');
			break;
		case KeyHandler.tvKey.KEY_ENTER:	
			var selLink = $(this.links[this.selected]);
			Nav.goRecentJourney(selLink);
			break;
		default:
			break;
	}
}
Nav.homeRecentStations = function(keycode)
{
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_UP:
			if(!Nav.iterateLinks('prev'))
			{
				//Go Back
				KeyHandler.changeView('homePage','mainButtons');
			}
			break;
		case KeyHandler.tvKey.KEY_LEFT:
			KeyHandler.changeView('homePage','mainButtons');
			Nav.homePage(KeyHandler.tvKey.KEY_LEFT);
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			Nav.iterateLinks('next');
			break;
		case KeyHandler.tvKey.KEY_ENTER:	
			var selLink = $(this.links[this.selected]);
			Nav.goRecentStation(selLink);
			break;
		default:
			break;
	}
}	
Nav.homePage = function(keycode)
{
	Nav.generic(keycode);
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_UP:
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			var selLink = $(this.links[this.selected]);
			switch(selLink.attr('id'))
			{
				case 'planJourney':
					KeyHandler.changeView('homePage','homeRecentJourneys');
					break;
				case 'recentStations':
					KeyHandler.changeView('homePage','homeRecentStations');
					break;
				default:
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
			if($('#planJourney').hasClass('selected'))
			{
				Nav.resetJourneySearch();
				KeyHandler.changeView('journeyPage','journeySearch');
			}
			else
			{
				Nav.resetDepArrSearch();
				KeyHandler.changeView('deparrPage','deparrSearch');
			}
			break;
		default:
			break;
	}
}