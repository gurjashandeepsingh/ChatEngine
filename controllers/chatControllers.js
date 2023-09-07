const asyncHandler = require(`express-async-handler`);
const userModel = require(`../models/userModel`);
const ChatUserMapModel = require("../models/chatUserMapModel");
const ChatModel = require("../models/chatModel");
const readByModel = require(`../models/readByModel`);
const { models } = require("mongoose");

/**readyBy feature, latestMessage updation in inbox, line 23 error, api testing  */

// 1. Create or fetch One to One Chat
//      Route = POST /api/chat/
//      Access = Protected
//      Approach = We'll be needing to find the Chat in our DataBase that has the current Logged in User and another User 
const accessChat = asyncHandler(async(request, response) => {
    const {userid, chatid} = request.body;
    try {
        let resultNew;
        const result = await ChatUserMapModel.findOne({where: {chatId: {$eq: chatid}}});
        if(result) {
            resultNew = await chatModel.findOne({where: {id: {$eq: chatid}}});
            const result2 = await messageModel.findAll({where: {chatId: {$eq: chatid}}});
            const allMessages = await result2.map((u) => {
                return {sender: u.sender, reciever:u.reciever, content: u.content, messageId: u.messageId};
            });
            const allMessageIds = await result2.map((u) => {
                return u.messageId;
            });
                /*Fix the line below, not RETURNING ALL readBy */
            const readByQuery = await readBy.findAll({where: {messageId: {$in: allMessages.messageId }}}) 
            response.status(200). send(resultNew, allMessages, readByQuery);
        }
        else {
            resultNew = Chat.create({
                chatName: reciever,
                isGroupChat: false, 
            });
            response.status(200). send(resultNew);
            const createdChat = await model.chatModel.findOne({where: {chatId: {$eq:newChat.id}}})
            response.status(200).send(createdChat);
            }
    } catch (error) {
        response.status(400);
        throw new Error(`Something went wrong`);};
    });


//2. Description = Fetch all chats for a user
//      Route = GET /api/chat/
//      Access = Protected
//      Approach =  We'll need to run a query to find all the Chats the User is Part of with help of UserId 
const fetchChat = asyncHandler(async(response, request) => {
    const {userid} = request.body;
    try {
        const step1 = await ChatUserMapModel.findAll({where: {userId: {$eq: request.userId}}});
        const step2 = await ChatUserMapModel.map((u) => {
            return u.chatid;
        });
        const step3 = await ChatModel.findAll({where: {chatId: {step2}}});
        const latestmessages = await step3.map((u) => {
            return u.latestMessage
        });
        response.status(200).send(step3, latestmessages);
    } catch (error) {
        response.status(400);
        throw new Error(`Wrong Request`);
    }});


// //3. Description = Create New Group Chat 
// //      Route = POST /api/chat/group
// //      Access = Protected
// //      Approach =  We'll simply need to push all the Users to the Users array of the Chat Model 
const createGroup = asyncHandler(async(request, response) => {
    // If no users are sent that are to be added 
    if(!request.body.users){
        response.status(400).send(`Please add users to the Group`);};
    if(!request.body.name){
        response.status(400).send(`Please add Group Name`);
    }
//     // As the data from frontend needs to be parsed first to Stringify format
    var users = JSON.parse(request.body.users);
//      // Check if in a new group there are more than 2 Users 
    if(user.length<2){
        response.send(`Please add more users to this Group`);};
//     // Add the current Logged in User to the Group Chat 
    user.push(request.user);
    try {
        let groupChat = new Chat.create({
            chatName: request.body.Name,
            isGroupChat: true,
            groupAdmin: request.user
        });
//      // Run a query to get that new Group 
        const fullChat = await models.Chat.findOne(
            {where: 
                {id: {$eq: groupChat.id}}});
        response.status(200).send(fullChat);
    }catch(error) {
        response.status(400).send(`Some error occured while fetching`);
    }
});

//         .populate(`users`, `-password`)
//         .populate(`groupAdmin`, `-password`);
//         response.status(200).send(fullGroupChat);



// //4. Description = Rename Group
// //      Route = PUT /api/chat/rename
// //      Access = Protected
// //      Approach = Simply run a query to find the Chat and Update it's name
const renameGroup = asyncHandler(async(request, response) => {
    try {
//         // We'll get ChatId and ChatName in the body of request  
        const {chatId, groupName} = request.body;
//         // Run a query to find the Chat in DataBase and save it in const
        const updatedGroup = await chatModel.update({id: chatid}, {where: {chatName: groupName}});
//         // If name can't be Updated send error response
        if(!updatedGroup){
            response.status(400).send(`Bad Request`);
        }else{
            response.status(200).send(updatedGroup);}
    } catch (error) {
        response.status(400);
        response.send(`Something went wrong`);
    }
    })
//             .populate(`users`, `-password`)
//             .populate(`groupAdmin`, `-password`);



// // 5. Description = Add user to Group / Leave
// //      Route = PUT /api/chat/groupadd
// //      Access = Protected
// //      Approach = Run a query on dataBase to find the Chat and push the User to the User's array of the groupChat
const addToGroup = asyncHandler(async(request, response) => {
    try {
//     // We'll get ChatId and UserId from Frontend
        const {chatid, userid} = request.body;
//      // Push the new User in ChatUser table to add a User 
        const updatedGroup = await ChatUserMapModel.create({ chatId: chatid, userId: userid });
//     // If a User can't be added 
        if(!updatedGroup){
            response.status(400).send(`Chat not Found`);
        }else{
            response.status(200).json(added);
        };        
    } catch (error) {
     response.status(400).send(`Something went wrong, can't add the User`);   
    };
})

//         .populate(`users`, `-password`)
//         .populate(`groupAdmin`, `-password`);



// //Description = Remove user from Group
// //      Route = PUT /api/chat/groupremove
// //      Access = Protected
// //      Approach = Run a query in DataBase to find the Chat and pop the User from Users array od GroupChat
const removeFromGroup = asyncHandler(async(request, response) => {
    try {
        // We'll get ChatId and UserId to be removed from the group 
        const {chatId, userid} = request.body;
        // Run a query to find the groupChat and pull out the User from it's Users array 
        const remove = await ChatUserMapModel.destroy({
            where: {
                userId:userid
            },
            });
        // If due to some reason, can't remove the User
        if(!remove){
            response.status(400);
            throw new Error(`Chat not Found`);
        }else{
            response.status(200).json(remove);
        };
    } catch (error) {
        response.status(400).send(`Something went wrong`);
    }
});

//             .populate(`users`, `-password`)
//             .populate(`groupAdmin`, `-password`)



// //Description = Join Group
// //      Route = PUT /api/chat/joingroup
// //      Access = Protected
// //      Approach = Run a query on DataBase to push the UserId to Users Array of the Chat Model
const joinGroup = asyncHandler(async(request, response) => {
    try {
//     // We'll get ChatId and UserId from Frontend
        const {chatId, userId} = request.body;
//      // Push the new User in ChatUser table to add a User 
        const updatedGroup = await ChatUserMapModel.create({ ChatId: chatId, userId: userId });
//     // If a User can't be added 
        if(!updatedGroup){
            response.status(400).send(`Chat not Found`);
        }else{
            response.status(200).json(added);
        };        
    } catch (error) {
     response.status(400).send(`Something went wrong, can't add the User`);   
    };
})

//         .populate(`users`, `-password`)
//         .populate(`groupAdmin`, `-password`);


// //Description = Leave Group
// //      Route = PUT /api/chat/joingroup
// //      Access = Protected
// //      Approach = Run a query on DataBase to pull out the UserId from Users Array of the Chat Model
const leaveGroup = asyncHandler(async(request, response) => {
    try {
        // We'll get ChatId and UserId to be removed from the group 
        const {chatId, userId} = request.body;
        // Run a query to find the groupChat and pull out the User from it's Users array 
        const remove = await ChatUserMapModel.destroy({
            where: {
                userId:userId
            },
            });
        // If due to some reason, can't remove the User
        if(!remove){
            response.status(400);
            throw new Error(`Chat not Found`);
        }else{
            response.status(200).json(remove);
        };
    } catch (error) {
        response.status(400).send(`Something went wrong`);
    }
});

//         .populate(`users`, `-password`)
//         .populate(`groupAdmin`, `-password`)

            

module.exports = {accessChat, fetchChat, createGroup, renameGroup, addToGroup, removeFromGroup, joinGroup, leaveGroup};
