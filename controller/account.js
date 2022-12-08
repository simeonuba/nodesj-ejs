const db = require('../config/db.js');

checkuser = async (data) =>{
    return db.query('SELECT * FROM `users` WHERE `email` = ?', [data]);
  }
  checkOrder = async (data) =>{
    return db.query('SELECT * FROM `orders` WHERE `order_number` = ?', [data]);
  }
  companyinfo = async (req, res, next) =>{
    return db.query('SELECT * FROM companyinfo');
  }
exports.UserProfile =  async (req,res, next) => {
      try {
        const ofmaxu = req.session;
               email = ofmaxu.email;
              
               const [rows, fields] = await checkuser(email);
              
               const data = {
                id: rows[0].id,
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
                //fullname: firstname + ' ' + lastname,
                email: email,
                phone: rows[0].phone,
                address: rows[0].address,
                city: rows[0].city,
                state: rows[0].state,
                created_at: rows[0].created_at
                
              };
            ofmaxu.user = data;
         const [ofmaxinfo] = await companyinfo();
           const company = {
            address: ofmaxinfo[0].address,
            phone: ofmaxinfo[0].phone,
            state: ofmaxinfo[0].state,
            zipcode: ofmaxinfo[0].zipcode,
            city: ofmaxinfo[0].city
          };
          ofmaxu.companyinfo = company;
     
        next();
      } catch (error) {
        next();
      }
    

}

exports.Order = async (req,res, next) => {
    const [rows, fields] = await checkuser(email);
      const id=rows[0].id;
      //const UserOrderInfoc = await db.query('SELECT * FROM orders WHERE user_id = ?', id);
   const [UserOrderInfo] = await db.query('SELECT * FROM orders WHERE user_id = ?', id);
   
    const sql ="SELECT * FROM orders WHERE  user_id = ?  AND delivery_status = ?";
   let   [pending, fid] = await  db.query(sql,[id,'pending']);
    ofmaxu= req.session;
     ofmaxu.pending = pending;
     ofmaxu.UserOrderInfo = UserOrderInfo;
 next();

}

exports.UpdateAccount = async (req, res, next) => {
  const [rows] = await checkuser(email);
  const id=rows[0].id;

  fullname = req.body.fullname;
  let name=fullname.split(" ");
  let data= `UPDATE users SET ? WHERE id =`+ id;
  let value={
    city: req.body.city,
    state: req.body.state,
    address: req.body.address,
    firstname: name[0],
    lastname: name[1],
    phone: req.body.phone

  }
  const [Update] = await db.query(data,value);
  return res.status(200).send({
    message: 'Updated Successfully',
    code: 0
  });

 

  
}
exports.ViewOrder = async (req,res, next) => {
  const id = req.params.id;
  const [OrderData] =  await checkOrder(id);
  if(OrderData.length == 0){
    return res.status(200).send({
      message: 'No Order Number Found!!!',
      code: 0
    });
    

  }
    const [Orderdetails] = await db.query("SELECT * FROM order_details WHERE order_id = ?",id);
   ofmaxu= req.session;

   ofmaxu.OrderDetails = Orderdetails;
   ofmaxu.OrderData= {
    order_number: OrderData[0].order_number,
    date: OrderData[0].date,
    status: OrderData[0].status,
    user_id: OrderData[0].user_id,
    delivery_status: OrderData[0].delivery_status,
  
   };
   

   
  next();
}