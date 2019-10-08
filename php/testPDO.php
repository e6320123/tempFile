<?php 
$connection = new PDO('mysql:host=localhost;
                        dbname=cy_cinemas;
                        charset=utf8', 'root', '');
 // $connection->exec('select * from "order_details" '); 
$connection->exec('INSERT INTO order_details 
(screenings_id,
members_id,
num,
seat,
total_price,
discounted_price,
tickets_num,
food_drinks_num,
phone,
email)
VALUES (
    2222,
    2222,
    2222,
    "111",
    111,
    111,
    "111",
    "111",
    "111",
    "111"
)'); 

?>