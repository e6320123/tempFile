<?php
require_once '../header.php';
require_once '../database.php';

$url = explode("/",rtrim($_GET['url'],"/"));

// ---------------saveOrder--------------------
$method = $_SERVER['REQUEST_METHOD'];
if($method == 'POST'){
    switch ($url[0]) {
        case 'testSaveOrder': 
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
}else{
    echo("What do you need?");
}

// $conn -> close();

function getMovies(){
    global $conn;
    // $result = $conn -> query("select movies.id,encoded_id,name from movies join movie_time on encoded_id = movies_encoded_id where rating is not null and theaters_name = '國賓影城@台北長春廣場' group by movies.id");
   
    $sql = "SELECT `movies`.`id`, `encoded_id`, `name` FROM `movies` join `movie_time` on `encoded_id` = `movies_encoded_id` where `rating` is not null and `theaters_name` = '國賓影城@台北長春廣場' group by `movies`.`id`";
    // $stmt = $conn->prepare($sql);
    // $stmt->bindParam(':id', $newsId);
    // $stmt->execute();
    $stmt = $conn->query($sql);

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

    // echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
}

function getMovieDay($id){
    global $conn;

    $encoded_id = htmlspecialchars($id);

    $sql = "SELECT `weekday`, `date` FROM `movie_day` JOIN `movies` ON `movies_encoded_id` = `encoded_id` where `movies_encoded_id` = :movies_encoded_id";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':movies_encoded_id', $encoded_id);
    $stmt->execute();

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);

    // $result = $conn -> query("SELECT weekday,date FROM movie_day join movies on movies_encoded_id = encoded_id where movies_encoded_id = '$encoded_id'");
    // echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));

    
}

function getMovieTime($id){
    global $conn;

    $encoded_id = htmlspecialchars($id);

    $sql = "SELECT `time` FROM `movie_time` JOIN `movies` on `movies_encoded_id` = `encoded_id` where `movies_encoded_id` = :movies_encoded_id and theaters_name = '國賓影城@台北長春廣場'";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':movies_encoded_id', $encoded_id);
    $stmt->execute();

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);

    // $result = $conn -> query("SELECT time FROM movie_time join movies on movies_encoded_id = encoded_id where movies_encoded_id = '$encoded_id' and theaters_name = '國賓影城@台北長春廣場'");
    // echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
}

function getTickets(){
    global $conn;

    $sql = "SELECT `name`, `price` FROM `tickets`";
    $stmt = $conn->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
}

function getMeals(){
    global $conn;

    $sql = "SELECT `name`, `size`, `price` FROM `meals`";
    $stmt = $conn->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);

}

function getScreeingID($movieID,$movieTime,$movieDate){
    global $conn;

    $sql ="SELECT `id` FROM `screenings` WHERE `movies_encoded_id` = :movies_encoded_id AND `movie_time_time` = :movie_time_time AND `movie_day_date` = :movie_day_date";
    $stmt = $conn->prepare($sql);

    $movieID = trim($movieID);
    $movieTime = trim($movieTime);
    $movieDate = trim($movieDate);
    $stmt->bindParam(':movies_encoded_id', $movieID);
    $stmt->bindParam(':movie_time_time', $movieTime);
    $stmt->bindParam(':movie_day_date', $movieDate);
    $stmt->execute();    
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($data);
}

// ----------------saveOrderDetail---------------
function saveOrderDetail(){
    global $conn;
    $mysql = $_POST['SQL']; 
    switch ($mysql) {
        case 'show':
            // ------------------show tables------------------- 
            $sql = 'show tables';   
            $stmt=$conn->prepare($sql); 
            $stmt->execute();
            $sqlData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $showTable = [];
            foreach ($sqlData as $key => $value) { 
                array_push($showTable,$value["Tables_in_cy_cinemas"]); 
            }  
            echo "*******************showTables**********************";  
            echo json_encode($showTable);
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
             `tickets_num` ,
             `meals_num` ,
             `name` ,
             `phone` ,
             `email` ) 
            VALUES (:a,:b,:c,:d,:e,:f,:g,:h,:i,:j,:k,:l)'; 
            $a=1;  //screenings_id
            $c=1;  //courts_id 
            $stmt = $conn->prepare($sql); 
            $stmt->bindParam(':a',$a);
            $stmt->bindParam(':b',$list->orderNumber); 
            $stmt->bindParam(':c',$account); 
            $stmt->bindParam(':d',$c); 
            $stmt->bindParam(':e',$list->seat); 
            $stmt->bindParam(':f',$list->total); 
            $stmt->bindParam(':g',$list->real); 
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
 
