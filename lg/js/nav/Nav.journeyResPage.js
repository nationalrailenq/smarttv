Nav.journeyResEarlierLater = function(key)
{
	switch(key)
	{
		case 37:
			if(KeyHandler.hasView == 'laterreturn')
			{
				KeyHandler.changeView('journeyResPage','lateroutward');
			}
			else if(KeyHandler.hasView == 'earlierreturn')
			{
				KeyHandler.changeView('journeyResPage','earlieroutward');
			}
			break;
		case 39:
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
		case 38:
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
		case 40:
			if(KeyHandler.hasView == 'earlieroutward')
			{
				KeyHandler.changeView('journeyResPage','outTable');
			}
			else if(KeyHandler.hasView == 'earlierreturn')
			{
				KeyHandler.changeView('journeyResPage','retTable');
			}
			break;
		case 13:			
			Nav.journeyResPageEnter();
			break;
		case 404:
		case 405:
		case 403:
		case 406:
			Nav.journeyResPage(key);
			break;
		default:
			break;
	}
}
Nav.journeyResPage = function(key)
{
	//Nav.generic(key);
	switch(key)
	{
		case 38:
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
		case 40:
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
		case 37:
			if(KeyHandler.hasView == 'retTable' || KeyHandler.hasView == 'addReturnView')
			{
				KeyHandler.changeView('journeyResPage','outTable');
			}
			break;
		case 39:
			if(KeyHandler.hasView == 'outTable' && !$('#retTable').hasClass('hidden'))
			{
				KeyHandler.changeView('journeyResPage','retTable');
			}
			else if(KeyHandler.hasView == 'outTable')
			{
				KeyHandler.changeView('journeyResPage','addReturnView');
			}
			break;
		case 13:
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
		case 404:
			SS.log('GREEN');
			//Amend journey detail
			KeyHandler.changeView('journeyPage','journeySearch');
			break;
		case 405:
			SS.log('GREEN');
			//Plan new journey
			$('.link:not(#fromStation)',$('#journeySearch')).removeClass('selected, lastselected, active');
			$('#fromStation',$('#journeySearch')).attr('data-code','').addClass('selected');
			$('#fromStation > input:first',$('#journeySearch')).val('');
			$('#fromStation').removeClass('clear');
			$('div.inputClick',$('#fromStation')).html('');
			
			$('#toStation',$('#journeySearch')).attr('data-code','');
			$('#toStation > input:first',$('#journeySearch')).val('');
			$('#toStation').removeClass('clear');
			$('div.inputClick',$('#toStation')).html('');
			
			KeyHandler.changeView('journeyPage','journeySearch');
			break;
		default:
			break;
	}
}
Nav.journeyResDetTable = function(key)
{
	switch(key)
	{
		case 38:
			if(!Nav.iterateLinks('prev'))
			{
				KeyHandler.changeView('journeyResDetPage','header');
			}
			break;
		case 40:
			if(!Nav.iterateLinks('next'))
			{
				
			}
			break;
		case 37:
			break;
		case 39:
			break;
		case 13:
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
				if(selLink.attr('data-jsonSrvBul') != '')
				{
					var o = $.parseJSON(unescape(selLink.attr('data-jsonSrvBul')));
					selLink.attr('data-jsonSrvBul')
					SS.log('ENTER+' + unescape(selLink.attr('data-jsonSrvBul')));
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
		SS.log('????' + selLink.attr('data-jsonsrvbul'))
		var jsonsrvbul = '';
		jsonsrvbul = selLink.attr('data-jsonsrvbul');
		var html = Loader.RealtimeJourneyPlanDet(obj,(jsonsrvbul!=''?jsonsrvbul:null));
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
			SS.log('aaa::'+j)
			Loader.getFullNameForCode(
				Loader.RealtimeJourneyPlanDetails[ident][i][j].origin,
				ident,i,j,
				function(name,nident,ni,nj){
					Loader.RealtimeJourneyPlanDetails[nident][ni][nj].origin = name;
					countLoaded--;
					if(countLoaded <= 0) { goToDetail(); KeyHandler.blocked = false; }
					//SS.log('aaabbb::'+countLoaded)
				}
			);
			Loader.getFullNameForCode(
				Loader.RealtimeJourneyPlanDetails[ident][i][j].destination,
				ident,i,j,
				function(name,nident,ni,nj){ 
					Loader.RealtimeJourneyPlanDetails[nident][ni][nj].destination = name;
					countLoaded--;
					if(countLoaded <= 0) { goToDetail(); KeyHandler.blocked = false; }
					//SS.log('aaabbb::'+countLoaded)
				}
			);
		});
	}
	
}
Nav.journeyResPageEnter = function()
{
	var outDate = Utils.interval15min($('#outTable').data('date') ? $('#outTable').data('date') : $('#outDate').data('date'));
	var retDate = Utils.interval15min($('#retTable').data('date') ? $('#retTable').data('date') : $('#retDate').data('date'));
	
	////SS.log('outDate' + outDate)
	
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
	var fromGrp = !isNaN(parseInt($('#fromStation').attr('data-code')));
	var toGrp = !isNaN(parseInt($('#toStation').attr('data-code')));
	NRE.GetRealtimeJourneyPlanRequest($('#fromStation').attr('data-code'),fromGrp, $('#toStation').attr('data-code'),toGrp, Utils.GetUTCTimestamp(outDate), $('#fastTrains').hasClass('checked'), function(xmlDoc){
		var list = Loader.RealtimeJourneyPlan(xmlDoc,'out');
		//SS.log('out::' + $('ul.error',$('<div>'+list+'</div>')).length + '---' + list);
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
				var fromGrp = !isNaN(parseInt($('#fromStation').attr('data-code')));
				var toGrp = !isNaN(parseInt($('#toStation').attr('data-code')));
				NRE.GetRealtimeJourneyPlanRequest($('#toStation').attr('data-code'),toGrp, $('#fromStation').attr('data-code'),fromGrp, Utils.GetUTCTimestamp(retDate), $('#fastTrains').hasClass('checked'), function(xmlDoc){
					var list = Loader.RealtimeJourneyPlan(xmlDoc,'ret');
					//SS.log('ret::' + $('ul.error',$('<div>'+list+'</div>')).length + '---' + list);
					
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