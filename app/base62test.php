<?php
require_once __DIR__ . "/../vendor/autoload.php";

use \Tuupola\Base62;

$iters = 5000;

$dataset = array();
$dataset[] = ["bytes" => 9, "data" => array()];
$dataset[] = ["bytes" => 16, "data" => array()];
$dataset[] = ["bytes" => 32, "data" => array()];
$dataset[] = ["bytes" => 64, "data" => array()];

foreach ($dataset as $index => $dataItem)
{
	for ($i = 0; $i < $iters; $i++)
	{
		array_push($dataset[$index]["data"], strlen(Base62::encode(random_bytes($dataItem["bytes"]))));
	}
}

foreach ($dataset as $dataItem)
{
	$avg = array_sum($dataItem["data"]) / count($dataItem["data"]);
	$max = max($dataItem["data"]);
	$min = min($dataItem["data"]);
	
	//$avg = sum
	echo $dataItem["bytes"] . " bytes => avg($avg) min($min) max($max)\n";
}
