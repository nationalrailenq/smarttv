// JavaScript Document
var Main = {
	appName : 'NRE',
	splashDelay : 1,
	imagePreloading : new Image()
}
Main.onLoad = function(){
	//to prevent selecting text using mouse
	document.onselectstart = function() {
		if(!$(this).hasClass('selected'))
		{
			return false;
		}
	} // ie
	document.onmousedown = function() {
		if(!$(this).hasClass('selected'))
		{
			return false;
		}
	} // mozilla
	
	SS.init();
	SS.debug.init(false);
	if(SS.device != 'samsung')
	{
		window.alert = function(msg){
			SS.log(msg);
		}
	}
	KeyHandler.init();
	
	Main.imagePreload();
	//SS.debug.init(true);
	
	//SSgoogleanalytics.init('MO-316623-26', window.location.href + 'http://stats.nationalrail.co.uk/smarttv.php');
	//SSgoogleanalytics.init('MO-316623-26', window.location.href + 'ga.php');
	//SSgoogleanalytics.analyticMark('device', SS.device);
	
	var location = window.location.href;
	location = location.substring(0,location.lastIndexOf('/')) + '/';
	SSgoogleanalytics.init('MO-316623-26', location + 'ga.php');
	SSgoogleanalytics.analyticMark('device', SS.device);
	
	setTimeout(function(){Main.ready();},Main.splashDelay);	
};
Main.unload = function(){
	//Finnished app closing down
};
Main.ready = function()
{
	var dt = Utils.interval15min(new Date());
	$('[data-rel="Datepad"]').each(function(){
		$(this).data('date',dt);
		$(this).parents('td:first').find('.dt').html(dt.format("dd mmm yyyy"));
		$(this).parents('td:first').find('.tm').html(dt.format("HH:MM"));
	});
	
	KeyHandler.changeView('homePage','mainButtons');
	KeyHandler.block(false);
};
Main.keyDown = function (keycode) { // Key handler 
    KeyHandler.processKey(keycode);	
};
Main.imagePreload = function()
{
	/*
	Main.imagePreloading.src = 'img/ajax-loader.gif';
	Main.imagePreloading.src = 'img/Arrow.png';
	Main.imagePreloading.src = 'img/Arrow_Down.png';
	Main.imagePreloading.src = 'img/Arrow_Down_Selected.png';
	Main.imagePreloading.src = 'img/Arrow_To.png';
	Main.imagePreloading.src = 'img/Arrow_Up.png';
	Main.imagePreloading.src = 'img/Arrow_Up_Selected.png';
	Main.imagePreloading.src = 'img/Background.png';
	Main.imagePreloading.src = 'img/bg-findstation.png';
	Main.imagePreloading.src = 'img/bg-grid.png';
	Main.imagePreloading.src = 'img/bkg-checkbox-inactive.png';
	Main.imagePreloading.src = 'img/bkg-checkbox-inactive_selected.png';
	Main.imagePreloading.src = 'img/bkg-checkbox.png';
	Main.imagePreloading.src = 'img/bkg-checkbox_selected.png';
	Main.imagePreloading.src = 'img/bkg-findstation.png';
	Main.imagePreloading.src = 'img/bkg-footer.png';
	Main.imagePreloading.src = 'img/bkg-grid.png';
	Main.imagePreloading.src = 'img/bkg-home-mod-title.png';
	Main.imagePreloading.src = 'img/bkg-plannerContent.png';
	Main.imagePreloading.src = 'img/bkg-searchresults-grid-list-date.png';
	Main.imagePreloading.src = 'img/bkg-title-hover.png';
	Main.imagePreloading.src = 'img/bkg_mod_home.png';
	Main.imagePreloading.src = 'img/bkg_service.png';
	Main.imagePreloading.src = 'img/Departures_Table.png';
	Main.imagePreloading.src = 'img/Departures_Table_Small.png';
	Main.imagePreloading.src = 'img/Departure_Track_Bottom.png';
	Main.imagePreloading.src = 'img/Departure_Track_Circle.png';
	Main.imagePreloading.src = 'img/Departure_Track_Middle.png';
	Main.imagePreloading.src = 'img/Departure_Track_Top.png';
	Main.imagePreloading.src = 'img/Go_Butt.png';
	Main.imagePreloading.src = 'img/Go_Butt_Selected.png';
	Main.imagePreloading.src = 'img/Go_Butt_Selected_Sml.png';
	Main.imagePreloading.src = 'img/Go_Butt_Sml.png';
	Main.imagePreloading.src = 'img/Go_Butt_Sml_Selected.png';
	Main.imagePreloading.src = 'img/input.png';
	Main.imagePreloading.src = 'img/input_selected.png';
	Main.imagePreloading.src = 'img/Logo_Small.png';
	Main.imagePreloading.src = 'img/Nav_Butt_Active.png';
	Main.imagePreloading.src = 'img/Nav_Butt_Passive.png';
	Main.imagePreloading.src = 'img/Nav_Butt_Selected.png';
	Main.imagePreloading.src = 'img/Press_Enter.png';
	Main.imagePreloading.src = 'img/Scroll_Bar_Background.png';
	Main.imagePreloading.src = 'img/Scroll_Bar_Background_sml.png';
	Main.imagePreloading.src = 'img/Scroll_Bar_Scroller.png';
	Main.imagePreloading.src = 'img/splash.png';
	Main.imagePreloading.src = 'img/StChooser_Table_Small.png';
	Main.imagePreloading.src = 'img/Warning_Red.png';
	Main.imagePreloading.src = 'img/Warning_Yellow.png';
	Main.imagePreloading.src = 'img/White_Box_01.png';
	Main.imagePreloading.src = 'img/White_Box_01_Selected.png';
	Main.imagePreloading.src = 'img/White_Box_Home.png';
	Main.imagePreloading.src = 'img/White_Box_Home_Selected.png';
*/
};
