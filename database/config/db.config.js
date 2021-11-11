const Sequelize = require("sequelize");
const dbConfig= require('./db.config.json')
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';
const db = {};

const sequelize = new Sequelize(dbConfig[env].db, dbConfig[env].user, dbConfig[env].password, {
  host: dbConfig[env].host,
  dialect: dbConfig[env].dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig[env].pool.max,
    min: dbConfig[env].pool.min,
    acquire: dbConfig[env].pool.acquire,
    idle: dbConfig[env].pool.idle
  }
});

// console.log(basename);
// console.log(__dirname);
// console.log(path.join(__dirname, '../models'));

const models_dirname = path.join(__dirname, '../models')

fs.readdirSync(models_dirname)
  .filter(file => {
    // console.log(file);
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // console.log(path.join(models_dirname, file));
    let model = require(path.join(models_dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });


  // User table & Role relation: one to many
  // or one to one?
  db.Role.hasMany(db.User,{foreignKey : 'role_id'});
  db.User.belongsTo(db.Role, {foreignKey : 'role_id'});


db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;