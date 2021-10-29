const express = require("express");
const middleware = require("../middlewares");

const router = express.Router();

router.use(Object.values(middleware));

module.exports = router;