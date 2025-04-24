// firebase-config.js

// Import necessary Firebase functions from the CDN
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCKcskXUdJa3jqRKWQ0c9-Kzjty_g8v4rk",
    authDomain: "smart-dustbin-2c65f.firebaseapp.com",
    projectId: "smart-dustbin-2c65f",
    storageBucket: "smart-dustbin-2c65f.firebasestorage.app",
    messagingSenderId: "166536923283",
    appId: "1:166536923283:web:254bd3a774d20405696566"
  };

// Initialize Firebase only if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export auth for use in other files
const auth = getAuth(app);

export { auth };
