<?php

namespace Puttycolors\Middleware;

use Psr\Log\LoggerInterface;
use Puttycolors\Services\AuthenticationService;
use Slim\Http\Request;
use Slim\Http\Response;

/**
 * Middleware that extracts session information from a session store using an indentifier embedded in a JSON Web Token
 * 
 * JWT implementation is Firebase\JWT and this implementation only supports reading the JWT from the Authorization header:
 * <code>Authorization: Bearer &lt;token&gt;</code>
 * 
 * This middleware will not fail the response if the token is missing, it is up to controllers to do that based on the missing session attribute
 * 
 * This middleware is NOT PSR-7 compliant, it uses \Slim\Http\Request and \Slim\Http\Response directly instead of the PSR-7 interfaces. This is because we are exposing the Session object as an attribute.
 * 
 * @author Matt Schneeberger
 *
 */
class JwtSessionAuthMiddleware
{

	/** @var LoggerInterface */ private $logger;
	
	/** @var AuthenticationService */ private $authService;
	
	/** @var string */ private $secret;
	
	/** @var string */ private $attribute;
	
	public function __construct(LoggerInterface $logger, AuthenticationService $authService, string $secret, string $attribute)
	{
		$this->logger = $logger;
		$this->authService = $authService;
		$this->secret = $secret;
		$this->attribute = $attribute;
	}
	
	public function __invoke(Request $request, Response $response, callable $next)
	{
		if ($request->hasHeader('Authorization'))
		{
			$header = $request->getHeader('Authorization')[0];
			$matches = null;
			if (preg_match("/Bearer\s+(.*)$/i", $header, $matches))
			{
				$token = $matches[1];
				/** @var Session */ $session = $this->authService->getSession($token);
				if ($session !== FALSE)
				{
					$request = $request->withAttribute($this->attribute, $session);
				}
			}
		}
		
		return $next($request, $response);
	}
	
}