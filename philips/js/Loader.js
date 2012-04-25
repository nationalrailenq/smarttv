var Loader = {
		reported:false 
};
Loader.Each = function(service, proccess) {
	var service = service.getElementsByTagName("service");
	for (var i = 0; i < service.length; i++) {
		proccess(service[i],i);
	}
}
Loader.GetServices = function(xmlDoc){
	try
	{
		var services = [];
		var srvc = xmlDoc.documentElement.getElementsByTagName("service");
		for (var i = 0; i < srvc.length; i++) {
			var exists = false;
			$.each(services,function(key,val){
				if(val.name == srvc[i].parentNode.nodeName)
				{
					exists = true;
					return false;
				}
			});
			if(!exists)	services.push( {'name':srvc[i].parentNode.nodeName,'node':srvc[i].parentNode} );;
		}
		if(services.length > 1)
		{
			$.each(services, function(key, catServices)
			{
				var catName = catServices.name;
				catName = catName.substr(0,1).toUpperCase() + catName.substr(1).toLowerCase();
				catName = catName.substring(0, catName.length-8);
				catServices.name = catName;
			});
		}
		return services;
	}
	catch(e)
	{
		Alert.show(e);
	}
}
Loader.ArrivalBoard = function(xmlDoc) 
{	
	try
	{
		var result = "";
		var services = Loader.GetServices(xmlDoc)
		var count = 0;
		$.each(services, function(key, catServices)
		{
			if(services.length > 1)
			{
				result += '<ul class="catService"><li><h1>'+catServices.name+' arrivals</h1></li></ul>';
			}
			Loader.Each(catServices.node, function(service,i){
				var originName = '';//service.getElementsByTagName("origin")[0].getElementsByTagName("locationName")[0].firstChild.nodeValue;
				
				$.each(service.getElementsByTagName("origin")[0].getElementsByTagName("locationName"),function(key,loc)
				{
					originName += (originName != '' ? ' &amp; ': '') + loc.firstChild.nodeValue;
				});
				
				var destinationName = '';//service.getElementsByTagName("destination")[0].getElementsByTagName("locationName")[0].firstChild.nodeValue;
				
				$.each(service.getElementsByTagName("destination")[0].getElementsByTagName("locationName"),function(key,loc)
				{
					destinationName += (destinationName != '' ? ' &amp; ': '') + loc.firstChild.nodeValue;
				});
				var crsOrigin = service.getElementsByTagName("origin")[0].getElementsByTagName("crs")[0].firstChild.nodeValue;
				var crsDestination = service.getElementsByTagName("destination")[0].getElementsByTagName("crs")[0].firstChild.nodeValue;
				var sta = service.getElementsByTagName("sta")[0].firstChild.nodeValue;
				var eta = service.getElementsByTagName("eta")[0].firstChild.nodeValue;
				var circular = false
				if(service.getElementsByTagName("isCircularRoute").length > 0)
				{
					circular = service.getElementsByTagName("isCircularRoute")[0].firstChild.nodeValue == 'true';
				}
				eta = eta.replace("*", "")
				var late =Utils.GetTimeLate(sta, eta);
				var onTime = Utils.getTimeState(sta, eta, late)
				var via ="";
				var viaName = service.getElementsByTagName("origin")[0].getElementsByTagName("via");
				if (viaName.length > 0)
					via = viaName[0].firstChild.nodeValue;
				var platform = "";
				var platformXML = service.getElementsByTagName("platform");
				if (platformXML.length > 0)
					platform = platformXML[0].firstChild.nodeValue;
				var operator = service.getElementsByTagName("operator")[0].firstChild.nodeValue;
				var operatorCode = service.getElementsByTagName("operatorCode")[0].firstChild.nodeValue;
				var serviceID = service.getElementsByTagName("serviceID")[0].firstChild.nodeValue;
				
				var m_class = ((eta=="Cancelled" || eta=="Delayed" || late==true) ? ' red' : '');
				m_class += (((onTime.toString().indexOf("minutes late")>0) || (onTime.toString().indexOf("minutes early")>0)) ? ' twoLine' : '');
				m_class += ((late==true || (onTime.toString().indexOf("early")>0)) ? ' minuteStatus' : '');
				
				result += '<ul id="arrBordlink'+count+'" class="link'+m_class+'" serviceID="'+serviceID+'" name="'+originName+'" data-tabindex="'+count+'"><li class="col1"><h2>'+sta+'</h2></li><li class="col2"><table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td valign="middle"><h2>'+originName + (via != '' ? ' ' + via: '') + (circular ? ' (circular route)' : '')+'</h2></td></tr></table></li><li class="col3">'+onTime+'</li><li class="col4"><h2>'+platform+'</h2></li><li class="col5"></li></ul>';
				count++;
			});
		});
		
		return result;
	}
	catch(e)
	{
		Alert.show(e);
	}
}
Loader.DepartureBoard = function(xmlDoc) {
	try
	{
		var result = "";
		var services = Loader.GetServices(xmlDoc)
		var count = 0;
		$.each(services, function(key, catServices)
		{
			if(services.length > 1)
			{
				result += '<ul class="catService"><li><h1>'+catServices.name+' departures</h1></li></ul>';
			}
			Loader.Each(catServices.node, function(service,i){
				var originName = '';//service.getElementsByTagName("origin")[0].getElementsByTagName("locationName")[0].firstChild.nodeValue;
				
				$.each(service.getElementsByTagName("origin")[0].getElementsByTagName("locationName"),function(key,loc)
				{
					originName += (originName != '' ? ' &amp; ': '') + loc.firstChild.nodeValue;
				});
				
				var destinationName = '';//service.getElementsByTagName("destination")[0].getElementsByTagName("locationName")[0].firstChild.nodeValue;
				
				$.each(service.getElementsByTagName("destination")[0].getElementsByTagName("locationName"),function(key,loc)
				{
					destinationName += (destinationName != '' ? ' &amp; ': '') + loc.firstChild.nodeValue;
				});
				
				var crsOrigin = service.getElementsByTagName("origin")[0].getElementsByTagName("crs")[0].firstChild.nodeValue;
				var crsDestination = service.getElementsByTagName("destination")[0].getElementsByTagName("crs")[0].firstChild.nodeValue;
				var std = service.getElementsByTagName("std")[0].firstChild.nodeValue;
				var etd = service.getElementsByTagName("etd")[0].firstChild.nodeValue;  	
				etd = etd.replace("*", "")
				var circular = false
				if(service.getElementsByTagName("isCircularRoute").length > 0)
				{
					circular = service.getElementsByTagName("isCircularRoute")[0].firstChild.nodeValue == 'true';
				}
				var late =Utils.GetTimeLate(std, etd);		
				var onTime = Utils.getTimeState(std, etd, late)
				var platform ="";
				var via ="";
				var viaName = service.getElementsByTagName("destination")[0].getElementsByTagName("via");
				if (viaName.length > 0)
					via = viaName[0].firstChild.nodeValue;
				var platformXML = service.getElementsByTagName("platform");
				if (platformXML.length > 0)
					platform = platformXML[0].firstChild.nodeValue;
				var operator = service.getElementsByTagName("operator")[0].firstChild.nodeValue;
				var operatorCode = service.getElementsByTagName("operatorCode")[0].firstChild.nodeValue;
				var serviceID = service.getElementsByTagName("serviceID")[0].firstChild.nodeValue;
				
				var m_class = ((etd=="Cancelled" || etd=="Delayed" || late==true) ? ' red' : '');
				m_class += (((onTime.toString().indexOf("minutes late")>0) || (onTime.toString().indexOf("minutes early")>0)) ? ' twoLine' : '');
				m_class += ((late==true || (onTime.toString().indexOf("early")>0)) ? ' minuteStatus' : '');
				
				result += '<ul id="depBordlink'+count+'" class="link'+m_class+'" serviceID="'+serviceID+'" name="'+destinationName+'" data-tabindex="'+count+'"><li class="col1"><h2>'+std+'</h2></li><li class="col2"><table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td valign="middle"><h2>' +destinationName + (via != '' ? ' ' + via: '') + (circular ? ' (circular route)' : '')+'</h2></td></tr></table></li><li class="col3">'+onTime+'</li><li class="col4"><h2>'+platform+'</h2></li><li class="col5"></li></ul>';
				count++;
			});
		});
		return result;
	}
	catch(e)
	{
		Alert.show(e);
	}
}

