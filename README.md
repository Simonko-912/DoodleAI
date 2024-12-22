# DoodleAI

<p align="center"> 
    <img src="https://img.shields.io/github/issues/Simonko-912/DoodleAI" alt="Issues">
    <img src="https://img.shields.io/github/forks/Simonko-912/DoodleAI" alt="Forks">
    <img src="https://img.shields.io/github/stars/Simonko-912/DoodleAI" alt="Stars">
    <img src="https://img.shields.io/github/license/Simonko-912/DoodleAI" alt="License">
    <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="Version">
    <img src="https://img.shields.io/badge/contributors-5-orange" alt="Contributors">
    <img src="https://img.shields.io/github/downloads/Simonko-912/DoodleAI/total" alt="Downloads">
    <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status">
</p>

DoodleAI is an interactive platform that allows users to draw and train an AI to recognize their sketches. It's a fun way to create custom datasets.

<img width="309" alt="Image Of Doodle AI Guessing Ball Corectly" src="https://github.com/user-attachments/assets/f5a9b2ba-4de6-4ddd-b0ae-73b7b85b0116" />
  
## Features
#### Pre-Trained Model:
DoodleAI comes with images so you can test it.
It tooks lot of time to identify lot of images in 500x500 quality. Thats why we use 128x128 it is not very acurate at identifing lot of difrent things but it saves storage and it is faster.
#### Draw and Guess: 
Create drawings on a 500x500 (Converted to 128x128) canvas and let the AI guess what it is.
#### Training: 
Label your drawings and submit them to improve the AI’s accuracy.
#### Voice Feedback: 
The AI speaks its guess using text-to-speech.

## Technologies Used
HTML, CSS, JavaScript
Canvas API
PHP (for backend)
Speech Synthesis API
## Installation
Clone the repository:

```bash Copy code
git clone https://github.com/Simonko-912/DoodleAI.git
```
Set up a local server with PHP support (e.g., XAMPP, MAMP).
Open index.html in your local server to view the app.

## Usage
Draw: Use the canvas to sketch an object.
Submit: Click "Submit" to have the AI guess your drawing.
Train: Enter a label and click "Train AI" to add your drawing to the training set.
## License
This project is open-source and available under the MIT License.
