module.exports = (sequelize, DataTypes) => {

    const readByModel = sequelize.define("ReadBy", {
        messageId: {
            type: DataTypes.STRING,
            reference: {
                model: `messageModel`,
                key: id
            }
        },
        userId: {
            type: DataTypes.STRING,
            reference: {
                model: `userModel`,
                key: id
            }
        },
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    }, {
        timestamps: true
    })

    return readByModel

}