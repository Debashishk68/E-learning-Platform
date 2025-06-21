const Razorpay = require("razorpay");
const crypto = require("crypto");
const Course = require("../models/coursesModel");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Step 1: Create Razorpay Order
const createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // amount in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

// Step 2: Verify Razorpay Signature and Enroll User in Course
const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    courseId,
  } = req.body;

  const sign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (sign === razorpay_signature) {
  const update=  await Course.findByIdAndUpdate({_id:courseId}, {
      $addToSet: { studentsEnrolled: userId },
    });
    

    return res.status(200).json({ success: true, message: "Payment verified and course access granted." });
  } else {
    return res.status(400).json({ success: false, message: "Invalid signature." });
  }
};

module.exports = { createOrder, verifyPayment };
