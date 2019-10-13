<?php
require_once '../header.php';
require_once '../database.php';

$url = explode("/",rtrim($_GET['url'],"/")); 


if($url[0]){
    
    switch ($url[0]) {
        
        case 'saveOrder':
        saveOrderDetail();
            break;

        case 'getSellOut':
        getSellOut();
            break;
 
        default:
            break;
    }
}else{
    echo("What do you need?");
}

// $conn -> close();

function getSellOut(){
    global $conn;
     // ------------------SELECT-------------------
    //  $ID = isset($_POST['ID'])?$_POST['ID']:0;    
     $sql = 'SELECT `seat` FROM `order_details`';   
    //  if($ID) 
        //  $sql = 'SELECT * FROM `order_details` WHERE `id`=:id'; 
     $stmt=$conn->prepare($sql);
    //  if($ID)
        //  $stmt->bindParam(':id', $ID);
     $stmt->execute();
     $sqlData = $stmt->fetchAll(PDO::FETCH_ASSOC);
     echo json_encode($sqlData); 
}
// ----------------saveOrderDetail---------------
function saveOrderDetail(){ 
    global $conn;
    $mysql = $_POST['SQL'];  
    switch ($mysql) {
        case 'show': 
        // ------------------show tables------------------- 
        $sql = 'SHOW tables';   
        $stmt=$conn->prepare($sql); 
        $stmt->execute();
        $sqlData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $showTable = [];
        foreach ($sqlData as $key => $value) { 
            array_push($showTable,$value["Tables_in_ahzheng_cy_cinemas"]);  
        }  
        echo "*******************showTables**********************";  
        echo json_encode($sqlData);
            break;
        case 'desc':
            // ------------------Check Field-------------------    
            $sql = 'DESC `order_details`';   
            $stmt=$conn->prepare($sql); 
            $stmt->execute();
            $sqlData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $desc = [];
            foreach ($sqlData as $key => $value) { 
                array_push($desc,$value["Field"]); 
            }  
            echo "*********************fields************************"; 
            echo json_encode($desc);   
            break;
        case 'select':
            // ------------------SELECT-------------------
            $ID = isset($_POST['ID'])?$_POST['ID']:0;    
            $sql = 'SELECT * FROM `order_details`';   
            if($ID) 
                $sql = 'SELECT * FROM `order_details` WHERE `id`=:id'; 
            $stmt=$conn->prepare($sql);
            if($ID)
                $stmt->bindParam(':id', $ID);
            $stmt->execute();
            $sqlData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($sqlData); 
            break;
        case 'save':  
        // ----------------------save-----------------------
            $frontData = isset($_POST['JSONData'])?$_POST['JSONData']:'no post';
            $list = json_decode($frontData);    
            $ticketsNum      = isset($_POST['foodData'])?$_POST['foodData']:'no post'; 
            $foodDrinksNum   = isset($_POST['ticketData'])?$_POST['ticketData']:'no post';
            $account         = $list->accout == ""?"Guest":$list->accout;    
            $sql = 'INSERT INTO `order_details` ( 
             `screenings_id`,
             `serial_number` ,
             `members_account` ,
             `courts_id`,
             `seat` ,
             `total_price` ,
             `discounted_price` ,
             `tickets_total_num` ,
             `tickets_num` ,
             `meals_num` ,
             `name` ,
             `phone` ,
             `email` ) 
            VALUES (:a,:b,:c,:d,:e,:f,:g,:m,:h,:i,:j,:k,:l)'; 
            $a=1;  //screenings_id
            $c=1;  //courts_id 
            $tickets_total_num = 5;
            $stmt = $conn->prepare($sql); 
            $stmt->bindParam(':a',$a);
            $stmt->bindParam(':b',$list->orderNumber); 
            $stmt->bindParam(':c',$account); 
            $stmt->bindParam(':d',$c); 
            $stmt->bindParam(':e',$list->seat); 
            $stmt->bindParam(':f',$list->total); 
            $stmt->bindParam(':g',$list->real); 
            $stmt->bindParam(':m',$tickets_total_num); 
            $stmt->bindParam(':h',$ticketsNum); 
            $stmt->bindParam(':i',$foodDrinksNum); 
            $stmt->bindParam(':j',$list->memberName); 
            $stmt->bindParam(':k',$list->phone); 
            $stmt->bindParam(':l',$list->email);
            $stmt->execute(); 
            echo "Saved"; 
            break; 
        default: 
            break;
    }
}
// ----------------saveOrderDetail--------------- 
?>
