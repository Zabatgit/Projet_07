const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const password = require("../middleware/password");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/profile", auth, userCtrl.profile);
router.put("/profile/:id", auth, multer, userCtrl.modifyUser);

module.exports = router;
