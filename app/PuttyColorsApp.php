<?php

namespace Puttycolors;

class PuttyColorsApp extends \DI\Bridge\Slim\App
{
	protected function configureContainer(\DI\ContainerBuilder $builder)
	{
		$builder->addDefinitions(__DIR__ . '/config.php');
	}
}