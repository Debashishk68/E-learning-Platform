// models/Video.js
const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String, // Video URL
      required: true,
    },
    duration: {
      type: String, // Format: "HH:MM" or "MM:SS"
      required: true,
    },
    freePreview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model("Video", videoSchema);
