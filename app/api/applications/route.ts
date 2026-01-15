import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Application from "@/models/application";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { sendAdminNotification, sendApplicantConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();

    // Upload driver license images to Cloudinary
    const frontLicense = formData.get("driverLicenseFront");
    const backLicense = formData.get("driverLicenseBack");

    if (!frontLicense || !backLicense) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver license images are required",
        },
        { status: 400 }
      );
    }

    const frontLicenseUrl = await uploadToCloudinary(frontLicense as File);
    const backLicenseUrl = await uploadToCloudinary(backLicense as File);

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

    // Save to MongoDB
    const application = await Application.create(applicationData);

    // Send emails (don't await to avoid blocking response)
    sendAdminNotification(application).catch(console.error);
    sendApplicantConfirmation(application).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        applicationId: application._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application",
        error: errorMessage,
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
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch applications",
      },
      { status: 500 }
    );
  }
}
