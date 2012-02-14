Nav.journeyResEarlierLater = function(keycode)
{
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_LEFT:
			if(KeyHandler.hasView == 'laterreturn')
			{
				KeyHandler.changeView('journeyResPage','lateroutward');
			}
			else if(KeyHandler.hasView == 'earlierreturn')
			{
				KeyHandler.changeView('journeyResPage','earlieroutward');
			}
			break;
		case KeyHandler.tvKey.KEY_RIGHT:
			if(!$('#retTable').hasClass('hidden'))
			{			
				if(KeyHandler.hasView == 'lateroutward')
				{
					KeyHandler.changeView('journeyResPage','laterreturn');
				}
				else if(KeyHandler.hasView == 'earlieroutward')
				{
					KeyHandler.changeView('journeyResPage','earlierreturn');
				}
			}
			else if(KeyHandler.hasView == 'lateroutward' || KeyHandler.hasView == 'earlieroutward')
			{
				KeyHandler.changeView('journeyResPage','addReturnView');
			}
			break;
		case KeyHandler.tvKey.KEY_UP:
			if(KeyHandler.hasView == 'lateroutward')
			{
				KeyHandler.changeView('journeyResPage','outTable');
			}
			else if(KeyHandler.hasView == 'laterreturn')
			{
				KeyHandler.changeView('journeyResPage','retTable');
			}
			else if(KeyHandler.hasView == 'earlieroutward' || KeyHandler.hasView == 'earlierreturn')
			{
				KeyHandler.changeView('journeyResPage','header');
			}
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			if(KeyHandler.hasView == 'earlieroutward')
			{
				KeyHandler.changeView('journeyResPage','outTable');
			}
			else if(KeyHandler.hasView == 'earlierreturn')
			{
				KeyHandler.changeView('journeyResPage','retTable');
			}
			break;
		case KeyHandler.tvKey.KEY_ENTER:			
			Nav.journeyResPageEnter();
			break;
		case KeyHandler.tvKey.KEY_GREEN:
		case KeyHandler.tvKey.KEY_YELLOW:
		case KeyHandler.tvKey.KEY_RED:
		case KeyHandler.tvKey.KEY_BLUE:
			Nav.journeyResPage(keycode);
			break;
		default:
			break;
	}
}
Nav.journeyResPage = function(keycode)
{
	//Nav.generic(keycode);
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_UP:
			if(KeyHandler.hasView == 'addReturnView')
			{
				KeyHandler.changeView('journeyResPage','header');
			}
			else if(!Nav.iterateLinks('prev'))
			{
				if(KeyHandler.hasView == 'retTable')
				{
					KeyHandler.changeView('journeyResPage','earlierreturn');
				}
				else
				{
					KeyHandler.changeView('journeyResPage','earlieroutward');
				}
			}
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			if(!Nav.iterateLinks('next'))
			{
				if(KeyHandler.hasView == 'retTable')
				{
					KeyHandler.changeView('journeyResPage','laterreturn');
				}
				else
				{
					KeyHandler.changeView('journeyResPage','lateroutward');
				}
			}
			break;
		case KeyHandler.tvKey.KEY_LEFT:
			if(KeyHandler.hasView == 'retTable' || KeyHandler.hasView == 'addReturnView')
			{
				KeyHandler.changeView('journeyResPage','outTable');
			}
			break;
		case KeyHandler.tvKey.KEY_RIGHT:
			if(KeyHandler.hasView == 'outTable' && !$('#retTable').hasClass('hidden'))
			{
				KeyHandler.changeView('journeyResPage','retTable');
			}
			else if(KeyHandler.hasView == 'outTable')
			{
				KeyHandler.changeView('journeyResPage','addReturnView');
			}
			break;
		case KeyHandler.tvKey.KEY_ENTER:
			if(KeyHandler.hasView == 'addReturnView')
			{
				Nav.addReturn($('#addReturn.link'));
				Nav.planJourney();
			}
			else if(KeyHandler.hasView == 'outTable' || KeyHandler.hasView == 'retTable')
			{
				Nav.journeyResPageDetail();
			}
			
			break;
		case KeyHandler.tvKey.KEY_GREEN:
			alert('GREEN');
			//Amend journey detail
			KeyHandler.changeView('journeyPage','journeySearch');
			break;
		case KeyHandler.tvKey.KEY_YELLOW:
			alert('GREEN');
			//Plan new journey
			$('.link:not(#fromStation)',$('#journeySearch')).removeClass('selected, lastselected, active');
			$('#fromStation',$('#journeySearch')).attr('code','').addClass('selected');
			$('#fromStation > input:first',$('#journeySearch')).val('');
			
			$('#toStation',$('#journeySearch')).attr('code','');
			$('#toStation > input:first',$('#journeySearch')).val('');
			
			KeyHandler.changeView('journeyPage','journeySearch');
			break;
		default:
			break;
	}
}
Nav.journeyResDetTable = function(keycode)
{
	switch(keycode)
	{
		case KeyHandler.tvKey.KEY_UP:
			if(!Nav.iterateLinks('prev'))
			{
				KeyHandler.changeView('journeyResDetPage','header');
			}
			break;
		case KeyHandler.tvKey.KEY_DOWN:
			if(!Nav.iterateLinks('next'))
			{
				
			}
			break;
		case KeyHandler.tvKey.KEY_LEFT:
			break;
		case KeyHandler.tvKey.KEY_RIGHT:
			break;
		case KeyHandler.tvKey.KEY_ENTER:
			selLink = $(Nav.links[Nav.selected]);
			if(selLink.find('.col6:first').hasClass('CANCELLED'))
			{
				
			}
			if(selLink.find('.col6:first').hasClass('ATENTION') || selLink.find('.col6:first').hasClass('CANCELLED') || selLink.find('.col6:first').hasClass('DELAYED'))
			{
				selLink.parent().find('.expanded').remove();
				if(selLink.find('.col6:first').hasClass('exp'))
				{
					selLink.find('.col6:first').removeClass('exp');
					if(selLink.next('ul').hasClass('expanded')) {
						selLink.next('ul').remove();
					}
					if(KeyHandler.hasView) Scroller.init(KeyHandler.hasView);
					return false;
				}
				selLink.find('.col6:first').addClass('exp');
				//var o = {"title":"ScotRail Sleeper Trains - Fares Information","description":"All fares shown include seated accommodation ONLY, reservations are compulsory and travel cannot be guaranteed if reservations are not made in advance. For information on fares that include sleeper berth accommodation, please visit www.scotrail.co.uk or telephone 08457 550 033.","disruption":"false","alert":"false","cleared":"false"}

				var msg = '';
				if(selLink.find('.col6:first').hasClass('CANCELLED'))
				{
					msg += 'Train was cancelled';
				}
				if(selLink.find('.col6:first').hasClass('DELAYED'))
				{
					msg += 'Train was delayed';
				}
				if(selLink.attr('jsonSrvBul') != '')
				{
					var o = $.parseJSON(unescape(selLink.attr('jsonSrvBul')));
					selLink.attr('jsonSrvBul')
					alert('ENTER+' + unescape(selLink.attr('jsonSrvBul')));
					msg = o.description;
				}
				if(selLink.attr('ungrd') != '')
				{
					msg += (msg==''?'':'<br/>')+selLink.attr('ungrd');
				}
				selLink.parent().find('.expanded').remove();
				if(selLink.next('ul').hasClass('expanded')) {
					selLink.next('ul').remove();
				}
				selLink.after('<ul class="expanded"><li><h4>'+msg+'</h4></li></ul>');
				if(KeyHandler.hasView) Scroller.init(KeyHandler.hasView);
			}
			break;
		default:
			break;
	}
}
Nav.journeyResPageDetail = function()
{
	selLink = $(Nav.links[Nav.selected]);
	
	$('.search_pane.sml:first','#journeyResDetPage').html($('.search_pane.sml:first','#journeyResPage').html());

	var obj = null;
	var skipnames = false;
	if(selLink.attr('obj'))
	{
		obj = $.parseJSON( unescape( selLink.attr('obj') ) );
		skipnames = true;
	}
	else
	{
		var ident = selLink.attr('id').split('_')[0];
		var i = parseInt(selLink.attr('id').split('_')[1]);
		obj = Loader.RealtimeJourneyPlanDetails[ident][i];
		selLink.attr('obj',escape(JSON.stringify(obj)));
		skipnames = false;
	}
	
	var countLoaded = obj.length*2;
	
	var goToDetail = function()
	{
		selLink.attr('obj',escape(JSON.stringify(obj)));
		var html = Loader.RealtimeJourneyPlanDet(obj,(selLink.attr('jsonSrvBul')!=''?selLink.attr('jsonSrvBul'):null));
		$('#journeyResDetTable').html(html);
		
		if(KeyHandler.hasView == 'outTable')
		{
			$('#outHeader.detHeader:first','#journeyResDetPage').html('<h2>Outward journey</h2>');
		}
		else if(KeyHandler.hasView == 'retTable')
		{
			$('#outHeader.detHeader:first','#journeyResDetPage').html('<h2>Return journey</h2>');
		}
		
		KeyHandler.changeView('journeyResDetPage','journeyResDetTable');
	}
	
	if(skipnames)
	{
		goToDetail();
		KeyHandler.blocked = false
	}
	else
	{
		KeyHandler.blocked = true;
		//Load full names from codes
		$.each(obj,function(j,val){
			alert('aaa::'+j)
			Loader.getFullNameForCode(
				Loader.RealtimeJourneyPlanDetails[ident][i][j].origin,
				ident,i,j,
				function(name,nident,ni,nj){
					Loader.RealtimeJourneyPlanDetails[nident][ni][nj].origin = name;
					countLoaded--;
					if(countLoaded <= 0) { goToDetail(); KeyHandler.blocked = false; }
					alert('aaabbb::'+countLoaded)
				}
			);
			Loader.getFullNameForCode(
				Loader.RealtimeJourneyPlanDetails[ident][i][j].destination,
				ident,i,j,
				function(name,nident,ni,nj){ 
					Loader.RealtimeJourneyPlanDetails[nident][ni][nj].destination = name;
					countLoaded--;
					if(countLoaded <= 0) { goToDetail(); KeyHandler.blocked = false; }
					alert('aaabbb::'+countLoaded)
				}
			);
		});
	}
	
}
Nav.journeyResPageEnter = function()
{
	var outDate = Utils.interval15min($('#outTable').data('date') ? $('#outTable').data('date') : $('#outDate').data('date'));
	var retDate = Utils.interval15min($('#retTable').data('date') ? $('#retTable').data('date') : $('#retDate').data('date'));
	
	////alert('outDate' + outDate)
	
	if(KeyHandler.hasView == 'lateroutward')
	{
		var newDate = outDate.DateAdd('h',1);
		outDate = (newDate < new Date() ? outDate : (newDate > (new Date()).DateAdd('d',82) ? outDate : newDate));
	}
	else if(KeyHandler.hasView == 'laterreturn')
	{
		var newDate = retDate.DateAdd('h',1);
		retDate = (newDate < new Date() ? retDate : (newDate > (new Date()).DateAdd('d',82) ? retDate : newDate));
	}
	else if(KeyHandler.hasView == 'earlieroutward')
	{
		var newDate = outDate.DateSubstract('h',1);
		outDate = (newDate < new Date() ? outDate : (newDate > (new Date()).DateAdd('d',82) ? outDate : newDate));
	}
	else if(KeyHandler.hasView == 'earlierreturn')
	{
		var newDate = retDate.DateSubstract('h',1);
		retDate = (newDate < new Date() ? retDate : (newDate > (new Date()).DateAdd('d',82) ? retDate : newDate));
	}
	var fromGrp = !isNaN(parseInt($('#fromStation').attr('code')));
	var toGrp = !isNaN(parseInt($('#toStation').attr('code')));
	NRE.GetRealtimeJourneyPlanRequest($('#fromStation').attr('code'),fromGrp, $('#toStation').attr('code'),toGrp, Utils.GetUTCTimestamp(outDate), $('#fastTrains').hasClass('checked'), function(xmlDoc){
		var list = Loader.RealtimeJourneyPlan(xmlDoc,'out');
		//alert('out::' + $('ul.error',$('<div>'+list+'</div>')).length + '---' + list);
		//Set times
		
		if($('ul.error',$('<div>'+list+'</div>')).length <= 0)
		{
			$('#outTable').data('date',outDate);
			
			$('#h_date',$('#journeyResPage')).html($('#outTable').data('date').format('dd mmm yyyy'));
			$('#h_time',$('#journeyResPage')).html($('#outTable').data('date').format('HH:MM'));
			
			$('#outDate').data('date',outDate).parents('td:first').find('.dt').html(outDate.format("dd mmm yyyy"));
			$('#outDate').data('date',outDate).parents('td:first').find('.tm').html(outDate.format("HH:MM"));
			//End Set times
			$('#outTable').html(list);
			
			//KeyHandler.changeView('journeyResPage','outTable');
			
			if($('#addReturn').hasClass('checked'))
			{
				//Return
				var fromGrp = !isNaN(parseInt($('#fromStation').attr('code')));
				var toGrp = !isNaN(parseInt($('#toStation').attr('code')));
				NRE.GetRealtimeJourneyPlanRequest($('#toStation').attr('code'),toGrp, $('#fromStation').attr('code'),fromGrp, Utils.GetUTCTimestamp(retDate), $('#fastTrains').hasClass('checked'), function(xmlDoc){
					var list = Loader.RealtimeJourneyPlan(xmlDoc,'ret');
					//alert('ret::' + $('ul.error',$('<div>'+list+'</div>')).length + '---' + list);
					
					if($('ul.error',$('<div>'+list+'</div>')).length <= 0)
					{
						$('#retTable').data('date',retDate)
						
						$('#h_retdate',$('#journeyResPage')).html($('#retTable').data('date').format('dd mmm yyyy'));
						$('#h_rettime',$('#journeyResPage')).html($('#retTable').data('date').format('HH:MM'));
						
						$('#retDate').data('date',retDate).parents('td:first').find('.dt').html(retDate.format("dd mmm yyyy"));
						$('#retDate').data('date',retDate).parents('td:first').find('.tm').html(retDate.format("HH:MM"));
						//KeyHandler.changeView('journeyResPage','retTable');
						
						$('#retTable').removeClass('hidden').parents('.grid:first').show();
						$('.earlier.return, .later.return').show();
					
						$('#retTable').html(list);
					}
					else
					{
						Alert.show($('ul.error > li',$('<div>'+list+'</div>')).html());
					}
				});
			}
			else
			{
				$('#h_retdate',$('#journeyResPage')).html('-');
				$('#h_rettime',$('#journeyResPage')).html('-');
			
				$('#retTable').addClass('hidden').parents('.grid:first').hide();
				$('.earlier.return, .later.return').hide();
			}
		}
		else
		{
			Alert.show($('ul.error > li',$('<div>'+list+'</div>')).html());
		}
	});
}