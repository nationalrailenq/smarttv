Nav.datepad = function(keycode)
{
	//Nav.generic(keycode);
	
	/*
	var newEvent = document.createEvent('KeyboardEvent');
   newEvent.initKeyEvent(                                                                                      
                 "onkeydown",        //  in DOMString typeArg,                                                           
                  false,             //  in boolean canBubbleArg,                                                        
                  true,             //  in boolean cancelableArg,                                                       
                  null,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
                  false,            //  in boolean ctrlKeyArg,                                                               
                  false,            //  in boolean altKeyArg,                                                        
                  false,            //  in boolean shiftKeyArg,                                                      
                  false,            //  in boolean metaKeyArg,                                                       
                   keycode,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg); 
				   
	 $('#datePicker .sf-ui-sfDatepicker_a')[0].dispatchEvent(newEvent);
	 
	 */
//   document.getElementById('myjavaapplet').dispatchEvent(newEvent);
	
	//$("#datePicker").sfDatepickerKeyEvent();
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_UP:
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			break;
		case KeyHandler.tvKey.KEY_LEFT:
			break;
		case KeyHandler.tvKey.KEY_RIGHT:
			break;
		case KeyHandler.tvKey.KEY_ENTER:
			//Utils.DatePad(false);		
			break;
		case KeyHandler.tvKey.KEY_RETURN:
			//Utils.DatePad(false);	
			break;
		default:
			break;
	}
}