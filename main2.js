
let modelStatus; 
let img; 

function preload() {
    img = loadImage('desk.jpeg'); 
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    canvas.position(x, y);

    modelStatus = false;
    cocoSsd.load().then(modelLoaded);

    let statusElement = document.getElementById("status");
    statusElement.innerText = "Detecting Objects";
}

function modelLoaded() {
    modelStatus = true;

    // Executing cocossd model
    cocoSsd.detect(img).then(gotResults); // Pass the preloaded image to the detect function
}

let results = []; 
function gotResults(error, result) {
    if (error) {
        console.error(error);
        return;
    }
    results = result; // Assign the results array to the results variable
    modelStatus = true;
}

function draw() {
    if (modelStatus) {
        for (let i = 0; i < results.length; i++) {
            let confidence = results[i].confidence * 100;
            let label = results[i].label;
            let x = results[i].x;
            let y = results[i].y;
            text(label + ": " + confidence.toFixed(2) + "%", x, y);
            let width = results[i].width;
            let height = results[i].height;
            // Draw a rectangle near the object
            rect(x, y, width, height);
        }
    }
}
