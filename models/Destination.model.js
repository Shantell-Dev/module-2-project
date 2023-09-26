

const { Schema, model } = require('mongoose');

const destionationsSchema = new Schema(
  {
    location: String,
    description: String,
    rating: Number
  },
  {
    timestamps: true
  }
);

module.exports = model('Destination', destionationsSchema);
