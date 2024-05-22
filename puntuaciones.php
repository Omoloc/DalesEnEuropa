<?php
session_start();
require 'conexion.php';

$token = isset($_GET['token']) ? $_GET['token'] : '';

if ($token !== $_SESSION['game_token']) {
    die("Identificación fallida");
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Puntuaciones</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            text-align: center;
            width: 80%;
            max-width: 600px;
        }
        h1 {
            color: #FF4500;
        }
        .table-container {
            width: 100%;
            max-height: 85vh;
            overflow-y: auto;
            margin-top: 20px;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #FFFFFF;
        }
        th, td {
            padding: 15px;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #FF4500;
            color: white;
            text-transform: uppercase;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tr:hover {
            background-color: #f1f1f1;
        }
        td {
            background-color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Puntuaciones</h1>
        <div class="table-container">
            <table>
                <?php
                    $sql = "SELECT iniciales, puntuacion, timestamp FROM puntuaciones WHERE DATE(timestamp) = CURDATE() ORDER BY puntuacion DESC LIMIT 3";
                    $result = $conn->query($sql); 

                    echo "<h2>Top 3 Puntuaciones del Día</h2>";
                    echo "<table>";
                    echo "<tr><th>Iniciales</th><th>Puntuación</th></th><th>Hora</th></tr>";

                    if ($result->num_rows > 0) {
                        
                        
                        while($row = $result->fetch_assoc()) {
                            $hora = date("H:i:s", strtotime($row["timestamp"]));
                            echo "<tr><td>" . htmlspecialchars($row["iniciales"]) . "</td><td>" . htmlspecialchars($row["puntuacion"]) . "</td><td>" . htmlspecialchars($hora) . "</td></tr>";
                        }
                    } else {
                        echo "<tr><td colspan='2'>No hay puntuaciones</td></tr>";
                    }
                    echo "</table>";

                    $sql_total = "SELECT iniciales, puntuacion, timestamp FROM puntuaciones ORDER BY puntuacion DESC LIMIT 3";
                    $result = $conn->query($sql_total);

                    echo "<h2>Puntuaciones General</h2>";
                    echo "<table>";
                    echo "<tr><th>Iniciales</th><th>Puntuación</th><th>Fecha</th></tr>";
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            echo "<tr><td>" . htmlspecialchars($row["iniciales"]) . "</td><td>" . htmlspecialchars($row["puntuacion"]) . "</td><td>" . htmlspecialchars($row["timestamp"]) . "</td></tr>";
                        }
                    } else {
                        echo "<tr><td colspan='3'>No hay puntuaciones</td></tr>";
                    }
                    echo "</table>";

                    $conn->close();
                ?>
            </table>
        </div>
    </div>
</body>
</html>
