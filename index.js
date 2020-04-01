const sgMail = require('@sendgrid/mail');
const fs = require('fs');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send_to = "lucas.ala1999@gmail.com"
const send_from = "startupdoctor@gmail.com"
const send_subject = "Diagnóstico Startup Doctor"
const file_name = "diagnostico.jpg"
const template_id = "d-8290f5ecfe344fc6af191c0a14852055"
const name = "Lucas Amorim"
const base64str = base64_encode('default.jpg');

const msg = {
  to: send_to,
  from: send_from,
  subject: send_subject,
  attachments: [
    {
      content: base64str,
      filename: file_name,
    },
  ],
  templateId: template_id,
  dynamic_template_data: {
    nome: name,
  },
};

function base64_encode(file) {
    const bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString('base64');
};

function send_email(){
  (async () => {
    try {
      await sgMail.send(msg);
      console.log("email send success to "+name+"!")
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();
}

send_email(msg)
