const db = require('../../../config/db.js');

class Accounts {

    static  async findOne (data){
        const {id,email}=data;

        if(!id){
         return  await db.query("SELECT * FROM users WHERE email = ?", [email]);

        }
        return await db.query("SELECT * FROM users WHERE id = ?", [id]);
        

    }
    static  async findAll (){
       return await db.query("SELECT * FROM users");
     

    }

    static async createOne(data){
     return await db.query(`INSERT INTO users SET ?`,data);
        
    }
    
    static async deleteOne(data){
     return await db.query('DELETE FROM users WHERE ?', data);

    }
    static async banOne(data){
        return await db.query('UPDATE users SET  visible = 0  WHERE id=?', data);
   
       }

    static async upadatePassword(data){
        const {email, password} =data
       return await db.query('UPDATE users SET password=?  WHERE  email=?', [password, email]); 
     
    }
    static async updateUserInfo(data){
        
    }
    

}


module.exports = Accounts;