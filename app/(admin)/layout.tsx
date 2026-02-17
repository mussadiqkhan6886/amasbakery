import AdminHeader from "@/components/admin/AdminHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Amas Bakery",
  description: "Administrative control panel",
  // This line prevents search engines from indexing the admin area
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminHeader />
        {children}
    </>
  );
}
