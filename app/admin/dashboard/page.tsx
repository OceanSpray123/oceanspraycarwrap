"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Application {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  motorVehicleType: string;
  contractDuration: string;
  status: string;
  submittedAt: string;
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">
        Applications Dashboard
      </h1>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
          <p className="text-gray-600 text-xs sm:text-sm font-semibold">
            Total Applications
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">
            {stats.total}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
          <p className="text-gray-600 text-xs sm:text-sm font-semibold">
            Pending
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
            {stats.pending}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow">
          <p className="text-gray-600 text-xs sm:text-sm font-semibold">
            Approved
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {stats.approved}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow">
          <p className="text-gray-600 text-xs sm:text-sm font-semibold">
            Rejected
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-red-600">
            {stats.rejected}
          </p>
        </div>
      </div>

      {/* Filter Buttons - Responsive Scroll */}
      <div className="bg-white p-4 rounded-xl shadow-lg mb-6 overflow-x-auto">
        <div className="flex space-x-2 sm:space-x-4 min-w-max sm:min-w-0">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
              filter === "all"
                ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
              filter === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
              filter === "approved"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Approved ({stats.approved})
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
              filter === "rejected"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Rejected ({stats.rejected})
          </button>
        </div>
      </div>

      {/* Applications Table - Desktop View */}
      <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-linear-to-r from-blue-600 to-cyan-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Phone</th>
                <th className="px-6 py-4 text-left font-semibold">Vehicle</th>
                <th className="px-6 py-4 text-left font-semibold">Duration</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Submitted</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No applications found
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {app.firstName} {app.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{app.email}</td>
                    <td className="px-6 py-4 text-gray-600">{app.phone}</td>
                    <td className="px-6 py-4 text-gray-600 capitalize">
                      {app.motorVehicleType}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {app.contractDuration}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : app.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/applications/${app._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applications Cards - Mobile/Tablet View */}
      <div className="lg:hidden space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
            No applications found
          </div>
        ) : (
          filteredApplications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {app.firstName} {app.lastName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{app.email}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    app.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : app.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium text-gray-900">{app.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {app.motorVehicleType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-900">
                    {app.contractDuration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Submitted:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(app.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Link
                href={`/admin/applications/${app._id}`}
                className="block w-full bg-linear-to-r from-blue-600 to-cyan-500 text-white text-center px-4 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold"
              >
                View Full Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
