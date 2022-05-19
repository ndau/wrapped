class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const StatusCode = {
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  DUPLICATE_EMAIL: 'DUPLICATE_EMAIL',
  DUPLICATE_VALUE: 'DUPLICATE_VALUE',
  UNAUTHORIZED: 'UNAUTHORIZED',
  TOKEN_EXPIRE: 'TOKEN_EXPIRE',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  ID_NOT_FOUND: 'ID_NOT_FOUND',
};

module.exports = ErrorResponse;
module.exports.StatusCode = StatusCode;
