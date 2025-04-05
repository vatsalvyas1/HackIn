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
            html: `Hello ${userName},<br> Your request to join ${teamName} has been accepted.`,
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

const sendRejectMessage = async (email, userName, teamName) => {
    try{
        const mailOptions = {
            to: email,
            subject: 'Oops! Your Request has been rejected',
            html: `Hello ${userName},<br> Your request to join ${teamName} has been rejected.`,
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

const sendJoinRequest = async(email, leaderName, userName, teamName) => {
    try{
        const mailOptions = {
            to: email,
            subject: 'Join Request Received',
            html: `Hello ${leaderName},<br> ${userName} has requested to join your team ${teamName}`,
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
}

export { sendAcceptMessage,sendRejectMessage, sendJoinRequest };
