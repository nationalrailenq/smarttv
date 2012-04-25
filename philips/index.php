<?php
header('Content-type: application/ce-html+xml;charset="UTF-8"');
echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head><meta http-equiv="content-type" content="application/ce-html+xml; charset=UTF-8"/>
		<title>National Rail</title>
        
		<script language="javascript" type="text/javascript" src="js/jquery/jquery-1.4.2.min.js"></script>
        <script language="javascript" type="text/javascript" src="js/jquery/jquery.event.drag-2.0.js"></script>
        <script language="javascript" type="text/javascript" src="js/jquery/json2.js"></script>

        <link rel="stylesheet" type="text/css" href="css/Datepicker.css"/>
        <script type="text/javascript" language="javascript" src="js/tvapp/Datepicker.js"></script>

		<script type="text/javascript">
	//<![CDATA[
	
	var SS = {
    debug: {
        enabled: false
    },
    language: null,
    device: "philips",
    onHover: "",
    onFocus: "",
    connectivityTimer: null,
    connectionCheck: true,
    callbackFunction: null,
    parse: true,
    activeIME: false
};
SS.init = function (a) {
    if (a) {
        if (a.debug && a.debug == true) {
            SS.debug.enable(true)
        }
        if (a.connectionCheck && a.connectionCheck == false) {
            SS.connectionCheck = false
        }
    }
    SS.fetchLanguage();
    return
};
SS.quit = function () {
    window.history.go(-1e3)
};
SS.keyDown = function () {
	
    var a = event.keyCode;
    if (SS.activeIME) {
        if (a == VK_ENTER) {
            event.preventDefault()
        }
        IME.processKey(a)
    } else {
		if (a == VK_BACK) {
			if(KeyHandler.hasSubView != 'keypad' && KeyHandler.hasSubView != 'autoComplete')
			{
            	event.preventDefault()
			}
        }
        Main.keyDown(a)
    }
};
SS.setHover = function (a) {
    var b = document.getElementById(SS.onHover);
    var c = document.getElementById(a);
    if (b) {
        if ($(b).hasClass("hover")) {
            $(b).removeClass("hover")
        }
    }
    $(c).addClass("hover");
    SS.onHover = a;
    return
};
SS.offHover = function (a) {
    var b = document.getElementById(a);
    $(b).removeClass("hover");
    SS.onHover = "";
    return
};
SS.setFocus = function (a) {
    if (SS.activeIME) {
        IME.exitIME(false)
    }
    var b = document.getElementById(a);
    var c = document.getElementById(SS.onFocus);
    if (c) {
        if ($(c).hasClass("focus")) {
            $(c).removeClass("focus")
        }
    }
    $(b).addClass("focus");
    $(b).focus();
    SS.onFocus = a;
    return
};
SS.offFocus = function (a) {
    var b = document.getElementById(a);
    $(b).removeClass("focus");
    SS.onFocus = "";
    $(b).blur();
    return
};
SS.fetchLanguage = function () {
    var a;
    $.ajax({
        url: "http://ajaxhttpheaders.appspot.com",
        dataType: "jsonp",
        success: function (b) {
            a = b["Accept-Language"];
            SS.setLanguage(a)
        }
    })
};
SS.setLanguage = function (a) {
    var b = SS.getBestLang(a);
    SS.log("Language is set to: '" + b + "'");
    SS.language = b;
    return
};
SS.getBestLang = function (a) {
    var b = "";
    if (a.indexOf(",") >= 0 || a.indexOf(";") >= 0) {
        var c = a.split(",");
        if (c[0].indexOf(";") >= 0) {
            var d = c[0].split(";");
            b = d[0]
        } else {
            b = c[0]
        }
    } else {
        b = a
    }
    return b
};
SS.getLanguage = function () {
    if (SS.language != null) {
        return SS.language
    } else {
        SS.fetchLanguage();
        return null
    }
};
SS.debug.init = function (a) {
    SS.debug.enable(a);
    SS.log("Debug.init")
};
SS.debug.enable = function (a) {
    SS.debug.enabled = a;
    if (a == true) {
        $("#debugWindow").show()
    } else {
        $("#debugWindow").hide()
    }
};
SS.log = function (a) {
    if (SS.debug.enabled) {
        $("#debugWindow").prepend("<p>" + a + "</p>")
    }
};
SS.putInnerHTML = function (a, b) {
    a.innerHTML = b
};
SS.getJSONcors = function (a, b, c) {
    var d = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D"' + encodeURIComponent(a) + '"&format=json&callback=';
    SS.callbackFunction = b;
    if (c) {
        SS.parse = false
    }
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.src = d + "SS.responseCallback";
    document.getElementsByTagName("head")[0].appendChild(e)
};
SS.responseCallback = function (a) {
    var b;
    if (SS.parse) {
        b = JSON.parse(a.query.results.body.p)
    } else {
        b = a.query.results.body.p;
        SS.parse = true
    }
    var c = SS.callbackFunction;
    SS.callbackFunction = null;
    c(b)
}
	
	//]]>
	</script>
        <script type="text/javascript">
	//<![CDATA[
	
	var File = {};
