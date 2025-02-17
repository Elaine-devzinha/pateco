<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle the POST request
    $data = array(
        'ct_email' => $_POST['email'],
        'pw_usuario' => $_POST['password']
    );
    $data = json_encode($data);
    $url = 'http://server/auth/login';
    // $url = 'http://host.docker.internal:3000/auth/login';
    $options = array(
        'http' => array(
            'header'   => "Content-type: application/json\r\n",
            'content'  => $data,
            'method'   => 'POST',
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
