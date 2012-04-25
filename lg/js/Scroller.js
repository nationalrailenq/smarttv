var Scroller = {
	
}
Scroller.init = function(view)
{
	var table = $('#'+view);
	//SS.log('INIT Scroll:::'+ view + ':::' + table.hasClass('scroolable'))
	if(!table.hasClass('scroolable')) return false;
	var tb_height = table.height();
	var ch_height = 0;
	var chf_height = 0;
	table.children().each(function(){
		if(chf_height == 0) chf_height += $(this).height();
		ch_height += $(this).height();
	});
	$('.scrollbar').remove();
	if(tb_height < ch_height)
	{
		//if(!table.data('scrooler'))
		
		
		
		table.css('overflow','hidden').data('scrooler',true);
		
		var scrooler = $('<div class="scrollbar '+view+(table.attr('id') == 'journeyResDetTable' ? ' ssml':'')+'" ch_height="'+ch_height+'" chf_height="'+chf_height+'" style="height:'+(tb_height-4)+'px;"></div>');
		
		var scroolerHnd = $('<div class="scr"></div>');
		
		
		
		scrooler.append(scroolerHnd);
		
		
		
		table.after(scrooler);
		
		$('.scr').drag("init",function(){
			
        	$(this).attr('dragInitPos',$(this).css('top'));
			KeyHandler.blocked = true;
		}).drag("end",function(){
			//SS.log('end')
			KeyHandler.blocked = false;
      	}).drag(function( ev, dd ){
			alert('Drag Init####################' + $(this).attr('id'))
			var isSml = scrooler.hasClass('ssml');
			var hgth = Math.ceil((isSml ? 149 : 225)*(SS.device != 'samsung' ? 1.33 : 1));
			var maxScrPos = hgth - (SS.device != 'samsung' ? 100 : 75)
			var posScr = parseInt($(this).attr('dragInitPos')) + dd.deltaY;// * (hgth/ch_height); 
			posScr = (posScr < 2 ? 2 : posScr);
			posScr = (posScr > maxScrPos ? maxScrPos : posScr);
			
			$(this).css('top',(posScr) +'px');
			
			var pos = Math.ceil(posScr / ( hgth / ch_height ) / chf_height )* ( chf_height )
			if(posScr <=2) pos = 0;
			
			//var pos = (Nav.selected * ( chf_height ))-(rows*chf_height);
			
			table.scrollTop(pos);
			
		});
		Scroller.scroll(view)
	}
}
Scroller.scroll = function(view)
{
	//SS.log('scrool');
	var table = $('#'+view);
	if(table.data('scrooler'))
	{
		var scrooler = table.next('.scrollbar:first');
		var scr = scrooler.children('.scr:first');
		var isSml = scrooler.hasClass('ssml');
		var tb_height = table.height();
		var chf_height = parseInt(scrooler.attr('chf_height'));
		var ch_height = parseInt(scrooler.attr('ch_height'));
		var rows = parseInt(tb_height/chf_height/2)-1;
		
		var pos = (Nav.selected * ( chf_height ))-(rows*chf_height);
		
		var hgth = Math.ceil((isSml ? 149 : 225)*(SS.device != 'samsung' ? 1.33 : 1));
		
		var maxScrPos = hgth - (SS.device != 'samsung' ? 100 : 75)

		//in case of miscalculation
		if(Nav.selected >= Nav.links.length - 1)
		{
			pos = 999999;
		}
		
		var posScr = ( pos * (hgth/ch_height) );

		pos = (pos < 0 ? 0 : pos);
		posScr = (posScr < 2 ? 2 : posScr);
		posScr = (posScr > maxScrPos ? maxScrPos : posScr);
		
		scr.css('top',(posScr) +'px');
		//SS.log('Scroll To::' + pos + ' >>' + ch_height);
		table.scrollTop(pos);
	}
}