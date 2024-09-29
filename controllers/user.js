//Dependencies and Modules of User Controller

const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");


// USER REGISTRATION
module.exports.registerUser = (reqbody) => {
    let newUser = new User({
        firstName: reqbody.firstName,
        lastName: reqbody.lastName,
        mobileNo: reqbody.mobileNo,
        username: reqbody.username,
        password: bcrypt.hashSync(reqbody.password, 10),
    });

    return newUser.save()
        .then(user => {
            return {
                success: true,
                message: 'User registered successfully',
                user: user
            };
        })
        .catch(error => {
            console.error(error);
            return {
                success: false,
                message: 'User registration failed',
                error: error.message
            };
        });
};


// USER LOGIN
module.exports.loginUser = (req,res) => {
    return User.findOne({username:req.body.username}).then(result => {
        if(result === null){
            return false
        }else{
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password)
            if(isPasswordCorrect){
                console.log("User login successfull!")
                return res.send({access: auth.createAccessToken(result)})
            }else{
                console.log("User login failed!")
                return res.send(false)
            }
        }
    })
    .catch(err => res.send(err))
};

//GET USER DETAILS
module.exports.getProfile = (req, res) => {

    return User.findById(req.user.id)
    .then(result => {
      result.password = "";
      return res.send(result);
    })
    .catch(err => res.send(err))
  };


//GET ALL USERS - ADMIN 
module.exports.getAllUsers = (req,res) => {

  return User.find({})
  .then(result => {
    console.log(result)
    res.send(result)
  })
  .catch(err => res.send(err))
};


//DELETE SPECIFIC USER - ADMIN
module.exports.deleteUser = (req,res) =>{

    User.findByIdAndRemove(req.body.userId).then(result =>{
        if(result === null){
            return res.send(false)
        }else{
            return res.send(true)
        }
    })
    .catch(err => res.send(err))
};

//UPDATE USER PROFILE
  module.exports.updateProfile = async (req, res) => {
    try {

      console.log(req.user);
      console.log(req.body);
      const userId = req.user.id;

      const { firstName, lastName, mobileNo, username } = req.body;
    
      const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, mobileNo, username },
      { new: true }
      );
    
      res.send(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Failed to update profile' });
    }
    }

//UPDATE THE USER'S PASSWORD
module.exports.resetPassword = async (req, res) => {
  try {

    const { newPassword } = req.body;
    const { userId } = req.params;  
    
    // Define the salt rounds (for example, 10 rounds)
    const saltRounds = 10;
    
    // Hashing the new password with salt rounds
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    // Updating the user's password in the database
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    
    // Sending a success response
    res.status(200).send({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
