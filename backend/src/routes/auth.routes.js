import express from "express";
import passport from "passport";

const router = express.Router();

// GitHub Login Route
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// GitHub Callback Route
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    res.redirect("http://localhost:5173/"); // Redirect after successful login
  }
);

// Logout Route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Logout failed");
    res.redirect("http://localhost:5173");
  });
});

export default router;
