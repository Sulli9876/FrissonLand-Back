class HTTPError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.name = 'HTTPError';
    }
  }
  
  export default HTTPError;
  