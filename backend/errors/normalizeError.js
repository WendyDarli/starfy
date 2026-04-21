const {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  RateLimitError,
  InternalServerError,
  ExternalServiceError,
  ConflictError,
} = require('../errors/appError');

const errorMap = {
  400: ValidationError,
  401: UnauthorizedError,
  403: ForbiddenError,
  404: NotFoundError,
  409: ConflictError,
  429: RateLimitError,
  500: InternalServerError,
  502: ExternalServiceError,
};

const normalizeError = (err) => {
    const status = err.response?.status;
    const ErrorClass  = errorMap[status] || ExternalServiceError;

    return new ErrorClass();
}

module.exports = normalizeError;