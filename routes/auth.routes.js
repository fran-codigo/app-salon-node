import express from 'express';
import {
  login,
  register,
  verifyAccount,
} from '../controllers/authController.js';

const router = express.Router();

// Rutas de autenticación y registro de usuarios

router.post('/register', register);
router.get('/verify/:token', verifyAccount);
router.post('/login', login);

export default router;
