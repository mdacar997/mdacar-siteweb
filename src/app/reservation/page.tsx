import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { SectionHeading } from "@/components/SectionHeading";
import { getPublishedCars } from "@/lib/cars";
import { buildMetadata } from "@/lib/seo";
import { containerClass, sectionClass } from "@/lib/ui";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Réservation de voiture à Agadir | MDA CAR",
    description:
      "Envoyez votre demande de location de voiture à MDA CAR. Choisissez votre service, votre véhicule et vos dates ; l'équipe confirme ensuite la disponibilité.",
    path: "/reservation",
    ogTitle: "Réservation de voiture | MDA CAR",
  });
}

export default async function ReservationPage() {
  const cars = await getPublishedCars();

  return (
    <main className="bg-obsidian">
      <section className={`${containerClass} ${sectionClass} pt-32 sm:pt-40`}>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Réservation"
            title="Demandez votre voiture à louer"
            description="Choisissez le service, le véhicule et vos dates. Votre demande est transmise directement à MDA CAR ; la disponibilité et les modalités sont confirmées avec vous avant la réservation."
          />
          <div className="mt-10 rounded-lg border border-line bg-coal p-5 sm:p-8">
            <BookingForm
              vehicles={cars.map((car) => ({ slug: car.slug, name: car.name }))}
              source="reservation-page"
              idPrefix="reservation"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
