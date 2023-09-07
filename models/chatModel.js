// Chat Model will contain these fields 
// chatName 
// isGroupChat 
// latestMessage 
// groupAdmin 


module.exports = (sequelize, DataTypes) => {

    const chatModel = sequelize.define("Chat", {
        chatName: {
            type: DataTypes.STRING
        },
        isGroupChat: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        groupAdmin: {
            type: DataTypes.BOOLEAN
        },
        latestMessage: {
            type: defaultValue.STRING,
        },
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    
    }
    , {
        timestamps: true
      })

    return chatModel

}