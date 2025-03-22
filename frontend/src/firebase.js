import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { backendURL } from "./constanst.js";

const firebaseConfig = {
    apiKey: "AIzaSyASa14ZZnS3P7gEi1KhF3DR3sqXTLEnLwM",
    authDomain: "hackin-8b4c3.firebaseapp.com",
    projectId: "hackin-8b4c3",
    storageBucket: "hackin-8b4c3.firebasestorage.app",
    messagingSenderId: "418741470537",
    appId: "1:418741470537:web:9249dd4047a477405bc698"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();

// GitHub Login Function
const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const idToken = await result.user.getIdToken();
    console.log("Firebase ID Token:", idToken);

    // Get the GitHub access token
    const githubAccessToken = result._tokenResponse.oauthAccessToken;
    console.log("GitHub Access Token:", githubAccessToken);

    // Fetch GitHub user details
    const githubResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${githubAccessToken}`,
      },
    });

    const githubData = await githubResponse.json();
    console.log("GitHub User Data:", githubData);

    // Extract name and username from GitHub
    const name = githubData.name || null; // GitHub display name (null if not set)
    const username = githubData.login || result.user.email.split("@")[0]; // GitHub username

    // Send token, GitHub name, and username to backend
    const res = await fetch(`${backendURL}/api/v1/auth/github`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken, name, username }),
    });

    const data = await res.json();
    console.log("Response from Backend:", data);

    return data.user;
  } catch (error) {
    console.error("GitHub Login Error:", error);
  }
};

// Logout Function
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export { auth, signInWithGithub, logout };
