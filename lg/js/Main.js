// JavaScript Document
var Main = {
	appName : 'NRE',
	splashDelay : 1,
	imagePreloading : new Image()
}
Main.onLoad = function(){
	document.onselectstart = function() {return false;} // ie
	document.onmousedown = function() {return false;} // mozilla
	
	SS.init();
	KeyHandler.init();
	//method to use system audio controls
	//window.onShow = Main.onShowEvent;
	
	//Sound.init()
	
	Main.imagePreload();
	//SS.debug.init(true);
	
	//SSgoogleanalytics.init('MO-316623-26', 'http://stats.nationalrail.co.uk/smarttv.php');
	SSgoogleanalytics.init('MO-316623-26', window.location.href + 'ga.php');
	SSgoogleanalytics.analyticMark('device', SS.device);
	
	setTimeout(function(){Main.ready();},Main.splashDelay);	
};
/*
Main.onShowEvent = function(){

	//remove volume control from app and return to device
	var nnaviPlugin = document.getElementById('pluginObjectNNavi');
	nnaviPlugin.SetBannerState(2);
	SS.pluginAPI.unregistKey(KeyHandler.tvKey.KEY_VOL_UP);
	SS.pluginAPI.unregistKey(KeyHandler.tvKey.KEY_VOL_DOWN);
	SS.pluginAPI.unregistKey(KeyHandler.tvKey.KEY_MUTE);
	
	//turn off the device screen saver
	SS.pluginAPI.setOffScreenSaver();
};
*/
Main.unload = function(){
	//Finnished app closing down
};
Main.ready = function()
{
	var dt = Utils.interval15min(new Date());
	$('[REL="Datepad"]').each(function(){
		$(this).data('date',dt);
		$(this).parents('td:first').find('.dt').html(dt.format("dd mmm yyyy"));
		$(this).parents('td:first').find('.tm').html(dt.format("HH:MM"));
	});
	
	KeyHandler.changeView('homePage','mainButtons');
	KeyHandler.block(false);
	
	//Alert.show('sdafidsuh ajhfdkh adskjh fkadsh ksadhfkj ahjkfdsah ksahfk ashdfkjahskhfadkkjdsf khjkashdfk')
	
};
Main.keyDown = function (keycode,event) { // Key handler 
    KeyHandler.processKey(keycode,event);	
};
Main.imagePreload = function()
{
	Main.imagePreloading.src = 'img/splash.png';
	Main.imagePreloading.src = 'img/Background.png';
};
