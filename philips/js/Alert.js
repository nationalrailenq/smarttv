var Alert = {
	visible : false,
	debug : true
}
Alert.show = function(msg)
{
	var smsg = '';
	if(typeof(msg) == 'object')
	{
		if(!this.debug) return false;
		smsg = 'Debug Error<br/>'
		smsg = (msg.fileName ? msg.fileName.substring(msg.fileName.lastIndexOf('/')+1) : '') + (msg.lineNumber ? ' line:' + msg.lineNumber + '<br/>' : '') + (msg.message ? msg.message : '');
		/*$.each(msg, function(key,val){
			if(key.toLowerCase() == 'fileName') val = val.substring(val.lastIndexOf('/'));
			if(key.toLowerCase() == 'lineNumber')
			smsg += key + ': ' + val + '<br/>';
		});
		*/
		//msg = 'Line::' + msg.line + '<br/>' + msg.message;
	}
	else
	{
		if(msg == 'Iptis Error: Bad Search Status.')
		{
			smsg = 'There are no trains running when you want to go. <br/><br/> Try again, travelling at a different time.';
		}
		else
		{
			smsg = msg;
		}
	}
	smsg = smsg.replace(/\(/g,' (').replace(/\)/g,') ').replace(/\[/,' [').replace(/\]/,'] ').replace(/  /,' ');
	$('#alertBoxMsg').find('h1').html(smsg)
	$('#alertBox').show();
	this.visible = true;
}
Alert.hide = function()
{
	$('#alertBox').hide();
	this.visible = false;	
}