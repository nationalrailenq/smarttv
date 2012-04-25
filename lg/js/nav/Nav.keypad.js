Nav.tools = 0;
Nav.keypad = function(key)
{
	//SS.log('keypad click')
	//Nav.generic(key);75
        if(SS.device == 'samsung')
        {
            if(key==75)
            {
                key = HASH(0x861f120);
            }
        };
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
			//SS.log('em i here');
			$(this.links[this.selected]).change();			
			break;		
		case 38:
			if(SS.device == 'philips')
			{
				Autocomplete.hide($(Nav.links[Nav.selected]));
				Utils.Keypad(false);
				$('#autoComplete').hide();
				KeyHandler.processKey(key);
			}
			break;
		case 40:
                        if(Nav.tools==1)
                        {
                            return;
                        };
			SS.log('########### Nav.keypad >>> 40 ########')
			var autocomplete = $('#autoComplete');
                        
			if(autocomplete.length > 0 && autocomplete.html() != '')
			{
				//SS.log($('#autoComplete').html());
				KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,'autoComplete');
			}
			else
			{
				if(SS.device == 'philips')
				{
					Autocomplete.hide($(Nav.links[Nav.selected]));
					Utils.Keypad(false);
					$('#autoComplete').hide();
					KeyHandler.processKey(key);
				}
			}
			break;
		case 37:
			return false;
			break;
		case 39:
			
			break;
                case HASH(0x861f120):
                    if(Nav.tools==0)
                    {
                        Nav.tools = 1;
                    }
                    break;
		case 461:
			if(SS.device != 'philips')
			{
                            if(Nav.tools==0)
                            {
				Autocomplete.hide($(Nav.links[Nav.selected]));
				Utils.Keypad(false);
				$('#autoComplete').hide();
                            }
                            else
                            {
                                Nav.tools = 0;
                            }
			}
			break;
		case 13:
			SS.log('keypad ENTER');
			if(SS.device != 'philips')
			{
                            if(Nav.tools==0)
                            {
				var autocomplete = $('#autoComplete');
				//Auto select if 1 item in sugest list
				
				if(autocomplete.length > 0 && autocomplete.html() != '' && $('input',$(Nav.links[Nav.selected])).val() != '')
				{
					if($('.sugestItem',autocomplete).length == 1)
					{
						KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,'autoComplete');
						Nav.autoComplete(13);
					}
				}
				Autocomplete.hide($(Nav.links[Nav.selected]));
				Utils.Keypad(false);
				$('#autoComplete').hide();
                            }
                            else
                            {
                                Nav.tools=0;
                            }
			}
			break;
		default:
			break;
	}
}