<?php

function add_stylesheet($stylesheets){
    for($i = 0; $i < count($stylesheets); $i++){
        echo '<link rel="stylesheet" href="/assets/css/'.$stylesheets[$i].'">';
    }
};

