const {MySQL} = require("../database/mysqldb.js")
const dotenv = require("dotenv")
dotenv.config({
  silent: true
})

const centralDatabase = new MySQL()

const databaseInitOptions = {
  database: process.env.DB_NAME || "",
  host: process.env.DB_HOST || "",
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || ""
}

centralDatabase.initInstance(databaseInitOptions)
module.exports = { centralDatabase, databaseInitOptions }

