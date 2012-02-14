Nav.keypad = function(keycode)
{
	//alert('keypad click')
	//Nav.generic(keycode);
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_1:
		case KeyHandler.tvKey.KEY_2:
		case KeyHandler.tvKey.KEY_3:
		case KeyHandler.tvKey.KEY_4:
		case KeyHandler.tvKey.KEY_5:
		case KeyHandler.tvKey.KEY_6:
		case KeyHandler.tvKey.KEY_7:
		case KeyHandler.tvKey.KEY_8:
		case KeyHandler.tvKey.KEY_9:
		case KeyHandler.tvKey.KEY_0:
		case KeyHandler.tvKey.KEY_PRECH:
			$(this.links[this.selected]).change();			
			break;		
		case KeyHandler.tvKey.KEY_UP:
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			var autocomplete = $('#autoComplete');
			if(autocomplete.length > 0 && autocomplete.html() != '')
			{
				alert($('#autoComplete').html());
				KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,'autoComplete');
			}
			break;
		case KeyHandler.tvKey.KEY_LEFT:
			break;
		case KeyHandler.tvKey.KEY_RIGHT:
			break;
		case KeyHandler.tvKey.KEY_ENTER:
			var autocomplete = $('#autoComplete');
			//Auto select if 1 item in sugest list
			if(autocomplete.length > 0 && autocomplete.html() != '')
			{
				if($('.sugestItem',autocomplete).length == 1)
				{
					KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,'autoComplete');
					Nav.autoComplete(KeyHandler.tvKey.KEY_ENTER);
				}
			}
			Utils.Keypad(false);
			break;
		default:
			break;
	}
}