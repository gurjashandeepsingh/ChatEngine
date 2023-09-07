// User Model will contain these fields 
// Name 
// Email 
// Password
// Pic 


module.exports = (sequelize, DataTypes) => {

    const userModel = sequelize.define("User", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.INTEGER
        },
        pic: {
            type: DataTypes.TEXT
        },
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    }, {
        timestamps: true
      })

    return userModel

}