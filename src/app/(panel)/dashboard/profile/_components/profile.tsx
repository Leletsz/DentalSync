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

import { useProfileForm } from "./profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import imgProfile from "../../../../../../public/foto1.png";
import { Controller } from "react-hook-form";
import { ArrowRight } from "lucide-react";

export function ProfileContent() {
  const form = useProfileForm();

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
          <form>
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
                render={({ field }) => (
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
            </FieldGroup>
          </form>
          <FieldGroup>
            <Field>
              <FieldLabel>Configurar horários da clínica</FieldLabel>
              <FieldContent>
                <Dialog>
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
                    <DialogHeader>
                      <DialogTitle>Horários da Clínica</DialogTitle>
                      <DialogDescription>
                        Selecione abaixo os horários de funcionamento
                      </DialogDescription>
                    </DialogHeader>
                    <section className="py-4">
                      <p className="text-sm text-muted-foreground">
                        Clique nos horários abaixo para marcar ou desmarcar
                      </p>
                      <div>...</div>
                    </section>
                  </DialogContent>
                </Dialog>
              </FieldContent>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
