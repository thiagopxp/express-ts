import { Request, Response, Router } from 'express';
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport('smtps://help%40hoprunners.com:pcal83lfe@smtp.gmail.com');

const homeRouter: Router = Router();

homeRouter.get('/', (req: Request, res: Response) => {

  res.locals.bodyClass = 'home-template';

  res.render('index');
});

homeRouter.post('/contact', (req: Request, res: Response) => {

  console.log('body', req.body);

  const text = 'name: ' + req.body.name + '\nEmail: ' + req.body.email + '\nPhone: ' + req.body.phone + '\nMessage:' + req.body.message
  const mailOptions = {
    from: '"April9" <contact@april9.com.au>',
    to: 'info@april9.com.au',
    subject: 'April9 - Contact',
    text: text
  };

  transporter.sendMail(mailOptions, function (error, info) { });

  res.send('ok');
});

export { homeRouter };
