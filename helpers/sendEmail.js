const sgEmail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: "nkucheryava@gmail.com" };
    await sgEmail.send(email);
    return true;
};

module.exports = sendEmail;

// const email = {
//   to: "lasog40782@tenjb.com",
//   from: "nkucheryava@gmail.com",
//   subject: "Email sent",
//   text: "",
//   html: "<p><strong>Email sent</strong></p>",
// };

// sgEmail.send(email).then(() => console.log("Email sent successfully")).catch((error) => console.log(error.message));