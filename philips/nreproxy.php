<?php
//Add headers for cross platforms
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: SOAPAction,Content-Type,Authorization");
header("Access-Control-Allow-Credentials: true");

header("Content-Type:text/xml;charset=utf-8");
  
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT" );
header("Last-Modified: " . gmdate( "D, d M Y H:i:s" ) . "GMT" );
header("Cache-Control: no-cache, must-revalidate" );
header("Pragma: no-cache" );


if($_SERVER['REQUEST_METHOD'] == 'POST' || $_SERVER['REQUEST_METHOD'] == 'GET')
{

	/* gets the data from a URL */
	if (!function_exists('apache_request_headers')) { 
		eval(' 
			function apache_request_headers() { 
				foreach($_SERVER as $key=>$value) { 
					if (substr($key,0,5)=="HTTP_") { 
						$key=str_replace(" ","-",ucwords(strtolower(str_replace("_"," ",substr($key,5))))); 
						$out[$key]=$value; 
					} 
				} 
				return $out; 
			} 
		'); 
	} 
	$soapXML = file_get_contents("php://input");
	
	$requestHeaders = apache_request_headers();	
	
	$soapUrl = isset($_GET['proxy_url'])?$_GET['proxy_url']:false;
	if (!$soapUrl) {
		header("HTTP/1.0 400 Bad Request");
		echo "proxy.php failed because proxy_url parameter is missing";
		exit();
	}
	
	//$auth = 'Authorization:Basic bnJldHZhcHA6a2dNTTR1KVI=';
	
	$user = 'nretvapp';
	$password = 'kgMM4u)R';

	$soapHeaders = array("Content-Type: text/xml; charset=utf-8",
						"Content-Length: ".strlen($soapXML),
						"Accept: text/xml", 
						"Cache-Control: no-cache", 
						"Pragma: no-cache" );
	
	if($requestHeaders['Soapaction'])
	{
		array_push($soapHeaders,"SOAPaction:".$requestHeaders['Soapaction']);
	}

	$soap_do = curl_init(); 
	curl_setopt($soap_do, CURLOPT_URL,            $soapUrl );   
	curl_setopt($soap_do, CURLOPT_CONNECTTIMEOUT, 150); 
	curl_setopt($soap_do, CURLOPT_TIMEOUT,        150); 
	curl_setopt($soap_do, CURLOPT_RETURNTRANSFER, true );
	curl_setopt($soap_do, CURLOPT_SSL_VERIFYPEER, false);  
	curl_setopt($soap_do, CURLOPT_SSL_VERIFYHOST, false); 
	curl_setopt($soap_do, CURLOPT_POST,           true ); 
	curl_setopt($soap_do, CURLOPT_POSTFIELDS,     $soapXML); 
	curl_setopt($soap_do, CURLOPT_HTTPHEADER,     $soapHeaders); 
	
	if($soapUrl == 'http://ojp.nationalrail.co.uk/webservices/jpdlr')
	{
		curl_setopt($soap_do, CURLOPT_USERPWD, $user . ":" . $password);
	}
	curl_setopt($soap_do, CURLOPT_HEADER,false);
	
	$result = curl_exec($soap_do);
	$err = curl_error($soap_do); 
	
	if(strpos($result, "<?xml") === FALSE)
	{
		$result = '<?xml version="1.0" encoding="utf-8"?>'.$result;
	}

	echo $result;
}
?>