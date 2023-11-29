<?php
    include_once 'retrieve.php';

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

