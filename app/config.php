<?php

namespace Puttycolors;

use \Interop\Container\ContainerInterface;

return [
	
	// Slim configuration
	'settings.displayErrorDetails' => true, // TODO On for debugging
	
	// Application configuration
	'database.dsn' =>  \DI\env('DB_DSN'),
	'database.user' => \DI\env('DB_USER'),
	'database.pass' => \DI\env('DB_PASS'),
	'logger.name' => 'puttycolors',
	'logger.path' => __DIR__ . '/logs/puttycolors.log',
	'logger.level' => \Psr\Log\LogLevel::DEBUG,
	'renderer.templatePath' => __DIR__ . '/templates',
	'renderer.templateCache' => __DIR__ . '/cache', // Not used
	'schemas.path' => __DIR__ . "/data/schemas",
	'jwt.secret' => \DI\env('JWT_SECRET'),
	'jwt.attribute' => 'authSession',
	
	\JsonSchema\SchemaStorageInterface::class => \DI\factory(function(ContainerInterface $c) {
		$schemaPath = $c->get('schemas.path');
		$schemaStorage = new \JsonSchema\SchemaStorage();
		
		$profileSchemaJson = file_get_contents($schemaPath . '/Profile.json');
		$profileSchema = json_decode($profileSchemaJson);
		$schemaStorage->addSchema("file://Profile", $profileSchema);
		
		return $schemaStorage;
	}),
	
	\Psr\Log\LoggerInterface::class => \DI\factory(function (ContainerInterface $c) {
		$logger = new \Monolog\Logger($c->get('logger.name'));
		$logger->pushHandler(new \Monolog\Handler\StreamHandler($c->get('logger.path'), $c->get('logger.level')));
		return $logger;
	}),
	
	\Slim\Views\PhpRenderer::class => \DI\object()->constructor(\DI\get('renderer.templatePath')),
	
	\Puttycolors\Middleware\JwtSessionAuthMiddleware::class => \DI\object()
		->constructorParameter('secret', \DI\get('jwt.secret'))
		->constructorParameter('attribute', \DI\get('jwt.attribute')),
	
	\Puttycolors\Services\DalService::class => \DI\object()
		->constructorParameter('dsn', \DI\get('database.dsn'))
		->constructorParameter('user', \DI\get('database.user'))
		->constructorParameter('pass', \DI\get('database.pass')),
		
	\Puttycolors\Services\AuthenticationService::class => \DI\object()
		->constructorParameter('secret', \DI\get('jwt.secret')),
];
