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
    echo "Connected successfully <br>";

    // prepare and bind
    $stmt = $conn->prepare("INSERT INTO animeList (Name, Author, Year, Synopsis, image_path) VALUES (?, ?, ?, ?, ?)");
    if ($stmt==FALSE) {
        echo "There is a problem with prepare <br>";
        echo $conn->error; // Need to connect/reconnect before the prepare call otherwise it doesnt work
        // see: https://dev.mysql.com/doc/refman/5.7/en/commands-out-of-sync.html
    }
    $stmt->bind_param("sssss", $name, $author, $year, $info, $image);

    // ssss = 4 strings
    // i - integer
    // d - double
    // s - string
    // b - BLOB: a binary large object that can hold a variable amount of data

    // set parameters and execute
    $name = "Steins;Gate";
    $author = "Nitro Plus";
    $year = "Apr 6, 2011";
    $info = "Self-proclaimed mad scientist Okabe Rintarou lives in a small room in Akihabara, where he invents 'future gadgets' with fellow lab members Shiina Mayuri, his air-headed childhood friend, and Hashida Itaru, an otaku hacker. The three pass the time by tinkering with their latest creation, a 'Phone Microwave' that can be controlled through text messages.";
    $image = "images/steinzgate.jpg";
    $stmt->execute();
    
    $name = "Erased";
    $author = "Kei Sanbe";
    $year = "Jan 8, 2016";
    $info = "Satoru Fujinuma is a 29 year old manga artist struggling to make a name for himself following his debut. But, that was not the only thing in his life that Satoru was feeling frustrated about… He has a unique supernatural ability of being forced to prevent deaths and catastrophes by being sent back in time before the incident occurred, repeating time until the accident is prevented. One day, he gets involved in an accident that has him framed as a murderer. Desperate to save the victim, he sends himself back in time only to find himself as a grade-schooler one month before fellow classmate Kayo Hinazuki went missing. Satoru now embarks on a new quest: to save Kayo and solve the mystery behind her disappearance.";
    $image = "images/erased.jpg";
    $stmt->execute();

    $name = "Hagane no Renkinjutsushi: FULLMETAL ALCHEMIST";
    $author = "Hiromu Arakawa";
    $year = "Apr 5, 2009";
    $info = "'In order for something to be obtained, something of equal value must be lost.' Alchemy is bound by this Law of Equivalent Exchange—something the young brothers Edward and Alphonse Elric only realize after attempting human transmutation: the one forbidden act of alchemy. They pay a terrible price for their transgression—Edward loses his left leg, Alphonse his physical body. It is only by the desperate sacrifice of Edward's right arm that he is able to affix Alphonse's soul to a suit of armor. Devastated and alone, it is the hope that they would both eventually return to their original bodies that gives Edward the inspiration to obtain metal limbs called 'automail' and become a state alchemist, the Fullmetal Alchemist.";
    $image = "images/fullmetal.jpg";
    $stmt->execute();

    $name = "[Oshi no Ko]";
    $author = "Aka Akasaka";
    $year = "Apr 12, 2023";
    $info = "When a pregnant young starlet appears in Gorou Amemiya's countryside medical clinic, the doctor takes it upon himself to safely (and secretly) deliver Ai Hoshino's child so she can make a scandal-free return to the stage. But no good deed goes unpunished, and on the eve of her delivery, he finds himself slain at the hands of Ai's deluded stalker — and subsequently reborn as Ai's child, Aquamarine Hoshino! The glitz and glamor of showbiz hide the dark underbelly of the entertainment industry, threatening to dull the shine of his favorite star. Can he help his new mother rise to the top of the charts? And what will he do when unthinkable disaster strikes?";
    $image = "images/oshinoko.png";
    $stmt->execute();

    $name = "Overlord";
    $author = "Kugane Maruyama";
    $year = "Jul 7, 2015";
    $info = 'The story takes place in the year 2138 when virtual reality gaming is booming. Yggdrasil, a popular online game is quietly shut down one day. However, the protagonist Momonga decides to not log out. Momonga is then transformed into the image of a skeleton as "the most powerful wizard." The world continues to change, with non-player characters (NPCs) beginning to feel emotion. Having no parents, friends, or place in society, this ordinary young man Momonga then strives to take over the new world the game has become.';
    $image = "images/overlord.jpg";
    $stmt->execute();

    echo "New records created successfully<br>";

    $stmt->close();

    // Close the connection
    $conn->close();
