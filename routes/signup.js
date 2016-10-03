var express = require('express');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var dotenv = require('dotenv');
var router = express.Router();

dotenv.load();

router.post('/', function(req, res, next) {

  var name = req.body.name
  var email = req.body.email
  console.log(`name: ${ name  }, email ${email}`)

  var auth = {
    auth: {
      api_key: process.env.MAILGUN_KEY,
      domain: process.env.MAILGUN_DOMAIN
    }
  }

  var nodemailerMailgun = nodemailer.createTransport(mg(auth));

  nodemailerMailgun.sendMail({
    from: 'alexandergraybennett@gmail.com',
    to: `${ email }`,
    subject: `Hey ${ name }`,
    html: `We <b>greatly</b> appreciate you signing up!
    <br />
    -- Rustek Team
    `,
  }, function (err, info) {
    if (err) console.log('Error: ' + err);
    else console.log('Response: ' + info);
  });

  res.render('index', { title: 'Email Sent' });

});

module.exports = router;
