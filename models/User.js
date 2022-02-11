module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        userId : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userName : {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
              notNull: { args: true, msg: "You must enter a user name" }
            }
        },
        userHash: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
          notNull: { args: true, msg: "You must enter a password" }
        }
      }
    })

    // Associating the user with the books
    User.associate = (models) => {
        User.hasMany(models.Book, {
            foreignKey: 'userId',
            allowNull:false //TODO:
          });
          User.hasMany(models.Genre, {
            foreignKey: 'userId',
            allowNull:false //TODO:
          });
          User.hasMany(models.Author, {
            foreignKey: 'userId',
            allowNull:false //TODO:
          });
          User.hasMany(models.Loaner, {
            foreignKey: 'userId',
            allowNull:false //TODO:
          });
    }

    return User
  }