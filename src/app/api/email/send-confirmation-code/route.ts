import * as handlebars from "handlebars";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { VerificationCodeTemplate } from "../../../../_lib/email-templates/verification-code";
import { getVerificationCode } from "backend/app/email/verification-code";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  const { email, username } = (await request.json()) as {
    email: string;
    username: string;
  };

  const resp: { error?: string; success?: boolean } = {};
  const template = handlebars.compile(VerificationCodeTemplate);

  const code = await getVerificationCode(email);

  const replacements = {
    username: username,
    verificationCode: code,
  };
  const htmlToSend = template(replacements);
  const mailData = {
    to: email,
    from: "support@idanjoshua.com",
    subject: `Verification Code`,
    html: htmlToSend,
  };

  transporter.sendMail(mailData, function (err) {
    if (err) {
      resp.success = false;
      resp.error = "Something went wrong with email sending.";
    } else {
      resp.success = true;
    }
  });
  return NextResponse.json(resp);
}
