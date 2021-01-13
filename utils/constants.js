
const STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};
const HTTP_STATUS_METHODS = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  unavailableForLegalReasons: 451,
  internalServerError: 500,
  serviceNotAvailable: 503
};

const PAGINATION = {
  LIMIT: 50,
  OFFSET: 0,
  ASC: 'ASC',
  DESC: 'DESC'
};

const USER_ROLES = {
  LANDLORD: 'LandLord',
  TENANT: 'Tenant',
  SUPERUSER: 'SuperUser'
};
const EMAIL_TYPES = {
  ADD_PROPERTY_SUGGESTION: {
    KEY: 1,
    NAME: 'ADD_PROPERTY_SUGGESTION',
    META_SCHEMA: ['address', 'senderEmail']
  },
  TENANT_INVITATION_TO_UNIT: {
    KEY: 2,
    NAME: 'TENANT_INVITATION_TO_UNIT',
    META_SCHEMA: ['fullName', 'sender', 'address', 'resiever']
  }
};

const INVITATION_TYPES = {
  TENANT_INVITATION_TO_UNIT: {
    KEY: 1,
    NAME: 'TENANT_INVITATION_TO_UNIT',
    META_SCHEMA: ['fullName', 'email', 'address', 'unitId']
  }
};

const TOKEN_TYPES = {
  ACTIVATION: 1,
  REQUEST_TO_TENANT_ACCESS_IN: 2
};

const NOTIFICATION_TYPES = {
  PUSH: 1,
  EMAIL: 2
};

const INVITATION_STATUSES = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  CANCELED: 'canceled'
};


module.exports = {
  NOTIFICATION_TYPES,
  HTTP_STATUS_METHODS,
  INVITATION_STATUSES,
  INVITATION_TYPES,
  EMAIL_TYPES,
  TOKEN_TYPES,
  PAGINATION,
  USER_ROLES,
  STATUSES
};
