<?php
$host = "localhost";
$username = "root";
$password = ""; // 
$database = "payment"; // 

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$sql = "SELECT id, name, email, role FROM payment"; 
$result = $conn->query($sql);

$payment = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $payment[] = $row;
    }
}

// Mengembalikan data sebagai JSON
header('Content-Type: application/json');
echo json_encode($payment);

// Menutup koneksi
$conn->close();
?>
