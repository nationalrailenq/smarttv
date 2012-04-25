Nav.homeRecentJourneys = function(keycode)
{
	switch(keycode)
	{
		case VK_UP:
			if(!Nav.iterateLinks('prev'))
			{
				//Go Back
				KeyHandler.changeView('homePage','mainButtons');
			}
			break;
		case VK_RIGHT:
			KeyHandler.changeView('homePage','mainButtons');
			Nav.homePage(VK_RIGHT);
			break;
		case VK_DOWN:
			Nav.iterateLinks('next');
			break;
		case VK_ENTER:	
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
		case VK_UP:
			if(!Nav.iterateLinks('prev'))
			{
				//Go Back
				KeyHandler.changeView('homePage','mainButtons');
			}
			break;
		case VK_LEFT:
			KeyHandler.changeView('homePage','mainButtons');
			Nav.homePage(VK_LEFT);
			break;
		case VK_DOWN:
			Nav.iterateLinks('next');
			break;
		case VK_ENTER:	
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
		case VK_UP:
			break;
		case VK_DOWN:
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
		case VK_LEFT:
			Nav.iterateLinks('prev');	
			break;
		case VK_RIGHT:
			Nav.iterateLinks('next');
			break;
		case VK_ENTER:
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