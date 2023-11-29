<?php
    $servername = "localhost"; // default server name
    $username = "animeKing"; // user name that you created
    $password = "4VPnroTOC6wOU3mn"; // password that you created
    $dbname = "animeDB";

    // Create connection
    $conn = new mysqli($servername, $username, $password);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error ."<br>");
    } 
    echo "Connected successfully <br>";

    // Creation of the database
    $sql = "CREATE DATABASE animeDB";
    if ($conn->query($sql) === TRUE) {
        echo "Database created successfully<br>";
    } else {
        echo "Error creating database: " . $conn->error ."<br>";
    }

    // close the connection
    $conn->close();
