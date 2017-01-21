<?php

namespace Puttycolors\Controllers;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Puttycolors\Services\DalService;
use \Puttycolors\Services\AuthenticationService;
use \JsonSchema\Validator;
use \JsonSchema\Constraints\Factory;
use \Psr\Log\LoggerInterface;
use \Puttycolors\Models\Profile;
use \Puttycolors\Models\Session;

class ApiController
{
	const MAX_REQUEST_SIZE = 2048;
	
	/** @val DalService */ private $dal;
	
	/** @val LoggerInterface */ private $logger;
	
	public function __construct(DalService $dal, LoggerInterface $logger)
	{
		$this->dal = $dal;
		$this->logger = $logger;
	}
	
	// POST /api/login
	public function login(Request $request, Response $response, AuthenticationService $authService)
	{
		try
		{
			if ($request->getBody()->getSize() > ApiController::MAX_REQUEST_SIZE)
			{
				return $response->withStatus(400, "Request data too large.");
			}
			
			$bodyContents = $request->getBody()->getContents();
			$loginModel = json_decode($bodyContents);
			
			try
			{
				$obj = [
					"token" => $authService->login($loginModel->username, $loginModel->password)
				];
				$response = $response->withStatus(200)->withHeader("Content-Type", "application/json");
				$response->getBody()->write(json_encode($obj));
				return $response;
			}
			catch (\Exception $ex)
			{
				return $response->withStatus(401, $ex->getMessage());
			}
		}
		catch (\Exception $ex)
		{
			$this->logger->error("Exception in login", [$ex]);
			return $response->withStatus(500, $ex->getMessage());
		}
	}
	
	// GET /api/renew
	public function renew(Request $request, Response $response, AuthenticationService $authService)
	{
		try
		{
			$token = $request->getAttribute("token");
			$obj = [
				"token" => $authService->renew($token)
			];
			$response = $response->withStatus(200)->withHeader("Content-Type", "application/json");
			$response->getBody()->write(json_encode($obj));
			return $response;
		}
		catch (\Exception $ex)
		{
			$this->logger->error("Exception in login", [$ex]);
			return $response->withStatus(500, $ex->getMessage());
		}
	}
	
	// POST /api/logout
	public function logout(Request $request, Response $response, AuthenticationService $authService)
	{
		try
		{
			$token = $request->getAttribute("token");
			$authService->logout($token);
			return $response->withStatus(200);
		}
		catch (\Exception $ex)
		{
			$this->logger->error("Exception in logout", [$ex]);
			return $response->withStatus(500, $ex->getMessage());
		}
	}
	
	// GET /api/profile/{id}
	public function getProfile(Request $request, Response $response, string $id)
	{
		try {
			$obj = $this->dal->getSharedProfile($id);
			if ($obj != null)
			{
				$response = $response->withStatus(200)->withHeader("Content-Type", "application/json");
				$response->getBody()->write(json_encode($obj));
				return $response;
			}
			else
			{
				return $response->withStatus(404);
			}
		}
		catch (\Exception $ex)
		{
			$this->logger->error("Exception in getSharedProfile", [$ex]);
			return $response->withStatus(500, $ex->getMessage());
		}
	}
	
	// DELETE /api/profile/{id}
	public function deleteProfile(Request $request, Response $response, string $id)
	{
		try {
			$returnVal = $this->dal->deleteProfile($id);
			if ($returnVal)
			{
				return $response->withStatus(200);
			}
			else
			{
				return $response->withStatus(404);
			}
		}
		catch (\Exception $ex)
		{
			$this->logger->error("Exception in deleteProfile", [$ex]);
			return $response->withStatus(500, $ex->getMessage());
		}
	}
	
	// GET /api/profiles[/{page}[/{pageSize}]]
	public function getProfiles(Request $request, Response $response, int $page = 1, int $pageSize = 30)
	{
		try {
			$returnVal = $this->dal->getPublicProfiles($page, $pageSize);
			$response = $response->withStatus(200)->withHeader("Content-Type", "application/json");
			$response->getBody()->write(json_encode($returnVal));
			return $response;
		}
		catch (\Exception $ex)
		{
			$this->logger->error("Exception in getSharedProfiles", [$ex]);
			return $response->withStatus(500, $ex->getMessage());
		}
	}
	
