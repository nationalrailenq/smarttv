Nav.departureDetTable = function(keycode)
{
	//Nav.generic(keycode);
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_UP:
			if(!Nav.iterateLinks('prev'))
			{
				KeyHandler.changeView('departureDetPage','header');
			}
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			Nav.iterateLinks('next');
			break;
		case KeyHandler.tvKey.KEY_LEFT:
			break;
		case KeyHandler.tvKey.KEY_RIGHT:
			break;
		case KeyHandler.tvKey.KEY_ENTER:
			//Nav.searchDeparturesDetail();
			break;
		case KeyHandler.tvKey.KEY_GREEN:
			KeyHandler.viewBack(true);
			//$('#searchStation').attr('code','').find('input:first').val('').addClass('selected');
			//KeyHandler.changeView('deparrPage','deparrSearch');
			break;
		case KeyHandler.tvKey.KEY_YELLOW:
			//Nav.searchArrivals();
			break;
		default:
			break;
	}
}