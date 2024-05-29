import { emailUser, emailPass } from "../config/config.js";
import Registeration from "../models/registerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const sendVerifyMail = async (name, email, user_id) => {
    console.log("Top line - ", user_id);
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });
  
      const mailOptions = {
        from: emailUser,
        to: email,
        subject: "Verification mail .",
        html:
          "<p>Hi " +
          name +
          ', please click <a href="http://127.0.0.1:7000/api/verify?id=' +
          user_id +
          '">Here</a> to verify your mail .</p>',
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent successfully - ", info.response);
          console.log(user_id);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  


export const securePassword = async (password) => {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
    } catch (error) {
      console.log(error.message);
    }
  };


export const insertUser = async (req, res) => {
    console.log("Reached");
    try {
      const spassword = await securePassword(req.body.password);
      console.log(spassword);
      // const url = await handleFileUpload(req.file.filename);
      // console.log(url);
      // const user = new Registeration(req.body);
  
      const emp_Id = req.body.employee_id;
      const olduser = await Registeration.findOne({ employeeNo: emp_Id });
      console.log(olduser,"old");
      if (olduser) {
        return res.send({ error: "User xists !" });
      }
  
      const user = new Registeration({
        employeeNo: req.body.employee_id,
        name: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        // image: "image",
        password: spassword,
        is_admin: 0,
      });
  
      const userData = await user.save();
      console.log(userData);
      res.send(userData);
  
      if (userData) {
        sendVerifyMail(req.body.username, req.body.email, userData._id);
        alert("Your registration is successfull, Kindly verify your mail !");
      } else {
        console.log("Registration failed!");
        // alert("Registration failed!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  export const verifyMail = async (req, res) => {
    try {
      const updatedInfo = await Registeration.updateOne(
        { _id: req.query.id },
        { $set: { is_verified: 1 } }
      );
      console.log(updatedInfo);
      alert("Email Verified Successfully !");
    } catch (error) {
      console.log(error.message);
    }
  };
  
  //login user method
  export const loginLoad = async (req, res) => {
    try {
      res.json("this is working");
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const verifyLogin = async (req, res) => {
    try {
      const employee_id = req.body.employee_id;
      const password = req.body.password;
      const email = req.body.email;
      // console.log(email,"email is here");
  
      const userData = await Registeration.findOne({
        employee_id: employee_id,
        email: email,
      });
  
      if (userData) {
        const passwordMatch = await bcrypt.compare(password, userData.password);
  
        // if(res.status(201)){
        //    res.json({status:"ok",data:token});
        // }
        // else{
        //    res.json({error:"error"});
        // }
        console.log(passwordMatch);
        if (passwordMatch) {
          if (userData.is_verified === 0) {
            return res.json({ error: "Email not verified !" });
          } else {
            const token = jwt.sign(
              { employee_id: userData.employee_id }, //error maybe
              process.env.SECRET_KEY
              // {
              //   expiresIn: 10,
              // }
            );
            console.log(token, "token in verify");
            if (res.status(201)) {
              if (userData.is_admin === 1) {
                return res.json({ status: "ok", data: token, type: "admin" });
              } else {
                return res.json({ status: "ok", data: token, type: "user" });
              }
            } else {
              return res.json({ error: "error" });
            }
            // req.session.user_id = userData._id;
            // res.redirect("/admin-page");
          }
        } else {
          return res.json({ error: " ID and Passsword are incoreect !" });
        }
      } else {
        return res.json({ error: "No user exists !" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  export const loadHome = async (req, res) => {
    const { token, data } = req.body;
    console.log(data, "id is here");
  
    try {
      const user = jwt.verify(
        token,
        process.env.SECRET_KEY
        //   , (err, res) => {
        //   if (err) {
        //     return "token expired !";
        //   }
        //   return res;
        // }
      );
      // console.log(token,"token is not commng");
      console.log(user, "here is user");
      if (user == "token expired !") {
        return res.send({ status: "error", data: "token expired" });
      }
      console.log(user.email, "email is here");
      Registeration.findOne({ employee_id: user.employee_id })
        .then((data) => {
          // JSON.parse(window.localStorage.getItem("data"));
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const userLogout = async (req, res) => {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (error) {
      console.log(error.message);
    }
  };