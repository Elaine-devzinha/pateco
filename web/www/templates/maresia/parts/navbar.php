
<?php require_once('./libs/api/users.php');?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pateco</title>
    <link rel="stylesheet" href="/assets/css/style.css">
    <?php include_once('./libs/add_stylesheet.php');
    add_stylesheet($stylesheets);?>
</head>
<body>
    <div class="navbar container">
        <nav class="navigation-menu">
            <li>
            Home</li>
            <li>
            Saiba Mais</li>
        </nav>
        <nav class="person-menu">
        <?php
            if($_COOKIE["token"] != ""){
                $user = get_user();
              ?><li><a href="/dashboard.php"><? echo $user->nm_usuario; ?></a></li>
              <li><a href="/logout.php">Loginout</a></li><?php
            }
            if(!$_COOKIE["token"]){
            ?>
                <li>
                    <a href="/login.php">Login</a>
                </li>
                <li>
                    <a href="/register">Registrar-se</a>
                </li>
            <?php
            }
        ?>
        </nav>
    </div>