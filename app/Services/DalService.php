<?php

namespace Puttycolors\Services;

use \Puttycolors\Models\Profile;
use \Puttycolors\Models\Session;
use \Puttycolors\Models\User;
use \Puttycolors\Services\DalService\DalException;
use \PDO;
use \PDOStatement;
use \PDOException;
use \Tuupola\Base62;

/**
 * PuttyColors API Data Access Layer
 * @author Matt Schneeberger
 *
 */
class DalService
{
	/**
	 * Maximum page size for database paging
	 * @var integer
	 */
	const MAX_PAGE_SIZE = 100;
	
	/**
	 * Minimum page size for database paging
	 * @var integer
	 */
	const MIN_PAGE_SIZE = 10;
	
	/**
	 * Logger impl
	 * @var \Psr\Log\LoggerInterface 
	 */
	private $logger;
	
	/**
	 * PDO connection handle
	 * @var PDO
	 */
	private $connection;
	
	/**
	 * @param \Psr\Log\LoggerInterface $logger Logger implementation
	 * @param DalConfig $settings DAL configuration
	 */
	public function __construct(\Psr\Log\LoggerInterface $logger, $dsn, $user, $pass)
	{
		$this->logger = $logger;
		try {
			$this->connection = new PDO($dsn, $user, $pass);
		}
		catch (PDOException $ex)
		{
			throw new DalException("Failed to initialize database connection", null, $ex);
		}
	}
	
