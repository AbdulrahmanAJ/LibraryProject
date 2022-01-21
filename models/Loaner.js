module.exports = (sequelize, DataTypes) => {
    const Loaner = sequelize.define("Loaner", {
        loanerId : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        loanerName : {
            type: DataTypes.STRING,
            unique: true
        }
    }) 
  
    // Assosiating the Loaner with the books
    Loaner.associate = (models) => {
        Loaner.hasMany(models.Book, {
            foreignKey: 'loanerId'
          });
    }


    return Loaner
  }