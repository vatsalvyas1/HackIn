import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
});

const sendAcceptMessage = async (email, userName, teamName) => {
    try{
        const mailOptions = {
            to: email,
            subject: 'Congratulations! Your request has been accepted',
            html: `hello ${userName},<br> Your request to join ${teamName} has been accepted.`,
        };
    
        const message = await transporter.sendMail(mailOptions);
        if(message){
            return true;
        }

        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};

export { sendAcceptMessage };