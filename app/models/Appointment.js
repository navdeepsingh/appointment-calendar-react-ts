const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const moment = require("moment");

const Appointment = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      min: moment().format("YYYY-MM-DD"),
      default: moment().format("YYYY-MM-DD"),
      required: true,
      select: true,
    },
  },
  {
    strict: false,
  }
);

module.exports = Mongoose.model("appointments", Appointment);
