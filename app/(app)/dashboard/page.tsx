import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BarChart3, TrendingUp, Users, AlertCircle } from "lucide-react";
import prisma from "@/lib/db";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const tenant = await prisma.tenant.findFirst({
    where: { users: { some: { userId: session.user.id } } },
  });
  if (!tenant) redirect("/onboarding");

  const [deals, subscriptions, accounts] = await Promise.all([
    prisma.deal.count({ where: { tenantId: tenant.id } }),
    prisma.subscription.findMany({ where: { tenantId: tenant.id }, take: 5 }),
    prisma.account.count({ where: { tenantId: tenant.id } }),
  ]);

  const totalMRR = subscriptions.reduce((sum, s) => sum + (s.mrrLocal || 0), 0);
  const churnRisk = subscriptions.filter(s => s.churnRisk).length;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-400 mt-1">Bienvenido, {session.user.name}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Clientes Activos", value: accounts, icon: Users, color: "violet" },
          { label: "Deals en Pipeline", value: deals, icon: TrendingUp, color: "blue" },
          { label: "MRR Total", value: `$${totalMRR.toLocaleString()}`, icon: BarChart3, color: "emerald" },
          { label: "Riesgo de Churn", value: churnRisk, icon: AlertCircle, color: "red" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          const colorMap = { violet: "bg-violet-500/10 border-violet-500/20 text-violet-400", blue: "bg-blue-500/10 border-blue-500/20 text-blue-400", emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", red: "bg-red-500/10 border-red-500/20 text-red-400" };
          return (
            <div key={kpi.label} className={`rounded-xl border ${colorMap[kpi.color as keyof typeof colorMap]} p-5`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wide">{kpi.label}</p>
                  <p className="text-2xl font-bold mt-2">{kpi.value}</p>
                </div>
                <Icon className="w-8 h-8 opacity-50" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Subscriptions */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <div className="border-b border-zinc-800 p-6">
          <h2 className="font-semibold text-lg">Suscripciones Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-800/50 text-zinc-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Cliente</th>
                <th className="px-6 py-3 text-left font-medium">MRR</th>
                <th className="px-6 py-3 text-left font-medium">Renovación</th>
                <th className="px-6 py-3 text-left font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-zinc-800/30 transition">
                  <td className="px-6 py-4 font-medium">Sub #{sub.id.slice(0, 8)}</td>
                  <td className="px-6 py-4">${sub.mrrLocal?.toFixed(2)}</td>
                  <td className="px-6 py-4 text-zinc-400">{sub.renewalDate?.toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${sub.churnRisk ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                      {sub.churnRisk ? "En riesgo" : "Activa"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}