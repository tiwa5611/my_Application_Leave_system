<?php 
 $data = [
  [
   "leave_type" => "ลาป่วย",
   "date_from" => "2019-03-01",
   "date_to" => "2019-03-01",
   "leave_days" => 0.5,
   "status" => "Approved"
  ],
  [
   "leave_type" => "ลาพักผ่อน",
   "date_from" => "2019-03-01",
   "date_to" => "2019-03-01",
   "leave_days" => 1,
   "status" => "Approved"
  ],
  [
   "leave_type" => "ลาพักผ่อน",
   "date_from" => "2019-03-01",
   "date_to" => "2019-03-02",
   "leave_days" => 0.5,
   "status" => "Approved"
  ],
  [
   "leave_type" => "ลาป่วย",
   "date_from" => "2019-03-02",
   "date_to" => "2019-03-03",
   "leave_days" => 1,
   "status" => "Approved"
  ]
 ];
 
 $result = [];
 foreach ($data as $key => $value) {

  if ($value['date_from'] == $value['date_to']) {
   $result[$value['date_from']]['period'][] = [
    ['start' => true, 'end' => true]
   ];
  } else {
   $result[$value['date_from']]['period'][] = [
    ['start' => true, 'end' => false]
   ];

   $result[$value['date_to']]['period'][] = [
    ['start' => false, 'end' => true]
   ];
  }

  
 }

 echo "<pre>";
 var_dump($result);
 echo "</pre>";