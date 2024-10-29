import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { createTransport } from '../config/nodemailer.js';

export async function sendEmailNewAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const templatePath = path.join(
    __dirname,
    '../emails/templates',
    'emailNewAppointment.html'
  );

  let html = readFileSync(templatePath, 'utf-8');

  html = html.replace('{{date}}', date);
  html = html.replace('{{time}}', time);

  await transporter.sendMail({
    from: 'AppSalon <citas@appsalon.com>',
    to: 'admin@appsalon',
    subject: 'AppSalon - Nueva Cita',
    text: 'AppSalon - Nueva Cita',
    html,
  });
}

export async function sendEmailUpdateAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const templatePath = path.join(
    __dirname,
    '../emails/templates',
    'emailUpdateAppointment.html'
  );

  let html = readFileSync(templatePath, 'utf-8');

  html = html.replace('{{date}}', date);
  html = html.replace('{{time}}', time);

  await transporter.sendMail({
    from: 'AppSalon <citas@appsalon.com>',
    to: 'admin@appsalon',
    subject: 'AppSalon - Cita Actualizada',
    text: 'AppSalon - Cita Actualizada',
    html,
  });
}

export async function sendEmailCancelAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const templatePath = path.join(
    __dirname,
    '../emails/templates',
    'emailCancelAppointment.html'
  );

  let html = readFileSync(templatePath, 'utf-8');

  html = html.replace('{{date}}', date);
  html = html.replace('{{time}}', time);

  const info = await transporter.sendMail({
    from: 'AppSalon <citas@appsalon.com>',
    to: 'admin@appsalon',
    subject: 'AppSalon - Cita Cancelada',
    text: 'AppSalon - Cita Cancelada',
    html,
  });

  console.log('Mensaje enviado', info.messageId);
}
