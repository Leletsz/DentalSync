import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function Dashboard() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <div className="space-x-2 flex items-center justify-end">
        <Link href={`/clinica/${session.user?.id}`} target="_blank">
          <Button className="bg-cyan-500 px-3 py-4 hover:bg-cyan-400 flex-1 md:flex-0">
            <Calendar className="w-5 h-5" />
            <span>Novo agendamento</span>
          </Button>
        </Link>
      </div>
    </main>
  );
}
