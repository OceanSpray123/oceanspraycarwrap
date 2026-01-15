import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  apt: String,
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  motorVehicleType: {
    type: String,
    required: true,
  },
  contractDuration: {
    type: String,
    required: true,
  },
  driverLicenseFront: {
    type: String, // Cloudinary URL
    required: true,
  },
  driverLicenseBack: {
    type: String, // Cloudinary URL
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
