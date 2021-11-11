module.exports = (sequelize, Sequelize) => {
    let DataTypes = Sequelize.DataTypes;

    const Course = sequelize.define('Course', {
      course_id : {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4 ,
        primaryKey: true,
      },
      course_name : {
        type: DataTypes.STRING,
        allowNull: false,
       primaryKey: true,
      },
      dept_name : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      instructor_id : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },

    }, {
      tableName: 'course'
    });

    return Course;
}
