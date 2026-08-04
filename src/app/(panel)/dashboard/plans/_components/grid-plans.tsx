import { subscriptionPlans } from "@/utils/plans";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubscriptionButton } from "./subscription-button";

export default function GridPlans() {
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2  md:gap-3">
      {subscriptionPlans.map((plan, index) => (
        <Card key={plan.id} className="flex flex-col w-full mx-auto ">
          {index === 1 && (
            <div className="bg-emerald-500 w-full py-3 text-center rounded-t-xl -mt-5">
              <p className="font-semibold text-white">PROMOÇÃO EXCLUSIVA</p>
            </div>
          )}
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              {plan.features.map((feature, index) => (
                <li className="text-sm md:text-base" key={index}>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-gray-600 line-through">{plan.oldPrice}</p>
              <p className="text-black text-2xl font-bold">{plan.price}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubscriptionButton
              type={plan.id === "BASIC" ? "BASIC" : "PROFESSIONAL"}
            />
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