Loader.ServiceDetails = function (xmlDoc) {
	try
	{
		//alert('document:::' + xmlDoc);

		try
		{
		if(!xmlDoc.documentElement.getElementsByTagName('GetServiceDetailsResponse')[0].firstChild)
		{
			alert('API Error::' + 'No Service details');
			return '<ul class="error"><li>No Service detail for current journey.</li></ul>';
			//return false;
		}
		}catch(e){}
		var previousCallingPoints = xmlDoc.documentElement.getElementsByTagName("previousCallingPoints");
		var subsequentCallingPoints = xmlDoc.documentElement.getElementsByTagName("subsequentCallingPoints");
		this.reported = false;
		var result = "";
		var sta = xmlDoc.documentElement.getElementsByTagName("sta")
		if (sta.length > 0) sta = sta[0].firstChild.nodeValue;
		else if (xmlDoc.documentElement.getElementsByTagName("std").length > 0) sta = xmlDoc.documentElement.getElementsByTagName("std")[0].firstChild.nodeValue;
		var locationName = xmlDoc.documentElement.getElementsByTagName("locationName")[0].firstChild.nodeValue;
		var eta = xmlDoc.documentElement.getElementsByTagName("eta");
		if (eta.length > 0) eta = eta[0].firstChild.nodeValue;
		else if (xmlDoc.documentElement.getElementsByTagName("ata").length > 0) eta = xmlDoc.documentElement.getElementsByTagName("ata")[0].firstChild.nodeValue;
		else if (xmlDoc.documentElement.getElementsByTagName("atd").length > 0) eta = xmlDoc.documentElement.getElementsByTagName("etd")[0].firstChild.nodeValue;
		var platform = '';
		var platformXML = xmlDoc.getElementsByTagName("platform");
		//alert('Platform:::' + platformXML.length + '>>' + platformXML.length)
		if (platformXML.length > 0)
			platform = platformXML[0].firstChild.nodeValue;
				
		//previousCallingPoints//
		if (previousCallingPoints != null) {
			var services1 = previousCallingPoints[0].getElementsByTagName("callingPoint")
			result += Loader.callingPoint(services1,'prev');
	
			var late;
			var onTime = "On time";
			if (eta[0] != undefined) {
				late = Utils.GetTimeLate(sta, eta);
				onTime = Utils.getTimeState(sta, eta, late)
			}
			else
			{
				onTime = '<h2>'+onTime+'</h2>';
			}
			var m_class = ((eta=="Cancelled" || eta=="Delayed" || late==true) ? ' red' : '');
			m_class += (((onTime.toString().indexOf("minutes late")>0) || (onTime.toString().indexOf("minutes early")>0)) ? ' twoLine' : '');
			m_class += ((late==true || (onTime.toString().indexOf("early")>0)) ? ' minuteStatus' : '');
			
			result += '<ul id="servBordlink" class="link'+m_class+'"><li class="col1"><h2>'+sta+'</h2></li><li class="col2"><table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td valign="middle"><h2>' +locationName +'</h2></td></tr></table></li><li class="col3">'+onTime+'</li><li class="col4"><h2>'+platform+'</h2></li><li class="col5"></li><li class="col6"></li></ul>';
		}
		//subsequentCallingPoints
		if (previousCallingPoints != null) {
			var services2 = subsequentCallingPoints[0].getElementsByTagName("callingPoint")
			result += Loader.callingPoint(services2,'next');
		}
		
		ret = $('<div>' + result + '</div>');
		
		var now = new Date();
	
		var lastReported = null;
		$('ul',ret).each(function(i){
			$(this).attr('data-tabindex',i);
			var gTime = new Date();
			var tm = $(this).find('li.col1:first > h2').html()
			if($(this).find('li.col3:first > h2').html())
			{
				if($(this).find('li.col3:first > h2').html().toString().indexOf(":")>0)
				{
					tm = $(this).find('li.col3:first > h2').html();
				}
				
				gTime.setHours(parseInt( tm.split(':')[0] ));
				gTime.setMinutes(parseInt( tm.split(':')[1] ));		
			}
			//alert(tm + '>>' + gTime + '>>' + now);
			if(gTime.getTime()<=now.getTime())
			{
				lastReported = $(this);
			}
		});
		$(lastReported).addClass('reported');
		$('ul',ret).each(function(i){
			if($(lastReported) != $(this))
			{
				if(i==0) $(this).addClass('first')
				else if(i==$('ul',ret).length-1) $(this).addClass('last');
				else $(this).addClass('mid');
			}
		});
		
		return ret.html();
	}
	catch(e)
	{
		Alert.show(e);
	}
}

