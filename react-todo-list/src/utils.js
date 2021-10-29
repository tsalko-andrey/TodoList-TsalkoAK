class Api {
    constructor(host) {
      this.host = host;
    }
  
    getRoute(routeName) {
      return `${this.host}/api/${routeName}`;
    }
  }
  
  const apiRoute = Object.freeze(new Api("http://localhost:8080"));
  
  export { apiRoute };
  