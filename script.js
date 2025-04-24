// Import necessary Firebase modules
import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

// BLYNK SETTINGS
const BLYNK_AUTH_TOKEN = 'Q0QxoqZaMZDgm7vgnXrBHTAZ7RE_wmc9';  // Replace with your actual Blynk token
const VIRTUAL_PIN = 'V0'; // Replace with your actual virtual pin if different

// Elements
const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

// Handle login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Hide login and show dashboard
      document.querySelector(".login-container").style.display = "none";
      showDashboard();
    })
    .catch((error) => {
      errorMessage.textContent = error.message;
    });
});

// Show dashboard and fetch dustbin level
function showDashboard() {
  const dashboard = document.createElement("div");
  dashboard.className = "dashboard-container";
  dashboard.innerHTML = `
    <h2>Welcome to Smart Dustbin Dashboard</h2>
    <div class="area-section" id="gota">
      <h3>Gota Area</h3>
      <p>Dustbin Level: <strong id="gota-level">Loading...</strong>%</p>
    </div>
    <div class="area-section" id="ghatlodiya">
      <h3>Ghatlodiya Area</h3>
      <p>Dustbin Level: <strong id="ghatlodiya-level">0</strong>%</p> <!-- Default value 0 -->
    </div>
    <div class="area-section" id="chandlodiya">
      <h3>Chandlodiya Area</h3>
      <p>Dustbin Level: <strong id="chandlodiya-level">0</strong>%</p> <!-- Default value 0 -->
    </div>
    <div class="area-section" id="jagatpur">
      <h3>Jagatpur Area</h3>
      <p>Dustbin Level: <strong id="jagatpur-level">0</strong>%</p> <!-- Default value 0 -->
    </div>
  `;
  document.body.appendChild(dashboard);
  getDustbinLevel();
  setInterval(getDustbinLevel, 1000); // Refresh every 5 seconds
}

// Fetch dustbin data from Blynk for all areas
async function getDustbinLevel() {
  try {
    const response = await fetch(`https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&${VIRTUAL_PIN}`);
    const data = await response.text();

    // Update the dustbin level for Gota area with actual data
    document.getElementById("gota-level").textContent = data;

    // Set other areas (Ghatlodiya, Chandlodiya, Jagatpur) to 0 for now
    document.getElementById("ghatlodiya-level").textContent = "0";
    document.getElementById("chandlodiya-level").textContent = "0";
    document.getElementById("jagatpur-level").textContent = "0";
  } catch (error) {
    // Handle error and show "Error" in all areas
    document.getElementById("gota-level").textContent = "Error";
    document.getElementById("ghatlodiya-level").textContent = "Error";
    document.getElementById("chandlodiya-level").textContent = "Error";
    document.getElementById("jagatpur-level").textContent = "Error";
    console.error("Error fetching Blynk data:", error);
  }
}
