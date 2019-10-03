<?php 
	$json = file_get_contents('data.json', true);
	$json = json_decode($json, true);

	// unset($json['data'][1], $json['data'][2], $json['data'][3], $json['data'][4]);

	$result = [];
	foreach ($json['data'] as $key => $value) {
		$leave_line = 0;
		if (isset($result[$value['date_from']]['period'])) {
			$leave_line = getLeavePositionline($result[$value['date_from']]['period']);
		}
		
		$diff = date_diff(date_create($value['date_from']), date_create($value['date_to']));
		for ($i=0; $i <= $diff->d; $i++) {
			if ($i==0) {
				$date_form = $value['date_from'];
			} else {
				$date_form = date('Y-m-d', strtotime($date_form . ' + 1 days'));
			}
			$result[$date_form]['period'][$leave_line] = [
				'startingDay' => ($i==0) ? true : false, 
				'endingDay' => ($diff->d==0 || $i==$diff->d) ? true : false
			];
		}
	}

	$result = convertToReactNativeCalendar($result);

	echo "<pre>";
	var_dump($result);
	echo "</pre>";

	function getLeavePositionline($array) {
		$line = 0;
		$loop = true;
		while ($loop) {
			if (!isset($array[$line])) {
				$loop = false;
			} else {
				$line++;
			}
		}
		return $line;
	}

	function convertToReactNativeCalendar($array) {
		ksort($array);
		foreach ($array as $date => $value) {
			for ($i=0; $i <= max(array_keys($value['period'])); $i++) { 
				if (!isset($value['period'][$i])) {
					$value['period'][$i] = ['color' => 'transparent'];
				}
			}
			ksort($value['period']);
			$array[$date] = $value['period'];
		}
		return $array;
	}