	// GET /api/profilescount
	public function countProfiles(Request $request, Response $response)
	{
		try {
			$count = $this->dal->countPublicProfiles();
			$obj = ['count' => $count ];
			$response = $response->withStatus(200)->withHeader("Content-Type", "application/json");
			$response->getBody()->write(json_encode($obj));
			return $response;
		}
		catch (\Exception $e) {
			$this->logger->error("Exception in countSharedProfiles", [$e]);
			return $response->withStatus(500);
		}
	}
	
	// GET /api/my/profiles[/{page}[/{pageSize}]]
	public function getMyProfiles(Request $request, Response $response, int $page = 1, int $pageSize = 30)
	{
		try {
			/** @var Session */ $authSession = $request->getAttribute('authSession', NULL);
			if ($authSession === NULL)
			{
				return $response->withStatus(401);
			}
			$returnVal = $this->dal->getMyProfiles($authSession->user->id, $page, $pageSize);
			$response = $response->withStatus(200)->withHeader("Content-Type", "application/json");
			$response->getBody()->write(json_encode($returnVal));
			return $response;
		}
		catch (\Exception $ex)
		{
			$this->logger->error("Exception in getSharedProfiles", [$ex]);
			return $response->withStatus(500, $ex->getMessage());
		}
	}

	// GET /api/my/profilescount
	public function countMyProfiles(Request $request, Response $response)
	{
		try {
			/** @var Session */ $authSession = $request->getAttribute('authSession', NULL);
			if ($authSession === NULL)
			{
				return $response->withStatus(401);
			}
			$count = $this->dal->countMyProfiles($authSession->user->id);
			$obj = ['count' => $count ];
			$response = $response->withStatus(200)->withHeader("Content-Type", "application/json");
			$response->getBody()->write(json_encode($obj));
			return $response;
		}
		catch (\Exception $ex) {
			$this->logger->error("Exception in countSharedProfiles", [$ex]);
			return $response->withStatus(500);
		}
	}
	
	// GET /api/forks/{id}[/{page}[/{pageSize}]]
	public function getForks(Request $request, Response $response, $id, $page = 1, $pageSize = 30)
	{
		try {
			$obj = $this->dal->getForks($id, $page, $pageSize);
			$response = $response->withStatus(200)->withHeader("Content-Type", "application/json");
			$response->getBody()->write(json_encode($obj));
			return $response;
		}
		catch (\Exception $ex) {
			$this->logger->error("Exception in getForks", [$ex]);
			return $response->withStatus(500);
		}
	}
	
	// GET /api/forkscount/{id}
	public function countForks(Request $request, Response $response, $id)
	{
		try {
			$count = $this->dal->countForks($id);
			if ($count === FALSE)
			{
				return $response->withStatus(404);
			}
			$obj = ['id' => $id, 'count' => $count ];
			$response = $response->withStatus(200)->withHeader("Content-Type", "application/json");
			$response->getBody()->write(json_encode($obj));
			return $response;
		}
		catch (\Exception $ex) {
			$this->logger->error("Exception in countForks", [$ex]);
			return $response->withStatus(500);
		}
	}
	
	// POST /api/profile
	public function saveProfile(Request $request, Response $response, \JsonSchema\SchemaStorageInterface $schemas)
	{
		try {
			if ($request->getBody()->getSize() > ApiController::MAX_REQUEST_SIZE)
			{
				return $response->withStatus(400, "Request data too large.");
			}
			
			$schema = $schemas->getSchema("file://Profile");
			$json = $request->getBody()->getContents();
			$requestObj = json_decode($json);			
			$validator = new Validator(new Factory($schemas));
			$validator->check($requestObj, $schema);
			if (!$validator->isValid())
			{
				$this->logger->warning("Received invalid request data", ['request' => $requestObj, 'validationErrors' => $validator->getErrors()]);
				return $response->withStatus(400, "Invalid request data.");
			}
			
			$profile = new Profile($requestObj);
			$this->dal->addSharedProfile($profile);
			
			$response = $response->withStatus(200)->withHeader("Content-Type", "application/json");
			$response->getBody()->write(json_encode($profile));
			return $response;
		}
		catch (\Exception $ex) {
			$this->logger->error("Exception in addShareProfile", [$ex]);
			return $response->withStatus(500);
		}
	}
}