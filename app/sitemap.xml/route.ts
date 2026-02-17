import { connectDB } from "@/lib/config/db";
import { Product } from "@/lib/models/ProductSchema";
import { ProductType } from "@/type";
import { NextResponse } from "next/server";

type SitemapUrl = {
  loc: string;           // Full URL string
  changefreq: string;    // e.g., "daily", "weekly", "monthly"
  priority: number;      // e.g., 1.0, 0.9
};

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    const menuRes = await Product.find({}).lean();
    const menuItems: ProductType[] = JSON.parse(JSON.stringify(menuRes));

    // Static pages
    const staticPages = [
      '/',
      '/collections',
      '/about',
      '/add-review',
      '/customize-your-cake',
      '/privacy-policy',
      '/terms-and-condition',
      '/shipping-and-returns',
    ];

    // Generate sitemap URLs as typed objects
    const urls: SitemapUrl[] = [];

    // Add static pages
    staticPages.forEach(page => {
      urls.push({
        loc: `https://amasbakery.vercel.app${page}`,
        changefreq: "weekly",
        priority: 0.7,
      });
    });
    
    menuItems.forEach(item => {
      urls.push({
        loc: `https://amasbakery.vercel.app/collections/${item.type}/${item.slug}`,
        changefreq: "weekly",
        priority: 0.9,
      });
    });

    menuItems.forEach(item => {
      urls.push({
        loc: `https://amasbakery.vercel.app/collections/${item.type}`,
        changefreq: "weekly",
        priority: 0.9,
      });
    });

    // Generate final XML from typed objects
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `
  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (err) {
    console.error("Error generating sitemap:", err);
    return new NextResponse("Sitemap generation failed", { status: 500 });
  }
}
