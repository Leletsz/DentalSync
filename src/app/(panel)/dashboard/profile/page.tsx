import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import React from "react";

export default async function Profile() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }
  return <div>Profile</div>;
}
