import { createTransport } from '../config/nodemailer.js';

export async function sendEmailVerification({ name, email, token }) {
  const transporter = createTransport(
    'sandbox.smtp.mailtrap.io',
    2525,
    '37e6ed82e63aa5',
    '1fb71fb02267dd'
  );

  // Enviar el email
  const info = await transporter.sendMail({
    from: 'AppSalon',
    to: email,
    subject: 'AppSalon - Confirma tu Cuenta',
    text: 'AppSalon - Confirma tu Cuenta',
    html: `<p>Hola ${name}, confirma tu cuenta en App Salon</p>
    <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace</p>
    <a href="http://localhost:4000/api/auth/verify/${token}">Confirmar cuenta</a>
    <p>Si tu no creaste esta cuenta puedes ignorar este mensaje</p>
    `,
  });

  console.log('Mensaje enviado', info.messageId);
}
