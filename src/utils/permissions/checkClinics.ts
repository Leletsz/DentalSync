import { Prisma } from "@/generated/prisma/client";
import { TRIAL_DAYS } from "./trial-limits";
import { addDays, isAfter } from "date-fns";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: { subscription: true };
}>;
TRIAL_DAYS;

export const clinicIsVisible = (clinic: UserWithSubscription): boolean => {
  // Tem plano ativo no Stripe
  if (clinic.subscription?.status === "active") return true;
  // Sem plano, verificar se ainda está no período de trial
  const trialEndDate = addDays(new Date(clinic.createdAt), TRIAL_DAYS);
  return !isAfter(new Date(), trialEndDate); // true se o trial ainda não expirou
};
