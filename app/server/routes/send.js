const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  const output = `
        <div style="color: #000; background: #bdcebe; font-size: 18px; border-radius: 5px; padding: 20px">
        <p>У вас новое письмо.</p>
        <h4 style="margin-block: none">Детали:</h4>
        <ul style="list-style: none">
            <li>Email: ${req.body.email}</li>
            <li>Имя: ${req.body.name}</li>
        </ul>
        <h4 style="margin-block: none">Сообщение:</h4>
        <p style="max-width: 400px; width: 100%; word-wrap: break-word;">${req
          .body.message}</p>
        </div>
     `;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    secure: false,
    auth: {
      user: 'dergachevkonstantin@gmail.com',
      pass: 'entityFramework19',
    },
  });

  const mailOptions = {
    from: '"Константин Дергачев" <dergachevkonstantin@gmail.com>',
    to: 'dergachevkonstantin@gmail.com',
    subject: 'Разработка веб приложений',
    text: 'Тестовое сообщение.',
    html: output,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.render('thanks', { msg: 'Сообщение успешно отправлено' });
  } catch (err) {
    console.log('Ошибка отправления письма: ', err);
  }
});

module.exports = router;
