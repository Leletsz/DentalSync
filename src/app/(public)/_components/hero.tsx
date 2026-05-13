import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import doctorImg from "../../../../public/doctor-hero.png";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="container mx-auto pb-4 sm:pb-0 px-4 pt-20 sm:px-6 lg:px-8">
        <main className="flex items-center justify-center">
          <article className="flex-2 space-y-8 max-w-3xl flex flex-col justify-center">
            <h1 className="text-3xl lg:text-5xl font-bold max-w-2xl tracking-tight">
              Conecte-se aos melhores profissionais da saúde bucal.
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Agilidade, organização e eficiência para clínicas odontológicas
              modernas.
            </p>
            <Button className="bg-cyan-500 w-fit text-gray-100 cursor-pointer hover:bg-cyan-400 px-6 font-semibold">
              Encontre uma Clínica
            </Button>
          </article>
          <div className="hidden lg:block">
            <Image
              src={doctorImg}
              alt="Foto do profissional da saúde"
              width={340}
              height={400}
              className="object-contain"
              quality={100}
              priority={true}
            />
          </div>
        </main>
      </div>
    </section>
  );
}
