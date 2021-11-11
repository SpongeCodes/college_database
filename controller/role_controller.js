const db = require('../database/config/db.config');
const Role = db["Role"];


//View one role by id
const viewRoleById = async (req, res) => {
    try{
        const role_id = req.params.id;
        const role = await Role.findOne({
            where: {
                role_id
              }
        });
        if (role === null) {
            return res.status(200).json({status:true, status_code:200, message: 'ROLE_NOT_FOUND'});  //check once
        } else {
            return res.status(200).json({status:true, status_code:200, message: 'ROLE_FOUND', data:{role} });
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({status:false, status_code:500, message: 'ERROR', error});
    }
}

//List all roles
const listRoles = async (req, res) => {
    try{
        const roles = await Role.findAll({
        });

        if (roles === null) {
            return res.status(200).json({status:true,status_code:200, message: 'ROLES_NOT_FOUND'});  //check once
        } else {
            return res.status(200).json({status:true,status_code:200, message: 'ROLES_FOUND', data: roles });
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({status:false, status_code:500, message: 'ERROR', data:{error}});
    }
}


module.exports = {
    viewRoleById,
    listRoles
}
