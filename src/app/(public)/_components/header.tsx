"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogIn, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { handleRegister } from "../_actions/login";
import Image from "next/image";
import LogoMain from "../../../../public/Logo.png";

export function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [{ href: "#profissionais", label: "Profissionais" }];

  async function handleLogin() {
    await handleRegister("google");
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.href}
          asChild
          className="bg-transparent text-black hover:bg-transparent hover:text-amber-50 shadow-none font-normal cursor-pointer"
        >
          <Link className="text-base" href={item.href}>
            {item.label}
          </Link>
        </Button>
      ))}
      {status === "loading" ? (
        <></>
      ) : session ? (
        <Link
          href={"/dashboard"}
          className="flex items-center justify-center gap-2 bg-zinc-900 text-white py-1 rounded-md px-4"
        >
          Acessar Clínica
        </Link>
      ) : (
        <Button onClick={handleLogin}>
          {" "}
          <LogIn /> Portal da clinica
        </Button>
      )}
    </>
  );
  return (
    <header className="fixed top-0 right-0 left-0 z-999 py-4 px-6 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={"/"} className="text-3xl font-bold text-zinc-900">
          <Image
            src={LogoMain}
            alt="Logo Detanlsync"
            height={200}
            width={200}
            quality={100}
            priority={true}
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks />
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden" asChild>
            <Button
              className="text-black hover:bg-transparent"
              variant={"ghost"}
              size={"icon"}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-240px sm:w-300px z-9999 px-8">
            <SheetHeader></SheetHeader>
            <SheetTitle className="font-bold text-xl ">Menu</SheetTitle>
            <SheetDescription>Veja nossos links</SheetDescription>

            <nav className="flex flex-col space-y-4 mt-6">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
