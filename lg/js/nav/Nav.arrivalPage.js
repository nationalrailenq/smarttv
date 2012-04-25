Nav.arrivalPage = function(key)
{
	//Nav.generic(key);
	switch(key)
	{
		case 38:
			if(!Nav.iterateLinks('prev'))
			{
				KeyHandler.changeView('arrivalsPage','header');
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
			Nav.searchDepartures();
			break;
		default:
			break;
	}
}