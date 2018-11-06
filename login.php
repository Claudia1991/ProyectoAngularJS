<?php 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$response = [];

if($_POST['username'] == 'admin' && $_POST['password'] == 1234){
    $response['status'] = 'loggedin';
}else { 
    $response['status'] = 'error';
}

echo json_encode($response)
?>