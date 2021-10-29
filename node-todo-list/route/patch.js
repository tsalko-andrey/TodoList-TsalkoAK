function path(url) {
    const allRoutes = {
      "/task": {
        methods: ["POST", "GET", "PUT", "DELETE"],
      },
      "/messageLongPolling": {
        methods: ["GET"],
      },
      "/swapTask": {
        methods: ["PUT"],
      },
    };
    return allRoutes[url];
  }
  
  module.exports = path;