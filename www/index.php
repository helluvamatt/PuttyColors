<?php

$app = require '../bootstrap.php';

$app->get('/', function () use ($app) {
	$app->render("default.twig");
} )->name('/');

$app->get('/api/presets', function() use ($app) {
	$app->response->headers->set('Content-Type', 'application/json');
	$app->response->setBody(file_get_contents(BASEDIR . "/data/presets.json"));
})->name('/api/presets');

$app->post('/api/share', function() use ($app) {
	$app->response->headers->set('Content-Type', 'application/json');
	
	$color_data = json_decode($app->request->post('colors'), true);
	$session_name = $app->request->post('session_name');
	$result = array();
	
	// Verify color_data has all the colors required
	if (Schneenet\PuttyColors\Models\PuttyProfile::hashKeysMatchColorProfile($color_data))
	{
		// Encode the color_data to safely save it in the database
		$json_color_data = json_encode($color_data);
		$encoded_json_color_data = base64_encode($json_color_data);
		
		// Verify session_name (empty defaults to "Default Sesssion")
		if ($session_name == '') $session_name = 'Default Session';
		
		// Save color data and session name to database as a new row, return the ID to $share_id
		$putty_profile = Schneenet\PuttyColors\Models\PuttyProfile::create(array("session_name" => $session_name, "color_data" => $encoded_json_color_data));
		
		// Create the share ID and the share URL
		$share_id = str_pad(base_convert($putty_profile->id, 10, 16), 8, "0", STR_PAD_LEFT);
		$app_url = $app->urlFor('/');
		$share_url = $app_url . '#' . $share_id;
		
		// Create the result
		$result['result'] = 0;
		$result['color_data'] = $color_data;
		$result['session_name'] = $session_name;
		$result['shareUrl'] = $share_url;
		$result['shareId'] = $share_id;
	}
	else
	{
		$result['result'] = 1;
		$result['error'] = "Serialization error. Invalid color_data.";
	}
	
	// Send the result
	$app->response->setBody(json_encode($result));
	
})->name('POST/api/share');

$app->get('/api/share/:share_id', function($share_id) use ($app) {
	$app->response->headers->set('Content-Type', 'application/json');
	$id = base_convert($share_id, 16, 10);
	$result = array();
	
	// Fetch model by id
	$putty_profile = Schneenet\PuttyColors\Models\PuttyProfile::find($id);
	if (isset($putty_profile))
	{
		$result['result'] = 0;
		$result['color_data'] = json_decode(base64_decode($putty_profile->color_data), TRUE);
		$result['session_name'] = $putty_profile->session_name;
	}
	else
	{
		$result['result'] = 1;
		$result['error'] = "Shared profile not found.";
	}
	
	$app->response->setBody(json_encode($result));
})->name('GET/api/share');

$app->run();
