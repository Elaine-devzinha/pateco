<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle the POST request

    $email = $_POST['email'];
    $password = $_POST['password'];
    $url = 'http://api:3000/auth/login';
    // $url = 'http://host.docker.internal:3000/auth/login';
    $options = array(
        'http' => array(
            'header'  => "ct_email: $email\r\n" .
                         "pw_usuario: $password\r\n",
            'method'  => 'GET',
        ),
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    if ($result === FALSE) {
        echo "Error in request";
    } else {
        $result = json_decode($result);

        $token = $result->token;
        $user_id= $result->user_id;
        
        setcookie("token", $token, time() + (3600), '/');
        setcookie("user_id", $user_id, time() + (3600), '/');
        header("Refresh:0");

    }
}
