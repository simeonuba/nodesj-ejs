const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const UserProfile = require('../controller/account.js');
const auth = require('../controller/auth.js');
const jwt = require('jsonwebtoken');
const db = require('../config/db.js');
const userMiddleware = require('../middleware/users.js');

router.post('/signup', userMiddleware.validateRegister, auth.Register);

router.get('/register',(req, res, next) => {
    res.render('signup');
});
router.get('/login',(req, res) => {
  res.render('login');
});
router.get('/order/fid/:id',userMiddleware.Authlogin,UserProfile.ViewOrder,(req, res) => {
  ofmaxu = req.session;
  res.render('order',{OrderDetails: ofmaxu.OrderDetails});
});
router.get('/update',userMiddleware.Authlogin,(req, res) => {
  ofmaxu = req.session;
  res.render('edit',{ofmaxu: ofmaxu});
});
router.post('/update',userMiddleware.Authlogin,UserProfile.UpdateAccount,(req, res) => {
});
router.get('/shipments',userMiddleware.Authlogin,UserProfile.Order,(req, res) => {
  ofmaxu = req.session;
  res.render('shipments',{ofmaxu: ofmaxu,Orderlist: ofmaxu.UserOrderInfo});
});
router.get('/account', userMiddleware.Authlogin, UserProfile.UserProfile, UserProfile.Order, (req, res, next) =>{
  ofmaxu = req.session;
  
  res.render('account',{ofmaxu: ofmaxu,Orderlist: ofmaxu.UserOrderInfo});
});
router.post('/login',auth.login, (req, res) => {
  ofmaxu = req.session;
  ofmaxu.email = req.body.email;
});
router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/login');
  });
});

router.get('/secret-route', (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});
module.exports = router;