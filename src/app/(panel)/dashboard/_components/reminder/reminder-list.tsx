"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reminder } from "@/generated/prisma/client";
import { Plus, Trash } from "lucide-react";

interface ReminderListProps {
  reminder?: Reminder[];
}

export default function ReminderList({ reminder }: ReminderListProps) {
  console.log(reminder);
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Lembretes
          </CardTitle>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="w-9 p-0 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent>
          {reminder?.length === 0 && (
            <p className="text-sm text-gray-500">
              Nenhum lembrete registrado...
            </p>
          )}
          {reminder?.map((item) => (
            <article
              key={item.id}
              className="flex flex-wrap flex-row items-center justify-between py-2 bg-yellow-100 mb-2 px-2 rounded-md"
            >
              <p className="text-sm lg:text-base">{item.description}</p>
              <Button className="bg-red-500 hover:bg-red-400 shadow-none rounded-full p-2 cursor-pointer">
                <Trash className="w-4 h-4 text-white" />
              </Button>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
