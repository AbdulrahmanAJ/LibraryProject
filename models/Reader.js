module.exports = (sequelize, DataTypes) => {
    const Reader = sequelize.define("Reader", {
        readerId : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        readerName : {
            type: DataTypes.STRING
        }
    })

    // Assosiating the author with the books
    Reader.associate = (models) => {
        Reader.hasMany(models.Book, {
            foreignKey: 'readerId'
          });
    }
    
    return Reader
  }