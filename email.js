var S = require('string')
var nodemailer = require('nodemailer')


var smtpConfig = {
  // host: 'smtp.exmail.qq.com',
  // port: 465,
  // secure: true,
  // auth: {
  //   user: '123456789@qq.com',
  //   pass: 'password'
  // }
}

var mailConfig = {
  // from: ''
  // to: []
}

exports.init = (smtp, from, receivers) => {
  smtpConfig = smtp
  mailConfig.from = from || "TinyLogger"
  mailConfig.to = receivers

}



function sendEmailStep(subject, text) {
  let mailContent = {
    from: `"${mailConfig.from}" <${smtpConfig.auth.user}>`,
    to: mailConfig.to.join(', '),
    subject: subject,
    text: text,
    //html: '<b>Hello world?</b>' // html body
  }
  console.log(smtpConfig,mailContent)
  let transporter = nodemailer.createTransport(smtpConfig)

  transporter.sendMail(mailContent, (error, info) => {
    if (error) {
      console.log('ERROR: ')
      console.log(error);
    }else {
      lastMessageSentTime = Date.now()
      console.log('Message sent: %s', info.messageId);
    }
  });
}

exports.send = sendEmailStep
