const { request, response } = require('express');
const {accountDashboard,userServices, createOrder, banUserServices} = require( '../admins/services/accountServices');
const dashbaordController = async (request, response)=>{
    try {
        const {userMessage,userError,userData} = await accountDashboard();
        if(userError){
            return response.status(404).send({
                userMesssage: userMessage,
                userError: error,
                userData: userData
            })
         }
         return response.render('admin/account',{userData: userData});
    } catch (error) {
        
    }
}
const serachUsers = async (request, response)=>{
    try {
        const {userMessage,userError,userData} = await userServices();
        if(userError){
            return response.status(404).send({
                userMesssage: userMessage,
                userError: error,
                userData: userData
            })
         }
         
         return response.render('admin/createorder',{userData: userData});
       
    } catch (error) {
        
    }
}
const userController = async (request, response)=>{
    try {
        const {userMessage,userError,userData} = await userServices();
        if(userError){
            return response.status(404).send({
                userMesssage: userMessage,
                userError: error,
                userData: userData
            })
         }
         return response.render('admin/allusers',{userData: userData});
    } catch (error) {
        
    }
}
const banUserController = async (request, response)=>{
    const {id}=request.params;
    console.log(id);
    try {
        const {userMessage,userError,userData} = await banUserServices(id);
        if(userError){
            return response.status(404).send({
                userMesssage: userMessage,
                userError: error,
                userData: userData
            })
         }
         return response.status(200).send({
            userMesssage: userMessage,
            userError: error,
            userData: userData
        })
    } catch (error) {
        
    }
}

const CreateNewOrder =  async (request, response)=>{

    try {
        data = {
            receive_from: request.body.company,
            order_number: "",
            created_at: new Date(),
            user_id:1,
            status: "recieved",
            delivery_status: 'pending',
            receive_date: request.body.date,
            items: request.body.items,
            qty: request.body.qty
        }
        
      const {userMessage,userError,userData} = await createOrder(data);
        if(userError){
            return response.status(404).send({
                userMesssage: userMessage,
                userError: error,
                userData: userData
            })
         }
         return response.status(200).send({
            userMesssage: userMessage,
            userError: error,
            userData: userData
        });
       
        
    }
    catch(err){

    }
}
module.exports = {
    dashbaordController,
    userController,
    banUserController,
    serachUsers,
    CreateNewOrder
}