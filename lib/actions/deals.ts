"use server";

import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createDeal(data: {
  accountId: string;
  title: string;
  stage: string;
  amountLocal: number;
  currency: string;
  closeDate: Date;
  probability: number;
}) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const tenantUser = await prisma.tenantUser.findFirst({
    where: {
      userId: session.user.id,
      tenant: { accounts: { some: { id: data.accountId } } },
    },
  });

  if (!tenantUser) throw new Error("Access denied to this account");

  const deal = await prisma.deal.create({
    data: {
      accountId: data.accountId,
      title: data.title,
      stage: data.stage,
      amountLocal: data.amountLocal,
      currency: data.currency,
      closeDate: data.closeDate,
      probability: data.probability,
    },
  });

  revalidatePath("/deals");
  return deal;
}

export async function updateDealStage(dealId: string, newStage: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const deal = await prisma.deal.findUnique({
    where: { id: dealId },
    include: { account: { include: { tenant: { include: { users: true } } } } },
  });

  if (!deal) throw new Error("Deal not found");

  const isOwner = deal.account.tenant.users.some(
    (u) => u.userId === session.user.id
  );
  if (!isOwner) throw new Error("Access denied");

  const updated = await prisma.deal.update({
    where: { id: dealId },
    data: { stage: newStage },
  });

  revalidatePath("/deals");
  return updated;
}

export async function getDealsByAccount(accountId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return prisma.deal.findMany({
    where: { accountId },
    orderBy: { createdAt: "desc" },
  });
}