var SS={debug:{enabled:false},language:null,device:"lg",onHover:"",onFocus:"",callbackFunction:null,parse:true,activeIME:false};SS.init=function(){SS.fetchLanguage();return};SS.quit=function(){window.NetCastExit()};SS.keyDown=function(){var a=event.keyCode;if(SS.activeIME){event.preventDefault();IME.processKey(a)}else{Main.keyDown(a)}};SS.setHover=function(a){var b=document.getElementById(SS.onHover);var c=document.getElementById(a);if(b){if($(b).hasClass("hover")){$(b).removeClass("hover")}}$(c).addClass("hover");SS.onHover=a;return};SS.offHover=function(a){var b=document.getElementById(a);$(b).removeClass("hover");SS.onHover="";return};SS.setFocus=function(a){if(SS.activeIME){IME.exitEditing(false)}var b=document.getElementById(a);var c=document.getElementById(SS.onFocus);if(c){if($(c).hasClass("focus")){$(c).removeClass("focus")}}$(b).addClass("focus");$(b).focus();SS.onFocus=a;return};SS.offFocus=function(a){var b=document.getElementById(a);$(b).removeClass("focus");SS.onFocus="";$(b).blur();return};SS.fetchLanguage=function(){var a;$.ajax({url:"http://ajaxhttpheaders.appspot.com",dataType:"jsonp",success:function(b){a=b["Accept-Language"];SS.setLanguage(a)}})};SS.setLanguage=function(a){var b=SS.getBestLang(a);SS.log("Language is set to: '"+b+"'");SS.language=b;return};SS.getBestLang=function(a){var b="";if(a.indexOf(",")>=0||a.indexOf(";")>=0){var c=a.split(",");if(c[0].indexOf(";")>=0){var d=c[0].split(";");b=d[0]}else{b=c[0]}}else{b=a}return b};SS.getLanguage=function(){if(SS.language!=null){return SS.language}else{SS.fetchLanguage();return null}};SS.debug.init=function(a){SS.debug.enable(a);SS.log("Debug.init")};SS.debug.enable=function(a){SS.debug.enabled=a;if(a==true){$("#debugWindow").show()}else{$("#debugWindow").hide()}};SS.log=function(a){if(SS.debug.enabled){$("#debugWindow").prepend("<p>"+a+"</p>")}};SS.putInnerHTML=function(a,b){a.innerHTML=b};SS.getJSONcors=function(a,b,c){var d='https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D"'+encodeURIComponent(a)+'"&format=json&callback=';SS.callbackFunction=b;if(c){SS.parse=false}var e=document.createElement("script");e.type="text/javascript";e.src=d+"SS.responseCallback";document.getElementsByTagName("head")[0].appendChild(e)};SS.responseCallback=function(a){var b;if(SS.parse){b=JSON.parse(a.query.results.body.p)}else{b=a.query.results.body.p;SS.parse=true}var c=SS.callbackFunction;SS.callbackFunction=null;c(b)}
