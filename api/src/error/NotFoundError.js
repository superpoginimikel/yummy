class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.error = 'ERROR';
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = { NotFoundError };
