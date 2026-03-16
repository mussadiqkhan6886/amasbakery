import TableSetup from '@/components/customer/TableSetup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Table Setup',
  description: 'Book a professional table setup for your special occasion. Custom themes and desserts available.',
  openGraph: {
    title: 'Table Setup - Amass Bakery',
    images: ['/About2.webp'],
  },
};

const Page = () => {
  return (
    <main className="min-h-screen bg-white py-10">
      <TableSetup />
    </main>
  );
};

export default Page;