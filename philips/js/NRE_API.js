var NRE = {
	
}
NRE.Fetch = function(POST, SOAPAction, SOAPXml, Auth, callback)
{
	KeyHandler.blocked = true;
	var xmlhttp = new XMLHttpRequest();
	if(SS.device != 'samsung')
	{
		//if(POST == 'http://ojp.nationalrail.co.uk/webservices/jpdlr')
		//{
			var location = window.location.href;
			location = location.substring(0,location.lastIndexOf('/')) + '/';
			//window.location
			POST = location + 'nreproxy.php?proxy_url=' + POST;
//			POST = window.location.href + 'nreproxy.php?proxy_url=' + POST;
			//POST = 'http://testapps.tvappagency.com/philips/nre/nreproxy.php?proxy_url=' + POST;
			//POST = 'http://staging.tvappagency.com/nre/nreproxy.php?proxy_url=' + POST;
		//}
		//else
		//{
			//POST = 'http://80.0.62.221/curl.php?proxy_url=' + POST;
		//}
		//POST = 'http://staging.tvappagency.com/nre/curl.php?proxy_url=' + POST;
		//POST = 'http://nre/curl.php?proxy_url=' + POST;
		//POST = 'http://80.0.62.221/curl.php?proxy_url=' + POST;
	}
	
	
	xmlhttp.open("POST", POST, true);    
	xmlhttp.setRequestHeader("SOAPAction", SOAPAction);
	xmlhttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8");
	
	if(Auth) xmlhttp.setRequestHeader("Authorization", "Basic " + Auth);
	xmlhttp.send(SOAPXml);

	xmlhttp.onreadystatechange = function () {
		//alert(SOAPAction + ' >> ' + xmlhttp.readyState + ' >> ' + xmlhttp.status);
		if(xmlhttp.readyState!=4) return;
		//alert(SOAPAction + ' >> ' + xmlhttp.status);
		if(xmlhttp.status==0) return;
		if (xmlhttp.status==200){
			//alert(xmlhttp.responseText);
			if(!xmlhttp.responseXML) return; //waitfor second response
			//alert(xmlhttp.responseText);
			
			var xmlDoc = xmlhttp.responseXML;
			//alert(xmlDoc);
			if(callback) callback(xmlDoc,xmlhttp.status);
		}
		else
		{
			if(callback) callback(null,xmlhttp.status);
		}
		var headers = xmlhttp.getAllResponseHeaders();
		//alert(headers); 
		KeyHandler.blocked = false;
	}
	
}
NRE.findStation = function(text,callback)
{
	$.ajax({
		url: "http://ojp.nationalrail.co.uk/find/stations/" + text,
		dataType: "jsonp",
		success: function (data) {
			if(callback) callback(data);
		}
	});
}
NRE.GetArrivalBoard = function(COD, callback) {
	var POST = "http://realtime.nationalrail.co.uk/LDBWS/ldb4.asmx";
	var SOAPAction = "http://thalesgroup.com/RTTI/2010-11-01/ldb/GetArrivalBoard";
	var xml = '<?xml version="1.0" encoding="utf-8"?>' +
					'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://thalesgroup.com/RTTI/2010-11-01/ldb/commontypes" xmlns:typ="http://thalesgroup.com/RTTI/2010-11-01/ldb/types">' +
					'<soapenv:Header>' +
					'<com:AccessToken>' +
						'<com:TokenValue>5a542107-3aba-4800-96b0-2a0791c9b81a</com:TokenValue>' +
					'</com:AccessToken>' +
					'</soapenv:Header>' +
					'<soapenv:Body>' +
					'<typ:GetArrivalBoardRequest>' +
						'<typ:numRows>20</typ:numRows>' +
						'<typ:crs>'+COD+'</typ:crs>' +
					'</typ:GetArrivalBoardRequest>' +
					'</soapenv:Body>' +
				'</soapenv:Envelope>';
	NRE.Fetch(POST,SOAPAction,xml,null,function(xmlDoc){ if(callback) callback(xmlDoc); });// Loader.ArrivalBoard(xmlDoc);})
}
NRE.GetDepartureBoard = function(COD, callback) {
	var POST = "http://realtime.nationalrail.co.uk/LDBWS/ldb4.asmx";
	var SOAPAction = "http://thalesgroup.com/RTTI/2010-11-01/ldb/GetDepartureBoard";
	var xml = '<?xml version="1.0" encoding="utf-8"?>' +
                        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://thalesgroup.com/RTTI/2010-11-01/ldb/commontypes" xmlns:typ="http://thalesgroup.com/RTTI/2010-11-01/ldb/types">' +
                        '<soapenv:Header>' +
                        '<com:AccessToken>' +
                            '<com:TokenValue>5a542107-3aba-4800-96b0-2a0791c9b81a</com:TokenValue>' +
                        '</com:AccessToken>' +
                        '</soapenv:Header>' +
                        '<soapenv:Body>' +
                        '<typ:GetDepartureBoardRequest>' +
                            '<typ:numRows>20</typ:numRows>' +
                            '<typ:crs>'+COD+'</typ:crs>' +
                        '</typ:GetDepartureBoardRequest>' +
                        '</soapenv:Body>' +
                    '</soapenv:Envelope>';
	NRE.Fetch(POST,SOAPAction,xml,null,function(xmlDoc){ if(callback) callback(xmlDoc); });// Loader.DepartureBoard(xmlDoc);});
}
NRE.GetRealtimeJourneyPlanRequest = function(origin, originGrp, destination, destinationGrp, time, direct, callback) {
	var POST = "http://ojp.nationalrail.co.uk/webservices/jpdlr";
	var SOAPAction = "http://ojp.nationalrail.co.uk/webservices/jpdlr";
	var xml =	'<?xml version="1.0" encoding="utf-8"?>' +
				'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:jpd="http://www.thalesgroup.com/ojp/jpdlr" xmlns:com="http://www.thalesgroup.com/ojp/common">' +
					'<soapenv:Header/>' +
					'<soapenv:Body>' +
						'<jpd:RealtimeJourneyPlanRequest>' +
							'<jpd:origin>' +
								(originGrp ? '<com:groupCRS>'+origin+'</com:groupCRS>':
								'<com:stationCRS>'+origin+'</com:stationCRS>') +
							'</jpd:origin>' +
							'<jpd:destination>' +
								(destinationGrp ? '<com:groupCRS>'+destination+'</com:groupCRS>':
								'<com:stationCRS>'+destination+'</com:stationCRS>') +
							'</jpd:destination>' +
							'<jpd:realtimeEnquiry>STANDARD</jpd:realtimeEnquiry>' +
							'<jpd:outwardTime>'+
								'<jpd:departBy>'+time+'</jpd:departBy>'+
							'</jpd:outwardTime>'+
							'<jpd:directTrains>' + (direct ? 'true' : 'false') + '</jpd:directTrains>'+
						'</jpd:RealtimeJourneyPlanRequest>'+
					'</soapenv:Body>'+
				'</soapenv:Envelope>';
	//alert(xml);
	var authString = "bnJldHZhcHA6a2dNTTR1KVI=";
	NRE.Fetch(POST,SOAPAction,xml,authString,function(xmlDoc){ if(callback) callback(xmlDoc); });//Loader.RealtimeJourneyPlan('Outward_scrollable',xmlDoc);});
}

NRE.GetServiceDetails = function(serviceID,callback) {
	var POST = "http://realtime.nationalrail.co.uk/LDBWS/ldb4.asmx";
	var SOAPAction = "http://thalesgroup.com/RTTI/2010-11-01/ldb/GetServiceDetails";
	var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
				'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
				'<soap:Header>' +
					'<AccessToken><TokenValue>5a542107-3aba-4800-96b0-2a0791c9b81a</TokenValue></AccessToken>' +
				'</soap:Header>' +
				'<soap:Body>' +
					'<GetServiceDetailsRequest xmlns="http://thalesgroup.com/RTTI/2010-11-01/ldb/types">' +
					'<userAgent>NRETVApp</userAgent>' +
					'<serviceID>'+serviceID+'</serviceID>' +
					'</GetServiceDetailsRequest>' +
				'</soap:Body>' +
			'</soap:Envelope>';

	NRE.Fetch(POST,SOAPAction,xml,null,function(xmlDoc){ if(callback) callback(xmlDoc); });//{Loader.ServiceDetails(xmlDoc);});
}