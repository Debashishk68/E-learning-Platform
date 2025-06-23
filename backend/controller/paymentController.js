const Razorpay = require("razorpay");
const crypto = require("crypto");
const Course = require("../models/coursesModel");
const Payment = require("../models/payment")
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
       await Payment.create({
      student: userId,
      course: courseId,
      amount: update.price,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      status: "success",
    });

    return res.status(200).json({ success: true, message: "Payment verified and course access granted." });
  } else {
    return res.status(400).json({ success: false, message: "Invalid signature." });
  }
};

const getAdminPayments = async (req, res) => {
  try {
    const adminId = req.user.id;

    // Find courses created by this admin
    const courses = await Course.find({ createdBy: adminId }).select("_id title");

    const courseIds = courses.map(course => course._id.toString());
    const courseMap = new Map(courses.map(c => [c._id.toString(), c.title]));

    // Get successful payments for these courses
    const payments = await Payment.find({
      course: { $in: courseIds },
      status: "success",
    })
      .populate("student", "name email")
      .populate("course", "title");

    // Format the result
    const formatted = payments.map(p => ({
      id: p._id,
      studentName: p.student?.name || "Unknown",
      studentEmail: p.student?.email || "N/A",
      courseTitle: courseMap.get(p.course?._id.toString()) || "N/A",
      amount: p.amount,
      date: p.createdAt,
    }));

    res.status(200).json({
      success: true,
      totalPayments: formatted.length,
      payments: formatted,
    });
    

  } catch (err) {
    console.error("Failed to get admin payments:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createOrder, verifyPayment ,getAdminPayments };
