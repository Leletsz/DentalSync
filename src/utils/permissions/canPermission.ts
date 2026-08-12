"use server";

import { auth } from "@/lib/auth";
import { PlanDetailInfo } from "./get-plans";
import prisma from "@/lib/prisma";

export type PLAN_PROP = "BASIC" | "PROFESSIONALS" | "TRIAL" | "EXPIRED";

interface ResultPermissionProps {
  hasPermission: boolean;
  planId: string;
  expired: boolean;
  plan: PlanDetailInfo | null;
}

interface CanPermissionProps {
  type: string;
}

export async function canPermission({
  type,
}: CanPermissionProps): Promise<ResultPermissionProps> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: true,
      plan: null,
    };
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });
  switch (type) {
    case "service":
      return {
        hasPermission: false,
        planId: "EXPIRED",
        expired: true,
        plan: null,
      };
    default:
      return {
        hasPermission: false,
        planId: "EXPIRED",
        expired: true,
        plan: null,
      };
  }
}
