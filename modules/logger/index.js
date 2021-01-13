
const winston = require('winston');
const ElasticsearchWinston = require('winston-elasticsearch');
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'http://34.233.98.82:9200',
  log: [
    {
      type: 'console',
      level: 'error'
    }
  ]
});

const esTransportOpts1 = {
  level: 'info',
  indexPrefix: 'info',
  client
};

const esTransportOpts2 = {
  level: 'error',
  indexPrefix: 'error',
  client
};
export const infoLogger = winston.createLogger({
  transports: [
    new ElasticsearchWinston(esTransportOpts1)
  ]
});
export const errorLogger = winston.createLogger({
  transports: [
    new ElasticsearchWinston(esTransportOpts2)
  ]
});
