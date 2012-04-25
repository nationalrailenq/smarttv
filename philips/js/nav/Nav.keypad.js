Nav.keypad = function(keycode)
{
	//alert('keypad click')
	//Nav.generic(keycode);
	switch(keycode)
	{
		case VK_1:
		case VK_2:
		case VK_3:
		case VK_4:
		case VK_5:
		case VK_6:
		case VK_7:
		case VK_8:
		case VK_9:
		case VK_0:
		case 259: //KeyHandler.tvKey.KEY_PRECH:
			//alert('em i here');
			$(this.links[this.selected]).change();			
			break;		
		case VK_UP:
			break;
		case VK_DOWN:
			var autocomplete = $('#autoComplete');
			if(autocomplete.length > 0 && autocomplete.html() != '')
			{
				//alert($('#autoComplete').html());
				KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,'autoComplete');
			}
			break;
		case VK_LEFT:
			break;
		case VK_RIGHT:
			break;
		case VK_ENTER:
			var autocomplete = $('#autoComplete');
			//Auto select if 1 item in sugest list
			if(autocomplete.length > 0 && autocomplete.html() != '')
			{
				if($('.sugestItem',autocomplete).length == 1)
				{
					KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,'autoComplete');
					Nav.autoComplete(VK_ENTER);
				}
			}
			Utils.Keypad(false);
			break;
		default:
			break;
	}
}