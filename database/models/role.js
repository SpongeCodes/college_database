module.exports = (sequelize, Sequelize) => {
    let DataTypes = Sequelize.DataTypes;

    const Role = sequelize.define('Role', {
      role_id : {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        primaryKey: true,
      },
      role_name : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
    }, {
      tableName: 'role'
    });


    return Role;
}    