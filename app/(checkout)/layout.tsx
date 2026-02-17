import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Amas Bakery",
  description: "Checkout page",
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
        {children}
    </>
  );
}
