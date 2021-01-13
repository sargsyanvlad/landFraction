const PropertyService = require('../../services/Property/PropertyService');
// const InvitationService = require('../../services/Invitation/InvitationService');
const Mailer = require('../../modules/mailer');
const { ResourceNotFoundError, RequiredParameterNotProvided } = require('../../modules/exceptions');
const { PROPERTY_NOT_FOUND, REQUIRED_MINIMUM_ONE_UNIT } = require('../../utils/errorDetails');
const {
  EMAIL_TEMPLATES: { TENANT_INVITATION_TO_UNIT: { FROM } }
} = require('../../public/constants');

/**
 * Class PropertyController
 */
class PropertyController {
  /**
 * static function create
 *  call addNewProperty service function for the landLord, which creates property and multiple units
 * @param {String} name - property's name
 * @param {String} image - property's image
 * @param {String} address - property's address
 * @param {Array<unitBaseSchema>} units - units array , minimum 1 unit
 * @param {Sequelize.Model} user - user, for ex. for whom this function should create property
 * @returns {Promise<Any>} - Promise
 */
  static async create({
    name, image, address, user, units
  }) {
    if (!units.length) throw new RequiredParameterNotProvided({ message: REQUIRED_MINIMUM_ONE_UNIT });

    const property = await PropertyService.addNewProperty({
      name, image, address, landLord: user.landLord, units
    });

    return property;
  }


  /**
 * static function check Existance by address
 * @param {String} address - property's address
 * @param {Email} tenantEmail - tenant's email address
 * @returns {Sequelize.Modle} - instance of sequelize model
 */
  static async checkPropertyByAddress(address, tenantEmail) {
    const property = await PropertyService.getPropertyByAddress(address);
    if (!property) throw new ResourceNotFoundError({ message: PROPERTY_NOT_FOUND });
    const landLord = await property.getLandLord();
    const user = await landLord.getUser();
    const { firstName, lastName } = user;
    // const invitation = await InvitationService.getInvitation(inviter, type, meta);
    // if not exists create new
    // send email

    await Mailer.sendEmail({
      from: FROM,
      to: user.email,
      subject: 'Invite Tenant to property',
      template: 'demo',
      params: {
        firstName,
        lastName,
        email: tenantEmail,
        address
      }
    });

    return property.dataValues;
  }

  /**
 * static function check Existance by address
 * @param {Object} user - user
 * @returns {Sequelize.Modle} - instance of sequelize model
 */
  static async getPropertiesForCurrentUser({ user }) {
    const properties = await PropertyService.getPropertiesByLandlordId(user.landLord.id);
    return properties;
  }
}

module.exports = PropertyController;
