import sgMail from "@sendgrid/mail";

export default async (email, code) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  await sgMail.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Reset your password",
    html: `
        <h1>Please use the following Code to reset your password</h1>
        <p style="color:red;font-size:24px">${code}</p>
        
        <hr />
        <p>This email may containe sensetive information</p>
        <p>This code valable 1h</p>
       
      `,
  });
};
