const dotenv = require("dotenv")
dotenv.config()
const userModel  = require("./userModel.js")
const { chatModel } = require("./chatModel.js")
const { ChatUserMapModel } = require("./chatUserMapModel.js")
const { MessageModel } = require("./messageModel.js")
const sequelize = require("sequelize");
const readByModel = require("./readByModel.js")

async function initDatabase(db, dbOptions) {
  await db.initInstance(dbOptions)
  console.log(userModel)

  await Promise.all([
    userModel.sync(),
    chatModel.sync(),
    ChatUserMapModel.sync(),
    messageModel.sync(),
    readByModel.sync()
  ])

  // await userModel.sync()
  // console.log("User model initialized")

  // await ChatModel.sync()
  // console.log("ChatModel initiated sucessfully.")

  // await ChatUserMapModel.sync()
  // console.log("ChatUserMapModel Initialized")

  // await MessageModel.sync()
  // console.log("MessageModel Initialized")

//   StudioImageLinksModel.belongsTo(StudioModel, {
//     as: "images",
//     foreignKey: "sid"
//   })

//   await StudioEquipmentModel.sync()
//   console.log("Studio Equipment Model generated sucessfully")
//   StudioEquipmentModel.belongsTo(StudioModel, {
//     as: "equipment",
//     foreignKey: "sid"
//   })

//   await StudioModel.sync()
//   console.log("Studio Model has been initialized")

//   StudioModel.hasMany(StudioImageLinksModel, {
//     sourceKey: "id",
//     foreignKey: "sid",
//     as: "images"
//   })
//   StudioModel.hasOne(StudioEquipmentModel, {
//     sourceKey: "id",
//     foreignKey: "sid",
//     as: "equipment"
//   })

//   await StudioPaymentModel.sync({ alter: { drop: false } })
//   console.log("Studio Payments Model Initiated")

//   /** Initialize the model to store the stuido orders */
//   await StudioOrderModel.sync({ alter: { drop: false } })
//   console.log("Studio Order model initiated sucessfully")
//   /** Add the foreign key constraint */

//   StudioOrderModel.hasOne(StudioPaymentModel, {
//     sourceKey: "paymentid",
//     foreignKey: "id"
//   })

//   /** Initialize the studio order file model */
//   await StudioOrderFileModel.sync({
//     alter: {
//       drop: false
//     }
//   })
//   console.log("Studio file order model initiated")

//   /** Initialize the discount coupons model */
//   await CouponsModel.sync({ alter: { drop: false } })
//   console.log("Discount Coupon model initiated sucessfully")

//   await StudioPackageModel.sync({ alter: { drop: false } })
//   console.log("Package model initiated sucessfully.")

//   /** Initialize the slot booking model */
//   await BookingSlotModel.sync({ alter: { drop: false } })
//   console.log("Booking slot model initiated sucessfully")
//   BookingSlotModel.removeAttribute("id")

//   /** Initialize the slot booking model */
//   await StudioPackageModel.sync({ alter: { drop: false } })
//   console.log("Packages model initiated sucessfully")

//   /** Initialize the studio engineer model */
//   await StudioEngineerModel.sync({ alter: { drop: false } })
//   console.log("StudioEngineer model initiated sucessfully")

//   /** Initialize the EnginerServices model */
//   await EngineerServicesModel.sync({ alter: { drop: false } })
//   console.log("EngineerServices model initiated sucessfully")

//   EngineerServicesModel.hasOne(StudioEngineerModel, {
//     sourceKey: "engineer_id",
//     foreignKey: "id"
//   })

//   /** Initialize the Genres model */
//   await GenresModel.sync({ alter: { drop: false } })
//   console.log("Genres model initiated sucessfully")

//   /** Initialize the SidGenres model */
//   await SidGenresModel.sync({ alter: { drop: false } })
//   console.log("SidGenres model initiated sucessfully")

//   SidGenresModel.hasOne(StudioEngineerModel, {
//     sourceKey: "engineer_id",
//     foreignKey: "id"
//   })
//   SidGenresModel.hasOne(GenresModel, {
//     sourceKey: "gid",
//     foreignKey: "id"
//   })

//   /** Initialize the Stems model */
//   await StemsModel.sync({ alter: { drop: false } })
//   console.log("Stems model initiated sucessfully")
//   StemsModel.hasOne(StudioEngineerModel, {
//     sourceKey: "engineer_id",
//     foreignKey: "id"
//   })
//   /** Initialize the discount coupons model */
//   await CouponsMixMasModel.sync({ alter: { drop: false } })
//   console.log("Mix Mas Discount Coupon model initiated sucessfully")
//   /** Initialize the model to store the stuido orders */
//   await StudioEngineerOrderModel.sync({ alter: { drop: false } })
//   console.log("Studio Engineer Order model initiated sucessfully")
//   /** Add the foreign key constraint */

//   StudioEngineerOrderModel.hasOne(StudioPaymentModel, {
//     sourceKey: "paymentid",
//     foreignKey: "id"
//   })
//   StudioEngineerOrderModel.hasOne(GenresModel, {
//     sourceKey: "genre_id",
//     foreignKey: "id"
//   })
}

module.exports = {initDatabase}
