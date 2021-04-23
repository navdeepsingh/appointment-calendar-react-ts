const Appointment = require("../models/Appointment");

const getApiStatus = (req, res, next) => {
  return res.status(200).send("API Working");
};

const getAppointments = (req, res, next) => {
  Appointment.find({}).then((appointments) => {
    if (appointments !== null) {
      res.status(200).send(appointments);
    } else {
      res.status(401).send({ message: "No Appointment exists" });
    }
  });
};

const addAppointment = (req, res, next) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
  };
  Appointment.findOne({ date: data.date }).then((appointment) => {
    if (appointment != null) {
      // If already exists
      res.status(401).send({ message: "Appointment already exists." });
    } else {
      // Create new appointment
      new Appointment(data)
        .save()
        .then((appointment) => {
          res.status(200).send(appointment);
        })
        .catch((err) => {
          res.status(401).send({ message: err });
        });
    }
  });
};

const updateAppointment = (req, res, next) => {
  const dataToBeUpdated = {
    title: req.body.title,
    description: req.body.description,
  };
  Appointment.findOneAndUpdate({ _id: req.body._id }, dataToBeUpdated, {
    new: true,
  }).then((appointment) => {
    if (appointment != null) {
      res.status(200).send(appointment);
    } else {
      res.status(401).send("Appointment not found");
    }
  });
};

const deleteAppointment = (req, res, next) => {
  return res.status(200).send(JSON.stringify({ id: 1, title: "Appoint 1" }));
};

module.exports = {
  getApiStatus: getApiStatus,
  getAppointments: getAppointments,
  addAppointment: addAppointment,
  updateAppointment: updateAppointment,
  deleteAppointment: deleteAppointment,
};
