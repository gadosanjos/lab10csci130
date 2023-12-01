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
    //echo "Connected successfully <br>";
    
    // Delete the database
    $sql = 'DROP DATABASE animeDB';
    if ($conn->query($sql)) {
        //echo "Database myDB was successfully dropped<br>";
    } else {
        echo 'Error dropping database: ' . $conn->error . "<br>"; 
            // mysql_error() not working with PHP7 use $conn->error
    }	
    
    // Creation of the database
    $sql = "CREATE DATABASE animeDB";
    if ($conn->query($sql) === TRUE) {
        //echo "Database created successfully<br>";
    } else {
        echo "Error creating database: " . $conn->error ."<br>";
    }

    // close the connection
    //echo "Disconnected successfully from connection.php <br>";
    $conn->close();