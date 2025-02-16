<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle the POST request

    $url = 'http://host.docker.internal:3000/auth/logout';
    $options = array(
        'http' => array(
            'header'  => "authorization:".$_COOKIE['token']."\r\n",
            'method'  => 'DELETE',
        ),
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    if ($result === FALSE) {
        echo "Error in request";
    } else {
        $result = json_decode($result);

        setcookie("token", "", time() + (1), '/');
        setcookie("user_id", "", time() + (1), '/');

    }
}
