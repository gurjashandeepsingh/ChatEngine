const express = require(`express`);
const { allUsers } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const registerUser = require("../controllers/userController");
const authUser = require("../controllers/userController")
const router = express.Router();


router.route(`/`).get(protect, allUsers);
router.route(`/register`).post(registerUser);
router.route(`/login`).post(authUser);

module.exports = router;
