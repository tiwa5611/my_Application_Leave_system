<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script type="text/javascript">
	$.get('data.json', function(data) {
		let result = {}
		$.each(data.data, function(key, value) {
			let default_line = getLeavePositionline(result[value.date_from])
			let date_diff = diffDate(value.date_from, value.date_to)
			for (var i = 0; i <= date_diff; i++) {
				if (i == 0) {
					date_from = value.date_from
				} else {
    				date_from = addDayToDate(date_from)
				}

				if (typeof result[date_from] === 'undefined') {
					result[date_from] = {'period': []}
				}

				result[date_from].period[default_line] = {
					start: (i==0) ? true : false, 
					end: (date_diff==0 || i==date_diff) ? true : false
				}
			}
		})

		$.each(result, function(key, value) {
			let max_key = maxKeyArray(value.period)
			for (var i = 0; i <= max_key; i++) {
				if (typeof value.period[i] === 'undefined') {
					result[key].period[i] = {color: 'transparent'}
				}
			}
		})

		console.log(result)

	})

	function getLeavePositionline(array) {
		let line = 0
		if (typeof array !== 'undefined') {
			let loop = true;
			while (loop) {
				if (typeof array.period[line] === 'undefined') {
					loop = false;
				} else {
					line++;
				}
			}
		}
		return line
	}

	function diffDate(date_from, date_to) {
		let from_ymd = date_from.split('-')
		date_from_full = new Date(from_ymd[0], from_ymd[1]-1, from_ymd[2]);

		let to_myd = date_to.split('-')
		date_to_full = new Date(to_myd[0], to_myd[1]-1, to_myd[2]);

		return Math.round((date_to_full - date_from_full)/(1000*60*60*24));
	}

	function addDayToDate(date_from, amount = 1) {
		let newdate = new Date(date_from)
		newdate.setDate(newdate.getDate() + amount)

		let year = newdate.getFullYear()
		let month = ((newdate.getMonth() + 1).toString().length < 2) ? '0' + (newdate.getMonth() + 1) : (newdate.getMonth() + 1)
		let day = newdate.getDate()

		return year + '-' + month + '-' + day
	}

	function maxKeyArray(array) {
		let max_key = 0
		$.each(array, function(key, value) {
			if (key > max_key) {
				max_key = key
			}
		})
		return max_key
	}
</script>