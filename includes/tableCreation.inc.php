<?php
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

    $sql = "CREATE TABLE animeList (
        id INT(11) NOT NULL AUTO_INCREMENT,
        Name VARCHAR(100) NOT NULL,
        Author VARCHAR(100) NOT NULL,
        Category VARCHAR(100) NOT NULL,
        FunToWatch BIT NOT NULL,
        Year INT(11) NOT NULL,
        Synopsis TEXT,
        date_Joined DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        image_path VARCHAR(255),
        PRIMARY KEY (id)
    );";

    if ($conn->query($sql) === TRUE) {
        //echo "Table animeList created successfully<br>";
    } else {
        //echo "Error creating table: " . $conn->error ."<br>";
    }

    // Close the connection
    //echo "Disconnected successfully from tableCreation.php <br>";
    $conn->close();
