<?php
 
if(isset($_POST['sqlList']))
echo $_POST['sqlList'].'<br>';
echo 'NoPost'.'<br>'; 
$sqlList=json_decode($_POST['sqlList']);
print_r($sqlList);
// if($_POST['btn']=='確認送出'){
    // $mysqli=new mysqli('localhost','root','','cy_cinemas');
    // $mysqli->set_charset('utf8');
    // $screenings_id    =3;
    // $members_id       =33;
    // $num              =1333;          
    // $seat             ='A12';       
    // $total_price      =600;    
    // $discounted_price =480;
    // $tickets_num      ='9';
    // $food_drinks_num  ='4';
    // $sql="insert into order_details (screenings_id,members_id,num,
    // seat,total_price,discounted_price,
    // tickets_num,food_drinks_num) values "."(?,?,?,?,?,?,?,?)";
    // $stmt=$mysqli->prepare($sql);
    // $stmt->bind_param('iiisiiss',$sqlList->screenings_id
    // ,$sqlList->members_id
    // ,$sqlList->num            
    // ,$sqlList->seat             
    // ,$sqlList->total_price      
    // ,$sqlList->discounted_price 
    // ,$sqlList->tickets_num      
    // ,$sqlList->food_drinks_num )  ;  //綁定參數
    // $stmt->execute();
    // $stmt->close();

//     header('Location: ok.html');
// }else{
//     header('Location: cancel.html');
// } 
?> 