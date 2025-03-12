import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";

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
    console.log("Firebase ID Token:", idToken); // Check token in frontend console

    const res = await fetch("http://localhost:3000/api/v1/auth/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
    });

    const data = await res.json();
    console.log("Response from Backend:", data); // Log backend response

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
