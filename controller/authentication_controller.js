const { isJwtExpired } = require ('jwt-check-expiration');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const db = require('../database/config/db.config');
const { token_generator } = require('../config/token_generator');
const { generated_hash, compare} = require('../config/hash_generator');
const { send_mail } = require('../config/email');
const { five_digit_random_number_generator } = require('../config/five_digit_random_number_generator')
const User = db["User"];
const Otp_authentication = db["Otp_authentication"];
const Role = db["Role"];
const User_status = db["User_status"];
const SECRET = process.env.SECRET;
const LOGIN_TOKEN_EXPIRY_TIME = process.env.LOGIN_TOKEN_EXPIRY_TIME;
const OTP_TOKEN_EXPIRY_TIME = process.env.OTP_TOKEN_EXPIRY_TIME;


//login
const login = async (req, res) => {
    try{
        let user_body = req.body;
        let { username , password} = user_body;

        // find user by username & is_deleted = false
        const user = await User.findOne({
            where: {
                username: user_body.username,
                is_deleted : false,

            },
            include: [Role]
        });

        //checks wheather username exists or not
        if (user === null) {     
            return res.status(200).json({status:true, status_code : 200, message: 'EITHER_USERNAME_OR_PASSWORD_IS_NOT_CORRECT', data : {}});  //check once
        }
        
        //checks wheather password matches or not
        if(password != user.password){    
            return res.status(200).json({status:true, status_code : 200, message: 'EITHER_USERNAME_OR_PASSWORD_IS_NOT_CORRECT', data : {}});  //check once
        }else{
            
            return res.status(200).json({status:true, status_code: 200, message: 'USER_SUCCESSFULLY_LOGIN', data : current_user});
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({status:false, status_code :500, message: 'ERROR', data : error});
    }
}



module.exports = {
    login,
}
