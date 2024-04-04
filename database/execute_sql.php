<?php
$host = 'localhost'; // 数据库服务器
$user = 'Jenkin'; // 数据库用户名
$pass = 'Djy19960724'; // 数据库密码

// 先连接到MySQL，不指定数据库
$pdo = new PDO("mysql:host=$host", $user, $pass);

// 读取SQL文件
$sql = file_get_contents('./initial.sql'); // 确保路径正确

// 分离SQL语句
$queries = array_filter(array_map('trim', explode(';', $sql)));

// 执行SQL语句
foreach ($queries as $query) {
    if (!$pdo->query($query)) {
        $errorInfo = $pdo->errorInfo();
        echo "Error in query $query: " . $errorInfo[2];
    }
}

echo "Database and tables created successfully!";
?>
