import { Tourbit } from "@tourbit/cli";
import { TourSection } from "./_component/tour-section";

export default function Page() {
  return (
    <main>
      <TourSection />
      <Tourbit tourId="tourbit-caf899" />
    </main>
  );
}
