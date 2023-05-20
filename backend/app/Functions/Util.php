<?php

namespace App\Functions;

class Util {

	function clearName($name) {
		$list = array("@","$","%","&","\\","/",":","*","?");
		foreach ($list as $string) {
			$name = str_replace($string,"",$name);
		}
		return $name;
	}
}