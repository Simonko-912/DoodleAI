<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Helper function to create a simple hash of an image for comparison
function imageHash($imageData) {
    $image = imagecreatefromstring($imageData);
    if (!$image) {
        return null;
    }
    ob_start();
    imagepng($image);
    $imageContents = ob_get_clean();
    return md5($imageContents); // Simple hash based on image contents
}

// Load the received data
$data = json_decode(file_get_contents("php://input"), true);

// Handle training (storing images with labels)
if (isset($data['action']) && $data['action'] === 'train') {
    if (isset($data['label']) && isset($data['image'])) {
        $label = $data['label'];
        $imageData = base64_decode(explode(",", $data['image'])[1]);

        // Store the image in the training data folder with the label in the filename
        $filePath = "training_data/" . uniqid() . "_$label.png";
        file_put_contents($filePath, $imageData);

        echo json_encode(["status" => "success", "message" => "Training data saved."]);
        exit;
    }
}

// Handle guessing (comparing the new doodle with stored ones)
if (isset($data['image'])) {
    $uploadedImageData = base64_decode(explode(",", $data['image'])[1]);

    $trainingDataDir = 'training_data/';
    $bestMatch = null;
    $minDiff = PHP_INT_MAX; // Start with the largest possible difference

    // Compare the uploaded image with each stored image
    foreach (glob($trainingDataDir . "*.png") as $filePath) {
        $storedImageData = file_get_contents($filePath);

        // Hash the uploaded and stored images
        $uploadedImageHash = imageHash($uploadedImageData);
        $storedImageHash = imageHash($storedImageData);

        // Calculate the difference between the hashes (the smaller the diff, the closer the images)
        $diff = levenshtein($uploadedImageHash, $storedImageHash); // Simple string diff (for hash comparison)

        if ($diff < $minDiff) {
            $minDiff = $diff;
            $bestMatch = $filePath;
        }
    }

    // If we found a match, return the label of the most similar image
    if ($bestMatch !== null) {
        // Extract the label from the filename (e.g., "tree" from "tree_12345.png")
        preg_match("/_(.*?)\.png$/", basename($bestMatch), $matches);
        $label = $matches[1];
        echo json_encode(["guess" => $label]);
    } else {
        echo json_encode(["guess" => "unknown"]);
    }
    exit;
}

echo json_encode(["error" => "Invalid request"]);
?>
