import { Product } from "@/type";

export const cakes: Product[] = [
  // =====================================
  // MENU — CAKES
  // =====================================
  {
    name: { en: "Classic Vanilla Cake", ar: "كيك فانيليا كلاسيك" },
    slug: "classic-vanilla-cake",
    type: "menu",
    category: { en: "cake", ar: "كيك" },
    description: {
      en: "Soft vanilla sponge layered with buttercream.",
      ar: "كيك فانيليا إسفنجي ناعم بطبقات من كريمة الزبدة.",
    },
    image: "/cake.webp",
    varieties: [
      { size: "6inch", price: 25 },
      { size: "8inch", price: 35 },
      { size: "10inch", price: 45 },
    ],
  },
  {
    name: { en: "Chocolate Fudge Cake", ar: "كيك فادج الشوكولاتة" },
    slug: "chocolate-fudge-cake",
    type: "menu",
    category: { en: "cake", ar: "كيك" },
    description: {
      en: "Rich chocolate cake with fudge filling.",
      ar: "كيك شوكولاتة غني بحشوة الفادج.",
    },
    image: "/cake.webp",
    varieties: [
      { size: "6inch", price: 30 },
      { size: "8inch", price: 40 },
      { size: "10inch", price: 50 },
    ],
  },

  // =====================================
  // MENU — COOKIES
  // =====================================
  {
    name: { en: "Lotus Cookies", ar: "كوكيز اللوتس" },
    slug: "lotus-cookies",
    type: "menu",
    category: { en: "cookies", ar: "كوكيز" },
    description: {
      en: "Soft baked cookies with lotus flavor.",
      ar: "كوكيز طازجة بنكهة اللوتس.",
    },
    image: "/cookies.webp",
    varieties: [{ size: "box", price: 35 }],
  },
  {
    name: { en: "Oreo Cookies", ar: "كوكيز أوريو" },
    slug: "oreo-cookies",
    type: "menu",
    category: { en: "cookies", ar: "كوكيز" },
    description: {
      en: "Chocolate cookies filled with Oreo chunks.",
      ar: "كوكيز شوكولاتة مع قطع أوريو.",
    },
    image: "/cookies.webp",
    varieties: [{ size: "box", price: 38 }],
  },

  // =====================================
  // MENU — CUPCAKES
  // =====================================
  {
    name: { en: "Vanilla Cupcake", ar: "كب كيك فانيليا" },
    slug: "vanilla-cupcake",
    type: "menu",
    category: { en: "cupcake", ar: "كب كيك" },
    description: {
      en: "Fluffy cupcake topped with buttercream.",
      ar: "كب كيك هش مغطى بكريمة الزبدة.",
    },
    image: "/cupcake.webp",
    varieties: [
      { size: "box6", price: 30 },
      { size: "box12", price: 55 },
    ],
  },
  {
    name: { en: "Red Velvet Cupcake", ar: "كب كيك ريد فيلفت" },
    slug: "red-velvet-cupcake",
    type: "menu",
    category: { en: "cupcake", ar: "كب كيك" },
    description: {
      en: "Moist red velvet cupcake with cream cheese frosting.",
      ar: "كب كيك ريد فيلفت مع كريمة الجبن.",
    },
    image: "/cupcake.webp",
    varieties: [
      { size: "box6", price: 35 },
      { size: "box12", price: 60 },
    ],
  },

  // =====================================
  // MENU — DATES
  // =====================================
  {
    name: { en: "Stuffed Dates Deluxe", ar: "تمر محشي فاخر" },
    slug: "stuffed-dates-deluxe",
    type: "menu",
    category: { en: "dates", ar: "تمر" },
    description: {
      en: "Premium dates stuffed with nuts and chocolate.",
      ar: "تمر فاخر محشي بالمكسرات والشوكولاتة.",
    },
    image: "/dates.webp",
    varieties: [{ size: "box", price: 50 }],
  },

  // =====================================
  // MENU — BROWNIES
  // =====================================
  {
    name: { en: "Classic Brownie", ar: "براوني كلاسيك" },
    slug: "classic-brownie",
    type: "menu",
    category: { en: "brownie", ar: "براوني" },
    description: {
      en: "Dense chocolate brownie squares.",
      ar: "قطع براوني شوكولاتة غنية.",
    },
    image: "/brownie.webp",
    varieties: [{ size: "box", price: 40 }],
  },

  // =====================================
  // MENU — PASTRY
  // =====================================
  {
    name: { en: "Mini Fruit Pastry", ar: "فطائر فواكه صغيرة" },
    slug: "mini-fruit-pastry",
    type: "menu",
    category: { en: "pastry", ar: "فطائر" },
    description: {
      en: "Mini pastries topped with fresh fruits.",
      ar: "فطائر صغيرة مغطاة بفواكه طازجة.",
    },
    image: "/pastry.webp",
    varieties: [{ size: "box", price: 45 }],
  },

  // =====================================
  // OCCASION CAKES — ONLY CAKES
  // =====================================
  {
    name: { en: "Birthday Celebration Cake", ar: "كيك عيد ميلاد احتفالي" },
    slug: "birthday-celebration-cake",
    type: "occasion",
    category: { en: "cake", ar: "كيك" },
    description: {
      en: "Custom birthday cake designed to your theme.",
      ar: "كيك عيد ميلاد مخصص حسب طلبك.",
    },
    image: "/cake.webp",
    varieties: [
      { size: "6inch", price: 40 },
      { size: "8inch", price: 60 },
      { size: "10inch", price: 80 },
    ],
    flavors: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"],
    messagePrice: 5,
    specialInstructions: true,
  },
  {
    name: { en: "Wedding Cake Elegant", ar: "كيك زفاف أنيق" },
    slug: "wedding-cake-elegant",
    type: "occasion",
    category: { en: "cake", ar: "كيك" },
    description: {
      en: "Multi-tier wedding cake with elegant design.",
      ar: "كيك زفاف متعدد الطبقات بتصميم أنيق.",
    },
    image: "/cake.webp",
    varieties: [
      { size: "6inch", price: 60 },
      { size: "8inch", price: 90 },
      { size: "10inch", price: 120 },
    ],
    tiers: ["Two Tier", "Three Tier"],
    flavors: ["Vanilla", "Chocolate", "Red Velvet"],
    messagePrice: 10,
    specialInstructions: true,
  },
];
