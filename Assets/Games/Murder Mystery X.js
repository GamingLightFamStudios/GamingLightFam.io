// Function to create a clickable Roblox game button
function createGameButton(gameName, placeId) {
  const container = document.getElementById("game-container");

  // Create the button element
  const button = document.createElement("a");
  button.href = `https://www.roblox.com/games/start?launchData=utm1%253A0%252C0%252Cweb-link%252Chome-bottom-play-button%252C%253B&placeId=${placeId}`;
  button.target = "_blank"; // Opens the link in a new tab
  button.className = "play-btn"; // You can style this class to make it look like a button
  button.textContent = `Play ${gameName} on Roblox`;

  // Add styles to make the button clickable and visually interactive
  button.style.display = "inline-block";
  button.style.padding = "15px 30px";
  button.style.color = "white";
  button.style.fontSize = "16px";
  button.style.fontWeight = "bold";
  button.style.textAlign = "center";
  button.style.borderRadius = "5px";
  button.style.textDecoration = "none";
  button.style.transition = "background-color 0.3s ease"; // Smooth transition for hover

  // Add the button to the container
  container.appendChild(button);
}

// Create the button for a specific Roblox game
createGameButton("Murder Mystery X", "18657827455");