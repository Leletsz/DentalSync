"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.email().min(1, "O email é obrigatório"),
  phone: z.string().min(1, "O nome é obrigatório"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  serviceId: z.string().min(1, "O nome é obrigatório"),
  time: z.string().min(1, "O nome é obrigatório"),
  clinicId: z.string().min(1, "O nome é obrigatório"),
});

type FormSchema = z.infer<typeof formSchema>;

export async function createNewAppointment(formData: FormSchema) {
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }
  try {
    const [year, month, day] = formData.date.split("-").map(Number);
    const appointmentDate = new Date(
      Date.UTC(year, month - 1, day, 0, 0, 0, 0),
    );

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: formData.time,
        appointmentDate: appointmentDate,
        serviceId: formData.serviceId,
        userId: formData.clinicId,
      },
    });
    return {
      data: newAppointment,
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Erro ao cadastrar agendamento",
    };
  }
}
