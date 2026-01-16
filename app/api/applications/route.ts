import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Application from "@/models/application";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { sendAdminNotification, sendApplicantConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Starting application submission...");
    await dbConnect();

    const formData = await request.formData();
    console.log("✅ Database connected");

    // Upload driver license images to Cloudinary
    const frontLicense = formData.get("driverLicenseFront");
    const backLicense = formData.get("driverLicenseBack");

    if (!frontLicense || !backLicense) {
      console.error("❌ Missing license images");
      return NextResponse.json(
        {
          success: false,
          message: "Driver license images are required",
        },
        { status: 400 }
      );
    }

    console.log("🔄 Uploading to Cloudinary...");
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/psd",
      "image/svg",
      "application/pdf",
    ];
    const frontFile = frontLicense as File;
    const backFile = backLicense as File;

    if (
      !allowedTypes.includes(frontFile.type) ||
      !allowedTypes.includes(backFile.type)
    ) {
      console.error("❌ Invalid file type");
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid file type. Please upload images in JPG, PNG, or PDF format.",
          error: "INVALID_FILE_TYPE",
        },
        { status: 400 }
      );
    }

    // Step 5: Upload to cloudinary
    let frontLicenseUrl, backLicenseUrl;
    try {
      console.log("🔄 Uploading driver's license images...");
      frontLicenseUrl = await uploadToCloudinary(frontFile);
      backLicenseUrl = await uploadToCloudinary(backFile);
      console.log("✅ Images uploaded successfully");
    } catch (uploadError) {
      console.error("❌ Cloudinary upload failed:", uploadError);
      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to upload images. Please ensure your images are under 10MB and try again.",
          error: "IMAGE_UPLOAD_ERROR",
        },
        { status: 500 }
      );
    }

    // Step 6: Validate required form fields
    const requiredFields = [
      "firstName",
      "lastName",
      "currentAddress",
      "city",
      "state",
      "zip",
      "phone",
      "email",
      "bankName",
      "gender",
      "motorVehicleType",
      "contractDuration",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData.get(field)
    );

    if (missingFields.length > 0) {
      console.error("❌ Missing required fields:", missingFields);
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(
            ", "
          )}. Please fill in all required fields.`,
          error: "MISSING_REQUIRED_FIELDS",
          fields: missingFields,
        },
        { status: 400 }
      );
    }

    // Create application data
    const applicationData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      currentAddress: formData.get("currentAddress"),
      apt: formData.get("apt"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      bankName: formData.get("bankName"),
      gender: formData.get("gender"),
      motorVehicleType: formData.get("motorVehicleType"),
      contractDuration: formData.get("contractDuration"),
      driverLicenseFront: frontLicenseUrl,
      driverLicenseBack: backLicenseUrl,
    };

    // Step 8: Save to database
    let application;
    try {
      console.log("🔄 Saving application to database...");
      application = await Application.create(applicationData);
      console.log("✅ Application saved with ID:", application._id);
    } catch (dbSaveError) {
      console.error("❌ Failed to save application:", dbSaveError);
      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to save your application. Please try again or contact support if the problem persists.",
          error: "DATABASE_SAVE_ERROR",
        },
        { status: 500 }
      );
    }

    // Send emails (don't block on failure)
    // sendAdminNotification(application).catch(console.error);
    // sendApplicantConfirmation(application).catch(console.error);
    console.log("🔄 Sending notification emails...");

    let adminEmailSent = false;
    let applicantEmailSent = false;

    try {
      await sendAdminNotification(application);
      adminEmailSent = true;
      console.log("✅ Admin notification email sent");
    } catch (emailError) {
      console.error("❌ Admin email failed:", emailError);
    }

    try {
      await sendApplicantConfirmation(application);
      applicantEmailSent = true;
      console.log("✅ Applicant email sent");
    } catch (emailError) {
      console.error("❌ Applicant email failed:", emailError);
    }

    // Step 10: Return success (even if emails partially failed)
    return NextResponse.json(
      {
        success: true,
        message: applicantEmailSent
          ? "Application submitted successfully! Kindly check your Inbox or Junk Email for confirmation shortly."
          : "Application submitted successfully! Kindly check your Inbox or Junk Email, You will receive a confirmation email shortly.",
        applicationId: application._id,
        emailStatus: {
          adminNotified: adminEmailSent,
          applicantNotified: applicantEmailSent,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // Catch-all error handler
    console.error("❌ Unexpected error during application submission:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        success: false,
        message:
          "An unexpected error occurred. Please try again or contact support at info@oceanspraycarwrap.com",
        error: "UNEXPECTED_ERROR",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

// GET route to fetch all applications (for admin)
export async function GET() {
  try {
    await dbConnect();
    const applications = await Application.find({}).sort({ submittedAt: -1 });

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("❌ Failed to fetch applications:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch applications",
      },
      { status: 500 }
    );
  }
}
