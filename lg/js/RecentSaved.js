var RecentSaved = {
	//fileSystemObj : new FileSystem()
}

RecentSaved.init = function()
{
	
}
RecentSaved.save = function(type,data)
{
	if(data) data.updated = Utils.interval15min(Nav.fixDate(new Date()));
	
	/*
	var fileSystemObj = new FileSystem();	
	
	var bValid = fileSystemObj.isValidCommonPath(curWidget.id);
	if(!bValid) 
	{
	   fileSystemObj.createCommonDir(curWidget.id);
	}*/
	
	File.openStore(Main.appName);
	//var fileObj = fileSystemObj.openCommonFile(curWidget.id + '/nre.data', 'r'); 
	var cookies = null;
	//if( fileObj )
	//{
		try {
			cookies = JSON.parse(File.fromFile('nre'));// jQuery.parseJSON(File.fromFile('nre'));//fileObj.readAll()); 
		} catch(e) {}
	//}
	
	if(typeof(cookies) != 'object' || cookies == null)
	{
		cookies = new Object();
		cookies.journeySearch = new Array();
		cookies.deparrSearch = new Array();
	}
	
	var compareData = function(a,b)
	{
		if(typeof(a.updated)=='string')
		{
			a.updated = Utils.stringToDateJS(a.updated);
			//alert('String::' + a.updated)
		}
		if(typeof(b.updated)=='string')
		{
			b.updated = Utils.stringToDateJS(b.updated);
			//alert('String::' + b.updated)
		}
		return a.updated.getTime() - b.updated.getTime();
	}
	
	var newList = data;
	if(type=='journeySearch')
	{
		$.each(cookies.journeySearch,function(key,val){
			if(!val.updated){ val.updated = new Date();	}
			if(typeof(val.updated) == 'string') val.updated = Utils.stringToDateJS(val.updated);
			
			//alert(val.updated);

			if(data.from.code == val.from.code && data.to.code == val.to.code)
			{
				newList = null;
				val.updated = new Date();
				
				//alert('>>>>'+data.isReturn);
				
				val.outDate = data.outDate;
				val.retDate = data.retDate;
				val.isReturn = data.isReturn;
				
				return false;
			}
		});
		//newList = data.from.code.toString().removeBreaks().trim() + ',' + data.to.code.toString().removeBreaks().trim();
		if(newList) cookies.journeySearch.push(newList);
		//alert('sort');
		cookies.journeySearch.sort(compareData);
		
	}
	else if(type=='deparrSearch')
	{
		$.each(cookies.deparrSearch,function(key,val){
			if(!val.updated){ val.updated = new Date();	}			
			if(typeof(val.updated) == 'string') val.updated = Utils.stringToDateJS(val.updated);
			
			if(data.from.code == val.from.code)
			{
				newList = null;
				val.updated = new Date();
				
				val.arrival = (val.arrival ? true : false);
				val.departure= (val.departure ? true : false);
				
				return false;
			}
		});
		//newList = data.from.code.toString().removeBreaks().trim();
		if(newList) cookies.deparrSearch.push(newList);
		cookies.deparrSearch.sort(compareData);
	}
	
	var stringCookies = JSON.stringify(cookies);
	//alert(stringCookies);
	
	File.toFile('nre', stringCookies);
	
	//var fileObj = fileSystemObj.openCommonFile(curWidget.id + '/nre.data', 'w+'); 
	//fileObj.writeAll(stringCookies); 
	//fileSystemObj.closeCommonFile(fileObj);
}

RecentSaved.get = function(type,sugestLimit,ident)
{	
	//alert('RecentSaved.get');
	//var sugestLimit =6;
	var items = [];
	var stringList =null;
		
	//var fileSystemObj = new FileSystem();

	//var bValid = fileSystemObj.isValidCommonPath(curWidget.id); if (!bValid) { fileSystemObj.createCommonDir(curWidget.id); }
	
	
	//var fileObj = fileSystemObj.openCommonFile(curWidget.id + '/nre.data', 'a+')
	
	File.openStore(Main.appName);
	
	
	var cookies = null;
	//if( fileObj )
	//{
		try {
			cookies = jQuery.parseJSON(File.fromFile('nre'));//fileObj.readAll()); 
		} catch(e) { }
	//}
	
	
	if(typeof(cookies) != 'object' || cookies == null)
	{
		cookies = new Object();
		cookies.journeySearch = new Array();
		cookies.deparrSearch = new Array();
	}
	
	//stringList = fileObj.readAll();
	//fileSystemObj.closeCommonFile(fileObj);	
	
	if(type=='journeySearch')
	{
		cookies.journeySearch.reverse();
		//alert('itemLength'+cookies.journeySearch.length)
		$.each(cookies.journeySearch,function(key,data){
			if(key < sugestLimit)
			{
				var txt = '<DIV id="recentItemJourney'+ident+key+'" class="link recentButton" code="'+data.from.code+'" retcode="'+data.to.code+'" tabindex="'+key+'" outDate="'+data.outDate+'" retDate="'+data.retDate+'" return="'+data.isReturn+'">'+
                            '<DIV class="from"><H2>'+data.from.text+'</H2></DIV>'+
                       		'<DIV class="to"><H2>'+data.to.text+'</H2></DIV>'+
                        '</DIV>'
				items.push(txt);
			}
			else
			{
				return false;
			}
		});
	}
	else if(type=='deparrSearch')
	{
		cookies.deparrSearch.reverse();
		$.each(cookies.deparrSearch,function(key,data){
			if(key < sugestLimit)
			{
				items.push('<DIV id="recentItemDeparr'+ident+key+'" class="link recentButton" code="'+data.from.code+'" tabindex="'+key+'" arrival="'+(data.arrival ? true : false)+'" departure="'+(data.departure ? true : false)+'">'+
								'<div class="station"><H2>'+data.from.text+'</H2></div>'+
							'</DIV>');
			}
			else
			{
				return false;
			}
		});
	}
	
	var outHtml =items.join('');
	//alert(outHtml);
	return outHtml;
	//return '';
}
