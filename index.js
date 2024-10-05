import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import { db } from './config/db.js';
import servicesRoutes from './routes/services.routes.js';
import authRoutes from './routes/auth.routes.js';
import appointmentRoutes from './routes/auth.routes.js';

// Variables de entorno
dotenv.config();

// Configurar la app
const server = express();

// Leer datos via body
server.use(express.json());

// Conectar a base de datos
db();

// Configurar Cors
// TODO: Quitar undefined en producción
const whiteList = [process.env.FRONTEND_URL, undefined];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      // Permite la conexion
      callback(null, true);
    } else {
      // No permite la conexion
      callback(new Error('Error de cors'));
    }
  },
};

server.use(cors(corsOptions));

// Definir una ruta
server.use('/api/services', servicesRoutes);
server.use('/api/auth', authRoutes);
server.use('/api/appointments', appointmentRoutes);

// Definir puerto
const PORT = process.env.PORT || 4000;

// Arrancar la app
server.listen(PORT, () => {
  console.log(
    colors.blue(
      'El servidor se esta ejecuntando em el puesrto: ',
      colors.red.bold(PORT)
    )
  );
});

console.log(process.env.MONGO_URI);
