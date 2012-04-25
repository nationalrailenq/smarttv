Nav.autoComplete = function(keycode)
{
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
			KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,'keypad');
			Nav.keypad(keycode);
			break;
		case VK_UP:
			Nav.iterateLinks('prev');	
			break;
		case VK_DOWN:
			Nav.iterateLinks('next');
			break;
		case VK_LEFT:
			break;
		case VK_RIGHT:
			break;
		case VK_ENTER:
			//alert('Autocomplete Enter>>'+$(this.sublinks[this.subselected]).attr('code'));
			$(this.links[this.selected]).attr('data-code',$(this.sublinks[this.subselected]).attr('data-code')).children('input')
			.val($(this.sublinks[this.subselected]).attr('text'));
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