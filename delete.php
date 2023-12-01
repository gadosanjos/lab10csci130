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
        
        $id = $_POST['id'];

        // Query
        $conn->query("DELETE FROM animeList  WHERE id = $id;");

        // Close the connection
        $conn->close();

    }