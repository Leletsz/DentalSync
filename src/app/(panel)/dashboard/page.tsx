import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
export default async function Dashboard() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }
  console.log(session?.user?.name);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
