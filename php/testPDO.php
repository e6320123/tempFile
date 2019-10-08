<?php 
$conn = new PDO('mysql:host=localhost;
                        dbname=cy_cinemas;
                        charset=utf8', 'root', ''); 
// ---------------------------------------------
$frontData = isset($_POST['JSONData'])?$_POST['JSONData']:'no post';
$list = json_decode($frontData);    
$ticketsNum      = isset($_POST['foodData'])?$_POST['foodData']:'no post'; 
$foodDrinksNum   = isset($_POST['ticketData'])?$_POST['ticketData']:'no post';   
$sql = 'INSERT INTO `order_details`(
screenings_id,
members_account,
courts_id ,
seat,
total_price,
discounted_price,
tickets_num,
meals_num,
name,
phone,
email) VALUES (
:screenID,
:members_account,
:courts_id,
:seat, 
:totalPrice,
:discountedPrice,
:ticketsNum,
:meals_num, 
:name,
:phone,
:email)';
$stmt = $conn->prepare($sql);
$stmt->bindParam(':screenID', 1);
$stmt->bindParam(':members_account',' members_account');
$stmt->bindParam(':courts_id ', 1);
$stmt->bindParam(':seat', $list->seat);
$stmt->bindParam(':totalPrice', $list->total);
$stmt->bindParam(':discountedPrice', $list->real);
$stmt->bindParam(':ticketsNum', $ticketsNum);
$stmt->bindParam(':meals_num', $foodDrinksNum);
$stmt->bindParam(':name', $foodDrinksNum);
$stmt->bindParam(':phone', $list->phone);
$stmt->bindParam(':email', $list->email); 
$stmt->execute();
echo "posted";
// echo $list->ticketData;
// echo json_encode($list->ticketData);






?>