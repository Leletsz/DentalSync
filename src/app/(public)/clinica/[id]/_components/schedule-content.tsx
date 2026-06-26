"use client";

import Image from "next/image";
import imgTest from "../../../../../../public/foto1.png";
import { MapPin } from "lucide-react";
import { Prisma } from "@/generated/prisma/client";
import { useAppointmentForm } from "./schedule-form";

import { Controller } from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatPhone } from "@/utils/formatPhone";
import { DateTimePicker } from "./date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;
interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription;
}

export default function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-cyan-500" />

      <section className="container mx-auto px-4 -mt-17">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-8">
              <Image
                src={clinic.image ? clinic.image : imgTest}
                alt="Foto da Clinica"
                className="object-cover"
                fill
              />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-center">
              {clinic.name}
            </h1>
            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <span>
                {clinic.address ? clinic.address : "Endereço não informado"}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-2xl mx-auto w-full mt-6">
        {/* Formulário de agendamento */}
        <FieldGroup {...form}>
          <form className="mx-2 space-y-6 bg-white p-6 border rounded-md shadow-sm">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field className="my-2">
                  <FieldLabel className="font-semibold">
                    Nome Completo:{" "}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Digite o nome completo"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field className="my-2">
                  <FieldLabel className="font-semibold">Email: </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Digite seu email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <Field className="my-2">
                  <FieldLabel className="font-semibold">Telefone: </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="phone"
                      placeholder="(XX) XXXXX-XXXX"
                      onChange={(e) => {
                        const formattedValue = formatPhone(e.target.value);
                        field.onChange(formattedValue);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="date"
              render={({ field, fieldState }) => (
                <Field className="w-full flex">
                  <FieldLabel className=" font-semibold">
                    Data do agendamento:
                  </FieldLabel>
                  <FieldContent>
                    <DateTimePicker
                      className="rounded border p-2"
                      initialDate={new Date()}
                      onChange={(date) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="serviceId"
              render={({ field, fieldState }) => (
                <Field className="">
                  <FieldLabel className="font-semibold">
                    Selecione o serviço:{" "}
                  </FieldLabel>
                  <FieldContent>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {clinic.services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} ({Math.floor(service.duration / 60)}h{" "}
                            {service.duration % 60}min)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </form>
        </FieldGroup>
      </section>
    </div>
  );
}
