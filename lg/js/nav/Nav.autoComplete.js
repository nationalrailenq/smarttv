Nav.autoComplete = function(key)
{
	SS.log('Go into autocomplete ::' + key);
	
	//Nav.generic(key);
	switch(key)
	{
		case 49:
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
		case 48:
		//case 259: //KeyHandler.tvKey.KEY_PRECH:
			KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,'keypad');
			Nav.keypad(key);
			break;
		case 38:
			if(!Nav.iterateLinks('prev'))
			{
				KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,'keypad');
			}	
			break;
		case 40:
			Nav.iterateLinks('next');
			break;
		case 37:
			break;
		case 39:
			break;
		case 461:
			if(SS.device != 'philips')
			{
				SS.log('Autocomplete KEY_RETURN');
				Autocomplete.hide($(Nav.links[Nav.selected]));
				Utils.Keypad(false);
				$('#autoComplete').hide();
			}			
			break;
		case 13:
			
			SS.log('Autocomplete ENTER');
		
			$(this.links[this.selected]).attr('data-code',$(this.sublinks[this.subselected]).attr('data-code')).children('input')
			.val($(this.sublinks[this.subselected]).attr('text'));
			
			$('div.inputClick',$(this.links[this.selected])).html($(this.sublinks[this.subselected]).attr('text'));
			//$('#autoComplete').hide();//
			Autocomplete.hide($(Nav.links[Nav.selected]));
			Utils.Keypad(false);
			$('#autoComplete').hide();
			$('#toStation').show();
			break;
		default:
			break;
	}
}