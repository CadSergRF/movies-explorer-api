const { FORBIDDEN_CODE } = require('../utils/errorCode.constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_CODE;
  }
}
module.exports = ForbiddenError;
