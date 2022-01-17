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
  
    // Class Method
    // Model1.associate = function (models) {
    //   Model1.belongsTo(models.Model2)
    // }
    return Book;
  }