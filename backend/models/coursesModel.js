const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    thumbnail: {
      type: String,
      default: "", // URL of image
    },
    instructor: {
      type: String,
      required: [true, "Instructor name is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    duration: {
      type: String,
      default: "Self-paced",
    },
    price: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    notes: {
      name: { type: String },
      path: { type: String },
    },

    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming admin is a user
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
