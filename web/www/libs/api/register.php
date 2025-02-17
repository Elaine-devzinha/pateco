<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle the POST request
    $data = array(
        'nm_usuario' => $_POST['name'],
        'ct_email' => $_POST['email'],
        'pw_usuario' => $_POST['password'],

    );
    $data = json_encode($data);
    $url = 'http://server/auth/register';
    $options = array(
        'http' => array(
            'header'   =>  "Content-type: application/json\r\n",
            'content'  =>  $data,
            'method'  => 'POST',
        ),
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) {
        echo "Error in request";
    } else {
        $result = json_decode($result);
        if($result->id){
            header("Refresh:/login.php");
        };
    }
}
