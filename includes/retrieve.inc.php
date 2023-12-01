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

    $sql = "SELECT * FROM animeList;";

    $result = $conn->query($sql);

    // if ($result->num_rows > 0) {
    //     // output data of each row
    //     while($row = $result->fetch_assoc()) {
    //         echo "id: " . $row["id"]. " - Name: " . $row["name"]. " " . $row["author"]. " " . $row["year"]. " " . $row["info"]. " " . $row["addedAt"].    "<br>";
    //     }
    // } else {
    //     echo "0 results";
    // }

    $conn->close();
    //echo "Disonnected successfully <br>";

    return $result;