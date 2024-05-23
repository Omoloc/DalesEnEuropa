<?php

// obtener_puntuaciones.php
session_start();
require 'conexion.php';

$response = [];

if (isset($_SESSION['game_token']) && $_GET['token'] === $_SESSION['game_token']) {
    // Consulta para obtener el top 3 diario
    $sql = "SELECT puntuacion FROM puntuaciones WHERE DATE(timestamp) = CURDATE() ORDER BY puntuacion DESC LIMIT 2, 1";
    $resultTopDay = $conn->query($sql);
    if ($resultTopDay->num_rows > 0) {
        $top3_day = $resultTopDay->fetch_assoc()['puntuacion'];
    } else {
        $top3_day = 0;
    }

    // Consulta para obtener el top 3 global
    $sql_total = "SELECT puntuacion FROM puntuaciones ORDER BY puntuacion DESC LIMIT 2, 1";
    $resultTopWorld = $conn->query($sql_total);
    if ($resultTopWorld->num_rows > 0) {
        $top3_world = $resultTopWorld->fetch_assoc()['puntuacion'];
    } else {
        $top3_world = 0;
    }
    
    $response['top3_day'] = $top3_day;
    
    $response['top3_world'] = $top3_world;
    
} else {
    $response['error'] = 'Identificación fallida';
}

$conn->close();
echo json_encode($response);

?>
    
