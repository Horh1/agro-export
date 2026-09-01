import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Очищаем
  await prisma.inquiry.deleteMany();
  await prisma.product.deleteMany();
  await prisma.sectionInfo.deleteMany();

  // Продукты
  const products = [
    {
      name: "Картофель ранний «Ред Скарлет»",
      category: Category.VEGETABLES,
      description: "Высокоурожайный сорт голландской селекции.",
      price: "от 18 ₽/кг",
      images: ["https://i.ibb.co/KpKnrxTN/kartofel-min-min.jpg"],
    },
    {
      name: "Свёкла столовая «Бордо 237»",
      category: Category.VEGETABLES,
      description: "Среднеранний сорт. Мякоть тёмно-бордовая.",
      price: "от 20 ₽/кг",
      images: ["https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600"],
    },
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  // Секции
  const sections = [
    {
      title: "1 000+ га",
      description: "Собственных полей в Краснодарском крае. Контроль на каждом этапе.",
      icon: "🌱",
      sortOrder: 1,
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      ],
    },
    {
      title: "Хранение",
      description: "Овощехранилища с климат-контролем. Продукция круглый год.",
      icon: "🏭",
      sortOrder: 2,
      images: [
        "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800",
        "https://images.unsplash.com/photo-1601599963567-89c1ff1b2d8b?w=800",
      ],
    },
    {
      title: "Доставка",
      description: "Собственный автопарк. Доставка по всему краю без задержек.",
      icon: "🚛",
      sortOrder: 3,
      images: [
        "https://images.unsplash.com/photo-1586191582050-b7d3c4b58ed7?w=800",
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800",
      ],
    },
    {
      title: "ГОСТ",
      description: "Сертифицированная продукция. Лабораторный контроль.",
      icon: "📋",
      sortOrder: 4,
      images: [
        "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
      ],
    },
  ];

  for (const s of sections) {
    await prisma.sectionInfo.create({ data: s });
  }

  console.log("✅ Сиды загружены");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
