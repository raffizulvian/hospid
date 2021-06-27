class AppError {
  constructor(message, code) {
    this.message = message;
    this.code = code;
  }
}

module.exports = AppError;
