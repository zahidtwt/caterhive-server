function validator(schema, content) {
  return schema.validate(content);
}

module.exports = validator;
