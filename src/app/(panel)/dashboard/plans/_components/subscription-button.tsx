"use client";

import { Button } from "@/components/ui/button";
import { Plan } from "@/generated/prisma/enums";
import { createSubscription } from "../_actions/create-subscription";
import { toast } from "sonner";
import { getStripeJs } from "@/utils/stripe-js";

interface SubscriptionButtonProps {
  type: Plan;
}

export function SubscriptionButton({ type }: SubscriptionButtonProps) {
  async function handleCreateBilling() {
    const result = await createSubscription({ type: type });

    if (result.error) {
      toast.error(result.error);
      return;
    }

    if (!result.url) {
      toast.error("Não foi possível iniciar o checkout. Tente novamente.");
      return;
    }

    window.location.href = result.url;
  }
  return (
    <Button
      className={`w-full cursor-pointer ${type === "PROFESSIONAL" && "bg-emerald-500 hover:bg-emerald-400"}`}
      onClick={handleCreateBilling}
    >
      Ativar assinatura
    </Button>
  );
}
