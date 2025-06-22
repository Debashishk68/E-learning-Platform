const express = require("express");
const router = express.Router();
const isAdminLoggedIn = require("../../middlewares/isAdminLoggedIn");
const {
  addCourse,
  showCourses,
  updateCourse,
  deleteVideo,
  deleteCourse,
  getAdminDashboardStats,
} = require("../../controller/courseController");
const upload = require("../../middlewares/upload");
const userModel = require("../../models/userModel");
const { deleteUser } = require("../../controller/userController");
const { getAdminPayments } = require("../../controller/paymentController");

router.get("/", isAdminLoggedIn, async(req, res) => {
  const {name}= req.user 

  res.json({
    message: "Welcome to Dashboard",
    name,
  });
});

router.get("/courses", isAdminLoggedIn, showCourses);
router.put(
  "/course/edit/:id",
  isAdminLoggedIn,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "notes", maxCount: 1 },
    { name: "videos", maxCount: 20 },
  ]),
  updateCourse
);
router.get("/dashboard",isAdminLoggedIn, getAdminDashboardStats);
router.get("/payments", isAdminLoggedIn, getAdminPayments);


router.post(
  "/course/add",
  isAdminLoggedIn,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "notes", maxCount: 1 },
    { name: "videos", maxCount: 20 }, // adjust as needed
  ]),addCourse
);
router.delete("/delete", isAdminLoggedIn, deleteUser);

router.delete("/course/:courseId",isAdminLoggedIn,deleteCourse)
router.delete("/course/:courseId/video/:videoId",isAdminLoggedIn, deleteVideo);
module.exports = router;
