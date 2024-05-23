<?php
session_start();
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'];
    $iniciales = $_POST['iniciales'];
    $puntuacion = $_POST['puntuacion'];
    $timestamp = date('Y-m-d H:i:s');

    if ($token !== $_SESSION['game_token']) {
        die("Token inválido");
    }

    if (!preg_match('/^[A-Za-z]{3}$/', $iniciales) || !is_numeric($puntuacion)) {
        die("Datos inválidos");
    }

    // Usar consultas preparadas para evitar inyecciones SQL
    $stmt = $conn->prepare("INSERT INTO puntuaciones (iniciales, puntuacion, timestamp) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $iniciales, $puntuacion, $timestamp);

    if ($stmt->execute()) {
        echo "Nuevo registro creado exitosamente";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Solicitud inválida";
}
?>
