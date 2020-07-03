// (...)
/*
    GET /api/auth/check
*/

module.exports = function check(req, res){
    res.json({
        success: true,
        info: req.decoded
    })
}