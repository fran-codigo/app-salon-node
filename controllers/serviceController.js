import Service from '../models/Service.js';
import { handleNotFoundError, validateObjectId } from '../utils/index.js';

const createService = async (req, res) => {
  if (Object.values(req.body).includes('')) {
    const error = new Error('Todos los campos son obligatorios');
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const service = await new Service(req.body);
    await service.save();

    res.json({
      msg: 'El servicio se creo correctamente',
    });
  } catch (error) {
    console.log(error);
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.log(error);
  }
};

const getService = async (req, res) => {
  const { id } = req.params;
  // Validar un object id
  if (validateObjectId(id, res)) return;

  console.log('desde despues de validate object');

  // Validar que exista
  const service = await Service.findById(id);
  if (!service) {
    return handleNotFoundError('El servicio no existe', res);
  }

  // Mostrar el servicio
  res.json(service);
};

const updateService = async (req, res) => {
  const { id } = req.params;
  // Validar un object id
  if (validateObjectId(id, res)) return;

  // Validar que exista
  const service = await Service.findById(id);
  if (!service) {
    return handleNotFoundError('El servicio no existe', res);
  }

  // Escribimos en el objeto los valores nuevo
  service.name = req.body.name || service.name;
  service.price = req.body.price || service.price;

  try {
    await service.save();
    res.json({
      msg: 'El servicio se actualizo correctamente',
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  // Validar que exista
  const service = await Service.findById(id);
  if (!service) {
    return handleNotFoundError('El servicio no existe', res);
  }

  try {
    await Service.deleteOne();
    res.json({
      msg: 'El servicio se elimino correctamente',
    });
  } catch (error) {
    console.log(error);
  }
};

export { createService, getServices, getService, updateService, deleteService };
