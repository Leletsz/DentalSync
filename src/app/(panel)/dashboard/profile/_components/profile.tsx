"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProfileFormData, useProfileForm } from "./profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import imgProfile from "../../../../../../public/foto1.png";
import { Controller } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import type { Prisma } from "@/generated/prisma/client";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  };
}>;

interface ProfileContentProps {
  user: UserWithSubscription | null;
}
export function ProfileContent({ user }: ProfileContentProps) {
  const [selectedHours, setSelectedHours] = useState<string[]>(
    user?.times ?? [],
  );
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useProfileForm({
    name: user?.name,
    address: user?.address,
    phone: user?.phone,
    status: user?.status,
    timeZone: user?.timeZone,
  });

  function generateTimeSlots(): string[] {
    const hours: string[] = [];
    for (let i = 8; i <= 24; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, "0");
        const minute = (j * 30).toString().padStart(2, "0");
        hours.push(`${hour}:${minute}`);
      }
    }
    return hours;
  }
  const hours = generateTimeSlots();

  function toggleHour(hour: string) {
    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour].sort(),
    );
  }

  const timeZones = Intl.supportedValuesOf("timeZone").filter(
    (zone) =>
      zone.startsWith("America/Sao_Paulo") ||
      zone.startsWith("America/Fortaleza") ||
      zone.startsWith("America/Recife") ||
      zone.startsWith("America/Bahia") ||
      zone.startsWith("America/Belem") ||
      zone.startsWith("America/Manaus") ||
      zone.startsWith("America/Cuiaba") ||
      zone.startsWith("America/Boa_Vista"),
  );

  async function onSubmit(values: ProfileFormData) {
    const profile = {
      ...values,
      times: selectedHours,
    };
    console.log(profile);
  }

  return (
    <div className="mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Meu perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="relative h-40 w-40 rounded-full overflow-hidden">
              <Image src={imgProfile} alt="" className="object-cover" />
            </div>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-3">
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Nome:</FieldLabel>
                    <FieldContent>
                      <Input
                        {...field}
                        placeholder="Digite o nome da clinica"
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
                name="address"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Endereço:</FieldLabel>
                    <FieldContent>
                      <Input
                        {...field}
                        placeholder="Digite o endereço da clinica"
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
                name="status"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Status da clínica</FieldLabel>

                    <FieldContent>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ? "active" : "inactive"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem className="text-green-800" value="active">
                            Ativo
                          </SelectItem>
                          <SelectItem className="text-red-800" value="inactive">
                            Inativo
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="timeZone"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Selecione fuso horário</FieldLabel>

                    <FieldContent>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o seu fuso horário" />
                        </SelectTrigger>

                        <SelectContent>
                          {timeZones.map((zone) => (
                            <SelectItem key={zone} value={zone}>
                              {zone}
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

              <Field>
                <FieldLabel>Configurar horários da clínica</FieldLabel>
                <FieldContent>
                  <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-between"
                      >
                        Clique aqui para selecionar horários{" "}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="text-center">
                        <DialogTitle>Horários da Clínica</DialogTitle>
                        <DialogDescription>
                          Selecione abaixo os horários de funcionamento
                        </DialogDescription>
                      </DialogHeader>
                      <section className="py-4">
                        <p className="text-sm text-muted-foreground">
                          Clique nos horários abaixo para marcar ou desmarcar
                        </p>
                        <div className="grid grid-cols-5 gap-2">
                          {hours.map((hour) => (
                            <Button
                              key={hour}
                              variant={"outline"}
                              className={cn(
                                "h-10 border-3",
                                selectedHours.includes(hour) &&
                                  "border-cyan-500",
                              )}
                              onClick={() => toggleHour(hour)}
                            >
                              {hour}
                            </Button>
                          ))}
                        </div>
                      </section>
                      <Button
                        className="w-full bg-cyan-500"
                        onClick={() => setDialogIsOpen(false)}
                      >
                        Salvar horários
                      </Button>
                    </DialogContent>
                  </Dialog>
                </FieldContent>
              </Field>
              <Button
                className="w-full bg-cyan-500 cursor-pointer"
                type="submit"
              >
                Salvar alterações
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
