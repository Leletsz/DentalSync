import Image from "next/image";
import React from "react";
import profImg from "../../../../public/foto1.png";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Prisma } from "@/generated/prisma/client";
import { clinicIsVisible } from "@/utils/permissions/checkClinics";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: { subscription: true };
}>;
interface ProfessionalsProps {
  professionals: UserWithSubscription[];
}
export default async function Professionals({
  professionals,
}: ProfessionalsProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center mb-12 font-bold">
          Clínicas disponíveis
        </h2>
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/*Renderiza apenas clinicas com plano ou em Trial*/}
          {professionals.filter(clinicIsVisible).map((clinic) => (
            <Card
              className="overflow-hidden p-0 hover:shadow-lg duration-300"
              key={clinic.id}
            >
              <CardContent className="p-0">
                <div>
                  <div className="relative h-48">
                    <Image
                      src={clinic.image ?? profImg}
                      alt="Foto ilustrativa"
                      fill
                      className="object-cover"
                    />
                    {/* Star Icone */}
                    {clinic?.subscription?.status === "active" &&
                      clinic?.subscription?.plan === "PROFESSIONAL" && (
                        <div className="absolute top-1 right-1 bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center">
                          <Star className="text-white " />
                        </div>
                      )}
                  </div>
                </div>

                <div className="p-4 space-y-4 min-h-40 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{clinic.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {clinic.address ?? "Endereço não informado"}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/clinica/${clinic.id}`}
                    target="_blank"
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center py-2 rounded-md text-sm md:text-base font-medium"
                  >
                    Agendar horário
                    <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </section>
  );
}
