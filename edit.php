<?php

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        $servername = "localhost"; // default server name
        $username = "animeKing"; // user name that you created
        $password = "4VPnroTOC6wOU3mn"; // password that you created
        $dbname = "animeDB";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error ."<br>");
        } 
        //echo "Connected successfully <br>";

        $target_dir = "images/";
        $target_file = $target_dir . basename($_FILES["image_path"]["name"]);
        
        $id = $_POST['id'];
        $name = $_POST['Name'];
        $author = $_POST['Author'];
        $cat = $_POST['Category'];
        $fun = $_POST['FunToWatch'];
        $year = $_POST['Year'];
        $info = $_POST['Synopsis'];
        $image = "images/" . basename($_FILES["image_path"]["name"]);
        
        if (move_uploaded_file($_FILES["image_path"]["tmp_name"], $target_file)) {
            //echo "The file " . basename($_FILES["image_path"]["name"]) . " has been uploaded.";
        } else {
            echo "Error uploading your file.";
        }

        // Query
        $conn->query("UPDATE animeList SET Name = '$name', Author = '$author', Category ='$cat', FunToWatch = '$fun', Year = '$year', Synopsis = '$info', image_path = '$image' WHERE id = $id;");

        // Close the connection
        $conn->close();

    }
