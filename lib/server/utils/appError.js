class AppError {
  constructor(message, code) {
    this.message = message;
    this.code = code;
  }

  static BadRequest(m = 'Bad Request') {
    return { code: 400, message: m };
  }

  static Unauthorized(m = 'Unauthorized') {
    return { code: 401, message: m };
  }

  static Forbidden(m = 'Forbidden') {
    return { code: 403, message: m };
  }

  static NotFound(m = 'Not Found') {
    return { code: 404, message: m };
  }

  static MethodNotAllowed(m = 'Method Not Allowed') {
    return { code: 405, message: m };
  }

  static InternalServerError(m = 'Internal Server Error') {
    return { code: 500, message: m };
  }

  static BadGateway(m = 'Bad Gateway') {
    return { code: 502, message: m };
  }
}

export default AppError;
