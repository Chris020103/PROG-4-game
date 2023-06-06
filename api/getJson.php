<?php
function returnJsonData() {
    $filename = 'score.json';
    $jsonData = file_get_contents($filename);

    // Set the appropriate headers for JSON response
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    // Return the JSON data
    echo $jsonData;
}

// Call the function to return JSON data
returnJsonData();
?>