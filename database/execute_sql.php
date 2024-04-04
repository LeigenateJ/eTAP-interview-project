<?php
$host = 'localhost'; // db server
$user = 'Jenkin'; // db user name
$pass = 'Djy19960724'; // db psw

$pdo = new PDO("mysql:host=$host", $user, $pass);

// read sql file
$sql = file_get_contents('./initial.sql');

// seperate sql queries
$queries = array_filter(array_map('trim', explode(';', $sql)));

// exec queries
foreach ($queries as $query) {
    if (!$pdo->query($query)) {
        $errorInfo = $pdo->errorInfo();
        echo "Error in query $query: " . $errorInfo[2];
    }
}

echo "Database and tables created successfully!";
