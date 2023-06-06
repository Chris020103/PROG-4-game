<?php
ini_set('display_errors', 1);

$id = $_GET['id'];
$score = $_GET['score'];
$data = ['id' => $id, 'score' => intval($score)];

$filename = 'score.json';

$jsonData = json_encode($data, JSON_PRETTY_PRINT);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
if (file_put_contents($filename, $jsonData)) {
    echo json_encode(['success' => true, 'message' => 'JSON file saved successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error saving JSON file.']);
}
exit();

