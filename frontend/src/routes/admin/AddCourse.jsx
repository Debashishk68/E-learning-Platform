import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaPlus, FaChevronDown } from "react-icons/fa";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import InputField from "../../components/InputField";
import TextArea from "../../components/Admin/TextArea";
import Button from "../../components/Button";
import useAddCourse from "../../hooks/useAddCourse";

export default function AddCourse() {
  const navigate = useNavigate();
  const { mutate: addCourse, isPending ,isSuccess } = useAddCourse();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    instructor: "",
    thumbnail: null,
    notes: null,
    category: "",
    videos: [{ title: "", file: null, duration: "", freePreview: false }],
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));

      if (name === "thumbnail") {
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleVideoChange = (index, field, value) => {
    const updated = [...formData.videos];
    updated[index][field] = field === "file" ? value[0] : value;
    setFormData((prev) => ({ ...prev, videos: updated }));
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
      setError("Price should be greater than ₹100");
      return;
    }

    if (!formData.thumbnail) {
      setError("Please upload a thumbnail image.");
      return;
    }

    setError("");
    addCourse(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course added successfully!");
      setTimeout(() => {
        navigate("/admin");
      }, 1500); // Delay so toast is visible
    }
  }, [isSuccess, navigate]);
  

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <ToastContainer />
      <AdminSidebar />

      <div className="flex-1 p-8 pl-64">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            📚 Add New Course
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Grid fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Course Title"
                name="title"
                placeholder="React Mastery"
                value={formData.title}
                onChange={handleChange}
              />

              <InputField
                label="Instructor"
                name="instructor"
                placeholder="John Doe"
                value={formData.instructor}
                onChange={handleChange}
              />

              <InputField
                label="Price (INR)"
                name="price"
                type="number"
                placeholder="e.g. 999"
                value={formData.price}
                onChange={handleChange}
              />

              {/* Thumbnail upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleChange}
                  className="block w-full text-sm file:py-2 file:px-4 file:border-0 file:bg-blue-100 file:text-blue-700 rounded-md hover:file:bg-blue-200"
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-48 h-28 object-cover rounded-lg mt-2 border"
                  />
                )}
              </div>
            </div>

            {/* Description */}
            <TextArea
              label="Course Description"
              name="description"
              placeholder="What is this course about?"
              value={formData.description}
              onChange={handleChange}
            />

            {/* Category */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Course Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-10 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  <option value="digital-marketing">
                    📢 Digital Marketing
                  </option>
                </select>
                <FaChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 pointer-events-none text-xs" />
              </div>
            </div>

            {/* Notes Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Notes (PDF)
              </label>
              <input
                type="file"
                name="notes"
                accept="application/pdf"
                onChange={handleChange}
                className="block w-full text-sm file:py-2 file:px-4 file:border-0 file:bg-green-100 file:text-green-700 rounded-md hover:file:bg-green-200"
              />
              {formData.notes && (
                <p className="text-sm text-gray-600 mt-1">
                  📄 Selected: {formData.notes.name}
                </p>
              )}
            </div>

            {/* Video Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                🎥 Course Videos
              </h3>

              <div className="space-y-4">
                {formData.videos.map((video, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-md bg-gray-50 space-y-3 shadow-sm"
                  >
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        handleVideoChange(index, "file", e.target.files)
                      }
                      className="text-sm"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addMoreVideo}
                className="mt-4 flex items-center gap-2 text-blue-600 hover:underline text-sm"
              >
                <FaPlus />
                Add Another Video
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <Button
              text={isPending ? "Adding..." : "🚀 Add Course"}
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
