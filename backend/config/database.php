<?php
// database.php

class Database {
    private $host = "localhost";
    private $db_username = "Jenkin"; 
    private $db_password = "Djy19960724";
    private $db_name = "school_management_system";

    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->db_username, $this->db_password);

            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $exception) {
            echo "DB connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}