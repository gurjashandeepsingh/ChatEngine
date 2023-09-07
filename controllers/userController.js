const asyncHandler = require(`express-async-handler`);
const User = require(`../models/userModel`);
const userModel = require("../models/userModel");

// Description = Get All Users 
// Route = GET /api/user?search=
const allUsers = asyncHandler(async (request, response) => {
    // We'll need to find the User in DataBase that has name or email equal to the one mentioned in Query 
    const keyword = request.query.search ? 
    {
        $or: [{
            name: {
                $regex: request.query.search

            }
        }, {
            email: {
                $regex: request.query.search

            }
        }]
    } : {}
    // Will find the User in DataBase except the User that is currently Logged in. 
    const users = await UserModel.find(keyword).findOne({where: {id: {$ne: request.user.id}}})
    // return the response to the User 
    response.send(users);
});


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
    const userExists = await userModel.findOne({where: {email: {$eq: email}}});
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await userModel.create({
      name,
      email,
      password,
      pic,
    });
  
    if (user) {
      res.status(201).json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });


  const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({where: {email: {$eq: email}}});
    if (user && password===user.password) {
      res.json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

module.exports = {
    allUsers, registerUser, authUser
}