"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Application {
  _id: string;
  firstName: string;
  lastName: string;
  currentAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  bankName: string;
  gender: string;
  motorVehicleType: string;
  contractDuration: string;
  driverLicenseFront: string;
  driverLicenseBack: string;
  status: string;
  submittedAt: string;
}

export default function ApplicationDetail() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/applications/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setApplication(data.application);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    const confirmed = confirm(
      `Are you sure you want to ${newStatus} this application?`
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/applications/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        setApplication(data.application);
        alert(
          `Application ${newStatus} successfully! Email sent to applicant.`
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-8 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Application not found
        </h2>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 sm:mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center text-sm sm:text-base"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
        {/* Header Section - Responsive */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8 pb-6 border-b border-gray-200">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              {application.firstName} {application.lastName}
            </h1>
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                application.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : application.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {application.status.toUpperCase()}
            </span>
          </div>

          {/* Action Buttons - Stack on Mobile */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {application.status !== "approved" && (
              <button
                onClick={() => updateStatus("approved")}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all font-semibold w-full sm:w-auto"
              >
                ✓ Approve
              </button>
            )}
            {application.status !== "rejected" && (
              <button
                onClick={() => updateStatus("rejected")}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all font-semibold w-full sm:w-auto"
              >
                ✗ Reject
              </button>
            )}
          </div>
        </div>

        {/* Personal & Address Info - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                👤
              </span>
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <a
                  href={`mailto:${application.email}`}
                  className="font-semibold text-blue-600 hover:text-blue-700 break-all"
                >
                  {application.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <a
                  href={`tel:${application.phone}`}
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  {application.phone}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-semibold capitalize">{application.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bank Name</p>
                <p className="font-semibold">{application.bankName}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-cyan-100 text-cyan-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                📍
              </span>
              Address
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Street Address</p>
                <p className="font-semibold">{application.currentAddress}</p>
              </div>
              {application.apt && (
                <div>
                  <p className="text-sm text-gray-600">Apartment</p>
                  <p className="font-semibold">{application.apt}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">City, State, ZIP</p>
                <p className="font-semibold">
                  {application.city}, {application.state} {application.zip}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
              🚗
            </span>
            Vehicle & Contract Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Motor Vehicle Type</p>
              <p className="font-semibold capitalize">
                {application.motorVehicleType}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contract Duration</p>
              <p className="font-semibold">
                {application.contractDuration} weeks
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Submitted At</p>
              <p className="font-semibold">
                {new Date(application.submittedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Driver's License Images - Responsive */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
              📄
            </span>
            Driver's License
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Front License */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-gray-700">Front</p>
                <a
                  href={application.driverLicenseFront}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                >
                  Open Full Size →
                </a>
              </div>
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 transition-colors">
                <img
                  src={application.driverLicenseFront}
                  alt="Driver License Front"
                  className="w-full h-auto object-cover cursor-pointer"
                  onClick={() =>
                    window.open(application.driverLicenseFront, "_blank")
                  }
                />
              </div>
            </div>

            {/* Back License */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-gray-700">Back</p>
                <a
                  href={application.driverLicenseBack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                >
                  Open Full Size →
                </a>
              </div>
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 transition-colors">
                <img
                  src={application.driverLicenseBack}
                  alt="Driver License Back"
                  className="w-full h-auto object-cover cursor-pointer"
                  onClick={() =>
                    window.open(application.driverLicenseBack, "_blank")
                  }
                />
              </div>
            </div>
          </div>

          {/* Helper Text */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            💡 Click on images to view full size in new tab
          </p>
        </div>
      </div>
    </div>
  );
}
