"use server";

import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

const EXCHANGE_RATES: Record<string, number> = {
  ARS: 0.0011,
  MXN: 0.058,
  CLP: 0.0011,
  COP: 0.00025,
  BRL: 0.2,
  PEN: 0.27,
  USD: 1,
};

export async function getSaaSSMetrics(tenantId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const tenantUser = await prisma.tenantUser.findFirst({
    where: { tenantId, userId: session.user.id },
  });
  if (!tenantUser) throw new Error("Access denied");

  const subscriptions = await prisma.subscription.findMany({
    where: { account: { tenantId } },
  });

  const mrrLocal = subscriptions.reduce((sum, s) => sum + s.mrrLocal, 0);
  const mrrUsd = subscriptions.reduce((sum, s) => {
    const rate = EXCHANGE_RATES[s.currency] || 1;
    return sum + s.mrrLocal * rate;
  }, 0);

  const activeCount = subscriptions.filter((s) => s.status === "active").length;
  const churnedCount = subscriptions.filter((s) => s.status === "churned").length;
  const churnRate =
    activeCount + churnedCount > 0
      ? (churnedCount / (activeCount + churnedCount)) * 100
      : 0;

  const ltv = mrrUsd > 0 ? (mrrUsd * 36) / (churnRate / 100 || 1) : 0;

  return {
    mrrLocal,
    mrrUsd: Math.round(mrrUsd),
    arr: Math.round(mrrUsd * 12),
    activeSubscriptions: activeCount,
    churnRate: Math.round(churnRate * 100) / 100,
    ltv: Math.round(ltv),
    atRiskCount: subscriptions.filter((s) => s.churnRisk).length,
  };
}

export async function getUpcomingRenewals(tenantId: string, daysAhead = 30) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const now = new Date();
  const future = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  return prisma.subscription.findMany({
    where: {
      account: { tenantId },
      renewalDate: { gte: now, lte: future },
      status: "active",
    },
    include: { account: true },
    orderBy: { renewalDate: "asc" },
  });
}