Nav.arrivalPage = function(keycode)
{
	//Nav.generic(keycode);
	switch(keycode)
	{
		case VK_UP:
			if(!Nav.iterateLinks('prev'))
			{
				KeyHandler.changeView('arrivalsPage','header');
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
			Nav.searchDepartures();
			break;
		default:
			break;
	}
}