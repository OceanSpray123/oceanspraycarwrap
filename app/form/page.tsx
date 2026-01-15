// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// export default function ApplicationForm() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     currentAddress: "",
//     apt: "",
//     city: "",
//     state: "",
//     zip: "",
//     phone: "+1",
//     email: "",
//     bankName: "",
//     gender: "",
//     motorVehicleType: "",
//     contractDuration: "",
//     driverLicenseFront: null,
//     driverLicenseBack: null,
//   });

//   const router = useRouter();
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [touched, setTouched] = useState<Record<string, boolean>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validateField = (name: string, value: string) => {
//     let error = "";

//     if (["zip"].includes(name)) {
//       if (value && !/^\d+$/.test(value)) error = "Only numbers are allowed";
//     }

//     if (name === "phone") {
//       if (!value.startsWith("+1")) error = "Phone number must start with +1";
//       const digits = value.replace("+1", "");
//       if (!/^\d*$/.test(digits)) error = "Only numbers allowed after +1";
//       if (digits.length !== 10) error = "Phone number must be 10 digits";
//     }
//     if (name === "email" && value && !emailRegex.test(value)) {
//       error = "Enter a valid email address";
//     }

//     return error;
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     const error = validateField(name, value);
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: error }));
//   };

//   const handleBlur = (name: string, value: string) => {
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
//   };

//   const getInputClass = (name: string) => {
//     if (errors[name] && touched[name]) return "border-red-500";
//     if (!errors[name] && touched[name]) return "border-green-500";
//     return "focus:border-blue-500";
//   };

//   const handleFileChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: string
//   ) => {
//     if (e.target.files?.[0]) {
//       setFormData((prev) => ({ ...prev, [field]: e.target.files![0] }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     // Handle form submission
//     const newErrors: Record<string, string> = {};
//     Object.entries(formData).forEach(([key, value]) => {
//       if (!value && !key.includes("driverLicense")) {
//         newErrors[key] = "This field is required";
//       } else if (typeof value === "string") {
//         const err = validateField(key, value);
//         if (err) newErrors[key] = err;
//       }
//     });

//     setErrors(newErrors);
//     setTouched(
//       Object.keys(formData).reduce((a, k) => ({ ...a, [k]: true }), {})
//     );

//     if (Object.keys(newErrors).length === 0) {
//       console.log("Form submitted:", formData);
//     }

//     // Create FormData for file upload
//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value) {
//         formDataToSend.append(key, value);
//       }
//     });

//     try {
//       const response = await fetch("/api/applications", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert(
//           "Application submitted successfully! You will receive a confirmation email shortly."
//         );
//         // Reset form or redirect
//         router.push("/");
//       } else {
//         alert("Failed to submit application. Please try again.");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   const renderError = (name: string) =>
//     errors[name] &&
//     touched[name] && (
//       <p className="text-sm text-red-600 mt-1">{errors[name]}</p>
//     );

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Applicant Information</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               placeholder="Enter your first name"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:border-green-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Enter your last name"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:border-green-500"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Full Street Address (not PO BOX)
//           </label>
//           <input
//             type="text"
//             name="currentAddress"
//             placeholder="Enter your street address"
//             value={formData.currentAddress}
//             onChange={handleInputChange}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:border-green-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">APT #</label>
//           <input
//             name="apt"
//             placeholder="Apartment number (if applicable)"
//             value={formData.apt}
//             onChange={handleInputChange}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:border-green-500"
//           />
//         </div>

//         <div className="grid grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">City</label>
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               onChange={handleInputChange}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:border-green-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">State</label>
//             <input
//               type="text"
//               name="state"
//               placeholder="State"
//               value={formData.state}
//               onChange={handleInputChange}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:border-green-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Zip Code</label>
//             <input
//               name="zip"
//               placeholder="ZIP Code"
//               value={formData.zip}
//               onChange={handleInputChange}
//               onBlur={(e) => handleBlur("zip", e.target.value)}
//               className={`w-full border rounded px-3 py-2 ${getInputClass(
//                 "zip"
//               )} focus:outline-none focus:border-green-500`}
//               required
//             />
//             {renderError("zip")}
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Cell Phone Number
//           </label>
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Enter your phone number"
//             value={formData.phone}
//             onChange={handleInputChange}
//             onBlur={(e) => handleBlur("phone", e.target.value)}
//             className={`w-full border rounded px-3 py-2 ${getInputClass(
//               "phone"
//             )} focus:outline-none focus:border-green-500`}
//             required
//           />
//           {renderError("phone")}
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email address"
//             value={formData.email}
//             onChange={handleInputChange}
//             onBlur={(e) => handleBlur("email", e.target.value)}
//             className={`w-full border rounded px-3 py-2 ${getInputClass(
//               "email"
//             )} focus:outline-none focus:border-green-500`}
//             required
//           />
//           {renderError("email")}
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Gender</label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleInputChange}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:border-green-500"
//             required
//           >
//             <option value="">Select gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Others</option>
//             <option value="prefer-not-to-say">Prefer not to say</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Bank Name (for payment verification purposes only)
//           </label>
//           <input
//             type="text"
//             name="bankName"
//             placeholder="Enter your bank name"
//             value={formData.bankName}
//             onChange={handleInputChange}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:border-green-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Motor Vehicle Type
//           </label>
//           <select
//             name="motorVehicleType"
//             value={formData.motorVehicleType}
//             onChange={handleInputChange}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:border-green-500"
//             required
//           >
//             <option value="">Select vehicle type</option>
//             <option value="bike">Bike</option>
//             <option value="sedan">Sedan</option>
//             <option value="suv">SUV</option>
//             <option value="truck">Truck</option>
//             <option value="coupe">Coupe</option>
//             <option value="hatchback">Hatchback</option>
//             <option value="motorcycle">Motorcycle</option>
//             <option value="van">Van</option>
//             <option value="pickup">Pickup Truck</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Contract Duration
//           </label>
//           <select
//             name="contractDuration"
//             value={formData.contractDuration}
//             onChange={handleInputChange}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:border-green-500"
//             required
//           >
//             <option value="">Select contract duration</option>
//             <option value="2-4">2 Weeks - 4 Weeks</option>
//             <option value="5-8">5 Weeks - 8 Weeks</option>
//             <option value="9-12">9 Weeks - 12 Weeks</option>
//             <option value="13-15">13 Weeks - 15 Weeks</option>
//             <option value="16-20">16 Weeks - 20 Weeks</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Upload Driver's License Front
//           </label>
//           <input
//             type="file"
//             onChange={(e) => handleFileChange(e, "driverLicenseBack")}
//             className="border-2 border-dashed rounded-lg px-3 py-3 hover:border-blue-500 transition focus:outline-none focus:border-green-500"
//             accept="image/*,.pdf"
//             placeholder="Choose file"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Upload Driver's License Back
//           </label>
//           <input
//             type="file"
//             onChange={(e) => handleFileChange(e, "driverLicenseBack")}
//             className="border-2 border-dashed rounded-lg px-3 py-3 hover:border-blue-500 transition focus:outline-none focus:border-green-500"
//             accept="image/*,.pdf"
//             placeholder="Choose file"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full mt-6 bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 disabled:opacity-50 transition"
//         >
//           {isSubmitting ? "Submitting..." : "Submit Application"}
//         </button>
//       </form>
//     </div>
//   );
// }

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
        alert(
          "Application submitted successfully! You will receive a confirmation email shortly."
        );
        router.push("/");
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
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
              className="w-full mt-6 sm:mt-8 bg-linear-to-r from-blue-600 to-cyan-500 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-lg cursor-pointer hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
