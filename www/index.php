<?php

$app = require '../bootstrap.php';

$app->get('/', function () use ($app) {
	$app->render("default.twig");
} )->name('/');

$app->get('/api/presets', function() use ($app) {
	$app->response->headers->set('Content-Type', 'application/json');
	$app->response->setBody(file_get_contents(BASEDIR . "/data/presets.json"));
});

$app->post('/api/share', function() use ($app) {
	// TODO Handle Share API
});

$app->get('/api/share/:id', function($id) use ($app) {
	// TODO Handle Share API
});

$app->run();
