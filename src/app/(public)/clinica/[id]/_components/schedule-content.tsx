"use client";

import Image from "next/image";
import imgTest from "../../../../../../public/foto1.png";
import { MapPin } from "lucide-react";

export default function ScheduleContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-cyan-500" />

      <section className="container mx-auto px-4 -mt-17">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div>
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-8">
                <Image
                  src={imgTest}
                  alt="Foto da Clinica"
                  className="object-cover"
                  fill
                />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-center">
                Clinica Teste
              </h1>
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5" />
                <span>Endreço não informado</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
