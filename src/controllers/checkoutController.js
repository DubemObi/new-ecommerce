const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const OrderHistory = require("../models/orderHistory");
const Flutterwave = require("flutterwave-node-v3");
const nodemailer = require("nodemailer");
const { email } = require("../utils/email");
const flw = new Flutterwave(
  String(process.env.FLW_PUBLIC_KEY),
  String(process.env.FLW_SECRET_KEY)
);

exports.checkOut = async (request, res) => {
  try {
    const orderID = request.params.id;
    const user = request.user;
    const findOrder = await Order.findById(orderID);
    if (findOrder && findOrder.user.toString() === user.id.toString()) {
      let payload = request.body;
      try {
        payload = {
          ...payload,
          amount: findOrder.total,
          tx_ref: "hy_ " + Math.floor(Math.random() * 1000000000 + 1),
          enckey: process.env.FLW_ENCRYPTION_KEY,
        };
        const response = await flw.Charge.card(payload);

        if (response.meta.authorization.mode === "pin") {
          let payload2 = payload;
          payload2.authorization = {
            mode: "pin",
            fields: ["pin"],
            pin: 3310,
          };
          const reCallCharge = await flw.Charge.card(payload2);

          // Add the OTP to authorize the transaction
          const callValidate = await flw.Charge.validate({
            otp: "12345",
            flw_ref: reCallCharge.data.flw_ref,
          });
          if (callValidate.status === "success") {
            let cartItems = await Cart.find({ user: user.id });
            if (cartItems) {
              cartItems.map(async (cartItem) => {
                await Cart.findByIdAndDelete(cartItem._id);
              });
            }

            await email({
              email: "chidubemobinwanne@gmail.com",
              subject: "Order Completed from Ecommerce App",
              text: findOrder,
            });

            await OrderHistory.create({
              user: user.id,
              order: findOrder.id,
              total: findOrder.total,
            });

            res.status(200).json({
              status: "success",
              message: "Order completed successfully",
            });

            await Order.findByIdAndDelete(orderID);
          }
          if (callValidate.status === "error") {
            return res.status(400).send("please try again");
          } else {
            res.status(400).send("payment failed");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      response.status(401).json({ message: "Unauthorized user" });
    }
  } catch (err) {
    console.log(err);
    response.status(400).json({ message: "Incomplete requirements" });
  }
};
