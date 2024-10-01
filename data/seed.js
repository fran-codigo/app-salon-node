import dotenv from 'dotenv';
import colors from 'colors';
import { db } from '../config/db.js';
import Service from '../models/Service.js';
import { services } from './beautyServices.js';

dotenv.config();

await db();

async function seedDB() {
  try {
    await Service.insertMany(services);
    console.log(colors.green.bold('Se agregaron los datos correctamente'));
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

async function clearDB() {
  try {
    await Service.deleteMany();
    console.log(colors.red.bold('Se eliminaron los datos correctamente'));
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

if (process.argv[2] === '--import') {
  seedDB();
} else {
  clearDB();
}
