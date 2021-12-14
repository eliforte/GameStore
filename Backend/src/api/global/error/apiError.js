class ApiError extends Error {
  constructor(message, status) {
    this.message = message;
    this.status = status; 
  }

  static NewError(err) {
    const { status, message } = err;
    throw new ApiError(message, status);
  }
};

module.exports = { ApiError };
