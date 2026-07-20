import { prisma } from "@/lib/prisma";

export default async function sitemap() {
  const baseUrl = "https://agro-export.ru";

  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { id: true, updatedAt: true },
  });

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/products/${p.id}`,
    lastModified: p.updatedAt,
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    ...productUrls,
  ];
}
