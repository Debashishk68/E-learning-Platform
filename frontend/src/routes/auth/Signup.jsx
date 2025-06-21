import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import SocialButton from "../../components/SocialButton";
import signupbg from "../../assets/signup-bg.svg";

import Facebook from "../../assets/Facebook.svg";
import Google from "../../assets/Google.svg";
import Microsoft from "../../assets/Microsoft.svg";
import useRegisterUser from "../../hooks/useRegister";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const { mutate: register, isPending,isSuccess } = useRegisterUser();

  const [formErrors, setFormErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Real-time basic validation
    if (field === "email") {
      setFormErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Invalid email format.",
      }));
    }

    if (field === "confirmPassword" || field === "password") {
      setFormErrors((prev) => ({
        ...prev,
        confirmPassword:
          field === "confirmPassword" || field === "password"
            ? value !== formData.password && formData.confirmPassword
              ? "Passwords do not match."
              : ""
            : prev.confirmPassword,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const { firstName, lastName, username, email, password, confirmPassword } =
      formData;

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      newErrors.general = "Please fill in all fields.";
    }

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Signup Data:", formData);
      register(formData);
      // Proceed with signup logic
    }
  };

  useEffect(() => {
      if(isSuccess){
        navigate('/login')
      }
  }, [isSuccess])
  

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 hidden md:block">
        <img
          src={signupbg}
          alt="Signup Illustration"
          className="h-screen w-full object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 flex-col md:flex-row">
              <InputField
                label="First Name"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              <InputField
                label="Last Name"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>

            <InputField
              label="Username"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />

            <InputField
              label="Email"
              type="email"
              placeholder="Email ID"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}

            <div className="flex gap-4 flex-col md:flex-row">
              <InputField
                label="Password"
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <InputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
              />
            </div>
            {(formErrors.confirmPassword || formErrors.password) && (
              <p className="text-red-500 text-sm">
                {formErrors.confirmPassword || formErrors.password}
              </p>
            )}

            {formErrors.general && (
              <p className="text-red-500 text-sm mt-1">{formErrors.general}</p>
            )}

            <div className="mt-6">
              <Button
                text={isPending ? "Creating..." : "Create Account →"}
                type="submit"
                disabled={isPending}
              />
            </div>
          </form>

          <div className="my-6 text-center text-sm text-gray-500">
            Sign up with
          </div>

          <div className="flex gap-3 flex-col md:flex-row">
            <SocialButton
              icon={Facebook}
              text="Facebook"
              className="text-[#0866FF]"
            />
            <SocialButton
              icon={Google}
              text="Google"
              className="text-[#DB4437]"
            />
            <SocialButton
              icon={Microsoft}
              text="Microsoft"
              className="text-[#F25022]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
