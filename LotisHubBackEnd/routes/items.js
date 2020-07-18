const express = require('express');
const db = require("../models/index");
const Joi = require("joi");
const authMiddleware = require('../middlewares/auth');
const auth = require('../auth/auth.controller');

const router = express.Router();

//router.use('/auth', auth);
//router.use('/', authMiddleware);

function validateItem(item) {
    const schema = {
      item_code: Joi.string().min(1).max(50).required(),
      // client_name: Joi.string().min(2).max(50).required(),
      // office_address: Joi.string().min(5).max(255).required(),
      // office_zipcode: Joi.string().min(2).max(50).required(),
      // onwer_name: Joi.string().min(2).max(50).required(),
      // representative_name: Joi.string().min(2).max(50).required(),
      // office_phonenumber: Joi.number().integer().min(10).max(11).required(),
      // base_unit_cost: Joi.number().integer().min(2).max(50).required(),
      // packing_unit_cost: Joi.number().integer().min(2).max(50).required(),
      // return_shipping_cost: Joi.number().integer().min(2).max(50).required(),
      // cj_contract_unit_cost: Joi.number().integer().min(2).max(50).required(),
      // on_delivery_cost: Joi.number().integer().min(2).max(50).required(),
      // picking: Joi.number().integer().min(2).max(4).required(),
      // hanjin_boxtype: Joi.number().integer().min(2).max(50).required(),
      // cj_boxtype: Joi.number().integer().min(2).max(50).required(),
      // input_cost: Joi.number().integer().min(2).max(50).required(),
      // output_cost: Joi.number().integer().min(2).max(50).required(),
      // airfare: Joi.number().integer().min(2).max(50).required(),
      // courier_contract_code: Joi.string().min(2).max(50).required(),
      // superviser_code: Joi.number().integer().min(2).max(50).required(),
      // tax_invoice_date: Joi.date().format('YYYY-MM-DD').required(),
      // service_start_date: Joi.date().format('YYYY-MM-DD').required(),
      // service_end_date: Joi.date().format('YYYY-MM-DD').required(),
      // description: Joi.string().min(2).max(50).required()

    };
    return Joi.validate(item, schema);
}

router.get('/:id', async (req, res) => {
  const itemFound = await db.items.findByPk(req.params.id)
      .then( result => {
          res.json(result);
      })
      .catch( err => {
          res.json(err);
          console.log(err);
      })
});

// Items Selection
router.get('/', async function (req, res) {
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
router.post('/', async function (req, res) {
  
  try {
    // 넘어온 데이터 검증
    validateItem(req.body);

    //등록된 물품 확인
    const itemFound = await db.items.findOne({
      where: {
        item_name: req.body.item_name
      }
    });
    if (itemFound){
        return res.status(400).send(JSON.stringify({message: '이미 등록된 아이템 입니다!!'}));
        //return res.status(400).send('이미 등록된 사용자 입니다!!');
    }
    const reqItemInfo = req.body;
    // Create new item
    const newItem = {
      item_code: reqItemInfo.item_code,
      item_name: reqItemInfo.item_name,
      item_model: reqItemInfo.item_model,
      manufacturer_id: 123456,
      unit_price: reqItemInfo.unit_price,
      shipping_unit_price: reqItemInfo.shipping_unit_price,
      items_stock: reqItemInfo.items_stock
    };

    db.sequelize.transaction( t => {
      return db.items.create(newItem, {transaction: t})
      .then((r) => {
        console.log(r)
        return res.status(200).json(r);
      }).catch((error) => {
          console.log(error);
          t.rollback();
          return res.status(400).send(JSON.stringify( {message: error} ) );
        });
    });

  }
  catch (err) {
    console.log(req.body)
    return res.status(400).send(JSON.stringify( {message:err.details[0].message} ) );
    //return res.status(400).send(err.details[0].message);
  } 

});

router.put('/:itemId', async (req, res) => {
  const reqBody = req.body;
  delete reqBody["item_id"]
  const { itemId } = req.params
    //등록된 고객사 확인
  const itemFound = await db.items.findOne({
    where: {
      item_id: itemId
    }
  });
  if (itemFound){
      //TODO: 모든 필드를 수정해야 할 필요가 있습니까??
    db.items.update(reqBody, { 
      where : { item_id: itemId }
    })
    .then(() => { 
      return db.items.findByPk(itemId) 
    })
    .then((item) => { 
      res.status(200).json(item) 
    })
    .catch( err => {
        res.json(err);
        console.log(err);
    })
  } else {
    return res.status(400).json({message: '없는 품목 입니다!!'});
  }

});

router.delete('/:item_id', async (req, res) => {
  const { item_id } = req.params
  db.items.destroy({where: {item_id: item_id}})
  .then(result => {
      return res.status(200).json(result);
  })
  .catch(err => {
      console.error(err);
      return res.status(500).json(err);
  });
});



module.exports = router;
