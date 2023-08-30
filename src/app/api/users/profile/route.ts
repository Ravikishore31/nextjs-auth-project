import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, _id } = reqBody;
    const mail = await sendEmail({ email, emailType: "RESET", userId: _id });
  } catch (error: any) {
    console.log(error.message);
  }
  return NextResponse.json({
    message: "token generated successfully",
    success: true,
  });
}
