<?php 

if($_COOKIE['token']){
    include_once('./libs/api/logout.php');
    header('Location: /login.php');

}else{
    header('Location: /');
    exit();
}
