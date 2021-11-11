module.exports = (sequelize, Sequelize) => {
    
    let DataTypes = Sequelize.DataTypes;

    const Student = sequelize.define('Student', {
      student_id : {
        type: DataTypes.UUID,
        defaultValue: null,
        primaryKey: true,
      },
       student_name : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      
      dept_name : {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        }
      },
    }, {
      tableName: 'students'
    });


    return Student;
}    