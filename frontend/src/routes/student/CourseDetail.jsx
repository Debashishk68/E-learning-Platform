import React from "react";
import Header from "../../components/Client/Header";
import Sidebar from "../../components/Client/Sidebar";
import useGetCourse from "../../hooks/useCourseDetails";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../../config/api";
import { createOrder, verifyPayment } from "../../apis/payment";

const CourseDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetCourse(id);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (isError) return <div className="p-8 text-red-500">Error: {error.message}</div>;

  const course = data?.courses?.[0];

  if (!course) return <div className="p-8 text-gray-500">Course not found.</div>;

  const isAlreadyEnrolled = course.studentsEnrolled?.includes(userId);

  const handleBuy = async () => {
    if (isAlreadyEnrolled) {
      alert("You have already purchased this course.");
      return;
    }

    const orderRes = await createOrder(course.price);
    const { order } = orderRes;

    const options = {
      key: import.meta.env.VITE_RAZOROAY_API_KEY,
      amount: order.amount,
      currency: "INR",
      name: "EdTech Platform",
      description: "Course Payment",
      order_id: order.id,
      handler: async function (response) {
        const verifyRes = await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          userId,
          courseId: course._id,
        });

        if (verifyRes.success) {
          alert("Course access granted!");
          navigate("/dashboard")
        } else {
          alert("Verification failed!");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex  px-6">
        <div className="hidden lg:block w-64">
          <Sidebar />
        </div>

        <div className="flex-1 pt-20 lg:ml-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            {/* Image */}
            <div className="w-full h-64 overflow-hidden">
              <img
                src={
                  `${API_BASE_URL}${course.thumbnail}` ||
                  "https://source.unsplash.com/600x400/?react,programming"
                }
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Course Info */}
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {course.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <span className="text-2xl font-bold text-green-600">
                  ₹{course.price}
                </span>

                <div className="flex gap-3">
                  <button
                    onClick={handleBuy}
                    disabled={isAlreadyEnrolled}
                    className={`px-5 py-2 rounded-md text-sm transition ${
                      isAlreadyEnrolled
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gray-800 hover:bg-gray-900 text-white"
                    }`}
                  >
                    {isAlreadyEnrolled ? "Already Purchased" : "Buy Now"}
                  </button>

                  <button
                    disabled={isAlreadyEnrolled}
                    className={`border border-gray-800 px-5 py-2 rounded-md text-sm transition ${
                      isAlreadyEnrolled
                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="text-gray-700 whitespace-pre-line leading-relaxed text-sm md:text-base">
                {course.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
