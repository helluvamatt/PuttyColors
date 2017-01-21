<?php

namespace Puttycolors\Models;

/**
 * PuttyColors profile
 * @author Matt Schneeberger
 *
 */
class Profile
{
	/**
	 * Profile is public, anyone can view it, and it is listed in listings pages
	 */
	public const PROFILE_TYPE_PUBLIC = 0;

	/**
	 * Profile is unlisted, anyone with the URL can view it, but it is not listed in listings pages
	 */
	public const PROFILE_TYPE_UNLISTED = 1;

	/**
	 * Profile is private, only the owner can view it
	 */
	public const PROFILE_TYPE_PRIVATE = 2;

	/**
	 * Build a Profile
	 * @param object|array|null $buildFrom Entity to roll into this class 
	 */
	public function __construct($buildFrom)
	{
		if ($buildFrom)
		{
			$ref = new \ReflectionClass('\\Puttycolors\\Models\\Profile');
			$props = $ref->getProperties();
			if (is_object($buildFrom))
			{
				foreach ($props as $prop)
				{
					if (property_exists($buildFrom, $prop->name))
					{
						$value = $buildFrom->{$prop->name};
						$prop->setValue($this, $value);
					}
				}
			}
			else if (is_array($buildFrom))
			{
				foreach ($props as $prop)
				{
					if (array_key_exists($prop->name, $buildFrom))
					{
						$value = $buildFrom[$prop->name];
						$prop->setValue($this, $value);
					}
				}
			}
		}
	}
	
	/**
	 * Sharing ID
	 * @var string
	 */
	public $id;

	/**
	 * The ID of the Profile this was forked from, if any
	 * @var string
	 */
	public $parentId;

	/**
	 * UserID of owner
	 * @var string
	 */
	public $owner;
	
	/**
	 * Owner User
	 * @var User
	 */
	public $ownerUser;
	
	/**
	 * Profile type: One of the PROFILE_TYPE_* constants
	 * @var int
	 */
	public $type;

	/**
	 * Profile name
	 * @var string
	 */
	public $name;

	/**
	 * Profile session name, used for attaching the profile to a specific session in PuTTY
	 * @var string
	 */
	public $sessionName;

	/**
	 * Profile author
	 * @var string
	 */
	public $author;

	/**
	 * Profile author URL
	 * @var string
	 */
	public $url;

	/**
	 * Profile data, stored as JSON
	 * @var array
	 */
	public $data;
}