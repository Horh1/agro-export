import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Функция авторизации (пока без реальной защиты)
const auth = () => ({ id: "admin" });

export const ourFileRouter = {
  // Загрузка фото товаров — до 4 фото, до 4 МБ каждое
  productImages: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(() => auth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("Uploaded:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;