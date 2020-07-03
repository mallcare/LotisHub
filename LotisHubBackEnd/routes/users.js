const express = require('express');
const jwt = require("jsonwebtoken");
const models = require('../models');
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const db = require("../models/index");
const nodemailer = require("nodemailer");
const config = require('../config/config')

const router = express.Router();

// Init email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
});

function validateUser(user) {
  const schema = {
    password: new PasswordComplexity().required(),
    // password: Joi.string()
    //   .min(2)
    //   .max(50)
    //   .required(),
    userName: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    phoneNumber: Joi.string()
      .min(10)
      .max(11)
      .required()
  };

  return Joi.validate(user, schema);
}


// User Registration
router.post('/register', async function (req, res) {
  try {
    await validateUser(req.body);
  }
  catch (err) {
    console.log(req.body)
    return res.status(400).send(JSON.stringify( {message:err.details[0].message} ) );
    //return res.status(400).send(err.details[0].message);
  }

  //등록된 사용자 확인
  const userFound = await db.users.findOne({
    where: {
      user_id: req.body.email
    }
  });
  if (userFound){
      return res.status(400).send(JSON.stringify({message: '이미 등록된 사용자 입니다!!'}));
      //return res.status(400).send('이미 등록된 사용자 입니다!!');
  }

  // Create new user
  var user = await db.users.build({
    user_id: req.body.email,
    user_password: req.body.password,
    user_name: req.body.userName,
    user_phone_number: req.body.phoneNumber,
    // user_type: req.body.user_type,
    // user_company_id: req.body.user_company_id,
    // user_authority_id: req.body.user_authority_id,
    // user_address: req.body.user_address,
    // user_zipcode: req.body.user_zipcode,
    // user_company_id: req.body.user_company_id,
    user_type: 1,
    user_company_id: 1,
    user_authority_id: 1,
    user_address: "",
    user_zipcode: "",
    user_company_id: 1
  });

  //Hash password
  const salt = await bcrypt.genSalt(10);
  user.user_password = await bcrypt.hash(user.user_password, salt);
  user = await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["user_id", "user_name"]));
  //res.header("x-auth-token", token).send();
});


router.post('/reset_password/:email', async function(req, res){
  var user;
  try{
    user = await db.users.findOne({
      where : { user_id: req.params.email }
    });
  } catch(err) {
    return res.status(400).send(JSON.stringify({message: '데이터베이스 읽기 오류'}));
  }

  if( !user ){
    return res.status(400).send(JSON.stringify({message: '등록된 아이디가 아닙니다'})); 
  }

  //Generate one-time use URL with jwt token
  const secret = `${user.user_password}-${user.create_timestamp}`;
  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: 3600 // expires in 1 hour
  });

  const url = `${config.ethUrl}/users/reset_password_received/${user.id}/${token}`;

  const emailTemplate = {
    subject: "LotisHub 비밀번호 설정 메일입니다.",
    html: `
    <p>Hello ${user.user_name},</p>
    <p>You recently requested to reset your password.</p>
    <p>Click the following link to finish resetting your password.</p>
    <a href=${url}>${url}</a>`,
    from: process.env.EMAIL_LOGIN,
    to: user.user_id
  };

  const sendEmail = async function() {
    try{
      const info = await transporter.sendMail(emailTemplate);
      console.log("Email sent", info.response);
      return res.status(200).send(JSON.stringify({message: '이메일을 전송하였습니다.'}));
    } catch(err) {
      console.log(err);
      return res.status(500).send(JSON.stringify({message: '이메일 전송에 실패하였습니다.'}));
    }
  };

  sendEmail();

});


// post to verify reset password url
router.post('/receive_new_password/:id/:token', async function(req, res){
  // First parse request object
  // Get ID, token within params and new password in body

  const { id, token } = req.params;
  const { password } = req.body;

  // Validate new password
  try{
    await Joi.validate( {password}, 
      {
        password: new PasswordComplexity().required()
      }
      );
  } catch(err){
    return res.status(400).send(err.details[0].message);
  }

  // get user from database with id
  var users;
  try{
    users = await db.users.findOne({
      where: { id }
    });
  } catch(err) {
    return res.status(400).send(JSON.stringify({message: '데이터베이스 읽기 오류'}));
  }

  if( !users ){
    return res.status(400).send(JSON.stringify({message: '해당 사용자 정보가 없습니다.'}));
  }

  // Generate secret token
  const secret = `${users.user_password}-${users.create_timestamp}`;
  // Verify that token is valid
  const payload = jwt.decode(token, secret);
  if( !payload ) {
    return res.status(404).send(JSON.stringify({message: '보안정보가 잘못되었습니다.(Invalid id or token)'}));
  }
  if( payload.id != id ) {
    return res.status(404).send(JSON.stringify({message: '보안정보가 잘못되었습니다.(Invalid id or token)'}));
  }

  // Hash new password and store in database
  const salt = await bcrypt.genSalt(10);
  users.user_password = await bcrypt.hash(password, salt);
  users = await users.save();
  return res.status(200).send(JSON.stringify({message: '패스워드가 수정되었습니다.'}));
});


module.exports = router;
