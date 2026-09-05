require("dotenv").config();
const express=require("express");
const path=require("path");
const nodemailer=require("nodemailer");
const app=express();
const PORT=process.env.PORT||3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.post("/api/service-request",async(req,res)=>{
  const {name,phone,email,service,message}=req.body||{};
  if(!name||!phone||!service||!message) return res.status(400).json({message:"Please complete all required fields."});

  // Without SMTP variables, requests are logged for local demo/testing.
  if(!process.env.SMTP_HOST||!process.env.SMTP_USER||!process.env.SMTP_PASS){
    console.log("TEMIVIC SERVICE REQUEST:",{name,phone,email,service,message,receivedAt:new Date().toISOString()});
    return res.json({message:"Received in demo mode."});
  }
  try{
    const transporter=nodemailer.createTransport({
      host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),
      secure:String(process.env.SMTP_SECURE)==="true",
      auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}
    });
    await transporter.sendMail({
      from:process.env.SMTP_FROM||process.env.SMTP_USER,
      to:process.env.COMPANY_EMAIL,
      replyTo:email||undefined,
      subject:`TemiVic service request — ${service}`,
      text:`Name: ${name}\nPhone: ${phone}\nEmail: ${email||"Not supplied"}\nService: ${service}\n\nMessage:\n${message}`
    });
    res.json({message:"Service request sent successfully."});
  }catch(error){console.error(error);res.status(500).json({message:"Unable to send request right now."});}
});
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
if (typeof(PhusionPassenger) !== 'undefined') {
  app.listen('passenger');
} else {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
