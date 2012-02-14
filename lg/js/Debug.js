// JavaScript Document

var Debug = {
	debug : false
}

Debug.Log = function(msg)
{
	if(this.debug)
	{
		if($('#DebugWindow').length <= 0)
		{
			$('body').append('<textarea id="DebugWindow" style="position:absolute; top:0px; right:0px; width:314px; height:100%; z-index:99; color:#000;">Log Started<br/></textarea>')
		}
		
		$('#DebugWindow').val(msg + "\r\n" + $('#DebugWindow').val() );
	}
}
if(SS.device != 'samsung')
{
	window.alert = function(msg){
		Debug.Log(msg);
	}
}

