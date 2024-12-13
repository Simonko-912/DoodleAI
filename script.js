const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

// Calculate the offset of the canvas relative to the viewport
const canvasRect = canvas.getBoundingClientRect();

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    ctx.beginPath(); // Start a new path when mouse is pressed
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.beginPath(); // End the current path when mouse is released
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    // Get mouse coordinates relative to the canvas
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ffffff';

    // Draw a line from the last position to the current mouse position
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY); // Move the starting point for the next line
});

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

async function submitDrawing() {
    const image = canvas.toDataURL('image/png');
    
    // Convert the image to 128x128 resolution
    const scaledImage = await scaleImage(image, 128, 128);

    try {
        const guess = await getAIguess(scaledImage);
        document.getElementById('guessOutput').innerText = `AI: "I see ${guess}"`;
        speakGuess(guess);
    } catch (error) {
        console.error('Error submitting drawing:', error);
        document.getElementById('guessOutput').innerText = "Error: Unable to fetch AI guess.";
    }
}

async function scaleImage(image, width, height) {
    const img = new Image();
    img.src = image;

    return new Promise((resolve) => {
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/png'));
        };
    });
}

async function getAIguess(image) {
    const response = await fetch('https://simonko-912.github.io/DoodleAI/getAIguess.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.guess || 'something unknown';
}

async function trainAI() {
    const label = document.getElementById('labelInput').value.trim();
    if (!label) {
        alert('Please enter a label.');
        return;
    }

    const image = canvas.toDataURL('image/png');
    
    // Convert the image to 128x128 resolution
    const scaledImage = await scaleImage(image, 128, 128);
    
    try {
        const response = await fetch('https://simonko-912.github.io/DoodleAI/trainAI.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label, image: scaledImage })
        });

        const data = await response.json();
        alert(data.message || 'Training data saved.');
        clearCanvas();
    } catch (error) {
        console.error('Error training AI:', error);
        alert('Error: Unable to save training data.');
    }
}

function speakGuess(guess) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(`I see ${guess}`);
    synth.speak(utterance);
}