Loader.callingPoint = function(service,ident){
	try
	{
		var result ="";
		var beginDate; 
		
		for (var i = 0; i < service.length; i++) {
			var locationName = service[i].getElementsByTagName("locationName")[0].firstChild.nodeValue;
			var st = service[i].getElementsByTagName("st")[0].firstChild.nodeValue;
			var et = service[i].getElementsByTagName("at");
			if (et.length > 0)
				et = et[0].firstChild.nodeValue;
			else
				et = service[i].getElementsByTagName("et")[0].firstChild.nodeValue;
				
			var late = Utils.GetTimeLate(st, et);		
			var onTime = Utils.getTimeState(st, et, late);
			var output;
			
			var platform = '';
			var platformXML = service[i].getElementsByTagName("platform");
			if (platformXML.length > 0)
				platform = platformXML[0].firstChild.nodeValue;
			
			var m_class = ((et=="Cancelled" || et=="Delayed" || late==true) ? ' red' : '');
			m_class += (((onTime.toString().indexOf("minutes late")>0) || (onTime.toString().indexOf("minutes early")>0)) ? ' twoLine' : '');
			m_class += ((late==true || (onTime.toString().indexOf("early")>0)) ? ' minuteStatus' : '');
			
			
			result += '<ul id="callPointBordlink'+ident+i+'" class="link'+m_class+'"><li class="col1"><h2>'+st+'</h2></li><li class="col2"><table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td valign="middle"><h2>' +locationName +'</h2></td></tr></table></li><li class="col3">'+onTime+'</li><li class="col4"><h2>'+platform+'</h2></li><li class="col5"></li><li class="col6"></li></ul>';
		}
		return result;
	}
	catch(e)
	{
		Alert.show(e);
	}
}
Loader.RealtimeJourneyPlanDetails = [];
Loader.RealtimeJourneyPlan = function(xmlDoc,ident) {
	try
	{
		Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident] = [];
		var error = xmlDoc.documentElement.getElementsByTagName("RealtimeJourneyPlanFault");//$(xmlDoc).find("RealtimeJourneyPlanFault");
		if(error.length > 0)
		{
			return '<ul class="error"><li>'+error[0].getElementsByTagName("responseDetails")[0].firstChild.nodeValue+'</li></ul>';
		}
		
		var service = xmlDoc.documentElement.getElementsByTagName("outwardJourney");	
		var start_Date = null;
		var result = "";
		var oddplus = 0;
		for (var i = 0; i < service.length; i++) {
			Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident][i] = [];
			var realtimeClassification = service[i].getElementsByTagName("realtimeClassification")[0].firstChild.nodeValue;
			var departure = service[i].getElementsByTagName("timetable")[0].getElementsByTagName("departure")[0].firstChild.nodeValue;
			var arrival = service[i].getElementsByTagName("timetable")[0].getElementsByTagName("arrival")[0].firstChild.nodeValue;
			var originPlatform = 3;//service[i].getElementsByTagName("leg")[0].getElementsByTagName("originPlatform")[0].firstChild.nodeValue;
			var leg = service[i].getElementsByTagName("leg");
			
			for(j=0;j<leg.length;j++)
			{
				Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident][i][j] = new Object();
				Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident][i][j].id = leg[j].getElementsByTagName("id")[0].firstChild.nodeValue;
				
				Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident][i][j].origin = leg[j].getElementsByTagName("board")[0].getElementsByTagName("crsCode")[0].firstChild.nodeValue;
				
				if(leg[j].getElementsByTagName("undergroundTravelInformation").length > 0
				&& leg[j].getElementsByTagName("undergroundTravelInformation")[0].getElementsByTagName("message")[0].firstChild)
				{
					Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident][i][j].undergroundTravelInformation = leg[j].getElementsByTagName("undergroundTravelInformation")[0].getElementsByTagName("message")[0].firstChild.nodeValue;

				}
				
				/*
				Loader.getFullNameForCode(
					Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident][i][j].origin,
					'jpBordlink'+ident,i,j,
					function(name,nident,ni,nj){ 
						Loader.RealtimeJourneyPlanDetails[nident][ni][nj].origin = name;
					}
				);
				*/
	
				Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident][i][j].destination = leg[j].getElementsByTagName("alight")[0].getElementsByTagName("crsCode")[0].firstChild.nodeValue;;
				
				/*
				Loader.getFullNameForCode(
					Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident][i][j].destination,
					'jpBordlink'+ident,i,j,
					function(name,nident,ni,nj){ 
						Loader.RealtimeJourneyPlanDetails[nident][ni][nj].destination = name;
					}
				);
				*/
				
				Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident][i][j].mode = leg[j].getElementsByTagName("mode")[0].firstChild.nodeValue;
				Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident][i][j].departure = leg[j].getElementsByTagName("timetable")[0].getElementsByTagName("departure")[0].firstChild.nodeValue;
				Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident][i][j].arrival = leg[j].getElementsByTagName("timetable")[0].getElementsByTagName("arrival")[0].firstChild.nodeValue;
				Loader.RealtimeJourneyPlanDetails['jpBordlink'+ident][i][j].realtimeClassification = leg[j].getElementsByTagName("realtimeClassification")[0].firstChild.nodeValue;
			}
			
			var serviceBulletins = service[i].getElementsByTagName("serviceBulletins");
			var jsonSrvBul = new Object()
			
			
			
			if(serviceBulletins.length>0)
			{
				//alert('VVVVVV::'+serviceBulletins.length + '>>>' + serviceBulletins[0].getElementsByTagName("title").length)
				jsonSrvBul.title = serviceBulletins[0].getElementsByTagName("title")[0].firstChild.nodeValue;
				if(serviceBulletins[0].getElementsByTagName("description").length > 0)
				{
					if(serviceBulletins[0].getElementsByTagName("description")[0].firstChild)
					{
						jsonSrvBul.description = serviceBulletins[0].getElementsByTagName("description")[0].firstChild.nodeValue;
					}
					else
					{
						jsonSrvBul.description = jsonSrvBul.title;
					}
						
				}
				else
				{
					jsonSrvBul.description = jsonSrvBul.title;
				}
				jsonSrvBul.disruption = serviceBulletins[0].getElementsByTagName("disruption")[0].firstChild.nodeValue;
				jsonSrvBul.alert = serviceBulletins[0].getElementsByTagName("alert")[0].firstChild.nodeValue;
				jsonSrvBul.cleared = serviceBulletins[0].getElementsByTagName("cleared")[0].firstChild.nodeValue;
			}
			
			var tempDate = Utils.stringToDate(departure.split('T')[0]+" 00:00:00");
			if(start_Date==null)
				start_Date = Utils.stringToDate(departure.split('T')[0]+" 00:00:00");
				
			var time_1 = departure.split('T')[1].split(".")[0];
			time_1 = time_1.substr(0, time_1.lastIndexOf(':00'))
			var time_2 = arrival.split('T')[1].split(".")[0];	
			time_2 = time_2.substr(0, time_2.lastIndexOf(':00'));	
			//departure = departure.split("T")[1].split(".")[0];
			//arrival = arrival.split("T")[1].split(".")[0];
			
			var dtDep = Utils.stringToDateNRE(departure);
			var dtArr = Utils.stringToDateNRE(arrival);
			var durr = ''
			if(dtArr) {
				var durr = Utils.getTimeDifference(dtDep,dtArr);
				//var durr = new Date(dtArr.getTime() - dtDep.getTime());
			}
			
			//var diff = ( (difDate.getUTCDate()*24) + difDate.getUTCHours())+'h ' + difDate.format('MM')+'m';//Utils.getTimeDifference(time_1, time_2);
			if(tempDate.getDay()!=start_Date.getDay())
			{
				
				start_Date = tempDate;
				result +='<ul class="date '+( (i+oddplus)%2==0 ? 'odd' : 'even' )+'"><li><h2>'+Utils.dayNames[tempDate.getDay()]+' '+tempDate.getDate()+' of '+Utils.monthNames[tempDate.getMonth()]+'</h2></li></ul>';
				oddplus += 1;
			}
			//alert('realtimeClassification' + realtimeClassification);
			//if(realtimeClassification=="NORMAL")
			//{
				
				alert(JSON.stringify(jsonSrvBul));
				
				result += '<ul id="jpBordlink'+ident+'_'+i+'" class="link '+( (i+oddplus)%2==0 ? 'odd' : 'even' )+'" data-tabindex="'+i+'" data-jsonSrvBul="'+(serviceBulletins.length>0?escape(JSON.stringify(jsonSrvBul)):'')+'"><li class="col1"><h2>'+time_1+'</h2></li><li class="col2"><h2>'+time_2+'</h2></li><li class="col3"><h2>'+(leg.length-1)+'</h2></li><li class="col4"><h2>'+originPlatform+'</h2></li><li class="col5"><h2>'+durr+'</h2></li><li class="col6 '+realtimeClassification+(serviceBulletins.length>0?' ATENTION':'')+'"></li></ul>';
			//<ul class='selected red'><li class='c1'>"+time_1+"</li><li class='c2'>"+time_2+"</li><li class='c3'>"+(leg.length-1)+"</li><li class='c4'>"+originPlatform+"</li><li class='c5'>"+diff+"</li></ul>   
				//result += Utils.format(data, time_1, time_2, (leg.length-1), originPlatform, diff);
			//}
		}
		
		return result;
	}
	catch(e)
	{
		Alert.show(e);
	}
}
Loader.codeCache = [];
Loader.getFullNameForCode = function(code,nident,ni,nj,callback)
{
	try
	{
		var found = false;
		$.each(Loader.codeCache,function(key,val){
			if(val[0]==code)
			{
				if(callback) callback(val[1],nident,ni,nj);
				found = true;
				return false;
			}
		});
		if(found) return false;
		url = 'http://ojp.nationalrail.co.uk/find/stations/';
		$.ajax({
			url: url + code,
			dataType: "jsonp",
			complete: function(){},
			success: function (data) {
	
				if(data == '') if(callback) callback(code,nident,ni,nj);
				$.each(data, function (key, val) {
					Loader.codeCache.push(val);
					if(val[0].toUpperCase() == code.toUpperCase())
					{
						if(callback) callback(val[1],nident,ni,nj);
						return false;
					}
					
				});
				
				//if(callback) callback(code,nident,ni,nj);
			}
		});
	}
	catch(e)
	{
		Alert.show(e);
	}
}

