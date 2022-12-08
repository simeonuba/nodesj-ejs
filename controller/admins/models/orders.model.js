const db = require('../../../config/db.js');

class Orders {

    static  async findOne (data){
        const {id}=data;

       return await db.query("SELECT * FROM orders WHERE id = ?", [id]);
        

    }
    static  async findAll (){
        return await db.query("SELECT * FROM orders");
    }

    static  async findByStatus(data){
  
     return await db.query("SELECT * FROM orders WHERE status = ?",data);
  
    }

    static async createOne(data){
       // console.log(data);
     const od = await db.query(`INSERT INTO orders SET ?`,data);
     return od;
        
    }
    static async createOneDetails(data){
        return await db.query(`INSERT INTO order_details SET ?`,data);
           
       }

    static async deleteOne(data){
     return await db.query('DELETE FROM orders WHERE ?', data);

    }

    static async upadateOrder(data){
        const {id} =data
       return await db.query('UPDATE users SET password=?  WHERE  id=?', [password, id]); 
     
    }
    static async updateUserInfo(data){
        
    }
    

}


module.exports = Orders;