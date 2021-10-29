const mongoose = require("mongoose");
const configs = require("./configs");

class Database {
  constructor(config, mongo) {
    this._config = config;
    this._mongo = mongo;
  }

  dbConnection() {
    const {
      mongodb: { url, port, collection, password, username },
    } = this._config;
    const mongoURL =
      username && password
        ? `mongodb://${username}:${password}${url}:${port}/${collection}`
        : `mongodb://${url}:${port}/${collection}`;
    this._mongo.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = this._mongo.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("connected");
    });
    return mongoose;
  }

  get mongo() {
    return this._mongo;
  }

  get config() {
    return this._config;
  }
}

module.exports = Object.freeze(new Database(configs, mongoose));