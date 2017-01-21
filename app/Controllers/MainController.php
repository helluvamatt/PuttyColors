<?php

namespace Puttycolors\Controllers;

use Slim\Views\PhpRenderer;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class MainController
{
	/**
	 * @var PhpRenderer
	 */
	private $renderer;
	
	public function __construct(PhpRenderer $renderer)
	{
		$this->renderer = $renderer;
	}
	
	public function index(Request $request, Response $response, $id = null)
	{
		return $this->renderer->render($response, 'index.phtml', ['baseUrl' => $request->getUri()->getBasePath()]);
	}
	
	public function dbg(Request $request, Response $response)
	{
		return $this->renderer->render($response, 'dbg.phtml');
	}
}