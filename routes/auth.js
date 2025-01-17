const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/logout', authController.logout);

router.use((req, res, next) => {
  if (req?.session?.user?.workDir) {
    if (req?.session?.user?.workDir == '/') return next();
    return res.redirect(req?.session?.user?.workDir);
  }
  return next();
});

router.get("/", (req, res) => {
  return res.redirect("/auth/login");
})

router.get("/login", (req, res) => {
  return res.render("auth/login", { layout: "./layouts/auth" });
});

router.post('/login', authController.login);

router.get("/register", (req, res) => {
  return res.render("auth/register", { layout: "./layouts/auth" });
});

router.post('/register', authController.register);

router.get("/reset-password", (req, res) => {
  return res.render("auth/reset", { layout: "./layouts/auth" });
});

module.exports = router;
