export type PlanDetailProps = {
  maxServices: number;
};
export type PlansProps = {
  BASIC: PlanDetailProps;
  PROFESSIONAL: PlanDetailProps;
};
export const PLANS = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 10,
  },
};

export const subscriptionPlans = [
  {
    id: "BASIC",
    name: "Basic",
    description: "Indicado para clinicas menores",
    oldPrice: "R$ 97,90",
    price: "R$ 27,90",
    features: [
      `Até ${PLANS["BASIC"].maxServices} serviços`,
      "Agendamentos ilimitados",
      "Suporte",
      "Relatórios",
    ],
  },
  {
    id: "PROFESSIONAL",
    name: "Professional",
    description: "Indicado para clinicas grandes",
    oldPrice: "R$ 197,90",
    price: "R$ 97,90",
    features: [
      `Até ${PLANS["PROFESSIONAL"].maxServices} serviços`,

      "Agendamentos ilimitados",
      "Suporte prioritário",
      "Relatórios avançados",
    ],
  },
];
