<?php

namespace Puttycolors\Models;

/**
 * Represents a User stored in the database
 * @author Matt Schneeberger
 *
 */
class User
{
	/**
	 * Guest permissions, never attached to a user, used when there is no authenticated user
	 */
	public const ROLE_GUEST = 0;
	
	/**
	 * Standard member, default permission level for a logged-in user
	 */
	public const ROLE_MEMBER = 1;
	
	/**
	 * Administrator
	 */
	public const ROLE_ADMIN = 2;
	
	/**
	 * Internal user id
	 * @var string
	 */
	public $id;
	
	/**
	 * Username/Email used for logging in
	 * @var string
	 */
	public $name;
	
	/**
	 * Stored hashed password
	 * @var string
	 */
	public $password;
	
	/**
	 * The user's firstname/given name
	 * @var string
	 */
	public $firstName;
	
	/**
	 * The user's lastname/surname
	 * @var string
	 */
	public $lastName;
	
	/**
	 * User's role 
	 * @var int
	 */
	public $role;
}