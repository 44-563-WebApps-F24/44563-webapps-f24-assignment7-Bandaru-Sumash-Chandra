// Declare the variables
let ids = Array.from({ length: 36 }, (_, i) => `img${i}`);
let score = 0;
let locationsVisited = 0;
let lastLocation = 0;
let zebraLocations = [1, 8, 12, 22, 34];
let lionLocation = 14;
let gameOver = false;

// Function to handle the click event on images
function check(position) {
    if (gameOver) {
        return; // Do nothing if the game is over
    }

    let imageId = ids[position];
    let imageElement = document.getElementById(imageId);

    // Change the image source based on the position
    if (position === lionLocation) {
        imageElement.src = "lion.jpg";
        gameOver = true;
        score -= 2;
    } else if (zebraLocations.includes(position)) {
        imageElement.src = "zebra.jpg";
        score += 4;
    } else {
        imageElement.src = "elephant.jpg";
        score += 1;
    }

    // Update locationsVisited
    locationsVisited++;

    // Update the last checked location
    lastLocation = position;

    // Update the score and locations visited on the page
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("locations-visited").innerText = `Locations Visited: ${locationsVisited}`;
}

// Function to provide help based on the last location
function help() {
    let row = Math.floor(lastLocation / 6);
    let col = lastLocation % 6;
    let lionRow = Math.floor(lionLocation / 6);
    let lionCol = lionLocation % 6;
    let closestLocations = [
        (lastLocation + 1) % 36, // Right (wrap around)
        (lastLocation + 35) % 36, // Left (wrap around)
        (lastLocation + 6) % 36, // Down (wrap around)
        (lastLocation + 30) % 36 // Up (wrap around)
    ];

    let helpMessage = "Its grey";

    // Check for zebras in the closest locations
    if (closestLocations.some(loc => zebraLocations.includes(loc))) {
        helpMessage = "I see stripes";
    }
    // Check if the lion is near the last location
    else if (Math.abs(row - lionRow) <= 1 && Math.abs(col - lionCol) <= 1) {
        helpMessage = "Rawr";
    }

    // Display the help message
    document.getElementById("help-result").innerText = helpMessage;
}

// Initialize the game and setup the help button click event
document.getElementById("help-btn").onclick = help;
