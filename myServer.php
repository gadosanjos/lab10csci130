<?php
    if(isset($_GET['data'])){
        $data = $_GET['data'];
        echo "Server Replies: {$data}";
    } 

    if(isset($_GET['jsonCollection'])){
        $fileContents = file_get_contents("mycollection.json");
        echo $fileContents;
    }
?>