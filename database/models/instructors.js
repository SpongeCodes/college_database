module.exports = (sequelize, Sequelize) => {
    
    let DataTypes = Sequelize.DataTypes;

    const Instructor = sequelize.define('Instructor', {
      instructor_id : {
        type: DataTypes.UUID,
        defaultValue: null,
        primaryKey: true,
      },
       instructor_name : {
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
      tableName: 'instructors'
    });


    return Instructor;
}    