<?php

namespace Puttycolors\Services\DalService;

/**
 * Represents an error thrown from the DAL
 *
 * May include PDO error information
 * @author Matt Schneeberger
 *
 */
class DalException extends \Exception
{
	/**
	 * SQLSTATE error code from PDO
	 * @var string
	 */
	public $pdoSqlState;

	/**
	 * PDO driver-specific error code
	 * @var string
	 */
	public $pdoErrorCode;

	/**
	 * PDO driver-specific error message
	 * @var string
	 */
	public $pdoErrorMessage;

	/**
	 * @param string $message Message for display
	 * @param array $pdoErrorInfo errorInfo from PDO::getErrorInfo or PDOStatement::getErrorInfo
	 */
	public function __construct(string $message, array $pdoErrorInfo, \Exception $inner = NULL)
	{
		if ($pdoErrorInfo !== NULL)
		{
			$this->pdoSqlState = $pdoErrorInfo[0];
			$this->pdoErrorCode = $pdoErrorInfo[1];
			$this->pdoErrorMessage = $pdoErrorInfo[2];
		}
		parent::__construct($message, 0, $inner);
	}
}
