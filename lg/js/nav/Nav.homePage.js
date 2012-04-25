Nav.homeRecentJourneys = function(key)
{
	switch(key)
	{
		case 38:
			if(!Nav.iterateLinks('prev'))
			{
				//Go Back
				KeyHandler.changeView('homePage','mainButtons');
			}
			break;
		case 39:
			KeyHandler.changeView('homePage','mainButtons');
			Nav.homePage(39);
			break;
		case 40:
			Nav.iterateLinks('next');
			break;
		case 13:	
			var selLink = $(this.links[this.selected]);
			Nav.goRecentJourney(selLink);
			break;
		default:
			break;
	}
}
Nav.homeRecentStations = function(key)
{
	switch(key)
	{
		case 38:
			if(!Nav.iterateLinks('prev'))
			{
				//Go Back
				KeyHandler.changeView('homePage','mainButtons');
			}
			break;
		case 37:
			KeyHandler.changeView('homePage','mainButtons');
			Nav.homePage(37);
			break;
		case 40:
			Nav.iterateLinks('next');
			break;
		case 13:	
			var selLink = $(this.links[this.selected]);
			Nav.goRecentStation(selLink);
			break;
		default:
			break;
	}
}	
Nav.homePage = function(key)
{
	Nav.generic(key);
	switch(key)
	{
		case 38:
			break;
		case 40:
			SS.log('40')
			var selLink = $(this.links[this.selected]);
			switch(selLink.attr('id'))
			{
				case 'planJourney':
					var links = $('#homeRecentJourneys').find('.link');
					SS.log('>>>> homeRecentJourneys Links::: ' + links.length)
					links.each(function(){
						$(this).removeClass('selected lastselected active');
					});
					KeyHandler.changeView('homePage','homeRecentJourneys');
					break;
				case 'recentStations':
					var links = $('#homeRecentStations').find('.link');
					SS.log('>>>> homeRecentStations Links::: ' + links.length)
					links.each(function(){
						$(this).removeClass('selected lastselected active');
					});
					KeyHandler.changeView('homePage','homeRecentStations');
					break;
				default:
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