import CategoriesSwiper from '@/components/customer/CategoriesSwiper'
import CategoryCard from '@/components/customer/CategoryCard'
import ScrollFloat from '@/components/ui/HeadingScroll'
import React from 'react'

// Cakes
export const cakes = [
  { id: 1, name: "Chocolate Cake", image: "/cake.jpg", price: 20 },
  { id: 2, name: "Vanilla Cake", image: "/cake.jpg", price: 18 },
  { id: 3, name: "Strawberry Cake", image: "/cake.jpg", price: 22 },
  { id: 4, name: "Red Velvet Cake", image: "/cake.jpg", price: 25 },
  { id: 5, name: "Coffee Cake", image: "/cake.jpg", price: 19 },
];

// Pastry
export const pastries = [
  { id: 1, name: "Croissant", image: "/pastry.jpg", price: 5 },
  { id: 2, name: "Danish Pastry", image: "/pastry.jpg", price: 6 },
  { id: 3, name: "Chocolate Pastry", image: "/pastry.jpg", price: 7 },
  { id: 4, name: "Almond Pastry", image: "/pastry.jpg", price: 6 },
  { id: 5, name: "Fruit Pastry", image: "/pastry.jpg", price: 6 },
];

// Dates
export const dates = [
  { id: 1, name: "Medjool Dates", image: "/dates.jpg", price: 10 },
  { id: 2, name: "Deglet Noor", image: "/dates.jpg", price: 8 },
  { id: 3, name: "Ajwa Dates", image: "/dates.jpg", price: 12 },
  { id: 4, name: "Khadrawy Dates", image: "/dates.jpg", price: 9 },
  { id: 5, name: "Zahidi Dates", image: "/dates.jpg", price: 7 },
];

// Cookies
export const cookies = [
  { id: 1, name: "Chocolate Chip", image: "/cookies.jpg", price: 3 },
  { id: 2, name: "Oatmeal Raisin", image: "/cookies.jpg", price: 3 },
  { id: 3, name: "Peanut Butter", image: "/cookies.jpg", price: 4 },
  { id: 4, name: "Sugar Cookie", image: "/cookies.jpg", price: 3 },
  { id: 5, name: "Snickerdoodle", image: "/cookies.jpg", price: 4 },
];

// Brownies
export const brownies = [
  { id: 1, name: "Fudge Brownie", image: "/brownie.jpg", price: 5 },
  { id: 2, name: "Walnut Brownie", image: "/brownie.jpg", price: 6 },
  { id: 3, name: "Caramel Brownie", image: "/brownie.jpg", price: 6 },
  { id: 4, name: "Chocolate Chip Brownie", image: "/brownie.jpg", price: 5 },
  { id: 5, name: "Mint Brownie", image: "/brownie.jpg", price: 6 },
];

// Extra Pastry (if you meant another set)
export const pastries2 = [
  { id: 1, name: "Cheese Danish", image: "/cupcake.jpg", price: 6 },
  { id: 2, name: "Apple Turnover", image: "/cupcake.jpg", price: 5 },
  { id: 3, name: "Pecan Twist", image: "/cupcake.jpg", price: 7 },
  { id: 4, name: "Chocolate Croissant", image: "/cupcake.jpg", price: 6 },
  { id: 5, name: "Berry Danish", image: "/cupcake.jpg", price: 6 },
];


const Categories = () => {
  return (
    <section className='my-20 max-w-8xl mx-auto'>
       <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
        >
        Menu
        </ScrollFloat>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-7xl mx-auto place-items-center'>
            <CategoryCard delay={2000} header='Cake' link='/' data={cakes} />
            <CategoryCard delay={2000} header='Cupcake' link='/' data={pastries2} />
            <CategoryCard delay={2200} header='Pastry' link='/' data={pastries} />
            <CategoryCard delay={2200} header='Date' link='/' data={dates} />
            <CategoryCard delay={2400} header='Brownies' link='/' data={brownies} />
            <CategoryCard delay={2400} header='Cookies' link='/' data={cookies} />
        </div>
    </section>
  )
}

export default Categories
