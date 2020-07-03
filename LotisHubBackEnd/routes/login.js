const jwt = require("jsonwebtoken");
const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const db = require("../models/index");

const router = express.Router(); //api/login

function validate(req) {
    const schema = {
    email: Joi.string()
        .min(5)
        .max(255)
        .email()
        .required(),
    password: Joi.string()
        .min(5)
        .max(255)
        .required()
    };
  
    return Joi.validate(req, schema);
}


// User login
router.post('/', async function(req, res){
    try {
        await validate(req.body);
      }
      catch (err) {
        console.log(req.body)
        //return res.status(400).send(JSON.stringify( {message:err.details[0].message} ) );
        return res.status(400).send(JSON.stringify( {message:'패스워드는 5글자 이상입니다'} ) );
      }

    const users = await db.users.findOne({
        where: {
            user_id : req.body.email
        }
    });
    if( !users ){
        return res.status(400).send(JSON.stringify({message: '등록되지 않은 메일주소 입니다.'}));
    }

    const validPassword = await bcrypt.compare(req.body.password, users.user_password);
    if( !validPassword ){
        return res.status(400).send(JSON.stringify({message: '비밀번호 오류입니다.'}));
    }

    const token = users.generateAuthToken();
    res.send(JSON.stringify(token));
    // res.send({
    //         id: users.id,
    //         username: users.user_name,
    //         token: token
    // });
    // return ok({
    //     id: users.id,
    //     username: users.user_name,
    //     token: token
    // });

});

function ok(body) {
    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
}

module.exports = router;
