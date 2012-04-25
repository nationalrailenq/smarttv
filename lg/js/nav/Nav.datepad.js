Nav.datepad = function(key)
{
	//Nav.generic(key);
	
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
                   key,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg); 
				   
	 $('#datePicker .sf-ui-sfDatepicker_a')[0].dispatchEvent(newEvent);
	 
	 */
//   document.getElementById('myjavaapplet').dispatchEvent(newEvent);
	
	//$("#datePicker").sfDatepickerKeyEvent();
	
	var field = $(Nav.links[Nav.selected]);
	var fieldId = field.attr('id');
	
	SS.log('fieldId::' + fieldId);
	var dp = Utils.Datepads[fieldId];
	dp.keydown(null,key);
	switch(key)
	{
		case 38:
			break;
		case 40:
			break;
		case 37:
			break;
		case 39:
			break;
		case 13:
			//Utils.DatePad(false);		
			break;
		case 461:
			//Utils.DatePad(false);	
			break;
		default:
			break;
	}
}