Loader.RealtimeJourneyPlanDet = function(json,jsonSrvBul)
{
	try
	{
		/*
		var msg = new Object();
		if(jsonSrvBul!=null)
		{
			var jsStr = unescape(jsonSrvBul);
			var msg = $.parseJSON(jsStr);
			alert(msg);
		}
		*/
		result = '';
		$.each(json,function(key,legOb){
			alert(legOb)
			//messages needed
			var dtDep = Utils.stringToDateNRE(legOb.departure);
			var dtArr = Utils.stringToDateNRE(legOb.arrival);
			var durr = ''
			if(dtArr) {
				var durr = Utils.getTimeDifference(dtDep,dtArr);
				//var durr = new Date(dtArr.getTime() - dtDep.getTime());
			}
			var undergroundTravel = legOb.undergroundTravelInformation;
			
			legOb.mode = legOb.mode.substring(0,1).toUpperCase() + legOb.mode.toLowerCase().substring(1);
			legOb.mode = legOb.mode.replace('_',' ');
			
			result += '<ul id="jpDetBordlink'+legOb.id+'" class="link" data-tabindex="'+key+'" ungrd="'+(undergroundTravel?undergroundTravel:'')+'" data-jsonSrvBul="'+(jsonSrvBul!=null?jsonSrvBul:'')+'"><li class="col1"><h2>'+legOb.mode+'</h2></li><li class="col2"><h2>'+dtDep.format('HH:MM')+'</h2></li><li class="col3"><table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td valign="middle"><h2>'+legOb.origin+'</h2></td></tr></table></li><li class="col4"><table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td valign="middle"><h2>'+legOb.destination+'</h2></td></tr></table></li><li class="col5"><h2>'+dtArr.format('HH:MM')+'</h2></li><li class="col6 '+legOb.realtimeClassification+(undergroundTravel || jsonSrvBul!=null?' ATENTION':'')+'"><h2>'+durr + '</h2></li></ul>';
			
		});
		return result;
	}
	catch(e)
	{
		Alert.show(e);
	}
}
Loader.stationSearch = function(data)
{
	try
	{
		//alert('got date' + data);
		var items = [];
		var count =0;
		var sugestLimit = 10;
		$.each(data, function (key, val) {
			if(val[0] != 'All Stations')
			{
				count++;
				if(count<sugestLimit){
					items.push('<ul class="link" id="' + val[0] + '" text="'+val[1]+'" data-tabindex="'+count+'"><li class="col1"><h2>' + val[1] +' ['+val[0]+']'+ '</h2></li></ul>');
				}
			}
		});
		var outHtml =items.join('');
		return outHtml;
	//	$("#disambiguationList").html(outHtml);
	//	Nav.initDisambiguationScrollerBar();
	}
	catch(e)
	{
		Alert.show(e);
	}
}