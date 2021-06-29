class AppError {
  constructor(message, code) {
    this.message = message;
    this.code = code;
  }

  static BadRequest() {
    return { code: 400, message: 'Bad Request' };
  }

  static Unauthorized() {
    return { code: 401, message: 'Unauthorized' };
  }

  static Forbidden() {
    return { code: 403, message: 'Forbidden' };
  }

  static NotFound() {
    return { code: 404, message: 'Not Found' };
  }

  static MethodNotAllowed() {
    return { code: 405, message: 'Method Not Allowed' };
  }

  static InternalServerError() {
    return { code: 500, message: 'Internal Server Error' };
  }

  static BadGateway() {
    return { code: 502, message: 'Bad Gateway' };
  }
}

export default AppError;