File.openStore = function () {
    return true
};
File.fromFile = function (a) {
    var b = a + "=";
    var c = document.cookie.split(";");
    for (var d = 0; d < c.length; d++) {
        var e = c[d];
        while (e.charAt(0) == " ") e = e.substring(1, e.length);
        if (e.indexOf(b) == 0) return e.substring(b.length, e.length)
    }
    return null
};
File.toFile = function (a, b) {
    var c = 365;
    var d = new Date;
    d.setTime(d.getTime() + c * 24 * 60 * 60 * 1e3);
    var e = "; expires=" + d.toGMTString();
    document.cookie = a + "=" + b + e + "; path=/"
};
File.deleteFile = function (a) {
    var b = "";
    var c = "; expires=Thu, 01-Jan-1970 00:00:01 GMT";
    document.cookie = a + "=" + b + c + "; path=/"
};
File.deleteStore = function () {
    var a = document.cookie.split(";");
    for (var b = 0; b < a.length; b++) File.deleteFile(a[b].split("=")[0])
}
	
	//]]>
	</script>
        <script type="text/javascript">
	//<![CDATA[
		var SSgoogleanalytics={GA_ACCOUNT:null,GA_PIXEL:"http://analytics.tvappagency.com/ga.php",GA:null};SSgoogleanalytics.init=function(a,b){SSgoogleanalytics.GA=document.createElement("img");SSgoogleanalytics.GA.id="GA";var c=document.getElementById("body");c.appendChild(SSgoogleanalytics.GA);SSgoogleanalytics.GA_ACCOUNT=a;if(b){SSgoogleanalytics.GA_PIXEL=b}SS.log("SS initialised Google Analytics with account#: "+SSgoogleanalytics.GA_ACCOUNT)};SSgoogleanalytics.analyticMark=function(a,b){var c="";c=SSgoogleanalytics.GA_PIXEL+"?";c=c+"utmac="+SSgoogleanalytics.GA_ACCOUNT;c=c+"&utmn="+Math.floor(Math.random()*2147483647);c=c+"&utmvid"+SSgoogleanalytics.getUserID();c=c+"&utmr="+"-";c=c+"&utmp="+"/"+a+"/"+b;c=c+"&guid=ON";c=c+"&utmdebug=true";SSgoogleanalytics.GA.src=c;SS.log("SS logging analytic ("+a+" : "+b+")");return true};SSgoogleanalytics.getUserID=function(){var a;if(SSgoogleanalytics.openStore("GoogAnalytics")){if(SSgoogleanalytics.fromFile("gaid")!=null){a=SSgoogleanalytics.fromFile("gaid")}else{var b=Math.floor(Math.random()*0x10000000000000000);var c=b.toString(16);SSgoogleanalytics.toFile("gaid",c);a=c}}else{SS.log("SS failed to create unique analytic identifier, using default");a="ffffffffffffffff"}return a};SSgoogleanalytics.openStore=function(){return true};SSgoogleanalytics.fromFile=function(a){var b=a+"=";var c=document.cookie.split(";");for(var d=0;d<c.length;d++){var e=c[d];while(e.charAt(0)==" ")e=e.substring(1,e.length);if(e.indexOf(b)==0)return e.substring(b.length,e.length)}return null};SSgoogleanalytics.toFile=function(a,b){var c=365;var d=new Date;d.setTime(d.getTime()+c*24*60*60*1e3);var e="; expires="+d.toGMTString();document.cookie=a+"="+b+e+"; path=/"};SSgoogleanalytics.deleteFile=function(a){var b="";var c="; expires=Thu, 01-Jan-1970 00:00:01 GMT";document.cookie=a+"="+b+c+"; path=/"};SSgoogleanalytics.deleteStore=function(){var a=document.cookie.split(";");for(var b=0;b<a.length;b++)File.deleteFile(a[b].split("=")[0])}
	
	//]]>
	</script>
        <script type="text/javascript">
	//<![CDATA[
	
	var IME={originalValue:"",inputBox:null,inputID:null};IME.newIME=function(a,b){SS.activeIME=true;this.inputBox=document.getElementById(a);this.inputID=a;IME.originalValue=this.inputBox.value;if(b&&b.clear&&b.clear==true){this.inputBox.value=""}var c=document.getElementById(a);var d=document.getElementById(SS.onFocus);if(d){if($(d).hasClass("focus")){$(d).removeClass("focus")}}$(c).addClass("focus");$(c).focus();SS.onFocus=a};IME.processKey=function(a){switch(a){case VK_ENTER:IME.onEnter(true);break;case VK_BACK:if(this.inputBox.value==""){IME.exitIME(true)};default:IME.onChar()}Main.keyDown(a)};IME.isActive=function(){return SS.activeIME};IME.clear=function(){this.inputBox.value=""};IME.input=function(a){this.inputBox.value=a};IME.onChar=function(){if(typeof onCharacter=="function"){onCharacter(this.inputBox.value)}};IME.onEnter=function(a){if(a){SS.offFocus(IME.inputID);SS.setHover(IME.inputID)}SS.activeIME=false;if(typeof onFinishedEditing=="function"){onFinishedEditing(IME.inputBox.value)}};IME.exitIME=function(a){this.inputBox.value=IME.originalValue;if(a){SS.offFocus(IME.inputID);SS.setHover(IME.inputID)}SS.activeIME=false;if(typeof onExitEditing=="function"){onExitEditing()}}
	
	//]]>
	</script>

        <link rel="stylesheet" type="text/css" href="css/Main.css"/>
       
        <script type="text/javascript" language="javascript" src="js/Utils.js"></script>
		<script type="text/javascript" language="javascript" src="js/Main.js"></script>
        <script type="text/javascript" language="javascript" src="js/KeyHandler.js"></script>
        <script type="text/javascript" language="javascript" src="js/Autocomplete.js"></script>
        <script type="text/javascript" language="javascript" src="js/NRE_API.js"></script>
        <script type="text/javascript" language="javascript" src="js/RecentSaved.js"></script>
        
        <script type="text/javascript" language="javascript" src="js/Loader.js"></script>
        <script type="text/javascript" language="javascript" src="js/DateFormat.js"></script>
        <script type="text/javascript" language="javascript" src="js/Scroller.js"></script>
        <script type="text/javascript" language="javascript" src="js/Alert.js"></script>
        
        <script type="text/javascript" language="javascript" src="js/nav/Nav.js"></script>
        <script type="text/javascript" language="javascript" src="js/nav/Nav.homePage.js"></script>
        <script type="text/javascript" language="javascript" src="js/nav/Nav.journeyPage.js"></script>
        <script type="text/javascript" language="javascript" src="js/nav/Nav.deparrPage.js"></script>
        <script type="text/javascript" language="javascript" src="js/nav/Nav.keypad.js"></script>
        <script type="text/javascript" language="javascript" src="js/nav/Nav.datepad.js"></script>
        <script type="text/javascript" language="javascript" src="js/nav/Nav.autoComplete.js"></script>
		<script type="text/javascript" language="javascript" src="js/nav/Nav.header.js"></script>
		<script type="text/javascript" language="javascript" src="js/nav/Nav.departurePage.js"></script>
		<script type="text/javascript" language="javascript" src="js/nav/Nav.arrivalPage.js"></script>
        <script type="text/javascript" language="javascript" src="js/nav/Nav.journeyResPage.js"></script>
        <script type="text/javascript" language="javascript" src="js/nav/Nav.departureDetTable.js"></script>
        
        
	</head>
    <body id="body" onload="Main.onLoad();document.onkeypress=SS.keyDown" onunload="Main.unload();" class="homePage">
    <!--<body id="body" onload="Main.onLoad();document.onkeypress=SS.keyDown" onunload="Main.unload();" class="homePage">-->
    	<div id="alertBox" class="alerBox" style="display:none;">
        	<div class="alerBox-header">Error</div>
            <div id="alertBoxMsg" class="alerBox-msg">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
            	<tr><td align="center" valign="middle"><h1>Message</h1></td></tr>
            </table>
        	</div>
            <div class="alerBox-footer">
                <div class="alerBox-btn-enter"><h3>OK</h3></div>
            </div>
    	</div>    
        <!-- Background -->
        <div class="background page"></div>
        <!-- Splash Screen -->
    	<div id="splash" class="page"></div>
        <!-- Page Header -->
        <div id="header" class="header view">
            <div id="menu">
              <div id="menujourneyPage" class="navButton link" data-tabindex="1"><h2>Journey <br/>planner</h2></div>
              <div id="menudeparrPage" class="navButton link" data-tabindex="0"><h2>Departures <br/>&amp; arrivals</h2></div>
            </div>
        </div>
        <!-- END Page Header -->
        <div class="loader" style="display:none;"></div>
        <!-- Page Header -->
        <div class="footer">
			<!--<div class="btn-A btn-homePage btn-journeyResPage btn-journeyPage btn-deparrPage btn-arrivalsPage btn-departurePage btn-departureDetPage"><h3>Login</h3></div>-->
            <div class="btn-B btn-journeyResPage"><h3>Amend journey details</h3></div>
			<div class="btn-B btn-departurePage btn-departureDetPage btn-arrivalsPage"><h3>New journey</h3></div>
			<div class="btn-C btn-journeyResPage"><h3>Plan a new journey</h3></div>
			<div class="btn-C btn-departurePage"><h3>Arrivals</h3></div>
			<div class="btn-C btn-arrivalsPage"><h3>Departures</h3></div>
			<!--<div class="btn-D btn-journeyResPage"><h3>Save journey</h3></div>-->
            
            <div class="btn-exit btn-homePage btn-journeyResPage btn-journeyPage btn-deparrPage btn-arrivalsPage btn-departurePage btn-departureDetPage btn-stationChooserPage btn-journeyResDetPage"><h3>Exit</h3></div>
            <div class="btn-back btn-homePage btn-journeyResPage btn-journeyPage btn-deparrPage btn-arrivalsPage btn-departurePage btn-departureDetPage btn-stationChooserPage btn-journeyResDetPage"><h3>Back</h3></div>
		</div>
        <!-- END Page Header -->
        <!-- Home Content -->
		<div id="homePage" class="page">
			<!-- Home Content -->
            <div class="content">
            	<div id="mainButtons" class="view">
                	<div id="planJourney" class="link button selected" data-tabindex="0"><h1>Plan your journey</h1></div>
                    <div id="recentStations" class="link button" data-tabindex="1"><h1>Departures &amp; arrivals</h1></div>
                </div>
                <div class="mod">
                    <div id="homeRecentJourneys" class="subcontent view">
                        <div class="deparrHeader"><h1>Recent journeys</h1></div>
                    </div>         
                </div>
                <div class="mod">
                    <div id="homeRecentStations" class="subcontent view">
                        <div class="deparrHeader"><h1>Recent stations</h1></div>
                    </div>        
                </div>
            </div>
		</div>
		<!-- END Home Content -->
        <!-- Journey Planner Content -->
        <div id="journeyPage" class="page">
        	<div class="content">
            	<div id="journeySearch" class="search_pane view">
					<table border="0" cellpadding="0" cellspacing="0" width="1200px" style="margin-left:35px; margin-top:35px;">
                    	<tr>
                        	<td width="67px" style="padding:0px 13px 0px 13px;" align="right">
								<h1>From:</h1>
							</td>
                            <td width="400px">
								<div id="fromStation" class="input link" data-tabindex="0" data-rel="Keypad" data-allstations="true"><input type="text" value="" disabled="disabled"/></div>
							</td>
                            <td rowspan="2" valign="top">
								<h1>Date: <span class="dt">11 Nov 2011</span><br/>Time: <span class="tm">12:35</span></h1>
								<div id="outDate" class="link" data-tabindex="1" data-rel="Datepad"><h2>Change date</h2></div>
                            </td>
                            <td width="287px" align="right" style="padding:0px 13px 0px 0px;">
								<h1 style="float:left; width:200px; padding-left:27px;">Show only fastest trains</h1>
                            	<div id="fastTrains" class="checkbox link" data-tabindex="2" style="float:right;" data-rel="Checkbox"></div>
                            </td>
                        </tr>
                        <tr>
                        	<td style="padding:0px 13px 0px 13px; height:63px;" align="right"><h1>To:</h1></td>
                            <td><div id="toStation" class="input link" data-tabindex="3" data-rel="Keypad" data-code="" data-allstations="true"><input type="text" value=""  disabled="disabled"/></div></td>
                            <td rowspan="2"><div id="btnPlanJourney" class="goButton link" data-tabindex="4"><h1>GO</h1></div></td>
                        </tr>
                        <tr>
                        	<td></td>
                        	<td colspan="1"><div id="addReturn" class="link" data-tabindex="5" style="height:85px;"><h2>Add return journey</h2></div></td>
                            <td valign="top" style="display:none;">
								<h1>Date: <span class="dt">11 Nov 2011</span><br/>Time: <span class="tm">12:35</span></h1>
	                            <div id="retDate" class="link hidden" data-tabindex="6" data-rel="Datepad"><h2>Change date</h2></div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="recentJourneys" class="recent_pane view">
                	<div class="deparrHeader"><h1>Recently viewed journeys</h1></div>
                </div>
            </div>
		</div>
		<!-- END Journey Planner Content -->
		<!-- Journey Result Content -->
		<div id="journeyResPage" class="page">
			<div class="content">
                <div class="search_pane sml">
                	<table border="0" cellpadding="0" cellspacing="0" width="1067px" style="height:133px; margin:15px 0px 0px 25px;">
                    <tr><td align="center" valign="middle">
                    <table border="0" cellpadding="2" cellspacing="0" width="1120px" style="margin:0px 47px 0px 47px;">
                        <tr>
                        	<td align="left"><h2>From</h2></td>
                            <td align="left"><h2>To</h2></td>
                            <td width="180px" align="left"><h2>Date</h2></td>
                            <td width="80px" align="left"><h2>Time</h2></td>
                            <td width="180px" align="left"><h2>Return date</h2></td>
                            <td width="80px" align="left"><h2>Time</h2></td>
                        </tr>
                        <tr>
                        	<td align="left" valign="middle"><h1 id="h_from"></h1></td>
                            <td align="left" valign="middle"><h1 id="h_to"></h1></td>
                            <td align="left" valign="middle"><h1 id="h_date"></h1></td>
                            <td align="left" valign="middle"><h1 id="h_time"></h1></td>
                            <td align="left" valign="middle"><h1 id="h_retdate"></h1></td>
                            <td align="left" valign="middle"><h1 id="h_rettime"></h1></td>
                        </tr>
                    </table>
                    </td></tr></table>
                </div>
                <div id="outHeader" class="detHeader"><h2>Outward journey</h2></div>
                <div id="earlieroutward" class="view"><div id="earlieroutwardlink" class="link earlier outward" data-tabindex="0"><h2>Earlier trains</h2></div></div>
                <div class="grid sml left">
                    <div class="gridheader">
						<ul>
							<li class="col1"><h2>Depart</h2></li>
							<li class="col2"><h2>Arrive</h2></li>
							<li class="col3"><h2>CHG</h2></li>
							<li class="col4"><h2>PL</h2></li>
							<li class="col5"><h2>DURATION</h2></li>
                            <li class="col6"><h2></h2></li>
						</ul>
					</div>
                    <div id="outTable" class="gridTable view"></div>
                </div>
                <div id="lateroutward" class="view"><div id="lateroutwardlink" class="link later outward" data-tabindex="0"><h2>Later trains</h2></div></div>
                <div id="retHeader" class="detHeader"><h2>Return journey</h2></div>
                
                <div id="addReturnView" class="view"><div id="addReturnResPage" class="link" data-tabindex="0"><h2>Add return journey</h2></div></div>
                
                <div id="earlierreturn" class="view"><div id="earlierreturnlink" class="link earlier return" data-tabindex="0"><h2>Earlier trains</h2></div></div>
                <div class="grid sml right">
                    <div class="gridheader">
						<ul>
							<li class="col1"><h2>Depart</h2></li>
							<li class="col2"><h2>Arrive</h2></li>
							<li class="col3"><h2>CHG</h2></li>
							<li class="col4"><h2>PL</h2></li>
							<li class="col5"><h2>DURATION</h2></li>
                            <li class="col6"><h2></h2></li>
						</ul>
					</div>
					<div id="retTable" class="gridTable view"></div>
                </div>
                <div id="laterreturn" class="view"><div id="laterreturnlink" class="link later return" data-tabindex="0"><h2>Later trains</h2></div></div>
			</div>
		</div>
		<!-- END Journey Result Content -->
        <!-- Journey Result Detail Content -->
		<div id="journeyResDetPage" class="page">
        	<div class="content">
            	<div class="search_pane sml">
                    <table border="0" cellpadding="0" cellspacing="0" width="1067px" style="height:133px; margin:15px 0px 0px 25px;">
                    <tr><td align="center" valign="middle">
                    <table border="0" cellpadding="2" cellspacing="0" width="1120px" style="margin:0px 47px 0px 47px;">
                        <tr>
                        	<td align="left"><h2>From</h2></td>
                            <td align="left"><h2>To</h2></td>
                            <td width="170px" align="left"><h2>Date</h2></td>
                            <td width="80px" align="left"><h2>Time</h2></td>
                            <td width="170px" align="left"><h2>Return date</h2></td>
                            <td width="80px" align="left"><h2>Time</h2></td>
                        </tr>
                        <tr>
                        	<td align="left" valign="middle"><h1></h1></td>
                            <td align="left" valign="middle"><h1></h1></td>
                            <td align="left" valign="middle"><h1></h1></td>
                            <td align="left" valign="middle"><h1></h1></td>
                            <td align="left" valign="middle"><h1></h1></td>
                            <td align="left" valign="middle"><h1></h1></td>
                        </tr>
                    </table>
                    </td></tr></table>
                </div>
                <div class="detHeader2"><h2>Outward journey</h2></div>
                <div class="grid resDet">
                    <div class="gridheader">
						<ul>
							<li class="col1"><h2>By</h2></li>
							<li class="col2"><h2>Leaving</h2></li>
							<li class="col3"><h2>From</h2></li>
							<li class="col4"><h2>To</h2></li>
                            <li class="col5"><h2>Arriving</h2></li>
							<li class="col6"><h2>Duration</h2></li>
						</ul>
					</div>
                    <div id="journeyResDetTable" class="gridTable scroolable view"></div>
                    <!--<div id="departureDetTable" class="gridTable"></div>-->
                </div>				
			</div> 
		</div>
        <!-- END Journey Result Detail Content -->
        <!-- Departure Arrivals Content -->
        <div id="deparrPage" class="page">
        	<div class="content">
                <div id="deparrSearch" class="search_pane sml view">
					<table border="0" cellpadding="0" cellspacing="0" width="1200px" style="margin-left:35px; margin-top:13px;">
                        <tr>
                            <td style="padding:0px 13px 0px 13px;"><h1>Find a station</h1></td>
                            <td><div id="searchStation" class="input link" data-tabindex="0" data-rel="Keypad" data-allstations="false"><input type="text"  disabled="disabled"/></div></td>
                            <td ><div id="btnLiveDepartures" class="goButtonSml link" data-tabindex="0"><h1>Live departures</h1></div></td>
                            <td ><div id="btnLiveArrivals" class="goButtonSml link" data-tabindex="1"><h1>Live arrivals</h1></div></td>
                        </tr>
                    </table>
                </div>
                <div id="recentDepArr" class="recent_pane view">
                	<div class="deparrHeader"><h1>Recent stations</h1></div>
                </div>
			</div>
		</div>
		<!-- END Departure Arrivals Content -->
        <!-- Arrivals Content -->
        <div id="arrivalsPage" class="page">
        	<div class="content">
                <div class="detHeader">
                    <h1></h1>
                </div>
                <div class="grid">
                    <div class="gridheader">
						<ul>
							<li class="col1"><h2>Due</h2></li>
							<li class="col2"><h2>Origin</h2></li>
							<li class="col3"><h2>Status</h2></li>
							<li class="col4"><h2>Platform</h2></li>
						</ul>
					</div>
                    <div id="arrivalTable" class="gridTable scroolable view"></div>
                </div>
			</div>        
        </div>
        <!-- END Arrivals Content -->
        <!-- Departure Content -->
        <div id="departurePage" class="page">
        	<div class="content">
                <div class="detHeader">
                    <h1></h1>
                </div>
                <div class="grid">
                    <div class="gridheader">
						<ul>
							<li class="col1"><h2>Due</h2></li>
							<li class="col2"><h2>Destination</h2></li>
							<li class="col3"><h2>Status</h2></li>
							<li class="col4"><h2>Platform</h2></li>
						</ul>
					</div>
                    <div id="departureTable" class="gridTable scroolable view"></div>
                </div>				
			</div>        
        </div>
        <!-- END Departure Content -->
		<!-- Departure Detail Content -->
		<div id="departureDetPage" class="page">
        	<div class="content">
                <div class="detHeader">
                    <h1></h1>
                </div>
                <div class="grid depDetail">
                    <div class="gridheader">
						<ul>
							<li class="col1"><h2>Departs</h2></li>
							<li class="col2"><h2>Station</h2></li>
							<li class="col3"><h2>Status</h2></li>
							<li class="col4"><h2>Platform</h2></li>
						</ul>
					</div>
                    <div id="departureDetTable" class="gridTable scroolable view"></div>
                </div>				
			</div> 
		</div>
        <!-- END Departure Detail Content -->
        <!-- Station Chooser Content -->
		<div id="stationChooserPage" class="page">		
        	<div class="content">
                <div class="detHeader">
                    <h1>From station</h1>
                </div>
                <div class="stationChooserTitle">
                	<h2>Sorry we couldn't find "<strong id="disambiguationCode" style="text-transform:uppercase;"></strong>".<br/> Did you mean?</h2>
                </div>
                <div class="grid stChDetail">
                    <div class="gridheader">
						<ul>
                            <li class="col1"><h2>Station</h2></li>
						</ul>
					</div>
                    <div id="stChTable" class="gridTable scroolable view"></div>
                </div>				
			</div>
		</div>
		<!-- END Station Chooser Content -->
        <div id="autoComplete" class="autoComplete subview"></div>
<div id="debugWindow" style="position: absolute; top: 10px; right: 10px; width: 200px; height: 700px; color: lime; font-size: 14px; line-height: 16px; background:none; border: none; z-index: 3000; display: none; overflow:auto;"></div></body>
		
</html>
