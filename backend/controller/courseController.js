const Course = require("../models/coursesModel.js");
const Video = require("../models/videoModel.js");
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel.js");

const getAdminDashboardStats = async (req, res) => {
  try {
    const adminId = req.user.id;

    // Fetch all courses created by this admin
    const adminCourses = await Course.find({ createdBy: adminId }).select(
      "price studentsEnrolled title"
    );

    const activeCourses = adminCourses.length;

    // Calculate revenue from only this admin's courses
    let revenue = 0;
    const enrolledStudentIdsSet = new Set();

    adminCourses.forEach((course) => {
      revenue += course.price * course.studentsEnrolled.length;
      course.studentsEnrolled.forEach((id) =>
        enrolledStudentIdsSet.add(id.toString())
      );
    });

    const enrolledStudentIds = Array.from(enrolledStudentIdsSet);

    // Total students who enrolled in this admin’s courses
    const totalStudents = enrolledStudentIds.length;

    // Find new admissions among them (last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const newAdmissions = await User.countDocuments({
      _id: { $in: enrolledStudentIds },
      createdAt: { $gte: oneWeekAgo },
    });

    // Get student details
    const students = await User.find({
      _id: { $in: enrolledStudentIds },
    })
      .populate("enrolledCourses", "title createdBy")
      .select("name email createdAt enrolledCourses")
      .sort({ createdAt: -1 });

    const studentList = students.map((student) => {
      const enrolledCourse = student.enrolledCourses.find(
        (course) => course.createdBy.toString() === adminId.toString()
      );

      return {
        id: student._id,
        name: student.name,
        email: student.email,
        batch: student.createdAt.getFullYear() + 1,
        course: enrolledCourse?.title || "N/A",
      };
    });

    // Send response
    return res.status(200).json({
      totalStudents,
      newAdmissions,
      activeCourses,
      revenue,
      students: studentList,
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAdminCourses = async (req, res) => {
  try {
    const { id, role } = req.user;

    if (role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }

    const courses = await Course.find({ createdBy: id });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("Admin Courses Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addCourse = async (req, res) => {
  try {
    const { title, description, price, instructor, category } = req.body;

    const thumbnail = req.files["thumbnail"]?.[0];
    const notesFile = req.files["notes"]?.[0];
    const videoFiles = req.files["videos"] || [];

    // Create Course
    const course = await Course.create({
      title,
      description,
      price,
      instructor,
      thumbnail: thumbnail ? `/uploads/thumbnails/${thumbnail.filename}` : null,
      notes: notesFile
        ? {
            name: notesFile.originalname,
            path: `/uploads/notes/${notesFile.filename}`,
          }
        : null,
      createdBy: req.user?.id,
      category: category,
    });

    // Save course videos
    for (let i = 0; i < videoFiles.length; i++) {
      const videoFile = videoFiles[i];

      const videoTitle = req.body[`videoMetadata[${i}][title]`];
      const videoDuration = req.body[`videoMetadata[${i}][duration]`];
      const videoFreePreview =
        req.body[`videoMetadata[${i}][freePreview]`] === "true";

      await Video.create({
        title: videoTitle || videoFile.originalname,
        duration: Number(videoDuration) || 0,
        freePreview: videoFreePreview,
        courseId: course._id,
        fileUrl: `/uploads/videos/${videoFile.filename}`,
      });
    }

    res.status(201).json({ message: "Course created", courseId: course._id });
  } catch (err) {
    console.error("Course Creation Error:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while creating course." });
  }
};

const showCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

const getCourseDetails = async (req, res) => {
  const _id = req.params.id;
  try {
    const courses = await Course.find({ _id });
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

const getMyCourseVideos = async (req, res) => {
  const courseId = req.params.id;

  try {
    const videos = await Video.find({ courseId });

    if (!videos || videos.length === 0) {
      return res
        .status(404)
        .json({ message: "No videos found for this course." });
    }

    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching course videos:", error.message);
    res.status(500).json({ error: "Failed to fetch course videos." });
  }
};

const videoStream = async (req, res) => {
  try {
    const { id } = req.params;

    const range = req.headers.range;
    if (!range) {
      return res.status(400).send("Requires Range header");
    }

    const video = await Video.findById(id); // 🔍 Use id directly, not {_id: id}
    if (!video || !video.fileUrl) {
      return res.status(404).send("Video not found");
    }

    // 🔧 Correct path construction
    const videoPath = path.join(__dirname, "..", video.fileUrl);

    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 1 * 1e6; // 1MB chunk
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end });
    stream.pipe(res);
  } catch (err) {
    console.error("Error streaming video:", err.message);
    res.status(500).json({ error: "Failed to stream video" });
  }
};
const myCourses = async (req, res) => {
  const userId = req.id?.user;

  try {
    const courses = await Course.find({
      studentsEnrolled: { $in: userId },
    });

    // No need for null check — just return the (possibly empty) array
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error.message);
    res.status(500).json({ error: "Failed to fetch enrolled courses." });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      instructor,
      videoTitles,
      videoDurations,
      category,
    } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Validate and convert price
    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ message: "Invalid price value" });
    }

    // Update basic fields
    course.title = title;
    course.description = description;
    course.price = numericPrice;
    course.instructor = instructor;
    course.category = category;

    // Update thumbnail if provided
    const thumbnailFile = req.files?.thumbnail?.[0];
    if (thumbnailFile) {
      course.thumbnail = `/uploads/thumbnails/${thumbnailFile.filename}`;
    }

    // Update notes if provided
    const notesFile = req.files?.notes?.[0];
    if (notesFile) {
      course.notes = {
        name: notesFile.originalname,
        path: `/uploads/notes/${notesFile.filename}`,
      };
    }

    // Handle new video uploads
    const videoFiles = req.files?.videos || [];

    // Normalize metadata
    const titles = Array.isArray(videoTitles) ? videoTitles : [videoTitles];
    const durations = Array.isArray(videoDurations)
      ? videoDurations
      : [videoDurations];

    for (let i = 0; i < videoFiles.length; i++) {
      const file = videoFiles[i];

      await Video.create({
        title: titles[i] || file.originalname,
        duration: Number(durations[i]) || 0,
        fileUrl: `/uploads/videos/${file.filename}`,
        courseId: course._id,
        mimetype: file.mimetype,
        size: file.size,
      });
    }

    await course.save();

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const searchCourses = async (req, res) => {
  const { query } = req.query;

  if (!query || !query.trim()) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    const searchRegex = new RegExp(query.trim(), "i"); // case-insensitive match

    const courses = await Course.find({
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ],
    });

    if (!courses.length) {
      return res.status(404).json({ message: "No matching courses found." });
    }

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ message: "Server error while searching courses." });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { courseId, videoId } = req.params;
    const video = await Video.findByIdAndDelete(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json({ success: true, message: "Video deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Delete thumbnail
    if (course.thumbnail) {
      const thumbPath = path.join(__dirname, "..", course.thumbnail);
      if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
    }

    // Delete notes
    if (course.notes?.path) {
      const notesPath = path.join(__dirname, "..", course.notes.path);
      if (fs.existsSync(notesPath)) fs.unlinkSync(notesPath);
    }

    // ✅ Only attempt to delete videos if they exist
    if (Array.isArray(course.videos)) {
      course.videos.forEach((video) => {
        if (video?.filePath) {
          const videoPath = path.join(__dirname, "..", video.filePath);
          if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
        }
      });
    }

    await Course.findByIdAndDelete(courseId);

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Delete course error:", err);
    res.status(500).json({ message: "Server error while deleting course" });
  }
};

module.exports = {
  addCourse,
  showCourses,
  getCourseDetails,
  getMyCourseVideos,
  videoStream,
  myCourses,
  updateCourse,
  deleteVideo,
  searchCourses,
  deleteCourse,
  getAdminDashboardStats,
  getAdminCourses,
};
