"use client";

import Image from "next/image";
import imgTest from "../../../../../../public/foto1.png";
import { MapPin } from "lucide-react";
import { Prisma } from "@/generated/prisma/client";
import { AppointmentFormData, useAppointmentForm } from "./schedule-form";

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
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { watch } from "fs";
import { Label } from "@/components/ui/label";

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;
interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm();
  const { watch } = form;
  const name = form.watch("name");
  const email = form.watch("email");
  const phone = form.watch("phone");
  const date = form.watch("date");

  const selectedDate = watch("date");

  const selectedService = watch("serviceId");

  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

  const fetchBlockedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      setLoadingSlots(true);
      try {
        const dateString = date.toISOString().split("T")[0];

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`,
        );

        const json = await response.json();
        setLoadingSlots(false);
        return json; //Retorna o array com os horarios que ja tem bloqueado desse Dia e dessa clinica
      } catch (err) {
        console.log(err);
        setLoadingSlots(false);
        return [];
      }
    },
    [clinic.id],
  );

  useEffect(() => {
    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then((blocked) => {
        setBlockedTimes(blocked);

        const times = clinic.times || [];

        const finalSlots = times.map((time) => ({
          time: time,
          available: !blocked.includes(time),
        }));
        setAvailableTimeSlots(finalSlots);
      });
    }
  }, [selectedDate, clinic.times, fetchBlockedTimes, selectedTime]);

  async function handleRegisterAppointment(formData: AppointmentFormData) {
    console.log(formData);
  }

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
        <form
          onSubmit={form.handleSubmit(handleRegisterAppointment)}
          className="mx-2 space-y-4 bg-white p-6 border rounded-md shadow-sm"
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field>
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
                <Field>
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
                <Field>
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
                <Field className="flex flex-row justify-start">
                  <FieldContent className="flex flex-row gap-3">
                    <FieldLabel className="font-semibold">
                      Data do agendamento:
                    </FieldLabel>
                    <DateTimePicker
                      className="rounded border p-2 w-25"
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
                    <Select
                      onValueChange={field.onChange}
                      disabled={!name?.trim()}
                    >
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
            {selectedService && (
              <div>
                <Label>Horários disponíveis:</Label>
                <div className="bg-gray-50 p-4 rounded-lg"></div>
              </div>
            )}
            {clinic.status ? (
              <Button
                className="w-full bg-cyan-500 hover:bg-cyan-400"
                type="submit"
                disabled={!form.formState.isValid}
              >
                Realizar agendamento
              </Button>
            ) : (
              <p className="bg-red-500 text-white text-center px-4 py-2 rounded">
                A clinica está fechada nesse momento
              </p>
            )}
          </FieldGroup>
        </form>
      </section>
    </div>
  );
}
