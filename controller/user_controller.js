const { Op } = require("sequelize");
const db = require('../database/config/db.config');
const User = db["User"];
const Otp_authentication = db["Otp_authentication"];
const Role = db["Role"];
const User_status = db["User_status"];



// create user
const createUser = async (req, res) => {

    try{
        let user_body = req.body;
        let { username , password , role_id} = user_body;

        const [user, created] = await User.findOrCreate({
            where: { username: user_body.username  },// if any user deleted any few days later if he/she create user with same username then what happen??
            defaults: user_body
        });

        if(created){
            // password field must be '' before send to frontend
            updateUser.password = '';
            
            return res.status(201).json({status:true, status_code: 201, message: 'USER_CREATED_SUCCESSFULLY', data : user});
        }else{
            return res.status(500).json({status:false, status_code: 500, message: 'USER_ALREADY_EXIST', data : {}});
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({status:false, status_code: 500,message: 'ERROR', data : error});
    }
    
} 

// fetch one user by id
const fetchUser = async (req, res) => {
    try{
        const user_id = req.params.id;

        const user = await User.findOne({ where: { user_id }, include: [Role]});

        if (user === null) {
            return res.status(500).json({status:false, status_code: 500, message: 'USER_NOT_FOUND', data : {}});
        } else {
            // password field must be '' before send to fontend
            user.password = '';
            return res.status(200).json({status:true, status_code: 200, message: 'USER_FOUND', data :user });
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({status:false, status_code: 500, message: 'ERROR', data : error});
    }
} 

// fetch one user by username
const fetchUserByUsername = async (req, res) => {
    try{
        const username = req.params.username;
        const users = await User.findOne({ where: { username }, include: [Role] });

        if (users === null) {
            return res.status(500).json({status:false, status_code: 500, message: 'USER_NOT_FOUND', data : {}});
        } else {
            // password field must be '' before it is sent to fontend
            users.password = '';

            return res.status(200).json({status:true, status_code: 200, message: 'USER_FOUND', data : users });
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({status:false, status_code: 500, message: 'ERROR', data : error});
    }
} 

/*const manageUser =  (req,res) => {

    want to flash a message - are you sure you want to accept/reject?


}
*/
module.exports = {
    createUser,
    fetchUser,
    fetchUserByUsername,
    // manageUser
}
