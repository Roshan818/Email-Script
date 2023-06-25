const csv = require("csv-parser");
const fs = require("fs");

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  host: "smtp.office365.com", // Office 365 server, change this when using other mail services
  secureConnection: false,
  port: 587,
  auth: {
    user: "email@example.com", // your actual email
    pass: "password", // your actual password
  },
});

fs.createReadStream("emails.csv")
  .pipe(csv())
  .on("data", (row) => {
    console.log(row.email);
    var mailOptions = {
      from: "email@example.com", // sender address
      to: row.email, // replace with the recipient's email address
      cc: "another@example.com", // Put yourself in cc to get a copy of the email and revert back to your mails.
      subject: "Subject of the E-Mail", // Subject line
      html: `<p> Body of the email </p>`, // html body with multiple paragraphs
      attachments: [
        {
          filename: "filename.pdf",
          path: "path/to/file/filename.pdf",
        },
      ],
    };

    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: " + response.message);
      }
    });
  })
  .on("end", () => {
    console.log("Emails sent successfully");
  });
