import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
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

import React from "react";
import { UseDialogServiceForm } from "./dialog-service-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DialogService() {
  const form = UseDialogServiceForm();
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>Adicione um novo serviço</DialogDescription>
      </DialogHeader>
      <div>
        <form>
          <FieldGroup className="flex flex-col gap-2">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field className="my-2">
                  <FieldLabel>Nome do serviço: </FieldLabel>
                  <FieldContent>
                    <Input {...field} placeholder="Digite o nome do serviço" />
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <Field className="my-2">
                  <FieldLabel>Valor do serviço: </FieldLabel>
                  <FieldContent>
                    <Input {...field} placeholder="Ex: 120,00" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <p>Tempo de duração do serviço</p>
            <div className="grid grid-cols-2 gap-3">
              <Controller
                control={form.control}
                name="hours"
                render={({ field, fieldState }) => (
                  <Field className="my-2">
                    <FieldLabel>Horas: </FieldLabel>
                    <FieldContent>
                      <Input
                        {...field}
                        placeholder="1"
                        min={"0"}
                        type="number"
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
                name="minutes"
                render={({ field, fieldState }) => (
                  <Field className="my-2">
                    <FieldLabel>Minutos: </FieldLabel>
                    <FieldContent>
                      <Input
                        {...field}
                        placeholder="1"
                        min={"0"}
                        type="number"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
          <Button type="submit" className="w-full font-semibold text-white">
            teste
          </Button>
        </form>
      </div>
    </div>
  );
}
