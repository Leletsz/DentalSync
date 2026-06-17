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

import React, { useState, useEffect } from "react";
import {
  DialogServiceFormData,
  UseDialogServiceForm,
} from "./dialog-service-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertRealToCentes } from "@/utils/convertCurrency";
import { createNewService } from "../_actions/create-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DialogServiceModal {
  closeModal: () => void;
  serviceId?: string;
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  } | null;
}

export default function DialogService({
  closeModal,
  initialValues,
  serviceId,
}: DialogServiceModal) {
  const form = UseDialogServiceForm({ initialValues: initialValues });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(values: DialogServiceFormData) {
    setLoading(true);
    const priceInCents = convertRealToCentes(values.price);
    const hours = parseInt(values.hours) || 0;
    const minutes = parseInt(values.minutes) || 0;

    const duration = hours * 60 + minutes;
    const response = await createNewService({
      name: values.name,
      price: priceInCents,
      duration: duration,
    });
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Serviço cadastrado com sucesso");
    handleCloseModal();
    router.refresh();
  }
  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event?.target;
    value = value.replace(/\D/g, "");

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      event.target.value = value;
      form.setValue("price", value);
    }
  }
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>Adicione um novo serviço</DialogDescription>
      </DialogHeader>
      <div>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="flex flex-col gap-2">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field className="my-2">
                  <FieldLabel>Nome do serviço: </FieldLabel>
                  <FieldContent>
                    <Input {...field} placeholder="Digite o nome do serviço" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                    <Input
                      {...field}
                      placeholder="Ex: 120,00"
                      onChange={changeCurrency}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <p className="font-semibold">Tempo de duração do serviço</p>
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
          <Button
            type="submit"
            className="w-full font-semibold text-white"
            disabled={loading}
          >
            {loading
              ? "Carregando..."
              : `${serviceId ? "Atualizar serviço" : "Cadastrar Serviço"}`}
          </Button>
        </form>
      </div>
    </div>
  );
}
