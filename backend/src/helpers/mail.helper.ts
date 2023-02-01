import nodemailer from "nodemailer";
import { resolve } from "path"
import { config } from "dotenv";
config({ path: resolve("./.env") })

const myTransport = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    },
})

const mailToVerify = async (token: any, name: string, email: string) => {
    try {
        const info = await myTransport.sendMail({
            from: process.env.SENDER_MAIL,
            to: email,
            subject: "Log In Link",
            html: `
            <html>
            <head>
            </head>
            <body>
                <p> Dear ${name}, </p>   
                <p>Thank You for Registeration 
                <br>
                <a href="http://${process.env.BASE_URL}/auth/verify?token=${token}">
                Click Here</a> to Login !!!</p>
                Thanks and Regards
                <br>
                Team Yogesh Gaur
            </body>
            </html>
            `
        })
        console.log("Mail Send Successfully !!!", info.messageId)
        return "Check Mail For Login !!!";
    } catch (error) {
        console.log("Verification Mail Error : ", error)
    }
}

const mailToSendPdfLink = async (link: string, name: string, email: string) => {
    try {
        const info = await myTransport.sendMail({
            from: process.env.SENDER_MAIL,
            to: email,
            subject: "Get Your PDF",
            html: `
                <html>
                <head>
                </head>
                <body>
                    <p> Dear ${name}, </p>    
                    <br>
                    <a href=${link}>
                    Click Here</a> to Download Pdf !!!</p>
                    Thanks and Regards
                    <br>
                    Team Yogesh Gaur
                </body>
                </html>
                `
        })
        console.log("Mail Send Successfully !!!", info.messageId)
        return "Check Mail For Pdf Link !!!";
    } catch (error) {

    }
}

export { mailToVerify, mailToSendPdfLink };
