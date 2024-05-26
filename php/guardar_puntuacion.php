<?php
session_start();
error_log("Starting guardar_puntuacion.php...");

// Asegúrate de obtener el token y la puntuación desde el cuerpo del request de JavaScript
$input = json_decode(file_get_contents('php://input'), true);
$token = isset($input['token']) ? $input['token'] : null;
$iniciales = isset($input['iniciales']) ? $input['iniciales'] : null;
$puntuacion = isset($input['puntuacion']) ? $input['puntuacion'] : null;

error_log("Received token: " . $token);
error_log("Received iniciales: " . $iniciales);
error_log("Received puntuacion: " . $puntuacion);

// Verifica si el token recibido es igual al token de la sesión
if ($token === $_SESSION['game_token'] && $iniciales && $puntuacion) {
    error_log("Token and input data are valid.");

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

    // Aquí va tu código para manejar la inserción en la base de datos
    try {
        $stmt = $conn->prepare("INSERT INTO puntuaciones (iniciales, puntuacion, timestamp) VALUES (?, ?, NOW())");
        if (!$stmt) {
            throw new Exception("Prepare statement failed: " . $conn->error);
        }
        $stmt->bind_param("si", $iniciales, $puntuacion);
        $stmt->execute();
        error_log("Score saved successfully.");

        echo json_encode(['status' => 'success', 'message' => 'Puntuación guardada correctamente']);
    } catch (Exception $e) {
        error_log("Error: " . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Error al guardar la puntuación']);
    }
} else {
    error_log("Invalid token or incomplete data.");
    echo json_encode(['status' => 'error', 'message' => 'Token no válido o datos incompletos']);
}

$conn->close();
error_log("Database connection closed.");
?>
