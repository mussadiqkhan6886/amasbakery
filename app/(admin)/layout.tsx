import AdminHeader from "@/components/admin/AdminHeader";

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
