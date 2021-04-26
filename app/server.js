require("dotenv").config();
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log(`MongoDB connected`))
  .catch((err) => console.log(err));

const { app, port } = require("./config");
const handle = app.getRequestHandler();

const {
  getApiStatus,
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} = require("./controller");

app
  .prepare()
  .then(() => {
    const server = express();

    server.options("*");
    server.post("*");

    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    // API Health
    server.get("/api/status", getApiStatus);

    // Get all appointments
    server.get("/api/appointments", getAppointments);

    // Create new appointment
    server.post("/api/appointment", addAppointment);

    // Edit existing appointment
    server.put("/api/appointment", updateAppointment);

    // Delete existing appointment
    server.delete("/api/appointment", deleteAppointment);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log("> Ready on " + port);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
