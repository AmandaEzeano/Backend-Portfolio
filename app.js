const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 8080;

app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Serve static files (optional, depending on your project structure)
app.use(express.static('public'));

// Define a route for handling form submissions
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;


    // Create a transporter using your Gmail credentials
    const transporter = nodemailer.createTransport({
        host: 'mail.privateemail.com',
        secure: true,
        port: 465,
        auth: {
            user: 'info@amandaezeano.com',
            pass: 'AmyAmy01.22',
        },
    });

    // Configure the email options
    const mailOptions = {
        from: 'info@amandaezeano.com',
        to: 'amandaezeano@gmail.com',
        subject: 'From: '+email,
        html:  '<h2 style="background-color:#F9F9F9;">Name:' +name+'</h2> <br/> <h3>Message:' +message+'</h3>'
    };

      // Configure the email options
      const mail2Options = {
        from: 'info@amandaezeano.com',
        to: email,
        subject: 'Thank You for Your Message - Amanda Ezeano',
        html: '<p>Hi '+name+',</p><p>Thank you for reaching out and taking time out to view my portfolio!</p><p> My name is Amanda Ezeano, I want to assure you that your message has been received, and I will make it a priority to review it as soon as possible.</p><p> Please feel free to send me a reply, if you have any further questions. I look forward to connecting with you soon.</p><p>Thank you 🙂,</p><p>Amanda E.</p>'
    
    };

    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error '+error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully '+info.response);
        }
    });
      // Send the email
      transporter.sendMail(mail2Options, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error '+error);
        } else {
            console.log('Email sent to sender: ' + info.response);
            res.status(200).send('Email sent successfully to sender '+info.response);
        }
    });
});


app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get("/ping", (req, res) => {
    res.send({ success: true })
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
