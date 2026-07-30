import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import GridPlans from "./_components/grid-plans";

export default function Plans() {
  const session = getSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <GridPlans />
    </div>
  );
}
