module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define("Author", {
        authorId : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        authorName : {
            type: DataTypes.STRING
        }
    }) 
  
    // Class Method
    Author.associate = (models) => {
        Author.hasMany(models.Book, {
            foreignKey: 'authorId'
          });
    }


    return Author
  }