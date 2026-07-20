import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Очищаем таблицы в правильном порядке
  await prisma.inquiry.deleteMany();
  await prisma.product.deleteMany();

  const products = [
    {
      name: "Картофель ранний «Ред Скарлет»",
      category: Category.VEGETABLES,
      description:
        "Высокоурожайный сорт голландской селекции. Клубни красные, мякоть жёлтая. Идеален для мойки и фасовки. Вегетационный период 70–80 дней.",
      price: "от 18 ₽/кг",
      imageUrl: null,
    },
    {
      name: "Морковь столовая «Нантская 4»",
      category: Category.VEGETABLES,
      description:
        "Классический среднеспелый сорт. Корнеплоды ровные, цилиндрические, длиной 15–17 см. Высокое содержание каротина. Отличная лёжкость.",
      price: "от 22 ₽/кг",
      imageUrl: null,
    },
    {
      name: "Свёкла столовая «Бордо 237»",
      category: Category.VEGETABLES,
      description:
        "Среднеранний сорт. Мякоть тёмно-бордовая, без колец. Масса корнеплода 250–500 г. Лёжкость до 8 месяцев.",
      price: "от 20 ₽/кг",
      imageUrl: null,
    },
    {
      name: "Капуста белокочанная «Слава 1305»",
      category: Category.VEGETABLES,
      description:
        "Среднеспелый сорт. Кочаны округлые, плотные, массой 3–5 кг. Устойчив к растрескиванию. Подходит для квашения и свежего потребления.",
      price: "от 15 ₽/кг",
      imageUrl: null,
    },
    {
      name: "Лук репчатый «Штутгартер Ризен»",
      category: Category.VEGETABLES,
      description:
        "Немецкий раннеспелый сорт. Луковицы плоско-округлые, 120–150 г. Золотисто-коричневая чешуя. Отличная вызреваемость.",
      price: "от 25 ₽/кг",
      imageUrl: null,
    },
    {
      name: "Пшеница озимая «Московская 39»",
      category: Category.GRAINS,
      description:
        "Сорт продовольственной пшеницы. Содержание клейковины 28–32%. Урожайность до 55 ц/га. Зерно 1–2 класса.",
      price: "от 14 000 ₽/т",
      imageUrl: null,
    },
    {
      name: "Ячмень яровой «Владимир»",
      category: Category.GRAINS,
      description:
        "Пивоваренный ячмень. Содержание белка 10–11%. Выровненность зерна >92%. Урожайность до 45 ц/га.",
      price: "от 12 000 ₽/т",
      imageUrl: null,
    },
    {
      name: "Кукуруза на зерно «Краснодарский 194 МВ»",
      category: Category.GRAINS,
      description:
        "Среднеранний гибрид. Зерно кремнисто-зубовидное. Урожайность до 90 ц/га. Отличная засухоустойчивость.",
      price: "от 11 000 ₽/т",
      imageUrl: null,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`✅ Засеяно ${products.length} продуктов`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });