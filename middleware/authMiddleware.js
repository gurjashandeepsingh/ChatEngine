const asyncHandler = require(`express-async-handler`);
const User = require(`../models/userModel`);
const jwt = require(`jsonwebtoken`);


const protect =  asyncHandler(async(request, response, next) => {
    // Check if Headers have a Brearer Token 
    if(request.headers.authorization && request.headers.authorization.startsWith(`Bearer`)){
        try {
            // Split the Token and seperate the Bearer Part 
            // ex : `Bearer XIDOJJBDEBFEIBFJK` 
            let token = request.headers.authorization.split(" ")[1];
            // Decode the Token 
            let decoded = await jwt.verify(token, process.env.JWT_SECRET);
            // Get the USer through decoded tokens ID 
            request.user = await User.findById(decoded.id).select(`-password`);
            next();
        } catch (error) {
            throw new Error(`Not Authorized !`);
        }
    }
    if(!token){
        response.status(404);
        throw new Error(`No Token available, Can't Authorize`);
    }
});

module.exports = {protect};