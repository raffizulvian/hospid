import AppError from '../appError';

describe('AppError', () => {
  const errorData = [
    [
      { code: 400, message: 'Bad Request' },
      { code: 401, message: 'Unauthorized' },
      { code: 403, message: 'Forbidden' },
      { code: 404, message: 'Not Found' },
      { code: 405, message: 'Method Not Allowed' },
      { code: 500, message: 'Internal Server Error' },
      { code: 502, message: 'Bad Gateway' },
    ],
  ];

  it.each(errorData)('should produce correct error code and message', (input) => {
    const Error = new AppError(input.message, input.code);

    expect(Error.code).toBe(input.code);
    expect(Error.message).toBe(input.message);
  });

  it('should produce status code 400', () => {
    const Error = AppError.BadRequest();

    expect(Error.code).toBe(400);
    expect(Error.message).toBe('Bad Request');
  });

  it('should produce status code 401', () => {
    const Error = AppError.Unauthorized();

    expect(Error.code).toBe(401);
    expect(Error.message).toBe('Unauthorized');
  });

  it('should produce status code 403', () => {
    const Error = AppError.Forbidden();

    expect(Error.code).toBe(403);
    expect(Error.message).toBe('Forbidden');
  });

  it('should produce status code 404', () => {
    const Error = AppError.NotFound();

    expect(Error.code).toBe(404);
    expect(Error.message).toBe('Not Found');
  });

  it('should produce status code 405', () => {
    const Error = AppError.MethodNotAllowed();

    expect(Error.code).toBe(405);
    expect(Error.message).toBe('Method Not Allowed');
  });

  it('should produce status code 500', () => {
    const Error = AppError.InternalServerError();

    expect(Error.code).toBe(500);
    expect(Error.message).toBe('Internal Server Error');
  });

  it('should produce status code 502', () => {
    const Error = AppError.BadGateway();

    expect(Error.code).toBe(502);
    expect(Error.message).toBe('Bad Gateway');
  });
});
