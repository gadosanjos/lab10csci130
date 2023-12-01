<?php
//myserver handles getting data and also inserting data
    include_once 'includes/retrieve.inc.php';

    if(isset($_GET['jsonCollection'])){

        if ($result->num_rows > 0) {
            // Fetch all rows as an associative array
            $rows = $result->fetch_all(MYSQLI_ASSOC);

            // Output the JSON-encoded array
            echo json_encode($rows);
        } else {
            echo "0 results";
        }

    }

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
    
        // prepare and bind
        $stmt = $conn->prepare("INSERT INTO animeList (Name, Author, Category, FunToWatch, Year, Synopsis, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)");
        if ($stmt==FALSE) {
            echo "There is a problem with prepare <br>";
            echo $conn->error; // Need to connect/reconnect before the prepare call otherwise it doesnt work
            // see: https://dev.mysql.com/doc/refman/5.7/en/commands-out-of-sync.html
        }
        $stmt->bind_param("sssiiss", $name, $author, $cat, $FunToWatch, $year, $info, $image);
    
        // ssss = 4 strings
        // i - integer
        // d - double
        // s - string
        // b - BLOB: a binary large object that can hold a variable amount of data
    
        // set parameters and execute

        $target_dir = "images/";
        $target_file = $target_dir . basename($_FILES["image_path"]["name"]);
        
        $name = $_POST['Name'];
        $author = $_POST['Author'];
        $cat = $_POST['Category'];
        $FunToWatch= $_POST['FunToWatch'];
        $year = $_POST['Year'];
        $info = $_POST['Synopsis'];
        $image = "images/" . basename($_FILES["image_path"]["name"]);
        
        if (move_uploaded_file($_FILES["image_path"]["tmp_name"], $target_file)) {
            //echo "The file " . basename($_FILES["image_path"]["name"]) . " has been uploaded.";
        } else {
            echo "Error uploading your file.";
        }

        $stmt->execute();

        $stmt->close();
    
        // Close the connection
        $conn->close();
    
    }
      

