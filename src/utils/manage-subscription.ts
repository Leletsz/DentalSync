import { Plan } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { stripe } from "./stripe";

/**
 * Salvar, atualizar ou deletar informações das assinatura no banco de dados, sincronizando com a stripe
 *
 * @async
 * @function manageSubscription
 * @param {string} subscriptionId
 * @param {customerId} customerId
 * @param {boolean} createAction
 * @param {boolean} deleteAction
 * @param {Plan} [type]
 * @returns {Promise<Response | void >}
 */
export async function manageSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false,
  type?: Plan,
) {
  const findUser = await prisma.user.findFirst({
    where: { stripe_customer_id: customerId },
  });

  if (!findUser) {
    return Response.json(
      { error: "Falha ao realizar assinatura" },
      { status: 400 },
    );
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: findUser.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    plan: type ?? "BASIC",
  };

  if (subscriptionId && deleteAction) {
    await prisma.subscription.delete({
      where: {
        id: subscriptionId,
      },
    });
    return;
  }

  if (createAction) {
    try {
      await prisma.subscription.create({
        data: subscriptionData,
      });
    } catch (err) {
      console.log("ERRO AO SALVAR NO BANCO A ASSINATURA");
    }
    return;
  } else {
    try {
      const findSubscription = await prisma.subscription.findFirst({
        where: {
          id: subscriptionId,
        },
      });
      if (!findSubscription) return;
      await prisma.subscription.update({
        where: {
          id: findSubscription.id,
        },
        data: {
          status: subscription.status,
          priceId: subscription.items.data[0].price.id,
        },
      });
    } catch (err) {}
  }
}
