import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaPlus, FaTrash } from "react-icons/fa";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import InputField from "../../components/InputField";
import TextArea from "../../components/Admin/TextArea";
import Button from "../../components/Button";
import useGetCourse from "../../hooks/useCourseDetails";
import useGetCourseVideos from "../../hooks/useGetCourseVideos";
import useEditCourse from "../../hooks/useEditCourse";
import useDeleteVideo from "../../hooks/useDeleteVideo";
import useDeleteCourse from "../../hooks/useDeleteCourse";
import API_BASE_URL from "../../config/api";

export default function EditCourse() {
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  const { data: course, isLoading, isError } = useGetCourse(courseId);
  const {
    data: courseVideos,
    isLoading: videosLoading,
    isError: videosError,
  } = useGetCourseVideos(courseId);

  const { mutate: editCourse, isPending, isSuccess } = useEditCourse();
  const { mutate: deleteVideo } = useDeleteVideo();
  const { mutate: deleteCourse } = useDeleteCourse();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    instructor: "",
    thumbnail: null,
    notes: null,
    category: "",
    videos: [],
  });

  const [previewUrls, setPreviewUrls] = useState({
    thumbnail: null,
    notes: null,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (course?.courses?.length > 0) {
      const courseData = course.courses[0];
      setFormData({
        title: courseData.title,
        description: courseData.description,
        price: courseData.price,
        instructor: courseData.instructor,
        thumbnail: courseData.thumbnail,
        notes: courseData.notes,
        category: courseData.category,
        videos: Array.isArray(courseVideos?.videos) ? courseVideos.videos : [],
      });

      setPreviewUrls({
        thumbnail: courseData.thumbnail
          ? `${API_BASE_URL}${courseData.thumbnail}`
          : null,
        notes: courseData.notes?.path
          ? `${API_BASE_URL}${courseData.notes.path}`
          : null,
      });
    }
  }, [course, courseVideos]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreviewUrls((prev) => ({
        ...prev,
        [name]: name === "thumbnail" ? URL.createObjectURL(file) : file.name,
      }));
    } else {
      const updatedValue = name === "price" ? Number(value) : value;
      setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    }
  };

  const handleVideoChange = (index, field, value) => {
    const updated = [...formData.videos];
    updated[index][field] = field === "file" ? value[0] : value;
    setFormData((prev) => ({ ...prev, videos: updated }));
  };

  const handleVideoDelete = (videoId) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      deleteVideo({ courseId, videoId });
    }
  };

  const handleDeleteCourse = () => {
    if (
      window.confirm(
        "⚠️ This will permanently delete the course. Are you sure?"
      )
    ) {
      deleteCourse(courseId, {
        onSuccess: () => {
          toast.success("🗑️ Course deleted successfully");
          setTimeout(() => navigate("/admin/courses"), 1500);
        },
        onError: () => {
          toast.error("❌ Failed to delete course");
        },
      });
    }
  };

  const addMoreVideo = () => {
    setFormData((prev) => ({
      ...prev,
      videos: [
        ...prev.videos,
        { title: "", file: null, duration: "", freePreview: false },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formData.price) <= 100) {
      setError("Price must be greater than ₹100");
      return;
    }
    setError("");
    console.log(formData.price);
    editCourse({ id: courseId, formData });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("✅ Course updated successfully!");
      navigate("/admin");
    }
  }, [isSuccess]);

  if (isLoading || videosLoading)
    return <p className="text-center p-8">Loading...</p>;
  if (isError || videosError)
    return (
      <p className="text-center text-red-500 p-8">
        Error loading course or videos.
      </p>
    );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <ToastContainer />
      <AdminSidebar />
      <div className="flex-1 p-8 pl-64">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">✏️ Edit Course</h2>
            <button
              onClick={handleDeleteCourse}
              className="text-sm text-red-600 border border-red-500 px-3 py-1 rounded hover:bg-red-100"
            >
              🗑️ Delete Course
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Course Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <InputField
                label="Instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
              />
              <InputField
                label="Price (INR)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />

              <div>
                <label className="block text-sm font-medium mb-1">
                  Thumbnail
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleChange}
                  className="file:bg-blue-100 hover:file:bg-blue-200 block w-full file:py-2 file:px-4 file:border-0 file:text-blue-700 text-sm rounded-md"
                />
                {previewUrls.thumbnail && (
                  <img
                    src={previewUrls.thumbnail}
                    alt="Preview"
                    className="w-48 h-28 object-cover rounded-lg mt-2 border"
                  />
                )}
              </div>
            </div>

            <TextArea
              label="Course Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <div>
              <label className="block text-sm font-medium mb-1">
                Course Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-700 py-2 px-3 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="web-development">🌐 Web Development</option>
                <option value="mobile-development">
                  📱 Mobile App Development
                </option>
                <option value="ai-ml">🤖 AI & Machine Learning</option>
                <option value="data-science">📊 Data Science</option>
                <option value="ui-ux">🎨 UI/UX Design</option>
                <option value="cyber-security">🛡 Cybersecurity</option>
                <option value="digital-marketing">📢 Digital Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Course Notes (PDF)
              </label>
              <input
                type="file"
                name="notes"
                accept="application/pdf"
                onChange={handleChange}
                className="block w-full text-sm file:py-2 file:px-4 file:bg-green-100 file:text-green-700 rounded-md hover:file:bg-green-200"
              />
              {formData.notes instanceof File ? (
                <p className="text-sm text-gray-600 mt-1">
                  📄 Selected: {formData.notes.name}
                </p>
              ) : formData.notes?.path ? (
                <a
                  href={`${API_BASE_URL}${formData.notes.path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 underline mt-2 block"
                >
                  📄 {formData.notes.name || "View Notes"}
                </a>
              ) : null}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                🎥 Course Videos
              </h3>
              <div className="space-y-4">
                {Array.isArray(formData.videos) &&
                  formData.videos.map((video, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-md bg-gray-50 shadow-sm relative"
                    >
                      {video.title && video.duration ? (
                        <>
                          <p className="text-sm font-medium">
                            🎬 {video.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            Duration: {video.duration} mins
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <label className="text-sm">Free Preview</label>
                            <input
                              type="checkbox"
                              checked={video.freePreview}
                              onChange={(e) =>
                                handleVideoChange(
                                  index,
                                  "freePreview",
                                  e.target.checked
                                )
                              }
                            />
                          </div>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) =>
                              handleVideoChange(index, "file", e.target.files)
                            }
                            className="text-sm"
                          />
                        </>
                      )}

                      {video._id && (
                        <button
                          onClick={() => handleVideoDelete(video._id)}
                          type="button"
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
              </div>

              <button
                type="button"
                onClick={addMoreVideo}
                className="mt-4 flex items-center gap-2 text-blue-600 hover:underline text-sm"
              >
                <FaPlus /> Add Another Video
              </button>
            </div>

            <Button
              text={isPending ? "Updating..." : "✅ Update Course"}
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
