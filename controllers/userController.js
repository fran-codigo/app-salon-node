import Appointment from '../models/Appointment.js';

const getUserAppointments = async (req, res) => {
  const { user } = req.params;

  if (user !== req.user._id.toString()) {
    const error = new Error('Acceso denegado');
    return res.status(400).json({ msg: error.message });
  }
  try {
    const appointments = await Appointment.find({
      user,
      date: { $gte: new Date() },
    }).populate('services');
    res.json(appointments);
  } catch (error) {
    console.log(error);
  }
};

export { getUserAppointments };
