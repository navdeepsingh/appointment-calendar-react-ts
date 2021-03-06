const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const moment = require("moment");

const Appointment = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      min: moment().format("YYYY-MM-DD"),
      default: moment().format("YYYY-MM-DD"),
      required: true,
      select: true,
      unique: true,
    },
  },
  {
    strict: true,
  }
);

module.exports = Mongoose.model("appointments", Appointment);
