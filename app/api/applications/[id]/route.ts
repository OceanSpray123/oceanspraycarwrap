import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Application from "@/models/application";
import { sendStatusUpdateEmail } from "@/lib/email";

// GET single application
interface ApplicationParams {
  params: {
    id: string;
  };
}

interface ApplicationResponse {
  success: boolean;
  application?: any;
  message?: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApplicationResponse>> {
  try {
    await dbConnect();

    const { id } = await params;
    const app = await Application.findById(id);

    if (!app) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      application: app,
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch application" },
      { status: 500 }
    );
  }
}

// PATCH - Update application status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApplicationResponse>> {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    const app = await Application.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!app) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    // Send status update email (don't await to avoid blocking response)
    await sendStatusUpdateEmail(app, body.status).catch(console.error);

    return NextResponse.json({
      success: true,
      application: app,
      message: "Status updated and notification email sent",
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update application" },
      { status: 500 }
    );
  }
}
