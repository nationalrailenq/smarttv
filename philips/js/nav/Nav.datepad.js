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
	
	var field = $(Nav.links[Nav.selected]);
	var fieldId = field.attr('id');
	
	alert('fieldId::' + fieldId);
	var dp = Utils.Datepads[fieldId];
	dp.keydown(null,keycode);
	switch(keycode)
	{
		case VK_UP:
			break;
		case VK_DOWN:
			break;
		case VK_LEFT:
			break;
		case VK_RIGHT:
			break;
		case VK_ENTER:
			//Utils.DatePad(false);		
			break;
		case VK_BACK:
			//Utils.DatePad(false);	
			break;
		default:
			break;
	}
}