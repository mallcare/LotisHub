const express = require('express');
const db = require("../models/index");
const Joi = require("joi");
const authMiddleware = require('../middlewares/auth');
const auth = require('../auth/auth.controller');

const router = express.Router();

//router.use('/auth', auth);
//router.use('/', authMiddleware);

// function validateClient(client) {
//     const schema = {
//       client_code: Joi.string().min(2).max(50).required(),
//       client_name: Joi.string().min(2).max(50).required(),
//       office_address: Joi.string().min(5).max(255).required(),
//       office_zipcode: Joi.string().min(2).max(50).required(),
//       onwer_name: Joi.string().min(2).max(50).required(),
//       representative_name: Joi.string().min(2).max(50).required(),
//       office_phonenumber: Joi.number().integer().min(10).max(11).required(),
//       base_unit_cost: Joi.number().integer().min(2).max(50).required(),
//       packing_unit_cost: Joi.number().integer().min(2).max(50).required(),
//       return_shipping_cost: Joi.number().integer().min(2).max(50).required(),
//       cj_contract_unit_cost: Joi.number().integer().min(2).max(50).required(),
//       on_delivery_cost: Joi.number().integer().min(2).max(50).required(),
//       picking: Joi.number().integer().min(2).max(4).required(),
//       hanjin_boxtype: Joi.number().integer().min(2).max(50).required(),
//       cj_boxtype: Joi.number().integer().min(2).max(50).required(),
//       input_cost: Joi.number().integer().min(2).max(50).required(),
//       output_cost: Joi.number().integer().min(2).max(50).required(),
//       airfare: Joi.number().integer().min(2).max(50).required(),
//       courier_contract_code: Joi.string().min(2).max(50).required(),
//       superviser_code: Joi.number().integer().min(2).max(50).required(),
//       tax_invoice_date: Joi.date().format('YYYY-MM-DD').required(),
//       service_start_date: Joi.date().format('YYYY-MM-DD').required(),
//       service_end_date: Joi.date().format('YYYY-MM-DD').required(),
//       description: Joi.string().min(2).max(50).required()

//     };
//     return Joi.validate(client, schema);
// }


// Client Selection
router.get('/', async function (req, res) {
    // try {
    //   await validateClient(req.body);
    // }
    // catch (err) {
    //   console.log(req.body)
    //   return res.status(400).send(JSON.stringify( {message:err.details[0].message} ) );
    //   //return res.status(400).send(err.details[0].message);
    // } 
    // 토큰 확인
    // if(!req.decoded.admin) {
    //     return res.status(403).json({
    //         message: 'you are not an admin'
    //     })
    // }

  
    //등록된 사용자 조회
    const clientFound = await db.clients.findAll()
        .then( result => {
            res.json(result);
            //res.json(JSON.stringify(result));
        })
        .catch( err => {
            res.json(err);
          //res.json(JSON.stringify(err));
            console.log(err);
        })
});



// Client Registration
router.post('/register', async function (req, res) {
    // 토큰확인
    // if(!req.decoded.admin) {
    //     return res.status(403).json({
    //         message: 'you are not an admin'
    //     })
    // }

    // 넘어온 데이터 검증
    try {
      await validateClient(req.body);
    }
    catch (err) {
      console.log(req.body)
      return res.status(400).send(JSON.stringify( {message:err.details[0].message} ) );
      //return res.status(400).send(err.details[0].message);
    } 
  
    //등록된 고객사 확인
    const clientFound = await db.clients.findOne({
      where: {
        client_id: req.body.client_id
      }
    });
    if (clientFound){
        return res.status(400).send(JSON.stringify({message: '이미 등록된 사용자 입니다!!'}));
        //return res.status(400).send('이미 등록된 사용자 입니다!!');
    }
  
    // Create new client
    var client = await db.clients.build({
        client_code:"",
        client_name:"",
        office_address:"",
        office_zipcode:"",
        onwer_name:"",
        representative_name:"",
        office_phonenumber:"",
        base_unit_cost:0,
        packing_unit_cost:0,
        return_shipping_cost:0,
        cj_contract_unit_cost:0,
        on_delivery_cost:0,
        picking:0,
        hanjin_boxtype:0,
        cj_boxtype:0,
        input_cost:0,
        output_cost:0,
        airfare:0,
        courier_contract_code:1,
        superviser_code:1,
        tax_invoice_date:"",
        service_start_date:"",
        service_end_date:"",
        description:""
    });

    client = await client.save();

});


module.exports = router;
