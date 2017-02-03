/* eslint-disable no-console */

const fs = require('fs');
const yaml = require('js-yaml');
const schema = require('../index');

fs.readFile(__dirname + '/cfn_template.yml', 'utf8', function (error, data) {
  if (error) {
    console.error(error.stack || error.message || String(error));
    return;
  }

  const loaded = yaml.load(data, { schema });
  console.log(yaml.dump(loaded, { schema }));
});
