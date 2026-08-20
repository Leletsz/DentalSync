"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
import { Controller } from "react-hook-form";
import { ArrowRight, Edit, Edit2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import type { Prisma } from "@/generated/prisma/client";
import { updateProfile } from "../_actions/update-profile";
import { formatPhone } from "@/utils/formatPhone";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AvatarProfile } from "./profile-avatar";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  };
}>;

interface ProfileContentProps {
  user: UserWithSubscription | null;
}
export function ProfileContent({ user }: ProfileContentProps) {
  const router = useRouter();
  const [selectedHours, setSelectedHours] = useState<string[]>(
    user?.times ?? [],
  );
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [editProfile, setEditProfile] = useState(true);
  const { update } = useSession();

  function handleEdit() {
    if (editProfile) {
      setEditProfile(false);
      return;
    }
    setEditProfile(true);
  }

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
    const response = await updateProfile({
      name: values.name,
      address: values.address,
      phone: values.phone,
      status: values.status === "active" ? true : false,
      timeZone: values.timeZone,
      times: selectedHours || [],
    });
    if (response.error) {
      toast(response.error, { closeButton: true });
      return;
    }
    toast(response.data);
    setEditProfile(true);
  }

  async function handleLogout() {
    await signOut();
    await update();
    router.replace("/");
  }

  if (!user) return null;

  return (
    <div className="mx-auto">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Meu perfil</CardTitle>
          <Button
            className="cursor-pointer"
            disabled={!editProfile}
            type="button"
            onClick={handleEdit}
          >
            <Edit />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <AvatarProfile
              avatarUrl={user.image}
              userId={user.id}
              editProfile={editProfile}
            />
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
                        disabled={editProfile}
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
                        disabled={editProfile}
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
                name="phone"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Telefone:</FieldLabel>
                    <FieldContent>
                      <Input
                        {...field}
                        disabled={editProfile}
                        placeholder="(68) 99923-4312"
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
                name="status"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Status da clínica</FieldLabel>

                    <FieldContent>
                      <Select
                        disabled={editProfile}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                        disabled={editProfile}
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
                        disabled={editProfile}
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
                disabled={editProfile}
                className="w-full bg-cyan-500 cursor-pointer"
                type="submit"
              >
                Salvar alterações
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <section className="mt-4 ">
        <Button
          variant={"destructive"}
          onClick={handleLogout}
          className="cursor-pointer"
        >
          Sair da conta
        </Button>
      </section>
    </div>
  );
}
