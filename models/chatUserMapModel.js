// Chat Model will contain these fields 
// chatName 
// isGroupChat 
// users 
// latestMessage 
// groupAdmin 


module.exports = (sequelize, DataTypes) => {

    const ChatUserMapModel = sequelize.define("ChatUserMap", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED ,
            allowNull: false,
            // references: {
            //     model: "user",
            //     key: "id"
            // }
        },
        chatId: {
            type: DataTypes.INTEGER.UNSIGNED ,
            allowNull: false,
            // references: {
            //     model: "chat",
            //     key: "id"
            // }
        }
        }, {
            timestamps: true
          })
        return ChatUserMapModel
    }


