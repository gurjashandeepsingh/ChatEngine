const express = require(`express`);
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {accessChat, fetchChat,createGroup,renameGroup,addToGroup,removeFromGroup,joinGroup,leaveGroup} = require(`../controllers/chatControllers`);

// 1. Description = Accessing the Chat or Creating the Chat
router.route(`/`).post(protect, accessChat);
// 2. Description = Get all of the Chats from DataBase for User
router.route(`/`).get(protect, fetchChat);
// 3. Description =  Creating the Group
router.route(`/group`).post(createGroup);
// 4. Description = Renaming the Group
router.route(`/rename`).put(protect, renameGroup); 
// 5. Description = Removing from Group 
router.route(`/removeGroup`).put(protect, removeFromGroup);
// 6. Description = Adding to the Group 
router.route(`/addGroup`).put(protect, addToGroup);
// 7. Description = Join group
router.route(`/joinGroup`).put(protect, joinGroup);
// 8. Description = Leave Group
router.route(`/leaveGroup`).put(protect, leaveGroup);

module.exports = router;