const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const upload = require("../../middlewares/upload");

const {
  showCourses,
  getCourseDetails,
  getMyCourseVideos,
  videoStream,
  myCourses,
  searchCourses
} = require("../../controller/courseController");
const { editProfile } = require("../../controller/userController");
const userModel = require("../../models/userModel");

router.get("/", isLoggedIn, async(req, res) => {
  const user = await userModel.findOne({_id:req.id.user})
  res.json({ message: "Welcome to Dashboard", name:user.name,profilePic:user.profilepic});
});
router.get("/my-courses",isLoggedIn,myCourses)

router.get("/courses", isLoggedIn, showCourses);
router.get("/course/:id", isLoggedIn, getCourseDetails);
router.get("/mycourse/video/:id",isLoggedIn,getMyCourseVideos);
router.get("/video/stream/:id",isLoggedIn,videoStream);
router.get("/search", searchCourses);

router.put("/edit-profile", isLoggedIn, upload.single("profilePic"), editProfile);

module.exports = router;
