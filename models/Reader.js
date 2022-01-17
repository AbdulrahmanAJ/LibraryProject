module.exports = (sequelize, DataTypes) => {
    const Reader = sequelize.define("Reader", {
        readerId : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        readerName : {
            type: DataTypes.STRING
        }
    })


    return Reader
  }