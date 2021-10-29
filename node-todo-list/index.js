const router = require("./route");
const DBConnect = require("./dbConfigs");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

DBConnect.dbConnection();

const routes = Object.values(router);
app.use("/api", routes);

app.listen(port, () => console.log(`Listening on port ${port}...`));