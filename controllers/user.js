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