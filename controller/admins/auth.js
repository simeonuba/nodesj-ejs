const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


checkuser = async (data) =>{
  return db.query('SELECT * FROM `admin` WHERE `email` = ?', [data]);
}
    exports.Register =  async (req,res) => {
      
      try {
        
        const [rows] = await checkuser(req.body.email);
        if(rows.length > 0 ){
          return res.status(200).send({
            message: `${req.body.email} is already Admin!`,
            code: 0
          });
        }
       
        const value = {
          
          email:req.body.email, 
          password: await bcrypt.hash(req.body.password, 10), 
           create_time: new Date(), 
           update_time: new Date()
        }
       
        const createUser = await db.query(`INSERT INTO admin SET ?`,value);
        if(!createUser){
          return res.status(200).send({
            message: 'error creating user',
            code: 0
          });
        }
        return res.status(200).send({
          data:createUser,
          message: `${req.body.email}  Successfully Assigned Admin Role!`
        }); 
      } catch (err) {
        console.log(err);
      }
    }
  
    exports.login = async (req, res, next) => {
      try {
        
        const [rows] = await checkuser(req.body.email);
        if(rows.length < 1 ){
          return res.status(200).send({
            message: `${req.body.email} Not an Admin!`,
            code: 0
          });
        };
        let password =req.body.password;
          bcrypt.compare(password,rows[0].password, (err, isMatch)=>{
          
            if(isMatch){
              const theToken = jwt.sign({id:rows[0].id,email:rows[0].email},'SecretKey',{ expiresIn: '7h' });
              ofmaxAdmin = req.session;
              ofmaxAdmin.email = req.body.email;
              console.log(ofmaxAdmin.email);
              return res.json({
                  token:theToken,
                  message: `${req.body.email} is logged in`,
                  email: ofmaxAdmin.email
              });
             

      
            }else{
              
              return res.status(200).json({
                message: "Incorrect password",
                code: 0
            });
            }
        });
              
        
            
            
      
       

    } catch (err) {
        next(err)
        
    }
    }
