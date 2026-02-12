export const cakes = [
  // -------------------
  // Simple/Menu Cakes
  // -------------------
  {
    name: { en: "Classic Vanilla", ar: "فانيليا كلاسيك" },
    type: "menu",
    description: {
      en: "Soft vanilla sponge with buttercream frosting.",
      ar: "كيك إسفنجي فانيليا ناعم مع كريمة الزبدة.",
    },
    image: "/cake.jpg",
    price: { "6inch": 25, "8inch": 35, "10inch": 45 },
  },
  {
    name: { en: "Chocolate Delight", ar: "متعة الشوكولاتة" },
    type: "menu",
    description: {
      en: "Rich chocolate cake topped with ganache.",
      ar: "كيك شوكولاتة غني مغطى بجناش.",
    },
    image: "/cake.jpg",
    price: { "6inch": 30, "8inch": 40, "10inch": 50 },
  },
  {
    name: { en: "Red Velvet", ar: "ريد فلفت" },
    type: "menu",
    description: {
      en: "Classic red velvet with cream cheese frosting.",
      ar: "ريد فلفت كلاسيكي مع كريمة الجبن.",
    },
    image: "/cake.jpg",
    price: { "6inch": 28, "8inch": 38, "10inch": 48 },
  },
  {
    name: { en: "Lemon Drizzle", ar: "ليمون دريزل" },
    type: "menu",
    description: {
      en: "Tangy lemon sponge with zesty icing.",
      ar: "كيك إسفنجي بالليمون مع تغليفة لاذعة.",
    },
    image: "/cake.jpg",
    price: { "6inch": 26, "8inch": 36, "10inch": 46 },
  },
  {
    name: { en: "Carrot Cake", ar: "كيك الجزر" },
    type: "menu",
    description: {
      en: "Moist carrot cake with cream cheese frosting.",
      ar: "كيك جزر رطب مع كريمة الجبن.",
    },
    image: "/cake.jpg",
    price: { "6inch": 27, "8inch": 37, "10inch": 47 },
  },
  {
    name: { en: "Strawberry Shortcake", ar: "كيك الفراولة" },
    type: "menu",
    description: {
      en: "Light sponge layered with fresh strawberries.",
      ar: "كيك إسفنجي خفيف مع طبقات من الفراولة الطازجة.",
    },
    image: "/cake.jpg",
    price: { "6inch": 29, "8inch": 39, "10inch": 49 },
  },
  {
    name: { en: "Coffee Hazelnut", ar: "قهوة وبندق" },
    type: "menu",
    description: {
      en: "Coffee-flavored sponge with nutty cream.",
      ar: "كيك إسفنجي بنكهة القهوة مع كريم البندق.",
    },
    image: "/cake.jpg",
    price: { "6inch": 31, "8inch": 41, "10inch": 51 },
  },
  {
    name: { en: "Pistachio Cake", ar: "كيك الفستق" },
    type: "menu",
    description: {
      en: "Pistachio-flavored sponge with white chocolate.",
      ar: "كيك إسفنجي بنكهة الفستق مع الشوكولاتة البيضاء.",
    },
    image: "/cake.jpg",
    price: { "6inch": 32, "8inch": 42, "10inch": 52 },
  },
  {
    name: { en: "Lotus Biscuit Cake", ar: "كيك بسكويت اللوتس" },
    type: "menu",
    description: {
      en: "Caramel and Lotus biscuit flavored cake.",
      ar: "كيك بنكهة الكراميل وبسكويت اللوتس.",
    },
    image: "/cake.jpg",
    price: { "6inch": 30, "8inch": 40, "10inch": 50 },
  },
  {
    name: { en: "Oreo Cake", ar: "كيك أوريو" },
    type: "menu",
    description: {
      en: "Chocolate cake with Oreo cookie crumble.",
      ar: "كيك شوكولاتة مع فتات بسكويت أوريو.",
    },
    image: "/cake.jpg",
    price: { "6inch": 28, "8inch": 38, "10inch": 48 },
  },

  // -------------------
  // Occasion-cakes/Custom Cakes
  // -------------------
  {
    name: { en: "Birthday Bash", ar: "عيد ميلاد كبير" },
    type: "occasion-cakes",
    description: {
      en: "Custom birthday cake with multiple flavors.",
      ar: "كيك عيد ميلاد مخصص مع نكهات متعددة.",
    },
    image: "/cookies.jpg",
    basePrice: { "6inch": 35, "8inch": 50, "10inch": 65 },
    tiers: ["Single", "Two Tier", "Three Tier"],
    flavors: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"],
    messagePrice: 5,
    specialInstructions: true,
  },
  {
    name: { en: "Wedding Elegance", ar: "أناقة الزفاف" },
    type: "occasion-cakes",
    description: {
      en: "Elegant multi-tier wedding cake.",
      ar: "كيك زفاف أنيق متعدد الطبقات.",
    },
    image: "/cookies.jpg",
    basePrice: { "6inch": 50, "8inch": 70, "10inch": 90 },
    tiers: ["Two Tier", "Three Tier", "Four Tier"],
    flavors: ["Vanilla", "Chocolate", "Pistachio", "Lotus"],
    messagePrice: 10,
    specialInstructions: true,
  },
  {
    name: { en: "Anniversary Special", ar: "ذكرى خاصة" },
    type: "occasion-cakes",
    description: {
      en: "Romantic cake for anniversaries.",
      ar: "كيك رومانسي للاحتفال بالذكرى السنوية.",
    },
    image: "/cookies.jpg",
    basePrice: { "6inch": 40, "8inch": 55, "10inch": 70 },
    tiers: ["Single", "Two Tier"],
    flavors: ["Chocolate", "Red Velvet", "Strawberry"],
    messagePrice: 7,
    specialInstructions: true,
  },
  {
    name: { en: "Graduation Cake", ar: "كيك التخرج" },
    type: "occasion-cakes",
    description: {
      en: "Celebrate achievements with custom theme.",
      ar: "احتفل بالإنجازات مع تصميم مخصص.",
    },
    image: "/cookies.jpg",
    basePrice: { "6inch": 38, "8inch": 53, "10inch": 68 },
    tiers: ["Single", "Two Tier"],
    flavors: ["Vanilla", "Chocolate", "Coffee"],
    messagePrice: 5,
    specialInstructions: true,
  },
  {
    name: { en: "Baby Shower Delight", ar: "بهجة حفلة المولود" },
    type: "occasion-cakes",
    description: {
      en: "Soft pastel cake perfect for baby showers.",
      ar: "كيك بألوان الباستيل الناعمة مثالي لحفلات المولود.",
    },
    image: "/cookies.jpg",
    basePrice: { "6inch": 37, "8inch": 52, "10inch": 67 },
    tiers: ["Single", "Two Tier"],
    flavors: ["Vanilla", "Strawberry", "Lemon"],
    messagePrice: 5,
    specialInstructions: true,
  },
  {
    name: { en: "Holiday Special", ar: "عرض العطلات" },
    type: "occasion-cakes",
    description: {
      en: "Festive cake for holidays and special events.",
      ar: "كيك احتفالي للعطلات والمناسبات الخاصة.",
    },
    image: "/cookies.jpg",
    basePrice: { "6inch": 36, "8inch": 51, "10inch": 66 },
    tiers: ["Single", "Two Tier"],
    flavors: ["Chocolate", "Vanilla", "Pistachio"],
    messagePrice: 5,
    specialInstructions: true,
  },
  {
    name: { en: "Corporate Cake", ar: "كيك الشركات" },
    type: "occasion-cakes",
    description: {
      en: "Professional cake for corporate events.",
      ar: "كيك احترافي للمناسبات والشركات.",
    },
    image: "/cookies.jpg",
    basePrice: { "6inch": 45, "8inch": 65, "10inch": 85 },
    tiers: ["Single", "Two Tier", "Three Tier"],
    flavors: ["Vanilla", "Chocolate", "Coffee"],
    messagePrice: 10,
    specialInstructions: true,
  },
  {
    name: { en: "Engagement Cake", ar: "كيك خطوبة" },
    type: "occasion-cakes",
    description: {
      en: "Beautiful cake to celebrate engagements.",
      ar: "كيك جميل للاحتفال بالخطوبة.",
    },
    image: "/cookies.jpg",
    basePrice: { "6inch": 42, "8inch": 60, "10inch": 78 },
    tiers: ["Single", "Two Tier"],
    flavors: ["Red Velvet", "Vanilla", "Strawberry"],
    messagePrice: 8,
    specialInstructions: true,
  },
  {
    name: { en: "Retirement Cake", ar: "كيك التقاعد" },
    type: "occasion-cakes",
    description: {
      en: "Custom cake to celebrate retirement.",
      ar: "كيك مخصص للاحتفال بالتقاعد.",
    },
    image: "/cookies.jpg",
    basePrice: { "6inch": 39, "8inch": 54, "10inch": 69 },
    tiers: ["Single", "Two Tier"],
    flavors: ["Chocolate", "Vanilla", "Carrot"],
    messagePrice: 5,
    specialInstructions: true,
  },
  {
    name: { en: "Milestone Celebration", ar: "احتفال بالإنجازات" },
    type: "occasion-cakes",
    description: {
      en: "Perfect for any milestone celebration.",
      ar: "مثالي للاحتفال بأي إنجاز مهم.",
    },
    image: "/cookies.jpg",
    basePrice: { "6inch": 41, "8inch": 57, "10inch": 73 },
    tiers: ["Single", "Two Tier", "Three Tier"],
    flavors: ["Vanilla", "Chocolate", "Strawberry", "Pistachio"],
    messagePrice: 7,
    specialInstructions: true,
  },

];