	/**
	 * Get an active session by it's token
	 * @param string $id Session ID
	 * @return Session
	 */
	public function getSession(string $id): Session
	{
		/** @var PDOStatement */ $stmt = $this->connection->prepare('SELECT "id", "userId", "created", "expires" FROM sessions WHERE "id" = ? LIMIT 1');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $id)) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to bind parameters", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$stmt->setFetchMode(PDO::FETCH_CLASS, "\\Puttycolors\\Models\\Session");
		/** @var Session */ $obj = $stmt->fetch();
		if ($obj === FALSE) {
			return $obj;
		}
		$stmt = null;
		$obj->user = $this->getUser($obj->userId);
		return $obj;
	}
	
	/**
	 * Create a new session in the database
	 * @param Session $session
	 */
	public function createSession(Session $session)
	{
		$session->id = Base62::encode(random_bytes(16));
		$session->userId = $session->user->id;
		/** @var PDOStatement */ $stmt = $this->connection->prepare('INSERT INTO sessions ("id", "userId", "created", "expires") VALUES (?, ?, ?, ?)');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $session->id) ||
			!$stmt->bindValue(2, $session->userId) ||
			!$stmt->bindValue(3, $session->created) ||
			!$stmt->bindValue(4, $session->expires)) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to bind parameters", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
	}
	
	/**
	 * Update timestamps for an existing session in the database
	 * @param Session $session
	 */
	public function updateSession(Session $session)
	{
		/** @var PDOStatement */ $stmt = $this->connection->prepare('UPDATE sessions SET "created" = ?, "expires" = ? WHERE "id" = ?');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $session->created) ||
			!$stmt->bindValue(2, $session->expires) ||
			!$stmt->bindValue(3, $session->id)) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to bind parameters", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$returnVal = !!$stmt->rowCount();
		$stmt = null;
		return $returnVal;
	}
	
	/**
	 * Delete a session (logout)
	 * @param string $id Session ID to invalidate
	 */
	public function deleteSession(string $id)
	{
		/** @var PDOStatement */ $stmt = $this->connection->prepare('UPDATE sessions SET "expires" = now() WHERE "id" = ?');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $id)) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to bind parameters", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$returnVal = !!$stmt->rowCount();
		$stmt = null;
		return $returnVal;
	}
	
	/**
	 * Get an active user by ID
	 * @param int $id
	 * @return User
	 */
	public function getUser(string $id): User
	{
		/** @var PDOStatement */ $stmt = $this->connection->prepare('SELECT "id", "name", "password", "firstName", "lastName", "role" FROM users WHERE "id" = ? LIMIT 1');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $id)) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to bind parameters", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$stmt->setFetchMode(PDO::FETCH_CLASS, "\\Puttycolors\\Models\\User");
		/** @var User */ $obj = $stmt->fetch();
		if ($obj === FALSE) {
			return null;
		}
		$stmt = null;
		return $obj;
	}
	
	/**
	 * Get an active user by their username
	 * @param string $username
	 * @return User
	 */
	public function getUserByName(string $username): User
	{
		/** @var PDOStatement */ $stmt = $this->connection->prepare('SELECT "id", "name", "password", "firstName", "lastName", "role" FROM users WHERE "name" = ? LIMIT 1');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $username)) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to bind parameters", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$stmt->setFetchMode(PDO::FETCH_CLASS, "\\Puttycolors\\Models\\User");
		/** @var User */ $obj = $stmt->fetch();
		if ($obj === FALSE) {
			return null;
		}
		$stmt = null;
		return $obj;
	}
	
	/**
	 * Insert a new user into the database
	 * @param User $user
	 */
	public function insertUser(User $user)
	{
		$user->id = Base62::encode(random_bytes(9));
		/** @var PDOStatement */ $stmt = $this->connection->prepare('INSERT INTO users ("id", "name", "password", "firstName", "lastName", "role") VALUES (?, ?, ?, ?, ?, ?)');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $user->id) || !$stmt->bindValue(2, $user->name) || !$stmt->bindValue(3, $user->password) || !$stmt->bindValue(4, $user->firstName) || !$stmt->bindValue(5, $user->lastName) || !$stmt->bindValue(6, $user->role))
		{
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to bind parameters", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$stmt = null;
	}
	
	// TODO Admin functions: Get list of users, Create new user, Delete user, Set role of user to something other than 1 (Standard Member)
	
	/**
	 * Get a shared profile from the database
	 * @param string $id Shared profile id
	 * @return Profile
	 */
	public function getSharedProfile(string $id): Profile
	{
		/** @var PDOStatement */ $stmt = $this->connection->prepare('SELECT "id", "parentId", "name", "author", "url", "sessionName", "type", "data", "created" FROM profiles WHERE "id" = ? LIMIT 1');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $id)) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to bind parameters", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$stmt->setFetchMode(PDO::FETCH_CLASS, "\\Puttycolors\\Models\\Profile");
		/** @var Profile */ $obj = $stmt->fetch();
		if ($obj === FALSE) {
			return null;
		}
		$stmt = null;
		$obj->data = json_decode($obj->data, true);
		$obj->id = $this->hashids->encode($obj->id);
		$obj->parentId = $this->hashids->encode($obj->parentId);
		return $obj;
	}
	
	/**
	 * Get a page of publicly shared profiles
	 * @param int $page Database paging: page index (1-based)
	 * @param int $pageSize Database paging: page size
	 * @return Profile[]
	 */
	public function getPublicProfiles($page = 1, $pageSize = 30): array
	{
		$this->clampPages($page, $pageSize);
		$offset = ($page - 1) * $pageSize;
		
		/** @var PDOStatement */ $stmt = $this->connection->prepare('SELECT "id", "parentId", "name", "author", "url", "sessionName", "type", "data", "created" FROM profiles WHERE "type" = 0 LIMIT ? OFFSET ?');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $pageSize, PDO::PARAM_INT) || !$stmt->bindValue(2, $offset, PDO::PARAM_INT)) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to bind parameters", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$stmt->setFetchMode(PDO::FETCH_CLASS, "\\Puttycolors\\Models\\Profile");
		$resultSet = [];
		/** @var Profile */ $obj = FALSE;
		while (FALSE !== ($obj = $stmt->fetch()))
		{
			$obj->data = json_decode($obj->data, true);
			$resultSet[] = $obj;
		}
		$stmt = null;
		return $resultSet;
	}
	
	/**
	 * Count publicly shared profiles
	 * @return int
	 */
	public function countPublicProfiles(): int
	{
		/** @var PDOStatement */ $stmt = $this->connection->prepare('SELECT COUNT("id") FROM profiles WHERE "type" = 0');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$returnVal = $stmt->fetchColumn(0);
		if ($returnVal === FALSE) return 0;
		return $returnVal;
	}
	
	/**
	 * Get a page of publicly shared profiles forked from this one
	 * @param string $id Base profile id
	 * @param int $page Database paging: page index (1-based)
	 * @param int $pageSize Database paging: page size
	 * @return Profile[]
	 */
	public function getForks(string $id, int $page = 1, int $pageSize = 30): array
	{
		$parentId = $this->hashids->decode($id)[0];
		if (!is_array($parentId) || count($parentId) != 1)
		{
			$this->logger->warn('hashids returned invalid value', [$parentId]);
			return [];
		}
		$this->clampPages($page, $pageSize);
		$offset = ($page - 1) * $pageSize;
		/** @var PDOStatement */ $stmt = $this->connection->prepare('SELECT "id", "parentId", "name", "author", "url", "sessionName", "type", "data", "created" FROM profiles WHERE "type" = 0 AND "parentId" = ? LIMIT ? OFFSET ?');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $parentId, PDO::PARAM_INT) || !$stmt->bindValue(2, $pageSize, PDO::PARAM_INT) || !$stmt->bindValue(3, $offset, PDO::PARAM_INT)) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to bind parameters", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$stmt->setFetchMode(PDO::FETCH_CLASS, "\\Puttycolors\\Models\\Profile");
		$returnVal = [];
		/** @var Profile */ $obj = FALSE;
		while (FALSE !== ($obj = $stmt->fetch())) {
			$obj->data = json_decode($obj->data);
			$obj->id = $this->hashids->encode($obj->id);
			$obj->parentId = $this->hashids->encode($obj->parentId);
			$returnVal[] = $obj;
		}
		return $returnVal;
	}
	
	/**
	 * Count all the forks for a given profile, use this to determine the total items to display for paging 
	 * @param string $id Base profile ID
	 * @return int
	 */
	public function countForks(string $id): int
	{
		$stmt = $this->connection->prepare('SELECT COUNT("id") FROM profiles WHERE "parentId" = ?');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $id, PDO::PARAM_INT)) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to bind parameters", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$returnVal = $stmt->fetchColumn(0);
		if ($returnVal === FALSE) return 0;
		return $returnVal;
	}
	
	/**
	 * Save a profile to the database, returns the same object with $id and $parentId properties
	 * 
	 * If the Profile passed in has the $id property set, that we be moved to the $parentId property, overwriting and previous value. The returned Profile will have the $id property set to the newly stored value
	 * @param Profile $profile
	 * @return Profile
	 */
	public function addSharedProfile(Profile $profile)
	{
		if ($profile->id != NULL)
		{
			$profile->parentId = $profile->id;
		}
		$profile->id = Base62::encode(random_bytes(9));
		$profile->owner = $profile->ownerUser->id;
		$jsonData = json_encode($profile->data);
		/** @var PDOStatement */ $stmt = $this->connection->prepare('INSERT INTO profiles ("id", "parentId", "owner", "name", "author", "url", "sessionName", "type", "data") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $profile->id) ||
			!$stmt->bindValue(2, $profile->parentId) ||
			!$stmt->bindValue(3, $profile->owner) ||
			!$stmt->bindValue(4, $profile->name) ||
			!$stmt->bindValue(5, $profile->author) ||
			!$stmt->bindValue(6, $profile->url) ||
			!$stmt->bindValue(7, $profile->sessionName) ||
			!$stmt->bindValue(8, $profile->type) ||
			!$stmt->bindValue(9, $jsonData)) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Parameter binding failed", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$stmt = null;
	}
	
	/**
	 * Delete a profile
	 * @param string $id
	 */
	public function deleteProfile(string $id)
	{
		/** @var PDOStatement */ $stmt = $this->connection->prepare('UPDATE profiles SET "enabled" = FALSE WHERE "id" = ?');
		if ($stmt === FALSE) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to create prepared statement", $e);
		}
		if (!$stmt->bindValue(1, $id, PDO::PARAM_INT)) {
			$e = $this->connection->errorInfo();
			throw new DalException("Database error: Failed to bind parameters", $e);
		}
		if (!$stmt->execute()) {
			$e = $stmt->errorInfo();
			throw new DalException("Database error: Failed to execute prepared statement", $e);
		}
		$returnVal = !!$stmt->rowCount();
		$stmt = null;
		return $returnVal;
	}
	
	/**
	 * Clamp page and pageSize to sane values
	 * @param int $page Page number (1-based index)
	 * @param int $pageSize Number of items per page
	 */
	private function clampPages(int &$page, int &$pageSize)
	{
		if ($page < 1) $page = 1;
		if ($pageSize < DalService::MIN_PAGE_SIZE) $pageSize = DalService::MIN_PAGE_SIZE;
		if ($pageSize > DalService::MAX_PAGE_SIZE) $pageSize = DalService::MAX_PAGE_SIZE;
	}
	
}
