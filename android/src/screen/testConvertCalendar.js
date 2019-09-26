$.get('data.json', function(data) {
  let result = []
  $.each(data.data, function(key, value) {
   if (value.date_from == value.date_to) {
    if (!result[value.date_from]) {
     result[value.date_from] = {'period': [{start: true, end: true}]}
    } else {
     result[value.date_from]['period'].push({start: true, end: true})
    }
   } else {
    if (!result[value.date_from]) {
     result[value.date_from] = {'period': [{start: true, end: false}]}
    } else {
     result[value.date_from]['period'].push({start: true, end: false})
    }

    if (!result[value.date_to]) {
     result[value.date_to] = {'period': [{start: false, end: true}]}
    } else {
     result[value.date_to]['period'].push({start: false, end: true})
    }
   }
  })

  console.log(result)
 })