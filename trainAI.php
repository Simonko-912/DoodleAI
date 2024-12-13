<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['label']) && isset($data['image'])) {
    $label = $data['label'];
    $imageData = $data['image'];

    // Define the directory where you want to save images
    $dir = "training_data/";
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true); // Create directory if it doesn't exist
    }

    // Generate a unique filename for the image
    $filePath = $dir . uniqid() . "_$label.png";

    // Extract image content from the base64 string
    $imageContent = explode(",", $imageData)[1];

    // Save the image
    $success = file_put_contents($filePath, base64_decode($imageContent));

    if ($success) {
        echo json_encode(["status" => "success", "message" => "Training data saved."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to save training data."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input data."]);
}
?>
