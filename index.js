const yaml = require('js-yaml');
const tags = require('./lib/cfn-tags');

module.exports = yaml.Schema.create(tags);
