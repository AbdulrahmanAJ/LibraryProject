module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define("Author", {
        authorId : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        authorName : {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        }
    }) 
  
    // Assosiating the author with the books
    Author.associate = (models) => {
        Author.hasMany(models.Book, {
            foreignKey: 'authorId'
        });
        Author.belongsTo(models.User, { foreignKey: 'userId', allowNull: false });
    }
    


    return Author
  }