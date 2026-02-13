export const cakes = [

  {
    name: { en: "Classic Vanilla Cake", ar: "كيك فانيليا كلاسيك" },
    slug: "classic-vanilla-cake",
    type: "menu",
    category: { en: "cake", ar: "كيك" },
    description: {
      en: "Soft vanilla sponge layered with buttercream.",
      ar: "كيك فانيليا إسفنجي ناعم بطبقات من كريمة الزبدة.",
    },
    image: "/cake.jpg",
    price: { "6inch": 25, "8inch": 35, "10inch": 45 },
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
    image: "/cake.jpg",
    price: { "6inch": 30, "8inch": 40, "10inch": 50 },
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
    image: "/cookies.jpg",
    price: { "box": 35 },
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
    image: "/cookies.jpg",
    price: { "box": 38 },
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
    image: "/cupcake.jpg",
    price: { "box6": 30, "box12": 55 },
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
    image: "/cupcake.jpg",
    price: { "box6": 35, "box12": 60 },
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
    image: "/dates.jpg",
    price: { "box": 50 },
  },
  {
    name: { en: "Stuffeds Dates Deluxe", ar: "تمر محشي فاخر" },
    slug: "stuffeds-dates-deluxe",
    type: "menu",
    category: { en: "dates", ar: "تمر" },
    description: {
      en: "Premium dates stuffed with nuts and chocolate.",
      ar: "تمر فاخر محشي بالمكسرات والشوكولاتة.",
    },
    image: "/dates.jpg",
    price: { "box": 50 },
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
    image: "/brownie.jpg",
    price: { "box": 40 },
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
    image: "/pastry.jpg",
    price: { "box": 45 },
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
    image: "/cake.jpg",
    basePrice: { "6inch": 40, "8inch": 60, "10inch": 80 },
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
    image: "/cake.jpg",
    basePrice: { "6inch": 60, "8inch": 90, "10inch": 120 },
    tiers: ["Two Tier", "Three Tier"],
    flavors: ["Vanilla", "Chocolate", "Red Velvet"],
    messagePrice: 10,
    specialInstructions: true,
  },

]
