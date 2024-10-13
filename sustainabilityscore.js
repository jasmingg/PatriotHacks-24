// Function to update the sustainability score bar and card information
function updateSustainabilityScore(score, color, title, description) {
  const progressBar = document.getElementById('progress-bar');
  const scoreLabel = document.getElementById('score-label');
  const message = document.getElementById("message");
  const card = document.querySelector('.sustainability-score-container');
  const cardTitle = document.getElementById('card-title');
  const cardDescription = document.getElementById('card-description');

  // Update card title and description
  cardTitle.textContent = title;
  cardDescription.textContent = description;

  // Update the width of the progress bar based on the score
  progressBar.style.width = score + '%';

  // Update the card color to match the location's marker color
  card.style.backgroundColor = color;

  // Update the label text to show the exact score
  scoreLabel.textContent = `Score: ${score}%`;

  // Set the message based on the score
  if (score < 33) {
      message.textContent = `Not good!`;
  } else if (score > 33 && score < 66) {
      message.textContent = `Getting there!`;
  } else {
      message.textContent = `Excellent!`;
  }
}