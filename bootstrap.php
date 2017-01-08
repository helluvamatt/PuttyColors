<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/vendor/autoload.php';

$config = [
	'settings' => [
		'displayErrorDetails' => true
	]
];
$c = new \Slim\Container($config);
$app = new \Slim\App($c);

// View registration
$container = $app->getContainer();
$container['view'] = function($container) {
	return new \Slim\Views\PhpRenderer(__DIR__ . '/templates');
};

// Routes
$app->get("/[{id}]", function (Request $request, Response $response, $args) {
	return $this->view->render($response, 'index.phtml', ['baseUrl' => $request->getUri()->getBasePath()]);
})->setName('/');

// TODO Routes for API

$app->run();