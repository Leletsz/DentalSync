import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import Hero from "./_components/hero";
import Professionals from "./_components/professionals";
import { getProfessionals } from "./_data-access/get-professionals";

export const revalidate = 90;

export default async function Home() {
  const professionals = await getProfessionals();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <Hero />
        <Professionals professionals={professionals || []} />
        <Footer />
        <p className="text-black bg-white text-center p-1">
          © {new Date().getFullYear()}
          <span className="hover:text-cyan-500 duration-300">
            {" "}
            DentalSync.
          </span>{" "}
          Todos direitos reservados
        </p>
      </div>
    </div>
  );
}
