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
        readerId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        didRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    })
  
    // create the associations
    Book.associate = (models) => {
        Book.belongsTo(models.Author, { foreignKey: 'authorId' });
        Book.belongsTo(models.Genre, { foreignKey: 'genreId' });
        Book.belongsTo(models.Reader, { foreignKey: 'readerId' });
    }


    return Book;
  }