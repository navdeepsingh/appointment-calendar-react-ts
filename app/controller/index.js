const Appointment = require("../models/Appointment");

const getApiStatus = (req, res, next) => {
  return res.status(200).send("API Working");
};

const getAppointments = (req, res, next) => {
  Appointment.find({})
    .then((appointments) => {
      if (appointments !== null) {
        res.status(200).send(appointments);
      } else {
        res.status(401).send({ message: "No Appointment exists" });
      }
    })
    .catch((err) => res.status(401).send({ message: err }));
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
          console.log(err);
          res.status(401).send({ message: err.message });
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
  })
    .then((appointment) => {
      if (appointment != null) {
        res.status(200).send(appointment);
      } else {
        res.status(401).send({ message: "Appointment not updated" });
      }
    })
    .catch((err) =>
      res.status(401).send({ message: `Update failed with error: ${err}` })
    );
};

const deleteAppointment = (req, res, next) => {
  const entityToBeDeleted = {
    _id: req.body._id,
  };
  Appointment.deleteOne(entityToBeDeleted)
    .then((result) =>
      res.status(200).send({ message: `Deleted ${result.deletedCount} item` })
    )
    .catch((err) =>
      res.status(401).send({ message: `Delete failed with error: ${err}` })
    );
};

module.exports = {
  getApiStatus: getApiStatus,
  getAppointments: getAppointments,
  addAppointment: addAppointment,
  updateAppointment: updateAppointment,
  deleteAppointment: deleteAppointment,
};
