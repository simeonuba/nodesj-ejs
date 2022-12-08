// middleware/users.js
const jwt = require("jsonwebtoken");
module.exports = {
  validateRegister: (req, res, next) => {
    // username min length 3
    if (!req.body.email) {
        
      return res.status(200).json({
            
            message: 'Please enter a valid Email',
            email : req.body.email
          });
   
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {

      return res.status(200).json({
        message: 'Password Must be at least 6 chars',
        code: 0,
        data: req.bod
      });
    }
    // password (repeat) does not match
    if (
      !req.body.cpassword ||
      req.body.password != req.body.cpassword
    ) {
      return res.status(200).json({
        message: 'Both passwords must match',
        code: 0

      });
    }
    next();
  },
 
  Authlogin: (req, res, next) => {
    ofmaxu = req.session;

    if(ofmaxu.email){
      next();

    }else{
      res.redirect('/user/login');
    }

  }

};
