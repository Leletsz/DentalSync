import { getAllServices } from "../_data-access/get-all-services";
import ServicesList from "./services-list";

interface ServicesContentProps {
  userId: string;
}

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
export async function ServicesContent({ userId }: ServicesContentProps) {
  await delay(2000);
  const services = await getAllServices({ userId: userId });
  return <ServicesList services={services.data || []} />;
}
