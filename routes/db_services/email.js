'use strict';

var nodemailer = require('nodemailer');

exports.send = function(req, res) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: req.body.message.user,
            pass: req.body.message.password
        }
    });

    var mailOptions = {
        from: req.body.message.from,
        to: req.body.message.to,
        subject: req.body.message.subject,
        text: req.body.message.body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.statusCode(500);
            res.send("error");
        }else{
            res.send({ reponse: 'Message sent: ' + info.response});
        }
    });
};