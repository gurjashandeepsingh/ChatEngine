// Message Model will contain these fields
// Sender 
// Content 
// Chat 


module.exports = (sequelize, DataTypes) => {

    const messageModel = sequelize.define("Message", {
        sender: {
            type: DataTypes.STRING
        },
        reciever: {
            type: DataTypes.STRING
        },
        chatId: {
            type: DataTypes.STRING,
            references: {            
                model: Chat,
                key: 'id'
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
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

    return messageModel

}