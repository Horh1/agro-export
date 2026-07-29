import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Заявки ({inquiries.length})
      </h1>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-400">
          Заявок пока нет
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <span className="font-semibold text-gray-900">{inq.contactPerson}</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-sm text-gray-500">
                    {inq.applicantType === "company" ? "Компания" : "Физлицо"}
                    {inq.companyName && ` — ${inq.companyName}`}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(inq.createdAt).toLocaleString("ru-RU")}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-400">Телефон: </span>
                  <a href={`tel:${inq.phone}`} className="text-green-700">{inq.phone}</a>
                </div>
                <div>
                  <span className="text-gray-400">Email: </span>
                  <a href={`mailto:${inq.email}`} className="text-green-700">{inq.email}</a>
                </div>
                <div>
                  <span className="text-gray-400">Интересует: </span>
                  <span className="text-gray-700">{inq.interestedIn.join(", ")}</span>
                </div>
                {inq.volume && (
                  <div>
                    <span className="text-gray-400">Объём: </span>
                    <span className="text-gray-700">{inq.volume}</span>
                  </div>
                )}
              </div>

              {inq.message && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  {inq.message}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}