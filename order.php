<?php
require_once '../header.php';
require_once '../database.php';

$url = explode("/",rtrim($_GET['url'],"/"));

// ---------------saveOrder--------------------
$method = $_SERVER['REQUEST_METHOD'];
if($method == 'POST'){
    switch ($url[0]) {
        case 'saveOrder':
            saveOrderDetail();
            break;
    }
    echo("POST error");
}
// ---------------saveOrder---------------------

if($url[0]){
    
    switch ($url[0]) {
        case 'getMovies':
            getMovies();
            break;
    
        case 'getMovieDay':
            getMovieDay($url[1]);
            break;
    
        case 'getMovieTime':
            getMovieTime($url[1]);
    
            break;
            
        case 'getTickets':
            getTickets();
            break;
            
        case 'getMeals':
            getMeals();
            
            break;
        case 'getScreeingID':
            getScreeingID($url[1],$url[2],$url[3]);
        
            break;
        default:
            break;
    }

                .
                .
                .
                .
                .
                .
                .
                .
 

// ----------------saveOrderDetail---------------
function saveOrderDetail(){
    global $conn;
    // ----------------------save-----------------------
    // $frontData = isset($_POST['JSONData'])?$_POST['JSONData']:'no post';
    // $list = json_decode($frontData);    
    // $ticketsNum      = isset($_POST['foodData'])?$_POST['foodData']:'no post'; 
    // $foodDrinksNum   = isset($_POST['ticketData'])?$_POST['ticketData']:'no post';
    // $account         = isset($_POST['account'])?$_POST['account']: "Guest";    
    // $sql = 'INSERT INTO `order_details`(screenings_id,members_account,courts_id,seat,
    //     total_price,discounted_price,tickets_num,meals_num,name,phone,email) 
    //     VALUES (:a,:b,:c,:d,:e,:f,:g,:h,:i,:j,:k)'; 
    // $a=1;  
    // $c=1;
    // $stmt = $conn->prepare($sql); 
    // $stmt->execute(
    //     [
    //     ':a'=> $a,':b'=> $account,':c'=> $c,':d'=> $list->seat,':e'=> $list->total,
    //     ':f'=> $list->real,':g'=> $ticketsNum,':h'=> $foodDrinksNum,':i'=> $list->memberName,
    //     ':j'=> $list->phone,':k'=> $list->email
    //     ]
    // );
    // ------------------Test Fetch SQL-------------------
    // // $ID = 12;
    // $sql = 'SELECT * FROM `order_details`';  // WHERE `id`=:id' 
    // $stmt=$conn->prepare($sql);
    // // $stmt->bindParam(':id', $ID);
    // $stmt->execute();
    // $sqlData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // echo json_encode($sqlData);
    // ------------------Check Field-------------------
    // $ID = 12;
    $sql = 'show tables';  // WHERE `id`=:id' 
    $stmt=$conn->prepare($sql);
    // $stmt->bindParam(':id', $ID);
    $stmt->execute();
    $sqlData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($sqlData);
}
// ----------------saveOrderDetail---------------
?>