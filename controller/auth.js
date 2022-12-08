
const db = require('../config/db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
checkuser = async (data) =>{

    return  await db.query("SELECT * FROM users WHERE email = ?", [data]);
  }
    exports.Register =  async (req,res) => {
      
      try {
        
        const [rows] = await checkuser(req.body.email);
        if(rows.length >= 1 ){
          return res.status(200).send({
            message: 'This email is already in use!',
            code: 0
          });
        }
       
        const value = {
          firstname:req.body.firstname, 
          lastname:req.body.lastname, 
          email:req.body.email, 
          password: await bcrypt.hash(req.body.password, 10), 
          phone:req.body.phone, 
          address:req.body.address, 
          city:req.body.city,
           state:req.body.state , 
           created_at: new Date(), 
           updated_at: new Date()
        }
       
        const createUser = await db.query(`INSERT INTO users SET ?`,value);
        if(!createUser){
          return res.status(200).send({
            message: 'error creating user',
            code: 0
          });
        }
        return res.status(200).send({
          data:createUser,
          message: 'Successful Registered!'
        }); 
      } catch (err) {
        console.log(err);
      }
    }
  
    exports.login = async (req, res, next) => {
      try {
        
        const [rows] = await checkuser(req.email);
        ///console.log((rows[0].city))
        if(rows.length == 0 ){
          return res.status(200).send({
            message: `${req.body.email} Not a user!`,
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

    // exports.login = async (req, res, next) => {
    //   try {
        
    //     const [rows] = await checkuser(req.body.email);
    //     console.log(rows.length)
    //     if(rows.length == 0 ){
    //       return res.status(200).send({
    //         message: 'User Does not exist!',
    //         code: 0
    //       });
    //     };
    //     let password =req.body.password;
    //     console.log(rows[0])
    //       bcrypt.compare(password,rows[0].password, (err, isMatch)=>{
          
    //         if(isMatch){
    //           const theToken = jwt.sign({id:rows[0].id,email:rows[0].email},'SecretKey',{ expiresIn: '7h' });
    //           ofmaxu = req.session;
    //           ofmaxu.email = req.body.email;
    //           console.log(ofmaxu.email);
    //           return res.json({
    //               token:theToken,
    //               message: `${req.body.email} is logged in`,
    //               email: ofmaxu.email
    //           });
             

      
    //         }else{
              
    //           return res.status(200).json({
    //             message: "Incorrect password",
    //             code: 0
    //         });
    //         }
    //     });
              
        
            
            
      
       

    // } catch (err) {
    //     next(err)
        
    // }
    // }