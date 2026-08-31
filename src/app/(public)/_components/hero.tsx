import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import doctorImg from "../../../../public/doctor-hero.png";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white mt-20 mb-20">
      <div className="container align-c mx-auto pb-4 sm:pb-0 px-4 pt-20 sm:px-6 lg:px-8 ">
        <main className="flex items-center justify-center ">
          <article className="flex-2 space-y-10 max-w-2xl flex flex-col justify-center">
            <h1 className="text-cyan-950 text-3xl lg:text-5xl font-bold max-w-3xl tracking-tight">
              Conecte-se aos melhores profissionais da
              <span className="text-cyan-500"> saúde bucal.</span>
            </h1>
            <p className="text m-2 md:text-lg max-w-lg text-gray-600 mb-6">
              Encontre clínicas, conheça profissionais e agende seu atendimento
              de forma simples e rápida.
            </p>
            <Button className="bg-cyan-950 w-fit p-5 text-gray-100 cursor-pointer hover:bg-cyan-400 px-6 font-semibold">
              Encontre uma Clínica
              <ArrowRight />
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
