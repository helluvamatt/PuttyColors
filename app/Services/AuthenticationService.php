<?php

namespace Puttycolors\Services;

use \Puttycolors\Services\AuthenticationService\AuthenticationException;
use \Firebase\JWT\JWT;
use \DateTime;
use \Puttycolors\Models\Session;
use \Psr\Log\LoggerInterface;

class AuthenticationService
{
	/** @var DalService */ private $dal;
	
	/** @var string */ private $secret;
	
	/** @var LoggerInterface */ private $logger;
	
	public function __construct(DalService $dal, LoggerInterface $logger, string $secret)
	{
		$this->dal = $dal;
		$this->secret = $secret;
		$this->logger = $logger;
	}
	
	/**
	 * Authenticate a user
	 * 
	 * Starts a new session with a new token if successful login
	 * 
	 * Throws exceptions on failed logins or token creation failure
	 * @param string $user User name
	 * @param string $pass Password
	 * @return string The created token
	 */
	public function login(string $username, string $password): string
	{
		$user = $this->dal->getUserByName($username);
		if ($user === NULL) throw new AuthenticationException("Invalid username or password.");
		if (!password_verify($password, $user->password)) throw new AuthenticationException("Invalid username or password.");
		
		$session = new Session();
		$session->user = $user;
		$session->created = new DateTime();
		$session->expires = new DateTime("now +2 hours");
		$this->dal->createSession($session);
		$payload = [
			"iat" => $session->created->getTimestamp(),
			"exp" => $session->expires->getTimestamp(),
			"jti" => $session->id,
			"sub" => $session->user->id
		];
		return JWT::encode($payload, $this->secret);
	}
	
	/**
	 * Provide a new token based on an old existing token
	 * 
	 * Existing token must not be expired already
	 * 
	 * Returns FALSE if the given token is invalid, the session is invalid, or the session is expired already 
	 * @param string $token Existing token
	 * @return string New token
	 */
	public function renew(string $token): string
	{
		try {
			$payload = JWT::decode($token, $this->secret);
			$session = $this->dal->getSession($payload->jti);
			$now = new DateTime();
			$then = new DateTime();
			$then->setTimestamp($payload->exp);
			if ($session && $now < $then)
			{			
				$session->created = new DateTime();
				$session->expires = new DateTime("now +2 hours");
				$this->dal->updateSession($session);
				$payload = [
					"iat" => $session->created->getTimestamp(),
					"exp" => $session->expires->getTimestamp(),
					"jti" => $session->id,
					"sub" => $session->user->id
				];
				return JWT::encode($payload, $this->secret);
			}
		}
		catch (\Exception $ex)
		{
			$this->logger->warning("Exception caught in AuthenticationService::renew", [$ex]);
		}
		return FALSE;
	}
	
	/**
	 * Destroy a session and invalidate a token
	 * @param string $token Token to invalidate
	 */
	public function logout(string $token)
	{
		try {
			$payload = JWT::decode($token, $this->secret);
			$this->dal->deleteSession($payload->jti);
		}
		catch (\Exception $ex) 
		{
			$this->logger->warning("Exception caught in AuthenticationService::logout", [$ex]);
		}
	}
	
	/**
	 * Get the session associated with the given token
	 * 
	 * Returns FALSE if the token is invalid, the session is invalid, or the session has expired
	 * @param string $token
	 * @return Session
	 */
	public function getSession(string $token): Session
	{
		try
		{
			$payload = JWT::decode($token, $this->secret);
			/** @var \Puttycolors\Models\Session */ $session = $this->dal->getSession($payload->jti);
			$now = new DateTime();
			if ($session->expires > $now && $session->created < $now && $session->user)
			{
				return $session;
			}
		}
		catch (\Exception $ex)
		{
			$this->logger->warning("Exception caught in AuthenticationService::getSession", [$ex]);
		}
		return FALSE;
	}
}