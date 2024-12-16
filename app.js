// Create a navigation bar
const navbar = document.getElementById("navbar");

// Set navbar styles
navbar.style.display = "flex";
navbar.style.justifyContent = "flex-end"; // Align items to the right
navbar.style.alignItems = "center";
navbar.style.backgroundColor = "#333";
navbar.style.color = "#fff";
navbar.style.padding = "10px 20px"; // Padding for spacing
navbar.style.width = "100%"; // Full width

// Add "Credits" button
const creditsButton = document.createElement("button");
creditsButton.innerText = "Credits";
creditsButton.style.marginLeft = "20px"; // Space between items
creditsButton.style.padding = "10px 15px";
creditsButton.style.border = "none";
creditsButton.style.backgroundColor = "#007BFF";
creditsButton.style.color = "#fff";
creditsButton.style.borderRadius = "5px";
creditsButton.style.cursor = "pointer";

// Add click functionality for "Credits"
creditsButton.addEventListener("click", () => {
    window.location.href = "credits.html"; // Navigate to Credits page
});

// Add "About Us" button
const aboutUsButton = document.createElement("button");
aboutUsButton.innerText = "About Us";
aboutUsButton.style.marginLeft = "20px"; // Space between items
aboutUsButton.style.padding = "10px 15px";
aboutUsButton.style.border = "none";
aboutUsButton.style.backgroundColor = "#007BFF"; // Same background color
aboutUsButton.style.color = "#fff"; // Same text color
aboutUsButton.style.borderRadius = "5px"; // Rounded corners
aboutUsButton.style.cursor = "pointer";

// Add click functionality for "About Us"
aboutUsButton.addEventListener("click", () => {
    window.location.href = "about.html"; // Navigate to About Us page
});

// Append "Credits" and "About Us" to the navbar
navbar.appendChild(creditsButton);
navbar.appendChild(aboutUsButton);

// Set the header based on the page
const pageHeader = document.getElementById("page-header");
const currentPage = window.location.pathname.split("/").pop(); // Get the current page filename

if (currentPage === "index.html") {
    pageHeader.innerText = "Welcome to My JavaScript Website";
} else if (currentPage === "about.html") {
    pageHeader.innerText = "About Us";
} else if (currentPage === "credits.html") {
    pageHeader.innerText = "Credits";
}