const yaml = require('js-yaml');

const newCfnTag = (tagName, keyName, kind) => new yaml.Type(tagName, {
  kind,
  construct: (data) => ({ [keyName]: data }),
  predicate: (obj) => {
    if (Object.prototype.toString.call(obj) !== '[object Object]') return false;
    if (Object.keys(obj).length !== 1) return false;
    if (Object.keys(obj)[0] !== keyName) return false;
    return true
  },
  represent: (object) => object[keyName],
});

const tags = [];
[
  { kind: 'scalar', name: 'Base64' },
  { kind: 'scalar', name: 'GetAtt' },
  { kind: 'scalar', name: 'GetAZs' },
  { kind: 'scalar', name: 'ImportValue' },
  { kind: 'scalar', name: 'Sub' },
  { kind: 'sequence', name: 'And' },
  { kind: 'sequence', name: 'Equals' },
  { kind: 'sequence', name: 'FindInMap' },
  { kind: 'sequence', name: 'GetAtt' },
  { kind: 'sequence', name: 'If' },
  { kind: 'sequence', name: 'Join' },
  { kind: 'sequence', name: 'Not' },
  { kind: 'sequence', name: 'Or' },
  { kind: 'sequence', name: 'Select' },
  { kind: 'sequence', name: 'Split' },
  { kind: 'sequence', name: 'Sub' },
].forEach((obj) => {
  tags.push(newCfnTag(`!${ obj.name }`, `Fn::${ obj.name }`, obj.kind));
  if (obj.kind === 'scalar') tags.push(newCfnTag(`!${ obj.name }`, `Fn::${ obj.name }`, 'mapping'))
});

// !Ref だけ特別
tags.push(newCfnTag(`!Ref`, `Ref`, 'scalar'));

tags.push(newCfnTag(`!Condition`, `Condition`, 'scalar'));


module.exports = tags;
