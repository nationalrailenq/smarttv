Nav.autoComplete = function(keycode)
{
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
			KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,'keypad');
			Nav.keypad(keycode);
			break;
		case KeyHandler.tvKey.KEY_UP:
			Nav.iterateLinks('prev');	
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			Nav.iterateLinks('next');
			break;
		case KeyHandler.tvKey.KEY_LEFT:
			break;
		case KeyHandler.tvKey.KEY_RIGHT:
			break;
		case KeyHandler.tvKey.KEY_ENTER:
			$(this.links[this.selected]).attr('code',$(this.sublinks[this.subselected]).attr('code')).children('input')
			.val($(this.sublinks[this.subselected]).attr('text'));
			//$('#autoComplete').hide();//
			Autocomplete.hide($(Nav.links[Nav.selected]));
			Utils.Keypad(false);
			$('#autoComplete').hide();
			break;
		default:
			break;
	}
}