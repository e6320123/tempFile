<?php

$host = 'localhost';
$user = 'root';
$password = '';
$dbName = 'cy_cinemas';

// try {
//     $conn = new mysqli($host, $user, $password, $dbName);
//     $conn->query('set names utf8mb4');
// } catch (Exception $e) {
//     $data = [
//         'msg' => $e->errorMessage(),
//     ];
//     echo json_encode();
// }

try {
    $conn = new PDO("mysql:host={$host}; dbname={$dbName}; charset=utf8", $user, $password);
} catch (PDOException $e) {
    $data = [
        'msg' => $e->getMessage(),
    ];
    echo json_encode($data);
}
