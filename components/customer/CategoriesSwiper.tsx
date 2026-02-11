'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const CategoriesSwiper = () => {
    const categories = [
        { name: "Cakes", link: "/", image: "/cake.jpg" },
        { name: "Cupcakes", link: "/", image: "/cupcake.jpg" },
        { name: "Dates", link: "/", image: "/dates.jpg" },
        { name: "Pastry", link: "/", image: "/pastry.jpg" },
        { name: "Cookies", link: "/", image: "/cookies.jpg" },
        { name: "Brownies", link: "/", image: "/brownie.jpg" },
    ];

    return (
        <div className="my-10 px-4">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                }}
                autoplay={{
                    delay: 0,          // no delay between slides
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                speed={3000}           // controls how fast it moves
                loop={true}            // infinite loop
            >
                {categories.map((item) => (
                    <SwiperSlide key={item.name}>
                        <Link href={item.link} className="flex flex-col items-center bg-white rounded-xl p-4">
                            <div className="w-24 h-24 relative mb-2">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default CategoriesSwiper;
