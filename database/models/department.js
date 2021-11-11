module.exports = (sequelize, Sequelize) => {
    let DataTypes = Sequelize.DataTypes;

    const Department = sequelize.define('Department', {
      dept_id : {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        primaryKey: true,
      },
      dept_name : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      head_id : {
          type: DataTypes.STRING,
          allowNull: true,
      }
    }, {
      tableName: 'Department'
    });


    return Department;
}    