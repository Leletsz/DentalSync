import { getTimesClinic } from "../../_data-access/get-times-clinics";
import { AppointmentsList } from "./appointments-list";

export async function Appointments({ userId }: { userId: string }) {
  const user = await getTimesClinic({ userId: userId });
  return (
    <div>
      <AppointmentsList times={user.times} />
    </div>
  );
}
