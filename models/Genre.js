module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define("Genre", {
        genreId : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        genreName : {
            type: DataTypes.STRING
        }
    })

    return Genre
  }