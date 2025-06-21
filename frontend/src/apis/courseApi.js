import API_BASE_URL from "../config/api";
import { useParams } from "react-router-dom";

export const addCourseApi = async (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("instructor", data.instructor);
  formData.append("category", data.category);
  formData.append("thumbnail", data.thumbnail); // must be a File object
  formData.append("notes", data.notes); // 👈 important

  if (Array.isArray(data.videos)) {
    data.videos.forEach((video, index) => {
      if (video.file) {
        formData.append("videos", video.file); // must be a File object
        formData.append(`videoMetadata[${index}][title]`, video.title);
        formData.append(`videoMetadata[${index}][duration]`, video.duration);
        formData.append(
          `videoMetadata[${index}][freePreview]`,
          video.freePreview
        );
      }
    });
  }

  const response = await fetch(`${API_BASE_URL}/admin/course/add`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to add course");

  return result;
};

export const showCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/courses`, {
      method: "GET",
      credentials: "include", // if cookies/session are required
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch courses");
    }

    return result;
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    throw error;
  }
};
export const editCourse = async ({ id, formData }) => {
  const fd = new FormData();

  fd.append("title", formData.title);
  fd.append("description", formData.description);
  fd.append("price", formData.price);
  fd.append("instructor", formData.instructor);
  fd.append("notes", formData.notes); // 👈 important
  fd.append("category", formData.category);

  if (formData.thumbnail instanceof File) {
    fd.append("thumbnail", formData.thumbnail);
  }

  formData.videos.forEach((video, index) => {
    if (video.file instanceof File) {
      fd.append(`videos`, video.file);
    }
  });

  const response = await fetch(`${API_BASE_URL}/admin/course/edit/${id}`, {
    method: "PUT",
    body: fd,
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update course");
  }

  return await response.json();
};
export const getCourseDetail = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/course/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch courses");
    }

    return result;
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    throw error;
  }
};

export const myPurchaseCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/my-courses`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch purchased courses");
    }

    return result;
  } catch (error) {
    console.error("Error fetching purchased courses:", error.message);
    throw error;
  }
};

export const getVideoDetails = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/dashboard/mycourse/video/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch courses");
    }

    return result;
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    throw error;
  }
};

export const showAdminCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/courses`, {
      method: "GET",
      credentials: "include", // if cookies/session are required
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch courses");
    }

    return result;
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    throw error;
  }
};

export const searchCourses = async (query) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/dashboard/search?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        credentials: "include", // include cookies for auth if needed
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to search courses");
    }

    return result;
  } catch (error) {
    console.error("Search API Error:", error.message);
    throw error;
  }
};

export const deleteVideo = async ({ courseId, videoId }) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/course/${courseId}/video/${videoId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete video");
    }

    return result;
  } catch (error) {
    console.error("Delete Video API Error:", error.message);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  const response = await fetch(`${API_BASE_URL}/admin/course/${courseId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to delete course");
  }
  return response.json();
};
