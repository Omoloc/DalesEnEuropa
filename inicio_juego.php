<?php
session_start();

$token = bin2hex(random_bytes(32));
$_SESSION['game_token'] = $token;

echo json_encode(['token' => $token]);
?>
