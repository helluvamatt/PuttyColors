<?php
$color_data = json_decode($_POST['colors'], true);
$session_name = $_POST['session_name'];

// TODO Verify color_data has all the colors required
// TODO Verify session_name (empty defaults to "Default Sesssion")
// TODO Save color data and session name to database as a new row, return the ID to $share_id

$share_id = 'a1b2c3d4'; // TODO Base 32 representation of auto-increment database ID
$app_url = 'http://localhost/'; // TODO Framework: Get full URL from framework
$share_url = $app_url . '#' . $share_id;

// Create the result
$result = array(
		'result' => 0,
		'color_data' => $color_data,
		'session_name' => $session_name,
		'shareUrl' => $share_url,
		'shareId' => $share_id
);

// Send the result
echo json_encode($result) . "\n";
 