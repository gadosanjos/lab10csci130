<?php
    include_once 'connection.php';
    include_once 'tableCreation.php';
    include_once 'populate.php';
    include_once 'retrieve.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=<, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <?php
        if ($result->num_rows > 0) {
            // Fetch all rows as an associative array
            $rows = $result->fetch_all(MYSQLI_ASSOC);

            // Output the JSON-encoded array
            echo json_encode($rows);
        } else {
            echo "0 results";
        }
    ?>

</body>
</html>