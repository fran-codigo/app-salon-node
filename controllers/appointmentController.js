import Appointment from '../models/Appointment.js';

const createAppointment = async (req, res) => {
  const appointment = req.body;
  appointment.user = req.user._id.toString();
  console.log(appointment);

  try {
    const newAppointment = new Appointment(appointment);
    await newAppointment.save();

    res.json({
      msg: 'Tu Reservación se realizó de forma correcta',
    });
  } catch (error) {
    console.log(error);
  }
};

export { createAppointment };
