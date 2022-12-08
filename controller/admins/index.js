const {login,Register} = require('./auth');
const {dashbaordController,userController,serachUsers,CreateNewOrder,banUserController} = require('../admins/accountcontroller')

module.exports= {
 login,
 Register,
 dashbaordController,
 serachUsers,
 CreateNewOrder,
 userController,
 banUserController
}