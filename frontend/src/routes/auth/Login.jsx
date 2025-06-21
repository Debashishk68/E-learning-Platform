import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SocialButton from "../../components/SocialButton";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Facebook from "../../assets/Facebook.svg";
import Google from "../../assets/Google.svg";
import Microsoft from "../../assets/Microsoft.svg";
import loginbg from "../../assets/login-bg.svg";
import useLogin from "../../hooks/useLogin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
    isError,
    error: loginError,
    isSuccess,
    data,
  } = useLogin();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setFormError("Invalid email format.");
      return;
    }

    setFormError("");
    login({ email, password });
  };

  useEffect(() => {
    if (isError) {
      toast.error(
        loginError?.response?.data?.error || loginError?.message || "Login failed",
        { position: "top-right" }
      );
    }

    if (isSuccess && data?.role) {
      toast.success("Login successful!", { position: "top-right" });
      setTimeout(() => {
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 1500);
    }
  }, [isError, isSuccess, loginError, data, navigate]);

  return (
    <div className="min-h-screen flex">
      <ToastContainer />

      {/* Left: Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Login to Your Account</h2>

          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              placeholder="Email ID"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!validateEmail(e.target.value)) {
                  setFormError("Invalid email format.");
                } else {
                  setFormError("");
                }
              }}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {formError && <p className="text-red-500 text-sm mt-1">{formError}</p>}

            <div className="mt-6">
              <Button
                text={isPending ? "Signing In..." : "Sign In →"}
                type="submit"
                disabled={isPending}
              />
            </div>

            {/* ✅ Sign up link */}
            <div className="mt-4 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </div>
          </form>

          <div className="my-6 text-center text-sm text-gray-500">Sign In with</div>

          <div className="flex gap-3 flex-col md:flex-row">
            <SocialButton icon={Facebook} text="Facebook" className="text-[#0866FF]" />
            <SocialButton icon={Google} text="Google" className="text-[#DB4437]" />
            <SocialButton icon={Microsoft} text="Microsoft" className="text-[#F25022]" />
          </div>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="w-1/2 hidden md:block">
        <img src={loginbg} alt="Login Illustration" className="h-screen w-full object-contain" />
      </div>
    </div>
  );
};

export default Login;
