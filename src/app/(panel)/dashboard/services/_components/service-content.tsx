import { canPermission } from "@/utils/permissions/canPermission";
import { getAllServices } from "../_data-access/get-all-services";
import ServicesList from "./services-list";
import { LabelSubscription } from "@/components/ui/label-subscription";

interface ServicesContentProps {
  userId: string;
}

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export async function ServicesContent({ userId }: ServicesContentProps) {
  //await delay(1000);
  const permissions = await canPermission({ type: "service" });
  const services = await getAllServices({ userId: userId });

  return (
    <>
      {!permissions.hasPermission && (
        <LabelSubscription expired={permissions.expired} />
      )}
      <ServicesList services={services.data || []} permission={permissions} />
    </>
  );
}
