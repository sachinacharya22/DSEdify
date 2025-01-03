import "@/app/globals.css";
import "@/styles/_variable.scss";
import "@/styles/font.scss";
import "@/styles/width.scss";
import "@/styles/registration.scss";
import "@/styles/student-info.scss";
import "@/styles/verification.scss";
import "@/styles/education.scss";
import "@/styles/success.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "DSEdify",
  description: "Generated by create next app",
  icons: {
    icon: "/edify-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
