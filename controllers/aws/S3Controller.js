
const uuid = require('uuid');
const aws = require('aws-sdk');

const { InternalServerError } = require('../../modules/exceptions/index');
const { awsConfig } = require('../../config/index');

aws.config.setPromisesDependency(Promise);

const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  AllowedHeaders: ['Authorization'],
  AllowedMethods: [],
  AllowedOrigins: ['*'],
  accessKeyId: awsConfig.s3.accessKeyId,
  secretAccessKey: awsConfig.s3.secretAccessKey,
  region: awsConfig.s3.region,
  ACL: awsConfig.s3.ACL,
  signatureVersion: 'v4'
});
class S3Controller {
  static async getSignedUrl({ folder, extension }) {
    let path = `${awsConfig.s3.BucketFolder}`;

    if (folder) {
      path = `${path}/${folder}`;
    }

    const key = `${path}/image-${uuid.v4()}.${extension || 'jpg'}`;
    const params = {
      ACL: awsConfig.s3.ACL,
      Bucket: awsConfig.s3.Bucket,
      Key: key,
      ContentType: 'application/octet-stream'
    };

    try {
      const putUrl = await s3.getSignedUrl('putObject', params);

      return {
        data: {
          putUrl
        }
      };
    } catch (ex) {
      throw new InternalServerError();
    }
  }
}

module.exports = S3Controller;
