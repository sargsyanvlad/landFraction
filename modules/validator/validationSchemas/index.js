exports.signUpSchema = {
  email: { type: 'email', optional: false, empty: false },
  firstName: { type: 'string', optional: false, empty: false },
  lastName: { type: 'string', optional: false, empty: false },
  password: {
    type: 'string', optional: false, empty: false, pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'
  }
};

const propertyBaseSchema = {
  name: { type: 'string', optional: false, empty: false },
  address: { type: 'string', optional: false, empty: false },
  image: { type: 'string', optional: false, empty: true }
};

exports.propertyBaseSchema = propertyBaseSchema;

exports.propertyEditableSchema = {
  name: {
    type: 'string',
    optional: true,
    empty: false,
    min: 3
  },
  address: {
    type: 'string',
    optional: true,
    empty: false,
    min: 3
  },
  image: { type: 'string', optional: true, empty: true }
};

exports.suggestionToAddPropertyRequestSchema = {
  reciever: { type: 'string', optional: false, empty: false },
  address: { type: 'string', optional: false, empty: false },
  sender: { type: 'string', optional: false, empty: false }
};

exports.idSchema = {
  id: {
    type: 'string',
    optional: false,
    empty: false
  }
};

const unitBaseSchema = {
  name: { type: 'string', optional: false, empty: false },
  bathrooms: { type: 'number', optional: false, empty: false },
  bedrooms: { type: 'number', optional: false, empty: false },
  area: { type: 'number', optional: false, empty: false }
};

exports.unitBaseSchema = unitBaseSchema;

exports.addUnitsRequestBodySchema = {
  propertyId: { type: 'string', optional: false, empty: false },
  units: {
    type: 'array',
    items: {
      type: 'object', props: unitBaseSchema
    }
  }
};

exports.upsertUnitsRequestBodySchema = {
  propertyId: { type: 'string', optional: false, empty: false },
  added_units: {
    type: 'array',
    items: {
      type: 'object', props: unitBaseSchema
    }
  },
  updated_units: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        id: { type: 'string', optional: false, empty: false },
        ...unitBaseSchema
      }
    }
  }
};

exports.updateUnitRequestSchema = {
  name: { type: 'string', optional: true, empty: false },
  bathrooms: { type: 'number', optional: true, empty: false },
  bedrooms: { type: 'number', optional: true, empty: false },
  area: { type: 'number', optional: true, empty: false }
};

exports.leaseBaseSchema = {
  endDate: { type: 'string', optional: true, empty: true },
  startDate: { type: 'string', optional: false, empty: false },
  monthlyRent: { type: 'number', optional: false, empty: false },
  deposit: { type: 'number', optional: false, empty: false }
};

exports.leaseUpdateSchema = {
  endDate: { type: 'string', optional: true, empty: false },
  startDate: { type: 'string', optional: true, empty: false },
  monthlyRent: { type: 'number', optional: true, empty: false },
  deposit: { type: 'number', optional: true, empty: false }
};

exports.tenantInvitationSchema = {
  email: {
    type: 'string', optional: true, min: 7, empty: false
  },
  fullName: {
    type: 'string', optional: true, min: 3, empty: false
  }
};

exports.onBoardSchema = {
  phone: {
    type: 'string', optional: false, empty: false
  },
  dob: {
    type: 'string', optional: false, empty: false
  },
  categories: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        name: { type: 'string', optional: false, empty: false }
      }
    }
  }
};

exports.propertyAddRequestBodySchema = {
  ...propertyBaseSchema,
  units: {
    type: 'array',
    items: {
      type: 'object', props: unitBaseSchema
    }
  }
};
