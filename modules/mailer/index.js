
const ejs = require('ejs');
const sendGrid = require('@sendgrid/mail');

const { mailerConfig } = require('../../config');

sendGrid.setApiKey(mailerConfig.SENDGRID_API_KEY);

class Mailer {
  static async sendMultipleEmail(options) {
    const result = [];
    for (let i = 0; i < options.length; i++) {
      const data = await Mailer.sendEmail(options[i]);
      result.push(data);
    }
    return result;
  }

  static async sendEmail({
    from, to, subject, template, params
  }) {
    const options = {
      from,
      to,
      subject,
      html: await ejs.renderFile(`${__dirname}/../../public/templates/${template}.ejs`, { params })
    };

    return sendGrid.send(options, false);
  }
}

module.exports = Mailer;
