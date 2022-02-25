const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.json({
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
            user: "ggr.mkt.consultoria@gmail.com",
            pass: "ufal@123"
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

const server = http.createServer(app);
server.listen(PORT);
console.log(`API - Init: Server listening on port ${PORT}.`)