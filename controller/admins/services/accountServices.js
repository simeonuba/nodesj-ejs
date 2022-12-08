const Accounts = require('../../admins/models/accountModel');
const Orders = require('../../admins/models/orders.model');
const accountDashboard = async () => {

  try {
    const [getAllUsers] = await Accounts.findAll();
    const [getAllOrders] = await Orders.findAll();
    const [getDeliveredOrders] = await Orders.findByStatus('completed');
    const [getPendingOrders] = await Orders.findByStatus('pending');

    return {
      userMessage: "All Users Fetch",
      userError: false,
      userData: { users: getAllUsers, orders: getAllOrders, delivered: getDeliveredOrders, pending: getPendingOrders },
    };
  } catch (error) {

  }
}

const userServices = async () => {

  try {
    const [getAllUsers] = await Accounts.findAll();

    return {
      userMessage: "All Users Fetch",
      userError: false,
      userData: getAllUsers,
    };
  } catch (error) {

  }
}

const orderServices = async () => {
  try {
    const [getAllOrders] = await Orders.findAll();

    return {
      userMessage: "All Orders Fetch",
      userError: false,
      userData: getAllOrders,
    };
  } catch (error) {

  }
}
const createOrder = async (data) => {

  let ProductCode = Math.random(0, 1);
  //console.log(ProductCode);

  let orderNumber = Math.random().toString(36).substr(2, 14);
  //console.log(orderNumber);
  data.order_number = orderNumber;
  // console.log(data)
  const { items, qty, ...othersInfo } = data;
  console.log(data);
  try {

    const newOrderSet = await Orders.createOne(othersInfo);
    const item = data.items;
    const qtys = data.qty;
    if (newOrderSet) {
      for (var i = 0; i < item.length; i++) {
        for (var e = 0; e < qtys.length; e++) {
          const itemsData = {
            order_id: orderNumber,
            item: item[i],
            qty: qtys[e],
          }
          console.log(itemsData);
          return await Orders.createOneDetails(itemsData);
        }

       

      }




    }






    return {
      userMessage: "Order Created",
      userError: false,
      userData: data,
    };
  } catch (error) {
    const { message } = error;
    return {
      userMessage: "Order Created",
      userError: true,
      userData: message,
    };
  }
}
const banUserServices = async (data) => {

  try {
    const [banUser] = await Accounts.banOne(data);
    console.log(data)

    return {
      userMessage: "User Ban Successfully",
      userError: false,
      userData: banUser,
    };
  } catch (error) {

  }
}

module.exports = {
  accountDashboard,
  userServices,
  banUserServices,
  createOrder

}