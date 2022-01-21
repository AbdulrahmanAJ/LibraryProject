module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
        bookId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        bookName: {
            type: DataTypes.STRING
        },
        authorId: {
            type: DataTypes.INTEGER
        },
        bookPages: {
            type: DataTypes.INTEGER
        },
        genreId: {
            type: DataTypes.INTEGER
        },
        bookCopy: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        loanerId: {
            type: DataTypes.INTEGER,       
        },
        didRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    })
  
    // create the associations
    Book.associate = (models) => {
        Book.belongsTo(models.Author, { foreignKey: 'authorId', allowNull: true });
        Book.belongsTo(models.Genre, { foreignKey: 'genreId' , allowNull: false});
        Book.belongsTo(models.Loaner, { foreignKey: 'loanerId', allowNull: true });
    }
    
    return Book;
  }