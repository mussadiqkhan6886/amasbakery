import Link from 'next/link'
import React from 'react'
import { FiHome, FiLogOut } from 'react-icons/fi'

const AdminHeader = () => {
    const headerLinks = [
        {name: "Menu", link: "/admin-dashboard/menu"},
        {name: "Occasion Cakes", link: "/admin-dashboard/occasion-cakes"},
        {name: "Add Menu", link: "/admin-dashboard/add-menu"},
        {name: "Add Occasion", link: "/admin-dashboard/add-occasion"},
        {name: "Menu Orders", link: "/admin-dashboard/menu-orders"},
        {name: "Occasion Orders", link: "/admin-dashboard/occasion-orders"},
        {name: "Customize Orders", link: "/admin-dashboard/customize-orders"},
        {name: "Reviews", link: "/admin-dashboard/reviews"},
    ]
  return (
    <header>
      <nav>
        <ul>
            {headerLinks.map(item => (
                <ol><Link href={item.link}>{item.name}</Link></ol>
            ))}
        </ul>
      </nav>
      <div>
        <button><Link href={"/"}><FiHome /></Link></button>
        <button><Link href={"/"}><FiLogOut /></Link></button>
      </div>
    </header>
  )
}

export default AdminHeader
