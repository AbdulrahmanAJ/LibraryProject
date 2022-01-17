const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const fs = require('fs');
const path = require('path');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
const basename = path.basename(__filename);
const db = {};


// Passing parameters separately (other dialects)
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

// checking if the database is connected
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (err) {
    console.err('Unable to connect to the database:', err);
}

fs
    .readdirSync(__dirname)
    .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) & (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    }
);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// to reset the database
// db.sequelize.sync({force:true})


module.exports = db;



