// Function to update the sustainability score bar
function updateSustainabilityScore(score) {
    const progressBar = document.getElementById('progress-bar');
    const scoreLabel = document.getElementById('score-label');
    const message = document.getElementById("message"); 

    // Update the width of the progress bar based on the score
    progressBar.style.width = score + '%';
    
    // Update the label text to show the exact score
    scoreLabel.textContent = `Score: ${score}%`;

    if (score < 33) {
        progressBar.style.backgroundColor = 'red';
        message.textContent = `Not good!`;
    }
    else if (score > 33 && score < 66) {
        progressBar.style.backgroundColor = 'orange'; 
        message.textContent = `Getting there!`;
    }
    else if (score > 66) {
        progressBar.style.backgroundColor = 'green'; 
        message.textContent = `Excellent!`;
    }
}

// Example of how to use the function
// You can dynamically call this based on real data from your neighborhood sustainability score
updateSustainabilityScore(75); // Set the score to 75% for demonstration
updateSustainabilityScore(30); 
updateSustainabilityScore(0); 
updateSustainabilityScore(60); 
updateSustainabilityScore(53); 

