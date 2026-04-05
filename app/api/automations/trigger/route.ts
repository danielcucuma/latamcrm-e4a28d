import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { automationId, accountId, context } = await req.json();

    const automation = await prisma.automation.findUnique({
      where: { id: automationId },
    });

    if (!automation || !automation.enabled) {
      return NextResponse.json(
        { error: "Automation not found or disabled" },
        { status: 404 }
      );
    }

    if (automation.trigger === "renewal_30_days") {
      const subscription = await prisma.subscription.findFirst({
        where: { accountId },
        include: { account: true },
      });

      if (subscription && automation.emailTemplate) {
        await sendEmail({
          to: context.contactEmail,
          subject: "Tu suscripción se renueva pronto",
          template: automation.emailTemplate,
          variables: {
            accountName: subscription.account.companyName,
            renewalDate: subscription.renewalDate.toLocaleDateString("es-ES"),
            mrrLocal: subscription.mrrLocal,
            currency: subscription.currency,
          },
        });

        await prisma.automation.update({
          where: { id: automationId },
          data: { lastTriggeredAt: new Date() },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Automation trigger error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}