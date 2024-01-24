const express = require('express');
const { registerUser, loginUser,   
updateUser,
changePassword, 
resetPassword, 
getUsers,
addUser, 
createOrganizer,
getOrganizers} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const isAdmin = require("../middleware/adminMiddleware");
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put("/profile", protect, updateUser);
router.patch('/change-password', protect, changePassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.post("/new", addUser);
router.post("/create-organizer", isAdmin, createOrganizer);
router.get("/get-organizers", isAdmin, getOrganizers);
router.get("/", getUsers);
module.exports = router;
