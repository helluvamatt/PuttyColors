<?php

require __DIR__ . '/../vendor/autoload.php';

$app = new \Puttycolors\PuttyColorsApp();
$app->add(\Puttycolors\Middleware\JwtSessionAuthMiddleware::class);

// Routes
$app->get("/dbg",									['\\Puttycolors\\Controllers\\MainController',	'dbg'])->setName('/dbg');
$app->get("/[{id}]",								['\\Puttycolors\\Controllers\\MainController',	'index'])->setName('/');
$app->get("/api/profile/{id}", 						['\\Puttycolors\\Controllers\\ApiController',	'getProfile']);
$app->get("/api/profiles[/{page}[/{pageSize}]]",	['\\Puttycolors\\Controllers\\ApiController',	'getProfiles']);
$app->get("/api/profilescount",						['\\Puttycolors\\Controllers\\ApiController',	'countProfiles']);
$app->get("/api/my/profiles[/{page}[/{pageSize}]]",	['\\Puttycolors\\Controllers\\ApiController',	'getMyProfiles']);
$app->get("/api/my/profilescount",					['\\Puttycolors\\Controllers\\ApiController',	'countMyProfiles']);
$app->get("/api/forks/{id}[/{page}[/{pageSize}]]",	['\\Puttycolors\\Controllers\\ApiController',	'getForks']);
$app->get("/api/forkscount/{id}",					['\\Puttycolors\\Controllers\\ApiController',	'countForks']);
$app->get("/api/renew",								['\\Puttycolors\\Controllers\\ApiController',	'renew']);
$app->post("/api/profile",							['\\Puttycolors\\Controllers\\ApiController',	'saveProfile']);
$app->post("/api/login",							['\\Puttycolors\\Controllers\\ApiController',	'login']);
$app->post("/api/logout",							['\\Puttycolors\\Controllers\\ApiController',	'logout']);
$app->delete("/api/profile/{id}", 					['\\Puttycolors\\Controllers\\ApiController',	'deleteProfile']);

$app->run();