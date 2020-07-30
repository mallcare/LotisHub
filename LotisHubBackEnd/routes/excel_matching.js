const express = require('express');
const db = require("../models/index");

const Joi = require("joi");
const authMiddleware = require('../middlewares/auth');
const auth = require('../auth/auth.controller');
const { update } = require('lodash');

const router = express.Router();

//router.use('/auth', auth);
//router.use('/', authMiddleware);

// router.get('/:name', async (req, res) => {
//     const { name } = req.params
//     await db.excel_matching.findOne({
//         where: {
//             client_name: name
//         },
//     }).then( result => {
//         res.status(200).json(result);
//     }).catch( err => {
//         res.status(500).json(err);
//         console.log(err);
//     })
// });

router.get('/names', async (req, res) => {
    await db.excel_matching.findAll({
            attributes: ['client_name']
        }).then( result => {
            res.status(200).json(result);
        }).catch( err => {
            res.status(500).json(err);
            console.log(err);
        })
});

router.get('/name/:client_name', async (req, res) => {
    const { client_name } = req.params;

    await db.excel_matching.findOne({
            where: { 
                client_name: client_name
            }
        }).then( result => {
            res.status(200).json(result);
        }).catch( err => {
            res.status(500).json(err);
            console.log(err);
        })
});

router.get('/', async (req, res) => {
    await db.excel_matching.findAll()
        .then( result => {
            res.status(200).json(result);
        })
        .catch( err => {
            res.status(500).json(err);
            console.log(err);
        })
});

// excel matching insert or update 
router.post('/', async (req, res) => {
    // TODO: 넘어온 데이터 검증
    try {
        const reqInfo = req.body;
        console.log("excel-matching ------");
        console.log(reqInfo)

        const newExcelMatch = {
            client_name: reqInfo.layout.name,
            matching: reqInfo.matchings
        }

        const isFound = await db.excel_matching.findOne({
            where: {
                client_name: newExcelMatch.client_name
            }
        });

        if (isFound){
            db.excel_matching.update(newExcelMatch, { 
                where: {
                    client_name: newExcelMatch.client_name
                }
            })
            .then(() => { 
                return res.status(200).json(newExcelMatch) 
            })
            .catch( err => {
                res.json(err);
                console.log(err);
            })

        } else {
            db.sequelize.transaction( t => {
                return db.excel_matching.create(newExcelMatch, {transaction: t})
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
        
    } catch (err) {
        return res.status(400).send(JSON.stringify( {message: err.message} ) );
    } 
});



// router.delete('/:client_id', async (req, res) => {

// });

module.exports = router;
