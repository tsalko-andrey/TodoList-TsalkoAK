const path = require("../route/patch");

module.exports = (req, res, next) => {
  const route = path(req.url);
  console.log(req.url);
  if (req.url.includes("/orderSort") || route.methods.includes(req.method)) {
    next();
  } else {
    const error = {
      status: 405,
      message: "Method not allowed, YET!",
    };
    res.setHeader("allow", route.methods);
    res.status(405).json(error);
  }
};