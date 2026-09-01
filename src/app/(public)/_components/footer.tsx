import Image from "next/image";
import LogoMain from "../../../../public/Logo.png";
import Link from "next/link";
import { Mail, MapPin, Phone, Pin, PinIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-4 text-white text-center text-sm md:text-base bg-cyan-950">
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between md:mx-35">
        <section className="flex flex-col items-center justify-center">
          <Image
            src={LogoMain}
            alt="Logo Dentalsync"
            width={200}
            height={200}
          />
          <p className="text-white md:w-60">
            Conectando você aos melhores profissionais da saúde bucal.
          </p>
        </section>
        <section className="md:text-start">
          <span className="font-bold text-lg text-start">Navegação</span>
          <div className="flex gap-2 mt-1 md:flex-col text-start">
            <Link href={""}>Clínicas</Link>
            <Link href={""}>Especialidades</Link>
            <Link href={""}>Como funciona</Link>
            <Link href={""}>Profissionais</Link>
          </div>
        </section>
        <section className="md:text-start">
          <span className="font-bold mt-1 text-lg">Institucional</span>
          <div className="flex gap-2 md:flex-col md:text-start">
            <Link href={""}>Sobre nós</Link>
            <Link href={""}>Termos de uso</Link>
            <Link href={""}>Privacidade</Link>
            <Link href={""}>Contato</Link>
          </div>
        </section>
        <section className="text-start">
          <span className="font-bold text-lg">Suporte</span>
          <div className="flex gap-2 md:flex-col">
            <div className="flex gap-1 items-center">
              <Phone size={15} />
              <p>(88)9 8899-2838</p>
            </div>
            <div className="flex gap-1 items-center">
              <Mail size={15} />
              <p>contato@dentalSync.com</p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
