const express = require('express');
const { registerUser, loginUser,   
updateUser,
changePassword, 
resetPassword, 
getUsers,
addUser, 
createOrganizer,
getOrganizers,
forgotPassword} = require('../controllers/userController');
const isAuthenticated = require('../middleware/authMiddleware');
const isAdmin = require("../middleware/adminMiddleware");
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put("/profile", isAuthenticated, updateUser);
router.patch('/change-password', isAuthenticated, changePassword);
router.post('/forgot-password',forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.post("/new", addUser);
router.post("/create-organizer", isAdmin, createOrganizer);
router.get("/get-organizers", isAdmin, getOrganizers);
router.get("/", getUsers);
module.exports = router;
