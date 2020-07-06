const express = require('express');
const db = require("../models/index");
const Joi = require("joi");
const authMiddleware = require('../middlewares/auth');
const auth = require('../auth/auth.controller');

const router = express.Router();

//router.use('/auth', auth);
//router.use('/', authMiddleware);

// function validateItem(item) {
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
//     return Joi.validate(item, schema);
// }


// Items Selection
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
    const itemFound = await db.items.findAll()
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



// Items Registration
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
    const itemFound = await db.items.findOne({
      where: {
        item_id: req.body.item_id
      }
    });
    if (itemFound){
        return res.status(400).send(JSON.stringify({message: '이미 등록된 아이템 입니다!!'}));
        //return res.status(400).send('이미 등록된 사용자 입니다!!');
    }
  
    // Create new item
    var item = await db.items.build({
      item_id: "",
      item_code: "",
      item_name: "",
      item_model: "",
      manufacturer_id: "",
      unit_price: "",
      shipping_unit_price: "",
      items_stock: ""
    });

    item = await item.save();



});


module.exports = router;
