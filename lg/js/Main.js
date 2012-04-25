// JavaScript Document
var Main = {
	debug : false,
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
	
	Main.PrepareAttr();
	
	SS.init(Main.debug);
	SS.debug(Main.debug);
	SS.log('After SS.init')
	
	if(SS.device != 'samsung')
	{
		window.alert = function(msg){
			SS.log(msg);
		}
	}
	KeyHandler.init();
	
	Main.imagePreload();
	
	//SSgoogleanalytics.init('MO-22025146-6', null);
	//SSgoogleanalytics.init('MO-316623-26', 'http://stats.nationalrail.co.uk/smarttv.php');
	if(SS.device == 'samsung')
	{
                document.getElementById('btn-exit').textContent = 'Exit'
		GoogleAnalytics.init('MO-316623-26', 'http://smarttv.apps.nationalrail.co.uk/ga.php');
	}
	else
	{
		var location = window.location.href;
		location = location.substring(0,location.lastIndexOf('/')) + '/';
		GoogleAnalytics.init('MO-316623-26', location + 'ga.php');
	}
	GoogleAnalytics.analyticMark('device', SS.device);
	
	if(SS.device == 'samsung')
	{
		$('object').each(function(i){		
			$(this).attr('border',0).css(
				{
					"display":"block",
					"position":"absolute",
					"width":"0px",
					"height":"0px"	
				});
		});
	}
	
	if(SS.device == 'philips')
	{
		SS.keyDown = function (event) {
			var a = event.keyCode;
			if (a == VK_UP || a == VK_DOWN)
			{
				event.preventDefault();
				event.stopPropagation();
			}
			if (a == VK_LEFT || a == VK_RIGHT) {
				if(KeyHandler.hasSubView != 'keypad' && KeyHandler.hasSubView != 'autoComplete')
				{
					event.preventDefault();
					event.stopPropagation();
				}
			}
			SS.log('SS Key Pressed :: ' + a + '>' + event.keyCode + '>' + event.which + '>' + KeyHandler.keyName(a));
			if (SS.activeIME) {
				if (a == VK_ENTER) {
					event.preventDefault();
				}
				IME.processKey(a)
			} else {
				if (a == VK_BACK) {
					if(KeyHandler.hasSubView != 'keypad' && KeyHandler.hasSubView != 'autoComplete')
					{
						event.preventDefault();
					}
				}
				Main.keyDown(a)
			}
			
		};
	}
	
	setTimeout(function(){Main.ready();},Main.splashDelay);	
};
Main.PrepareAttr = function()
{
	if(SS.device == 'samsung') $('div.inputClick').hide();
	if(SS.device == 'samsung') $('.input').each(function(i){$(this).children('input:first').removeAttr('disabled').show();});
	$('#menujourneyPage').attr('data-tabindex',1);
	$('#menudeparrPage').attr('data-tabindex',0);
	$('#planJourney').attr('data-tabindex',0);
	$('#recentStations').attr('data-tabindex',1);
	$('#fromStation').attr({'data-tabindex':0,'data-rel':'Keypad','data-allstations':'true'});
	$('#outDate').attr({'data-tabindex':1,'data-rel':'Datepad'});
	$('#fastTrains').attr({'data-tabindex':2,'data-rel':'Checkbox'});
	$('#toStation').attr({'data-tabindex':3,'data-rel':'Keypad','data-code':'','data-allstations':'true'});
	$('#btnPlanJourney').attr('data-tabindex',4);
	$('#addReturn').attr('data-tabindex',5);
	$('#retDate').attr({'data-tabindex':6,'data-rel':'Datepad'});
	$('#earlieroutwardlink').attr('data-tabindex',0);
	$('#lateroutwardlink').attr('data-tabindex',0);
	$('addReturnResPage').attr('data-tabindex',0);
	$('#earlierreturnlink').attr('data-tabindex',0);
	$('#laterreturnlink').attr('data-tabindex',0);
	$('#searchStation').attr({'data-tabindex':0,'data-rel':'Keypad','data-allstations':'false'});
	$('#btnLiveDepartures').attr('data-tabindex',1);
	$('#btnLiveArrivals').attr('data-tabindex',2);
}
Main.unload = function(){
	//Finnished app closing down
};
Main.ready = function()
{
	$(body).addClass(SS.device);
	
	var dt = Utils.interval15min(new Date());
	$('[data-rel="Datepad"]').each(function(){
		$(this).data('date',dt);
		$(this).parents('td:first').find('.dt').html(dt.format("dd mmm yyyy"));
		$(this).parents('td:first').find('.tm').html(dt.format("HH:MM"));
	});
	
	KeyHandler.changeView('homePage','mainButtons');
	KeyHandler.block(false);
	
	//Alert.show('sdafidsuh ajhfdkh adskjh fkadsh ksadhfkj ahjkfdsah ksahfk ashdfkjahskhfadkkjdsf khjkashdfk')
	//reset connectivity
	//NEED to BE removed when Platform will be fixed
	setInterval(function() {
		if( $('#connectionAlert').length > 0 )
		{
			if(SS.checkConnectivity())
			{
				$('#connectionAlert').remove();
			}
		}
	},60000);
};
Main.keyDown = function(key,mouse) { // Key handler 
	KeyHandler.processKey(key);
};
Main.imagePreload = function()
{
	if(SS.device == 'philips') return;
	var images = ['img/ajax-loader.gif',
	'img/Arrow.png',
	'img/Arrow_Down.png',
	'img/Arrow_Down_Selected.png',
	'img/Arrow_To.png',
	'img/Arrow_Up.png',
	'img/Arrow_Up_Selected.png',
	'img/Background.png',
	'img/bg-findstation.png',
	'img/bg-grid.png',
	'img/bkg-checkbox-inactive.png',
	'img/bkg-checkbox-inactive_selected.png',
	'img/bkg-checkbox.png',
	'img/bkg-checkbox_selected.png',
	'img/bkg-findstation.png',
	'img/bkg-footer.png',
	'img/bkg-grid.png',
	'img/bkg-home-mod-title.png',
	'img/bkg-plannerContent.png',
	'img/bkg-searchresults-grid-list-date.png',
	'img/bkg-title-hover.png',
	'img/bkg_mod_home.png',
	'img/bkg_service.png',
	'img/Departures_Table.png',
	'img/Departures_Table_Small.png',
	'img/Departure_Track_Bottom.png',
	'img/Departure_Track_Circle.png',
	'img/Departure_Track_Middle.png',
	'img/Departure_Track_Top.png',
	'img/Go_Butt.png',
	'img/Go_Butt_Selected.png',
	'img/Go_Butt_Selected_Sml.png',
	'img/Go_Butt_Sml.png',
	'img/Go_Butt_Sml_Selected.png',
	'img/input.png',
	'img/input_selected.png',
	'img/Logo_Small.png',
	'img/Nav_Butt_Active.png',
	'img/Nav_Butt_Passive.png',
	'img/Nav_Butt_Selected.png',
	'img/Press_Enter.png',
	'img/Scroll_Bar_Background.png',
	'img/Scroll_Bar_Background_sml.png',
	'img/Scroll_Bar_Scroller.png',
	'img/splash.png',
	'img/StChooser_Table_Small.png',
	'img/Warning_Red.png',
	'img/Warning_Yellow.png',
	'img/White_Box_01.png',
	'img/White_Box_01_Selected.png',
	'img/White_Box_Home.png',
	'img/White_Box_Home_Selected.png']

	Utils.preloadImages(images);
};
