<?php

namespace Puttycolors\Models;

use \DateTime;

/**
 * Represents a user's active session
 * @author Matt Schneeberger
 *
 */
class Session
{
	/**
	 * Session ID stored in the token
	 * @var string
	 */
	public $id;
	
	/**
	 * User id of the user 
	 * @var int
	 */
	public $userId;
	
	/**
	 * User associated with this session
	 * @var User
	 */
	public $user;
	
	/**
	 * Timestamp for when the session was created
	 * @var DateTime
	 */
	public $created;
	
	/**
	 * Timestamp for when the session expires
	 * @var DateTime
	 */
	public $expires;
}