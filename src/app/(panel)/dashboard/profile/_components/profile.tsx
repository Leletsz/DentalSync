"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
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
import { Card } from "@/components/ui/card";

export function ProfileContent() {
  const form = useProfileForm();

  return (
    <div className="mx-auto">
      <form>
        <Card></Card>
      </form>
    </div>
  );
}
