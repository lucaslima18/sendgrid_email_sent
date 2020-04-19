const sgMail = require('@sendgrid/mail');
const fs = require('fs');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send_to = //put the namo of the recipient
const send_from = //put your emailhere
const send_subject = //put the email subject here
const file_name = //put the file name here with your extention ()
const template_id = //put the template_id of your email template here
const base64str = base64_encode(file_name);

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
    //if you use dynamic_template_data on your sendgrid template, create constants on your code and put here
  },
};

function base64_encode(file_name) {
    //this function go encode the file on base64 format
  
    const bitmap = fs.readFileSync(file_name);
    return new Buffer.from(bitmap).toString('base64');
};

function send_email(){
  //this function go send the email using the sendgrid params
 
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
