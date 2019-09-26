<?php

// echo $_POST['movieName'].'<br>';
// echo $_POST['theater'].'<br>';
// echo $_POST['day'].'<br>';
// echo $_POST['time'].'<br>';
// echo $_POST['ticket'].'<br>';
// echo $_POST['seat'].'<br>';
// echo $_POST['hall'].'<br>'; 
// echo $_POST['memberName'].'<br>';
// echo $_POST['email'].'<br>';
// echo $_POST['telephone'].'<br>'; 
// echo $_POST['creditCard'].'<br>';

// order_details_id               | int(11)  | NO   | PRI
// screenings_id                  | int(11)
// members_id                     | int(11)
// order_details_num              | int(11)
// order_details_seat             | varchar(50)
// order_details_total_price      | int(11)
// order_details_discounted_price | int(11)
// order_details_tickets_num      | varchar(30)
// order_details_food_drinks_num  | varchar(30)
// order_details_datetime         | timestamp
if($_POST['btn']=='確認送出'){
    // $mysqli=new mysqli('localhost','root','','cy_cinemas');
    // $mysqli->set_charset('utf8');
    // $screenings_id=3;
    // $members_id=33;
    // $order_details_num    =1333;          
    // $order_details_seat      ='A12';       
    // $order_details_total_price  =600;    
    // $order_details_discounted_price =480;
    // $order_details_tickets_num      ='9';
    // $order_details_food_drinks_num ='4';
    // $sql="insert into order_details (screenings_id,members_id,order_details_num,
    // order_details_seat,order_details_total_price,order_details_discounted_price,
    // order_details_tickets_num,order_details_food_drinks_num) values "."(?,?,?,?,?,?,?,?)";
    // $stmt=$mysqli->prepare($sql);
    // $stmt->bind_param('iiisiiss',$screenings_id
    // ,$members_id
    // ,$order_details_num            
    // ,$order_details_seat             
    // ,$order_details_total_price      
    // ,$order_details_discounted_price 
    // ,$order_details_tickets_num      
    // ,$order_details_food_drinks_num )  ;  //綁定參數
    // $stmt->execute();
    // $stmt->close();

    header('Location: ok.html');
}else{
    header('Location: cancel.html');
} 
?> 