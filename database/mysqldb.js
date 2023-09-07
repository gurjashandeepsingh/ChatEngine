const { Sequelize } = require("sequelize")

var instance
class MySQL {
  getInstance() {
    if (instance) return instance
  }
  /**
   * @description - The connection options for the database.Can be DbOptions or a connection url
   */
  options
  async initInstance(options) {
    this.options = options
    if (instance) return
    if (typeof options === "string") {
      instance = new Sequelize(options, {
        dialectOptions: {
          decimalNumbers: true
        },
        logging: (msg) => {
          console.log(msg)
        },
        pool: {
          max: 5,
          min: 1
        }
      })
      return
    }
    instance = new Sequelize(options.database, options.username, options.password, {
      host: options.host,
      dialect: "mysql",
      dialectOptions: {
        decimalNumbers: true
      },
      logging: (data, msg) => {
        console.log(msg, data)
      },
      pool: {
        max: options.poolLimit || 5,
        min: 1
      }
    })
  }
  async refresh() {
    if (!instance || !this.options) {
      throw new UnitializedOptionsError("Options for Database have not been initialized")
    }
    await instance.close()

    this.initInstance(this.options)
  }
  async performTransaction(transaction) {
    if (!instance || !this.options) {
      throw new UnitializedOptionsError("Options for Database have not been initialized")
    }
    let trn = await instance.transaction()
    try {
      let result = await transaction(trn)
      trn.commit()
      return result
    } catch (error) {
      trn.rollback()
      throw error
    }
  }
}

class UnitializedOptionsError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = {UnitializedOptionsError, MySQL}