const express = require('express');
const db = require("../models/index");
const Joi = require("joi");
const authMiddleware = require('../middlewares/auth');
const auth = require('../auth/auth.controller');

const router = express.Router();

//router.use('/auth', auth);
//router.use('/', authMiddleware);

// function validateOrder(order) {
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
//     return Joi.validate(order, schema);
// }


// Orders Selection
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

  
    //등록된 물품 조회
    const orderFound = await db.orders.findAll()
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



// Orders Registration
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
  
    //등록된 물품 확인
    const orderFound = await db.orders.findOne({
      where: {
        order_number: req.body.order_number
      }
    });
    if (orderFound){
        return res.status(400).send(JSON.stringify({message: '이미 등록된 아이템 입니다!!'}));
        //return res.status(400).send('이미 등록된 사용자 입니다!!');
    }
  
    // Create new order
    var order = await db.orders.build({
      customers_id: "",
      order_number: "",
      tracking_number: "",
      customer_name: "",
      customer_address: "",
      customer_zipcode: "",
      customer_contact_number: "",
      customer_phone_number: "",
      order_date: "",
      estimated_delivery_date: "",
      delivery_status: "",
      delivery_firm: "",
      isVisible: ""
    });

    order = await order.save();



});


module.exports = router;
