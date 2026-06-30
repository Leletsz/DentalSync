import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const userId = searchParams.get("userId");
  const dateParam = searchParams.get("date");

  if (!userId || userId === "null" || !dateParam || dateParam === "null") {
    return NextResponse.json(
      { error: "Nenhum agendamento encontrado" },
      {
        status: 400,
      },
    );
  }

  try {
    const [year, month, day] = dateParam.split("-").map(Number);
  } catch (err) {
    return NextResponse.json(
      { error: "Nenhum agendamento encontrado" },
      {
        status: 400,
      },
    );
  }
  // Buscar se tem agendamentos em uma data especifica de uma clinica.

  // Quais horarios estão reservados.
  return NextResponse.json({
    ok: true,
  });
}
