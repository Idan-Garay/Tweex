import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    // "google-signin-client_id": process.env.GOOGLE_SSO_CLIENT_ID ?? "",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
