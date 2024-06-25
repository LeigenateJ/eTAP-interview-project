<?php
class School {
    private $conn;
    private $table_name = "Schools";

    // School attributes
    public $school_id;
    public $name;
    public $username;
    public $password;

    public function __construct($db) {
        $this->conn = $db;
    }

    // retrive school info by username
    public function findByUsername($username) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE username = ? LIMIT 0,1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $username);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // set attr
        $this->school_id = $row['school_id'] ?? null;
        $this->name = $row['name'] ?? null;
        $this->username = $row['username'] ?? null;
        $this->password = $row['password'] ?? null;

        return $row;
    }

}
