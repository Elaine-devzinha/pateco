<?php
function check_token() {
    if($_COOKIE['token'] != ""){
             $url = 'http://host.docker.internal:3000/user/'.$_COOKIE["user_id"];
            $options = array(
                'http' => array(
                    'header'  => "Authorization: ".$_COOKIE["token"]."\r\n",
                    'method'  => 'GET',
                ),
            );
            $context  = stream_context_create($options);
            $result = file_get_contents($url, false, $context);

            if ($result === FALSE) {
                // Handle error
                echo false;
            }
            return true;
    }
    if(!$_COOKIE['token'] || $_COOKIE['token'] == ""){
        return false;
    }
}

function redirect_if_token_is_invalid(){
    if(check_token() == FALSE){
        header('Location: /login.php');
    }

}