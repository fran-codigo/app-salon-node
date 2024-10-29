import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { createTransport } from '../config/nodemailer.js';

async function sendEmail(templateName, subject, data, email = '') {
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
    templateName
  );
  let html = readFileSync(templatePath, 'utf-8');

  Object.entries(data).forEach(([key, value]) => {
    html = html.replace(`{{${key}}}`, value);
  });

  await transporter.sendMail({
    from: 'AppSalon <cuentas@appsalon.com>',
    to: email,
    subject,
    text: subject,
    html,
  });
}

export async function sendEmailVerification({ name, email, token }) {
  sendEmail(
    'emailVerification.html',
    'Verifica tu cuenta en App salón',
    {
      name,
      url: process.env.FRONTEND_URL,
      token,
    },
    email
  );
}

export async function sendEmailPassword({ name, email, token }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  // Enviar el email
  const info = await transporter.sendMail({
    from: 'AppSalon <cuentas@appsalon.com>',
    to: email,
    subject: 'AppSalon - Reestablece tu password',
    text: 'AppSalon - Reestablece tu password',
    html: `<p>Hola ${name}, has solicitado reestablecer tu password en App Salon</p>
    <p>Sigue el siguiente enlace para recuperar tu password</p>
    <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Reestablecer password</a>
    <p>Si tu no solicitaste esto, puedes ignorar este mensaje</p>
    `,
  });

  console.log('Mensaje enviado', info.messageId);
}
