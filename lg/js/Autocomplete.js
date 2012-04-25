// JavaScript Document
var Autocomplete = {
	sugestLimit : 10,
	xhr : null
}

Autocomplete.init = function(field)
{
	//if(!field.attr('a_type')) return;  //if autocomplete
	var fieldID = field.attr('id');
	var autocomplete = $('#autoComplete');
	
	if(autocomplete.length < 1) 
	{
		$('body').append('<div id="autoComplete" class="autoComplete subview"></div>');
		autocomplete = $('#autoComplete');
	}
	var pos = field.offset();
	
	switch(fieldID)
	{
		case 'fromStation':
			//FROM 11625x103
			//SS.log('Device ::: '+SS.device)
			if(SS.device == 'samsung')
			{
				autocomplete.css({'top':138+25,'left':103});
			}
			else if(SS.device == 'philips')
			{
				autocomplete.css({'top':190+25,'left':150});
			}
			else
			{
				autocomplete.css({'top':192+25,'left':157});
			}
			break;
		case 'toStation':
			//TO 18025x103
			if(SS.device == 'samsung')
			{
				autocomplete.css({'top':184+25,'left':103});
			}
			else if(SS.device == 'philips')
			{
				autocomplete.css({'top':252+25,'left':150});
			}
			else
			{
				autocomplete.css({'top':254+25,'left':157});
			}
			break;
		case 'searchStation':
			//Search 13625x182
			if(SS.device == 'samsung')
			{
				autocomplete.css({'top':148+25,'left':183});
			}
			else if(SS.device == 'philips')
			{
				autocomplete.css({'top':204+25,'left':267});
			}
			else
			{
				autocomplete.css({'top':206+25,'left':275});
			}
			break;
	}
	//SS.log('Position::' + pos.top+25 + 'x' + pos.left);
	//autocomplete.css({'top':pos.top+25,'left':pos.left});
	
	field.unbind('blur.autocomplete').bind('blur.autocomplete',function(){
		Autocomplete.hide(field);
	});
}
Autocomplete.hide = function(field,notGoBack)
{
	//if(!field.attr('a_type')) return;  //if autocomplete
	if(this.xhr && this.xhr.readyState != 4)
	{
		this.xhr.abort();
	}
	var fieldID = field.attr('id');
	var autocomplete = $('#autoComplete');
	$('#toStation').show();
	autocomplete.hide().html('');
	if(!notGoBack)
	{
		//KeyHandler.viewBack();
	}
}
Autocomplete.change = function(field)
{	
	if(KeyHandler.hasSubView == 'autoComplete' || KeyHandler.hasSubView != 'keypad')
	{
		if(SS.device != 'samsung')
		{
			KeyHandler.changeView(KeyHandler.hasPage, KeyHandler.hasView,'keypad');
		}
		//return;
	}
	
	SS.log('Autocomplete.change')
	//if(!field.attr('a_type')) return; //if autocomplete
	
	//TODO: Need different check
	//if(!field.is(":focus")) { Autocomplete.hide(field); return; } //Lost focus already 

	var fieldID = field.attr('id');
	var autocomplete = $('#autoComplete');
	var url = '';
	
	var fieldInput = field.children('input:first');
	
	//switch(field.attr('a_type'))
	//{
	//	case 'station':
			url = 'http://ojp.nationalrail.co.uk/find/stations/';
	//		break;
	//}
	if (field.data('tempText') != fieldInput.val()) {
		field.data('tempText',fieldInput.val());
		if (fieldInput.val().length >= 2) {
			
			if(this.xhr && this.xhr.readyState != 4)
			{
				this.xhr.abort();
			}
			
			var sortResult = function(a,b)
			{
				var val = fieldInput.val().toLowerCase();
				
				var codeA=a[0].toLowerCase();
				var codeB=b[0].toLowerCase();
				
				var textA=a[1].toLowerCase();
				var textB=b[1].toLowerCase();
				
				if(val.length == 3)
				{
					if(codeA == val) return -1;
					if(codeB == val) return 1;
				}
				
				if (textA < textB) //sort string ascending
				{
					//SS.log(textA + '<' + textB);
					return -1; 
				}
				if (textA > textB)
				{
					//SS.log(textA + '>' + textB);
					return 1;
				}
				else return 0 //default return value (no sorting)
			}
			
			this.xhr = $.ajax({
				url: url + fieldInput.val(),
				dataType: "jsonp",
				complete: function(){},
				success: function (data) {
					if(KeyHandler.hasSubView == 'autoComplete' || KeyHandler.hasSubView != 'keypad') return;
					var items = [];
					var count =0;
					data.sort(sortResult);
					$.each(data, function (key, val) {
						Loader.codeCache.push(val);
						
						var code = val[0];
						
						if(field.attr('allstations')=='true' || code != 'All Stations')
						{
							if(code == 'All Stations')
							{
								$.each(NREgroupCodes,function(i,obj){
									if(val[1].toUpperCase() == obj.station.toUpperCase())
									{
										code = obj.code;
										return false;
									}
								});
							}
							count++;
							if(count<Autocomplete.sugestLimit){
								items.push('<div id="autocomplete_'+count+'_'+ code + '" class="sugestItem link '+(key%2==0 ? 'odd' : 'even' )+'" data-code="' + code + '" text="'+val[1]+'" data-tabindex="'+count+'"><h2>' + val[1] +' ['+val[0]+']'+ '</h2></div>');
							}
							else
							{
								return false;
							}
						}
					});
					var outHtml =items.join('');
					switch(fieldID)
					{
						case 'fromStation':
							//FROM 11625x103
							if($('<div>'+outHtml+'</div>').children('.sugestItem').length > 0)
							{
								$('#toStation').hide();
							}
							else
							{
								$('#toStation').show();
							}
							if(SS.device == 'samsung')
							{
								autocomplete.css({'top':138+25,'left':103});
							}
							else if(SS.device == 'philips')
							{
								autocomplete.css({'top':190+25,'left':150});
							}
							else
							{
								autocomplete.css({'top':192+25,'left':157});
							}
							break;
						case 'toStation':
							//TO 18025x103
							$('#toStation').show();
							if(SS.device == 'samsung')
							{
								autocomplete.css({'top':184+25,'left':103});
							}
							else if(SS.device == 'philips')
							{
								autocomplete.css({'top':252+25,'left':150});
							}
							else
							{
								autocomplete.css({'top':254+25,'left':157});
							}								
							break;
						case 'searchStation':
							//Search 13625x182
							$('#toStation').show();
							if(SS.device == 'samsung')
							{
								autocomplete.css({'top':148+25,'left':183});
							}
							else if(SS.device == 'philips')
							{
								autocomplete.css({'top':204+25,'left':267});
							}
							else
							{
								autocomplete.css({'top':206+25,'left':275});
							}
							break;
					}
					autocomplete.html(outHtml).show();
					KeyHandler.initClicksHover($('#autoComplete'));
				}
			});
		}
		
		if(fieldInput.val() == '')
		{
			Autocomplete.hide(field);
		}
	}
}

