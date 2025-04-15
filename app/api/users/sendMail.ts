import nodemailer from "nodemailer";
import crypto from 'crypto';
import bcrypt  from 'bcrypt'
import { prisma } from "@/prisma/client";

const sendMail = async ( email:string) => {

    const token = await crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token,10);

    await prisma.verificationToken.create({
        data:{
            
        }
    })



    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD
        },
      });

      console.log(transporter);
      

  const res = await transporter.sendMail({
    from: 'nn@gmail.com', 
    to: email,
    subject: "Issue Tracker - verify your email id ✔",
    html: "<b>Hello world?</b>", // html body
  });

 return res;

};


export default sendMail;
