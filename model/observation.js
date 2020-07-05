const mongoose = require("mongoose");
const Joi = require("joi");

const observationSchema = new mongoose.Schema({
  species: { type: String },
  rarity: { type: String },
  notes: { type: String },
  publishedDate: { type: Date, default: new Date() },
  picture: { type: String },
  GPSLatitude: { type: Number },
  GPSLongitude: { type: Number },
  DateTimeOriginal: { type: Number }
});
const Observation = mongoose.model("Observation", observationSchema);

const createObservationValidator = payload => {
  const schema = {
    species: Joi.string().required(),
    rarity: Joi.string()
      .valid("common", "rare", "extremely rare")
      .required(),
    notes: Joi.string().required(),
    picture: Joi.string().required(),
    GPSLatitude: Joi.number(),
    GPSLongitude: Joi.number(),
    DateTimeOriginal: Joi.number()
  };
  return Joi.validate(payload, schema);
};

const updateObservationValidator = payload => {
  const schema = {
    species: Joi.string(),
    rarity: Joi.string().valid("common", "rare", "extremely rare"),
    notes: Joi.string(),
    date: Joi.date().iso(),
    picture: Joi.string(),
    GPSLatitude: Joi.number(),
    GPSLongitude: Joi.number(),
    DateTimeOriginal: Joi.number()
  };
  return Joi.validate(payload, schema);
};
module.exports = {
  Observation,
  createObservationValidator,
  updateObservationValidator
};
