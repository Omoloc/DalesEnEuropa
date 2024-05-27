<?php
session_start();
error_log("Starting obtener_puntuaciones.php...");

// Verificar si la variable de sesión se inicia correctamente
if (!isset($_SESSION)) {
    error_log("Session failed to start.");
} else {
    error_log("Session started successfully.");
}

error_log("Including conexion.php...");

// Verificar si el archivo de conexión existe antes de incluirlo
$conexion_file_path = __DIR__ . '/conexion.php';  // Ajustar la ruta según sea necesario

if (!file_exists($conexion_file_path)) {
    error_log("File conexion.php does not exist at path: " . $conexion_file_path);
    die("Connection file not found.");
}

include $conexion_file_path;

// Verificar si la conexión se ha establecido correctamente
if (!isset($conn) || $conn === null) {
    error_log("Connection object is null after including conexion.php.");
    die("Connection failed.");
} else {
    error_log("Connection object is not null. Connection established successfully.");
}

try {
    // Log para iniciar la obtención de puntuaciones del día
    error_log("Starting to fetch top 3 day scores...");

    // Preparar y ejecutar la consulta para obtener las puntuaciones top del día
    $stmt_day = $conn->prepare("SELECT iniciales, puntuacion FROM puntuaciones WHERE DATE(timestamp) = CURDATE() ORDER BY puntuacion DESC LIMIT 3");
    if (!$stmt_day) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }
    $stmt_day->execute();
    $result_day = $stmt_day->get_result();
    $top3_day = $result_day->fetch_all(MYSQLI_ASSOC);

    // Log para confirmar la obtención de puntuaciones del día
    error_log("Top 3 day scores fetched successfully.");

    // Log para iniciar la obtención de puntuaciones del mundo
    error_log("Starting to fetch top 3 world scores...");

    // Preparar y ejecutar la consulta para obtener las puntuaciones top del mundo
    $stmt_world = $conn->prepare("SELECT iniciales, puntuacion FROM puntuaciones ORDER BY puntuacion DESC LIMIT 3");
    if (!$stmt_world) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }
    $stmt_world->execute();
    $result_world = $stmt_world->get_result();
    $top3_world = $result_world->fetch_all(MYSQLI_ASSOC);

    // Log para confirmar la obtención de puntuaciones del mundo
    error_log("Top 3 world scores fetched successfully.");

    // Envío de los resultados en formato JSON
    echo json_encode(['status' => 'success', 'top3_day' => $top3_day, 'top3_world' => $top3_world]);

} catch (Exception $e) {
    // En caso de error, enviar la respuesta en formato JSON con el mensaje de error y log
    error_log("Error: " . $e->getMessage());
    echo json_encode(['top3_day' => [], 'top3_world' => [], 'status' => 'error', 'message' => $e->getMessage()]);
}

// Cerrar conexión
$conn->close();
error_log("Database connection closed.");
?>
