import Footer from "@/Footer";
import Header from "@/components/customer/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Header />
        {children}
    <Footer />
    </>
  );
}
