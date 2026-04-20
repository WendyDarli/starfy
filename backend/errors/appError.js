class AppError extends Error {
  constructor(message, statusCode, code, details = null) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

class ValidationError extends AppError {
  constructor(message = 'Invalid or malformed data', details = null) {
    super(message, 400, 'Bad Request', details);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

class RateLimitError extends AppError {
  constructor(message= 'Too many requests') {
    super(message, 429, 'RATE_LIMIT');
  }
}

class InternalServerError extends AppError {
  constructor(message = 'Something went wrong') {
    super(message, 500, 'INTERNAL_ERROR');
  }
}

class ExternalServiceError extends AppError {
  constructor(message = 'External service is currently unavailable') {
    super(message, 502, 'EXTERNAL_ERROR');
  }
}

class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409, 'DUPLICATE_ENTRY');
  }
}


module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  RateLimitError,
  InternalServerError,
  ExternalServiceError,
  ConflictError,
};