NREgroupCodes = [{'station':'BEDFORD','code':10},
{'station':'KENTON','code':100},
{'station':'KIVETON','code':101},
{'station':'KEW','code':102},
{'station':'LELANT','code':103},
{'station':'LEYTON','code':104},
{'station':'LICHFIELD','code':105},
{'station':'LIVERPOOL','code':106},
{'station':'LIVINGSTON','code':107},
{'station':'LLANWRST','code':108},
{'station':'LYMINGTON','code':109},
{'station':'BICESTER','code':11},
{'station':'LYMPSTONE','code':110},
{'station':'MAESTEG','code':111},
{'station':'MAIDSTONE','code':112},
{'station':'MALLING','code':113},
{'station':'MALVERN','code':114},
{'station':'MANCHESTER','code':115},
{'station':'MANSFIELD','code':116},
{'station':'MATLOCK','code':117},
{'station':'NEWARK','code':118},
{'station':'NEWBURY','code':119},
{'station':'BIRKENHEAD','code':12},
{'station':'NEW CROSS','code':120},
{'station':'NEWHAVEN','code':121},
{'station':'NEW MILLS','code':122},
{'station':'NORWOOD','code':123},
{'station':'OLDHAM','code':124},
{'station':'OULTON BROAD','code':125},
{'station':'PAISLEY','code':126},
{'station':'PECKHAM','code':127},
{'station':'PEMBROKE','code':128},
{'station':'PENGE','code':129},
{'station':'BIRMINGHAM','code':13},
{'station':'PEVENSEY','code':130},
{'station':'POLLOKSHAWS','code':131},
{'station':'POLLOKSHIELDS','code':132},
{'station':'PONTEFRACT','code':133},
{'station':'PORTSMOUTH','code':134},
{'station':'PRESTWICK','code':135},
{'station':'PURLEY','code':136},
{'station':'READING','code':137},
{'station':'REDCAR','code':138},
{'station':'REDDISH','code':139},
{'station':'BLACKPOOL','code':14},
{'station':'RUGELEY','code':140},
{'station':'RUISLIP','code':141},
{'station':'RUNCORN','code':142},
{'station':'RYDE','code':143},
{'station':'ST ALBANS','code':144},
{'station':'ST BUDEAUX','code':145},
{'station':'ST HELENS','code':146},
{'station':'ST LEONARDS','code':147},
{'station':'SALFORD','code':148},
{'station':'BLOXWICH','code':15},
{'station':'SMETHWICK','code':150},
{'station':'SOUTHAMPTON','code':151},
{'station':'SOUTHEND','code':152},
{'station':'STANSTED','code':153},
{'station':'STOURBRIDGE','code':154},
{'station':'STREATHAM','code':155},
{'station':'SUDBURY','code':156},
{'station':'SUTTON','code':157},
{'station':'SYDENHAM','code':158},
{'station':'THORNE','code':159},
{'station':'BOOTLE','code':16},
{'station':'TILBURY','code':160},
{'station':'TOTTENHAM','code':161},
{'station':'TREFFOREST','code':162},
{'station':'TYNDRUM','code':163},
{'station':'WAKEFIELD','code':164},
{'station':'WALLASEY','code':165},
{'station':'WALTHAMSTOW','code':166},
{'station':'WANDSWORTH','code':167},
{'station':'WARRINGTON','code':168},
{'station':'WATFORD','code':169},
{'station':'BRADFORD','code':17},
{'station':'WELWYN','code':170},
{'station':'WEMBLEY','code':171},
{'station':'WHYTELEAFE','code':172},
{'station':'WIGAN','code':173},
{'station':'WIMBLEDON','code':174},
{'station':'WINDSOR AND ETON','code':175},
{'station':'WINNERSH','code':176},
{'station':'WOOLWICH','code':177},
{'station':'WORCESTER','code':178},
{'station':'WORTHING','code':179},
{'station':'BRIGHTON','code':18},
{'station':'WREXHAM','code':180},
{'station':'YEOVIL','code':181},
{'station':'LONDON','code':182},
{'station':'CARLTON','code':183},
{'station':'DARLINGTON','code':184},
{'station':'WALTON','code':187},
{'station':'BROMBOROUGH','code':19},
{'station':'BRISTOL','code':191},
{'station':'HEATHROW','code':193},
{'station':'BIRMINGHAM INTERNATIONAL','code':198},
{'station':'ACTON','code':2},
{'station':'BROMLEY','code':20},
{'station':'BRONDESBURY','code':21},
{'station':'BRUNDALL','code':22},
{'station':'BURSCOUGH','code':23},
{'station':'BURNLEY','code':24},
{'station':'BYFLEET','code':25},
{'station':'CANTERBURY','code':26},
{'station':'ALLERTON','code':3},
{'station':'CARDIFF','code':32},
{'station':'CATFORD','code':33},
{'station':'LONDON ZONE 1','code':338},
{'station':'CHESSINGTON','code':34},
{'station':'BUXTON','code':340},
{'station':'SOUTHPORT','code':342},
{'station':'STRATFORD-UPON-AVON','code':344},
{'station':'WORKINGTON','code':345},
{'station':'CLAPHAM','code':35},
{'station':'Luton','code':350},
{'station':'REDDITCH','code':351},
{'station':'Whitby','code':358},
{'station':'COATBRIDGE','code':36},
{'station':'SOUTHEASE','code':368},
{'station':'COLCHESTER','code':37},
{'station':'TADWORTH','code':371},
{'station':'WINCHELSEA','code':375},
{'station':'BISHOPSTONE','code':376},
{'station':'ERIDGE','code':377},
{'station':'CROYDON','code':38},
{'station':'LEIGH','code':382},
{'station':'PRESTON PARK','code':383},
{'station':'LONDON ROAD','code':384},
{'station':'ASHFORD INTERNATIONAL','code':386},
{'station':'DUBLIN','code':398},
{'station':'RHOOSE','code':399},
{'station':'ARDROSSAN','code':4},
{'station':'CARDIFF INTERNATIONAL AIRPORT','code':400},
{'station':'BELFAST','code':401},
{'station':'DUNFERMLINE','code':403},
{'station':'HEATHROW T123','code':405},
{'station':'HEATHROW TERMINAL 1','code':406},
{'station':'HEATHROW TERMINAL 2','code':407},
{'station':'HEATHROW TERMINAL 3','code':408},
{'station':'HEATHROW TERMINAL 4','code':409},
{'station':'KINGS CROSS ST PANCRAS','code':411},
{'station':'MARPLE','code':412},
{'station':'WEST_HAMPSTEAD','code':413},
{'station':'LONDON ZONE U12','code':414},
{'station':'CORBY','code':415},
{'station':'HEATHROW TERMINAL 5','code':418},
{'station':'HEATHROW RAIL','code':419},
{'station':'HEATHROW BUS','code':420},
{'station':'LONDON ZONE U123','code':422},
{'station':'LONDON ZONE U1234','code':423},
{'station':'LONDON ZONE U12345','code':424},
{'station':'LONDON ZONE U123456','code':425},
{'station':'Heathrow T123 No Underground','code':426},
{'station':'Heathrow Terminal 1 No Underground','code':427},
{'station':'Heathrow Terminal 2 No Underground','code':428},
{'station':'Heathrow Terminal 3 No Underground','code':429},
{'station':'Heathrow Terminal 4 No Underground','code':430},
{'station':'Heathrow Terminal 5 No Underground','code':431},
{'station':'COULSDON','code':432},
{'station':'AYR','code':5},
{'station':'BARNES','code':6},
{'station':'DORCHESTER','code':64},
{'station':'DORKING','code':65},
{'station':'DUDLEY','code':66},
{'station':'DULWICH','code':67},
{'station':'DUMBARTON','code':68},
{'station':'EALING','code':69},
{'station':'BARRY','code':7},
{'station':'EDENBRIDGE','code':70},
{'station':'ENFIELD','code':71},
{'station':'EPSOM','code':72},
{'station':'EWELL','code':73},
{'station':'EXETER','code':74},
{'station':'FALKIRK','code':75},
{'station':'FALMOUTH','code':76},
{'station':'FARNBOROUGH','code':77},
{'station':'FOLKESTONE','code':78},
{'station':'GAINSBOROUGH','code':79},
{'station':'BATTERSEA','code':8},
{'station':'GLASGOW','code':81},
{'station':'GREENFORD','code':82},
{'station':'GREENOCK','code':83},
{'station':'GRIMSBY','code':84},
{'station':'GUILDFORD','code':85},
{'station':'HACKNEY','code':86},
{'station':'HAMILTON','code':87},
{'station':'HAMPSTEAD','code':88},
{'station':'HARLOW','code':89},
{'station':'BECKENHAM','code':9},
{'station':'HARRINGAY','code':90},
{'station':'HARROW','code':91},
{'station':'HARWICH','code':92},
{'station':'HAWARDEN','code':93},
{'station':'HEATH','code':94},
{'station':'HELENSBURGH','code':95},
{'station':'HERTFORD','code':96},
{'station':'HILLINGTON','code':97},
{'station':'HYDE','code':98},
{'station':'KENTISH TOWN','code':99}];