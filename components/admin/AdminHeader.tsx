import Link from 'next/link';
import React from 'react';
import { FiHome, FiLogOut } from 'react-icons/fi';

const AdminHeader = () => {
  const headerLinks = [
    { name: 'Menu', link: '/admin-dashboard/menu' },
    { name: 'Occasion Cakes', link: '/admin-dashboard/occasion-cakes' },
    { name: 'Add Menu', link: '/admin-dashboard/add-menu' },
    { name: 'Add Occasion', link: '/admin-dashboard/add-occasion' },
    { name: 'Menu Orders', link: '/admin-dashboard/menu-orders' },
    { name: 'Occasion Orders', link: '/admin-dashboard/occasion-orders' },
    { name: 'Customize Orders', link: '/admin-dashboard/customize-orders' },
    { name: 'Reviews', link: '/admin-dashboard/reviews' },
  ];

  return (
    <header className="w-full bg-white px-4 py-4 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between">
      {/* Links */}
      <nav className="w-full md:w-auto mb-2 md:mb-0">
        <ul className="flex flex-wrap gap-6 text-gray-800 font-medium text-sm md:text-base">
          {headerLinks.map((item) => (
            <li key={item.name}>
              <Link href={item.link} className="">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Icons */}
      <div className="flex gap-4 text-gray-800 text-xl">
        <Link className='bg-black text-white p-2 rounded-xl' href="/">
          <FiHome className="" />
        </Link>
        <Link className='bg-black text-white p-2 rounded-xl' href="/">
          <FiLogOut className="" />
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
