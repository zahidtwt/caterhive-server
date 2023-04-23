const { Schema, model } = require('mongoose');

const areaSchema = new Schema({
  city: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  name: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
});

const areas = model('Area', areaSchema);

module.exports = areas;
