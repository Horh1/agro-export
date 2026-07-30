import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const stats = {
    total: inquiries.length,
    today: inquiries.filter((i) => {
      const now = new Date();
      const created = new Date(i.createdAt);
      return created.toDateString() === now.toDateString();
    }).length,
    companies: inquiries.filter((i) => i.applicantType === "company").length,
    individuals: inquiries.filter((i) => i.applicantType === "individual").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Заявки</h1>
          <p className="text-gray-500 text-sm mt-1">{stats.total} всего · {stats.today} сегодня</p>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Всего", value: stats.total, color: "bg-blue-500", icon: "📋" },
          { label: "Сегодня", value: stats.today, color: "bg-green-500", icon: "🆕" },
          { label: "Компании", value: stats.companies, color: "bg-purple-500", icon: "🏢" },
          { label: "Физлица", value: stats.individuals, color: "bg-amber-500", icon: "👤" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${stat.color} rounded-full transition-all`} style={{ width: `${stats.total > 0 ? (stat.value / stats.total) * 100 : 0}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Таблица */}
      {inquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <span className="text-5xl block mb-4">📭</span>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Нет заявок</h3>
          <p className="text-gray-400">Когда клиенты оставят заявки, они появятся здесь</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Контакт</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Тип</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Телефон</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Интересует</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Дата</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inquiries.map((inq) => {
                  const isToday = new Date(inq.createdAt).toDateString() === new Date().toDateString();
                  return (
                    <tr key={inq.id} className="group hover:bg-forest-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${inq.applicantType === "company" ? "bg-purple-100 text-purple-700" : "bg-amber-100 text-amber-700"}`}>
                            {inq.contactPerson.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{inq.contactPerson}</p>
                            <p className="text-xs text-gray-400">{inq.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${inq.applicantType === "company" ? "bg-purple-50 text-purple-700" : "bg-amber-50 text-amber-700"}`}>
                          {inq.applicantType === "company" ? "🏢" : "👤"} {inq.applicantType === "company" ? "Компания" : "Физлицо"}
                        </span>
                        {inq.companyName && <p className="text-xs text-gray-400 mt-1">{inq.companyName}</p>}
                      </td>
                      <td className="px-6 py-4">
                        <a href={`tel:${inq.phone}`} className="text-forest-700 hover:text-forest-800 font-medium text-sm">{inq.phone}</a>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {inq.interestedIn.slice(0, 3).map((item) => (
                            <span key={item} className="px-2 py-0.5 bg-gray-100 rounded-md text-xs text-gray-600">{item}</span>
                          ))}
                          {inq.interestedIn.length > 3 && <span className="text-xs text-gray-400">+{inq.interestedIn.length - 3}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })}
                        <br />
                        <span className="text-xs text-gray-400">{new Date(inq.createdAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isToday ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Новое
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Просмотрено</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
