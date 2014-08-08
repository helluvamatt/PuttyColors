<?php

$app = require '../bootstrap.php';

$app->get('/', function () use ($app) {
	$app->render("default.twig");
} )->name('/');

$app->run();
