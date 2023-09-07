const User = require(`../models/userModel`);
const Chat = require(`../models/chatModel`);
const Message = require(`../models/messageModel`);
const asyncHandler = require(`express-async-handler`);
const messageModel = require("../models/messageModel");
const { where } = require("sequelize");

//1. Description = Get all Messages
//      Route = GET /api/Message/:chatId
//      Access = Protected
const allMessages = asyncHandler(async(request, response) => {
    try {
        // Run a query to find all messages of a ChatId in Our DataBase
        const message = await messageModel.find({where: {chat: {$eq: request.params.chatId}}})
        // If no message is found to corresponding ChatId
        if(!message){
            response.status(400);
            throw new message(`Can't fetch any Messages`);
        }else{
            response.status(200).json(message);
        };
    } catch (error) {
        throw new Error(error);
    }
}); 


//2. Description = Send a Message
//      Route = GET /api/Message/:chatId
//      Access = Protected
const sendMessage = asyncHandler(async (request, response) => {
    // We'll get Content and ChatId from frontend and params 
    const { content, chatId } = req.body;
    // If there is no content or ChatId recieved
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    };    
    // Assign values to keys  
    var newMessage = {
      sender: request.params.userId,
      /* Find Reciever here as well */
      content: content,
      chat: chatId,
    };
    // Create a new Message Object 
    try {
      var message = await messageModel.create(newMessage); 
      // Now get that message Object that was created above and return it to User 
      await ChatModel.findByIdAndUpdate(req.body.chatId, { latestMessage: message }); 
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  
  module.exports = { allMessages, sendMessage };