<?php
    if(isset($_GET['jsonCollection'])){
        $fileContents = file_get_contents("mycollection.json");
        echo $fileContents;
    }
?>