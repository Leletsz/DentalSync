"use client";

import { Controller, useWatch } from "react-hook-form";
import { useReminderForm, ReminderFormdata } from "./reminder-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createReminder } from "../../_actions/create-reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReminderContentProps {
  closeDialog: () => void;
}

export function ReminderContent({ closeDialog }: ReminderContentProps) {
  const form = useReminderForm();
  const router = useRouter();

  async function handleRegisterReminder(formData: ReminderFormdata) {
    const response = await createReminder({
      description: formData.description,
    });
    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success(response.data);
    router.refresh();
    closeDialog();
  }

  const selectedDescription = useWatch({
    control: form.control,
    name: "description",
  });

  return (
    <div className="grid gap-4 py-4">
      <form
        onSubmit={form.handleSubmit(handleRegisterReminder)}
        className="flex flex-col gap-4"
      >
        <FieldGroup>
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="font-semibold">Descrição: </FieldLabel>
                <FieldContent>
                  <Input {...field} id="phone" placeholder="Lembrar de..." />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={!selectedDescription}
        >
          Cadastrar Lembrete
        </Button>
      </form>
    </div>
  );
}
