import nodemailer, { Transporter } from 'nodemailer';
import SMTPPool = require('nodemailer/lib/smtp-pool');
import { GeneralError } from './error';

interface ISendEmailInfo {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments: { filename: string; path?: string; content?: string; contentType?: string; envoding?: string }[];
}

let transporter: Transporter<SMTPPool.SentMessageInfo>;

export const sendEmailBySMTP = async (emailInfo: ISendEmailInfo) => {
  try {
    if (!transporter) {
      transporter = nodemailer.createTransport({
        pool: true,
        host: process.env.EMAIL_HOST!,
        port: 465,
        secure: true, // use TLS
        auth: {
          user: process.env.EMAIL_HOST_USER!,
          pass: process.env.EMAIL_HOST_PASSWORD!,
        },
      });
      console.info('Imported and configured nodemailer library.');
    }

    // send
    return await transporter.sendMail(emailInfo, (err: any, info: any) => {
      if (err) {
        console.error('Error when sending email', emailInfo, err);
        // logger.log('info', 'Error when sending email', { email: emailInfo, ...err });
        return err;
      }

      console.debug('Send email success', info);
      // logger.log('info', 'Send email success', info);
      return 'Ok';
    });
  } catch (error) {
    throw new GeneralError(error.message);
  }
};
