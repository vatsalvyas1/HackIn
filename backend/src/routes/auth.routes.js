import express from "express";
import admin from "firebase-admin";
import User from "../models/user.model.js";

const router = express.Router();

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

// GitHub Authentication Route
router.post("/github", async (req, res) => {
  try {
    const { token } = req.body;
    console.log("Received Token from Frontend:", token); // Log token to check if it's received

    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Decoded Token:", decodedToken); // Log user details from Firebase

    let user = await User.findOne({ oauthId: decodedToken.uid });

    if (!user) {
      user = new User({
        oauthProvider: "github",
        oauthId: decodedToken.uid,
        name: decodedToken.name,
        email: decodedToken.email,
        profileImage: decodedToken.picture,
        firstLogin: true,
      });
      await user.save();
    }

    console.log("User saved in MongoDB:", user);
    res.json({ user });
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ message: "Authentication failed", error });
  }
});

router.put("/complete-profile", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstLogin = false;
    await user.save();

    res.json({ message: "Profile setup completed" });
  } catch (error) {
    console.error("Profile completion error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
