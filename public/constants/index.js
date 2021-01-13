module.exports = {
  EMAIL_TEMPLATES: {
    ADD_TENANT_REMINDER: {
      TEMPLATE: 'add_tenant_reminder',
      SUBJECT: 'ADD TENANT REMINDER',
      FROM: 'dev@brainstormtech.io',
      CONTENT_SCHEMA: ['reciever', 'sender', 'address']
    },
    ADD_PROPERTY_SUGGESTION: {
      TEMPLATE: 'add_property_suggestion',
      FROM: 'dev@brainstormtech.io',
      SUBJECT: 'SUGGESTION TO ADD YOUR BUILDING',
      CONTENT_SCHEMA: ['reciever', 'sender', 'address']
    },
    TENANT_INVITATION_TO_UNIT: {
      TEMPLATE: 'invite_tenant_to_unit',
      FROM: 'dev@brainstormtech.io',
      SUBJECT: 'INVITATION FROM ONE FRACTION',
      CONTENT_SCHEMA: ['fullName', 'address', 'reciever', 'token']
    }
  }
};
