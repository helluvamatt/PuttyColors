<?php
use Puttycolors\Services\DalService;
use Puttycolors\Models\Profile;
use Puttycolors\Models\User;
use Puttycolors\Services\DalService\DalException;

require_once __DIR__ . "/../vendor/autoload.php";

if ($argc != 4)
{
	echo "Usage: $argv[0] <dsn> <user> <pass>\n";
	exit(0);
}

list(, $dsn, $user, $pass) = $argv;

$logger = new \Monolog\Logger('seed_db.log');
$logger->pushHandler(new \Monolog\Handler\ErrorLogHandler());
$dal = new DalService($logger, $dsn, $user, $pass);

$admin = new User();
$admin->name = 'puttycolors';
$admin->role = 2;
$admin->password = password_hash('puttycolors', PASSWORD_DEFAULT);
try {
	$dal->insertUser($admin);
}
catch (DalException $ex)
{
	$logger->error($ex->getMessage() . ": " . $ex->pdoErrorMessage);
}
	
$presets = json_decode(file_get_contents(__DIR__ . "/data/presets.json"));
foreach ($presets as $preset)
{
	$profile = new Profile($preset);
	$profile->ownerUser = $admin;
	$dal->addSharedProfile($profile);
}
