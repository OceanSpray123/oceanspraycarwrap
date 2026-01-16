"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

// Email validation regex
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Main Application Form Component
export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    currentAddress: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    phone: "+1",
    email: "",
    bankName: "",
    gender: "",
    motorVehicleType: "",
    contractDuration: "",
    driverLicenseFront: null,
    driverLicenseBack: null,
  });

  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "warning" | null;
    message: string;
    details?: string;
  }>({ type: null, message: "" });

  // Field validation function
  const validateField = (name: string, value: string) => {
    let error = "";

    if (["zip"].includes(name)) {
      if (value && !/^\d+$/.test(value)) error = "Only numbers are allowed";
    }

    if (name === "phone") {
      if (!value.startsWith("+1")) error = "Phone number must start with +1";
      const digits = value.replace("+1", "");
      if (!/^\d*$/.test(digits)) error = "Only numbers allowed after +1";
      if (digits.length !== 10) error = "Phone number must be 10 digits";
    }
    if (name === "email" && value && !emailRegex.test(value)) {
      error = "Enter a valid email address";
    }

    return error;
  };

  // Input change handler for text and select inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Blur event handler for inputs
  const handleBlur = (name: string, value: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Input class determination based on validation state
  const getInputClass = (name: string) => {
    if (errors[name] && touched[name]) return "border-red-500";
    if (!errors[name] && touched[name]) return "border-green-500";
    return "border-gray-300 focus:border-blue-500";
  };

  // File input change handler
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" }); // Clear previous messages

    // Validate form
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && !key.includes("apt")) {
        newErrors[key] = "This field is required";
      } else if (typeof value === "string") {
        const err = validateField(key, value);
        if (err) newErrors[key] = err;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((a, k) => ({ ...a, [k]: true }), {})
    );

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      setSubmitStatus({
        type: "warning",
        message: "Please fix the errors in the form before submitting.",
        details: `${Object.keys(newErrors).length} field(s) need attention.`,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        // SUCCESS
        setSubmitStatus({
          type: "success",
          message:
            data.message ||
            "Application submitted successfully! Kindly check your Inbox/Junk Email for confirmation shortly.",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/");
        }, 5000);
      } else {
        // ERROR - Show specific message
        let errorType: "error" | "warning" = "error";
        let errorDetails = "";

        // User-fixable errors are warnings
        if (
          data.error === "MISSING_REQUIRED_FIELDS" ||
          data.error === "MISSING_LICENSE_IMAGES" ||
          data.error === "INVALID_FILE_TYPE"
        ) {
          errorType = "warning";
          if (data.fields) {
            errorDetails = `Missing: ${data.fields.join(", ")}`;
          }
        }
        setSubmitStatus({
          type: errorType,
          message:
            data.message || "Failed to submit application. Please try again.",
          details: errorDetails,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error: Unable to connect to the server.",
        details: "Please check your internet connection and try again.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (name: string) =>
    errors[name] &&
    touched[name] && (
      <p className="text-sm text-red-600 mt-1">{errors[name]}</p>
    );

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-cyan-50 to-white">
      {/* Back Home Button */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
        >
          ← Back to Home
        </Link>
      </div>

      {submitStatus.type && (
        <div
          className={`mb-6 rounded-lg shadow-lg p-4 flex items-start gap-3 ${
            submitStatus.type === "success"
              ? "bg-green-50 border-l-4 border-green-500"
              : submitStatus.type === "warning"
              ? "bg-yellow-50 border-l-4 border-yellow-500"
              : "bg-red-50 border-l-4 border-red-500"
          }`}
        >
          <div className="flex-1">
            <h3
              className={`font-bold text-lg mb-1 ${
                submitStatus.type === "success"
                  ? "text-green-800"
                  : submitStatus.type === "warning"
                  ? "text-yellow-800"
                  : "text-red-800"
              }`}
            >
              {submitStatus.type === "success" && "✓ Success!"}
              {submitStatus.type === "warning" && "⚠ Please Check Your Form"}
              {submitStatus.type === "error" && "✗ Submission Failed"}
            </h3>
            <p
              className={`${
                submitStatus.type === "success"
                  ? "text-green-700"
                  : submitStatus.type === "warning"
                  ? "text-yellow-700"
                  : "text-red-700"
              }`}
            >
              {submitStatus.message}
            </p>
            {submitStatus.details && (
              <p
                className={`mt-2 text-sm ${
                  submitStatus.type === "success"
                    ? "text-green-600"
                    : submitStatus.type === "warning"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {submitStatus.details}
              </p>
            )}
          </div>

          <button
            onClick={() => setSubmitStatus({ type: null, message: "" })}
            className={`shrink-0 p-1 rounded hover:bg-white/50 transition ${
              submitStatus.type === "success"
                ? "text-green-600"
                : submitStatus.type === "warning"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
            aria-label="Dismiss message"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero Section - Reduced */}
      <div className="bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 text-white py-8 px-4 sm:py-10 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3">
            Join the Ocean Spray Team!
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
            Start earning{" "}
            <span className="font-bold text-cyan-200">$750 per week</span> by
            wrapping your vehicle
          </p>

          {/* Benefits - Compact */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
              <span className="font-semibold">No Application Fees</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
              <span className="font-semibold">Professional Installation</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
              <span className="font-semibold">Weekly Payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">
            Applicant Information
          </h2>
          <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Fill out the form below to get started
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 sm:space-y-6 cursor-pointer"
          >
            {/* First Name & Last Name - Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full border-2 ${getInputClass(
                    "firstName"
                  )} rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base`}
                />
                {renderError("firstName")}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full border-2 ${getInputClass(
                    "lastName"
                  )} rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base`}
                />
                {renderError("lastName")}
              </div>
            </div>

            {/* Full Street Address - Full Width */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Full Street Address (not PO BOX){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="currentAddress"
                placeholder="Enter your street address"
                value={formData.currentAddress}
                onChange={handleInputChange}
                className={`w-full border-2 ${getInputClass(
                  "currentAddress"
                )} rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base`}
              />
              {renderError("currentAddress")}
            </div>

            {/* Apartment - Full Width */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Apartment # (Optional)
              </label>
              <input
                name="apt"
                placeholder="Apartment number (if applicable)"
                value={formData.apt}
                onChange={handleInputChange}
                className="w-full border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>

            {/* City & Zip Code - Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full border-2 ${getInputClass(
                    "city"
                  )} rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base`}
                />
                {renderError("city")}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  name="zip"
                  placeholder="ZIP Code"
                  value={formData.zip}
                  onChange={handleInputChange}
                  onBlur={(e) => handleBlur("zip", e.target.value)}
                  className={`w-full border-2 ${getInputClass(
                    "zip"
                  )} rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base`}
                />
                {renderError("zip")}
              </div>
            </div>

            {/* State - Full Width */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className={`w-full border-2 ${getInputClass(
                  "state"
                )} rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base`}
              />
              {renderError("state")}
            </div>

            {/* Cell Phone Number - Full Width */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Cell Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+1XXXXXXXXXX"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={(e) => handleBlur("phone", e.target.value)}
                className={`w-full border-2 ${getInputClass(
                  "phone"
                )} rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base`}
              />
              {renderError("phone")}
            </div>

            {/* Email - Full Width */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={(e) => handleBlur("email", e.target.value)}
                className={`w-full border-2 ${getInputClass(
                  "email"
                )} rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base`}
              />
              {renderError("email")}
            </div>

            {/* Gender - Full Width */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full border-2 ${getInputClass(
                  "gender"
                )} rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Others</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {renderError("gender")}
            </div>

            {/* Bank Name - Full Width */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Bank Name (For Payment Verification Purpose Only)
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bankName"
                placeholder="Enter your bank name"
                value={formData.bankName}
                onChange={handleInputChange}
                className={`w-full border-2 ${getInputClass(
                  "bankName"
                )} rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base`}
              />
              {renderError("bankName")}
            </div>

            {/* Motor Vehicle Type - Full Width */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Motor Vehicle Type <span className="text-red-500">*</span>
              </label>
              <select
                name="motorVehicleType"
                value={formData.motorVehicleType}
                onChange={handleInputChange}
                className={`w-full border-2 ${getInputClass(
                  "motorVehicleType"
                )} rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base`}
              >
                <option value="">Select vehicle type</option>
                <option value="bike">Bike</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
                <option value="coupe">Coupe</option>
                <option value="hatchback">Hatchback</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="van">Van</option>
                <option value="pickup">Pickup Truck</option>
                <option value="other">Other</option>
              </select>
              {renderError("motorVehicleType")}
            </div>

            {/* Contract Duration - Full Width */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Contract Duration <span className="text-red-500">*</span>
              </label>
              <select
                name="contractDuration"
                value={formData.contractDuration}
                onChange={handleInputChange}
                className={`w-full border-2 ${getInputClass(
                  "contractDuration"
                )} rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none transition-colors text-sm sm:text-base`}
              >
                <option value="">Select duration</option>
                <option value="2-4">2 Weeks - 4 Weeks</option>
                <option value="5-8">5 Weeks - 8 Weeks</option>
                <option value="9-12">9 Weeks - 12 Weeks</option>
                <option value="13-15">13 Weeks - 15 Weeks</option>
                <option value="16-20">16 Weeks - 20 Weeks</option>
              </select>
              {renderError("contractDuration")}
            </div>

            {/* Driver's License Front - Full Width */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Driver's License (Front) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "driverLicenseFront")}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-2.5 sm:py-3 hover:border-blue-500 transition-colors focus:outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-sm sm:text-base"
                accept="image/*,.pdf"
              />
            </div>

            {/* Driver's License Back - Full Width */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Driver's License (Back) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "driverLicenseBack")}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-2.5 sm:py-3 hover:border-blue-500 transition-colors focus:outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-sm sm:text-base"
                accept="image/*,.pdf"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 sm:mt-8 bg-linear-to-r from-blue-600 to-cyan-500 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-lg cursor-pointer hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Please Wait...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
