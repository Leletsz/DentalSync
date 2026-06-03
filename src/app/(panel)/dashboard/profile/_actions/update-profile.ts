"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { error } from "console";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z.string(),
  times: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

export async function updateProfile(data: FormSchema) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Usuário não encontrado",
    };
  }
  const schema = formSchema.safeParse(data);

  if (!schema.success) {
    return {
      error: "Preencha todos os campos",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        status: data.status,
        timeZone: data.timeZone,
        times: data.times || [],
      },
    });

    return {
      data: "Clinica atualizada com sucesso",
    };
  } catch (err) {
    return {
      error: "Falha ao atualizar a clinica",
    };
  }
}
