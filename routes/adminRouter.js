const express = require('express');
const adminRouter = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const UserProfile = require('../controller/account.js');
const auth = require('../controller/admins');
const jwt = require('jsonwebtoken');
const db = require('../config/db.js');
const userMiddleware = require('../middleware/users.js');
const {serachUsers,dashbaordController,userController,banUserController, CreateNewOrder} = require('../controller/admins')


adminRouter.get('/login',  (req,res) => {
    res.render('admin/login');
  });
  adminRouter.post('/login',auth.login,  (req,res) => {
    ofmaxAdmin = req.session;
    ofmaxAdmin.email = req.body.email;
  });
  adminRouter.get('/create', (req,res) => {
    res.render('admin/create');
  });
  adminRouter.get('/order/new', serachUsers);
  adminRouter.post('/order/new', CreateNewOrder);
  adminRouter.post('/create',auth.Register);

adminRouter.get('/in',dashbaordController);
adminRouter.get('/alluser',userController)
adminRouter.get('/user/ban/:id',banUserController)
module.exports = adminRouter;