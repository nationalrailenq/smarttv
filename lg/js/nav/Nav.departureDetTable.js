Nav.departureDetTable = function(key)
{
	//Nav.generic(key);
	switch(key)
	{
		case 38:
			if(!Nav.iterateLinks('prev'))
			{
				KeyHandler.changeView('departureDetPage','header');
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
			//Nav.searchDeparturesDetail();
			break;
		case 404:
			//KeyHandler.viewBack(true);
			$('#searchStation').removeClass('clear').attr('data-code','').find('input:first').val('').addClass('selected');
			$('div.inputClick',$('#searchStation')).html('');
			KeyHandler.changeView('deparrPage','deparrSearch');
			break;
		case 405:
			//Nav.searchArrivals();
			break;
		default:
			break;
	}
}