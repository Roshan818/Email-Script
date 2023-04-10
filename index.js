const csv = require("csv-parser");
const fs = require("fs");

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  host: "smtp.office365.com",
  secureConnection: false,
  port: 587,
  auth: {
    user: "techevince/email/id", // your actual email
    pass: "techevince/password", // your actual password
  },
});

fs.createReadStream("emails.csv")
  .pipe(csv())
  .on("data", (row) => {
    console.log(row.email);
    var mailOptions = {
      from: "techevince/email/id",
      to: row.email, // replace with the recipient's email address
      cc: "your/email/id", // Put yourself in cc to get a copy of the email and revert back to your mails.
      subject:
        "Invitation for collaboration with Techevince 2023, IIT Guwahati",
      html: `<p>Dear Sir/Madam,</p>
      <p>I am delighted to inform you about the 9th edition of Techevince, the annual technical exhibition organized by the Technical Board of IIT Guwahati. This year, the event is scheduled to take place on 23rd April at the magnificent campus of IIT Guwahati.</p>
      <p>Techevince is a showcase of the best technological projects developed by the brilliant minds of IIT Guwahati. All 14 tech clubs with over 500+ students will participate in this mega tech expo and present their innovative projects, including the Mars Rover, unconventional fuel cars, UAVs, unmanned underwater vehicles (UUV), among others.</p>
      <p>We are committed to making this year's Techevince bigger and better than ever before, and we would be honored to partner with you to achieve this goal. In exchange for sponsorship from your side, we offer the following deliverables:</p>
      <ul>
        <li>Inclusion of your logo on all social media posts related to Techevince</li>
        <li>Display of your logo on all offline banners and posters, which will be placed at strategic locations across the campus</li>
        <li>Media coverage of the event, which will feature all sponsors in their articles</li>
        <li>Creative branding through props</li>
        <li>Inclusion of your logo on our official website</li>
        <li>Display of your logo on the entrance gate flex, which will be inaugurated by the Director of IIT Guwahati and the Chief Guest.</li>
      </ul>
      <p>We believe that our collaboration would be beneficial for the development of the budding thinkers, tinkerers, and designers and would mark the start of a memorable association.</p>
      <p>Thank you for your time and consideration, and we look forward to hearing from you soon.</p>
      <p>Best regards,</p>
      <p>Roshan Kumar<br>Core Team Member<br>Techevince<br>IIT Guwahati</p>`, // html body with multiple paragraphs
      attachments: [
        {
          filename: "PL.pdf",
          path: "D:/Mailing/Techevince 9.0 PL.pdf",
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
