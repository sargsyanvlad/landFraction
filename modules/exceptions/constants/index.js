
const SEQUELIZE_ERRORS = {
  SequelizeValidationError: true,
  SequelizeUniqueConstraintError: true,
  SequelizeCheckConstraintError: true,
  SequelizeForeignKeyConstraintError: true,
  SequelizeDatabaseError: true
};
const JWT_ERRORS = {
  JsonWebTokenError: true,
  TokenExpiredError: true
};

const BASE_ERRORS = {
  INTERNAL_SERVER_ERROR: { status: 500, statusName: 'internalServerError', debug: 'INTERNAL_SERVER_ERROR' },
  AUTHENTICATION_ERROR: { status: 401, statusName: 'unauthorized', debug: 'AUTHENTICATION_ERROR' },
  INVALID_USER_CREDENTIALS: { status: 400, statusName: 'badRequest', debug: 'INVALID_USER_CREDENTIALS' },
  INVALID_USER_INPUT: { status: 400, statusName: 'badRequest', debug: 'INVALID_USER_INPUT' },
  REQUIRED_PARAMETER_NOT_PROVIDED: { status: 400, statusName: 'badRequest', debug: 'REQUIRED_PARAMETER_NOT_PROVIDED' },
  RESOURCE_NOT_FOUND_ERROR: { status: 404, statusName: 'notFound', debug: 'RESOURCE_NOT_FOUND_ERROR' },
  ACCESS_DENIED_ERROR: { status: 403, statusName: 'forbidden', debug: 'ACCESS_DENIED_ERROR' },
  SOMETHING_WENT_WRONG: { status: 409, statusName: 'forbidden', debug: 'SOMETHING_WENT_WRONG' },
  RESOURCE_DUPLICATION_ERROR: { status: 400, statusName: 'badRequest', badRequest: 'RESOURCE_DUPLICATION_ERROR' },
  SERVICE_NOT_AVAILABLE: { status: 503, statusName: 'serviceNotAvailable', debug: 'SERVICE_NOT_AVAILABLE' },
  UNAVAILABLE_FOR_LEGAL_REASONS: { status: 451, statusName: 'unavailableForLegalReasons', debug: 'UNAVAILABLE_FOR_LEGAL_REASONS' },
  BAD_REQUEST: { status: 400, statusName: 'badRequest', debug: 'BAD_REQUEST' }
};

module.exports = {
  SEQUELIZE_ERRORS,
  BASE_ERRORS,
  JWT_ERRORS
};
