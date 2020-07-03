const jwt = require("jsonwebtoken");

// module.exports = function(req, res, next) {
//   const token = req.header("x-auth-token");
//   if (!token) return res.status(401).send("Access denied. No token provided.");

//   try {
//     const decoded = jwt.verify(token, process.env.jwtPrivateKey);
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).send("Invalid token.");
//   }
// };


const authMiddleware = (req, res, next) => {
  // read the token from header or url 
  const token = req.headers['x-access-token'] || req.query.token

  // token does not exist
  if(!token) {
      return res.status(403).json({
          success: false,
          message: '로그인 후 조회하세요'
      })
  }

  // create a promise that decodes the token
  const p = new Promise(
      (resolve, reject) => {
          jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
              if(err) reject(err)
              resolve(decoded)
          })
      }
  )

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
      res.status(403).json({
          success: false,
          message: error.message
      })
  }

  // process the promise
  p.then((decoded)=>{
      req.decoded = decoded
      next()
  }).catch(onError)
}

module.exports = authMiddleware;