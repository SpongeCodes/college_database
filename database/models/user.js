module.exports = (sequelize, Sequelize) => {
    
    let DataTypes = Sequelize.DataTypes;

    const User = sequelize.define('User', {
      user_id : {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      username : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      password : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      role_name : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      instructor_id : {
        type: DataTypes.UUID,
        allowNull: true,
        validate: {
          notEmpty: true,
        }
      },
      student_id : {
        type: DataTypes.UUID,
        allowNull: true,
        validate: {
          notEmpty: true,
        }
      },
      is_verified: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: false 
      },
    }, {
      tableName: 'user'
    });


    return User;
}    