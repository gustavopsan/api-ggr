const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const nodemailer = require("nodemailer")

app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        app.use(cors());
        next();
    }
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Server initializated."
    })
})

app.post("/sendMail", (req, res) => {
    console.info("API - Send Mail: Initializing new mail");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.gmail_account,
            pass: process.env.gmail_password
        }
    })

    const mailOptions = {
        from: "'GGR Marketing e Consultoria' ggr.mkt.consultoria@gmail.com",
        to: req.body.destination,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("API - Send Mail: Error while sending mail", err)
            res.json({
                sent: false,
                message: "Error while sending mail"
            })
        }

        console.info("API - Send Mail: Mail sending success",info)
        res.json({
            sent: true,
            message: "Mail sending success"
        })
    })

})

app.listen(process.env.PORT || 3000);
