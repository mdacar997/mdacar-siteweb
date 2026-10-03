import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { containerClass, sectionClass } from "@/lib/ui";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingCTA } from "@/components/BookingCTA";
import { Reveal } from "@/components/Reveal";
import { getSiteMediaMap } from "@/lib/site-media";

export const metadata: Metadata = buildMetadata({
  title: "Conseils location de voiture au Maroc | MDA CAR",
  description:
    "Conseils pratiques de MDA CAR pour choisir une agence de location de voiture au Maroc, comparer les offres et préparer votre location à Agadir.",
  path: "/blog",
  ogTitle: "Conseils location de voiture au Maroc",
});

export default async function BlogPage() {
  const media = await getSiteMediaMap();
  const headerImage = media["blog.header"]?.src || "/images/mda-car-conseils-header.webp";

  return (
    <>
      <PageHeader
        eyebrow="Conseils MDA CAR"
        title="Conseils pour votre location de voiture au Maroc"
        description="Guides pratiques pour choisir votre voiture de location, préparer votre séjour et comprendre les points essentiels avant de réserver à Agadir ou ailleurs au Maroc."
        image={{
          src: headerImage,
          alt:
            media["blog.header"]?.alt ||
            "Deux personnes échangeant autour d’une table pour illustrer les conseils de location de voiture",
        }}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Conseils", href: "/blog" },
            ]}
          />
        }
      />

      <section aria-labelledby="articles">
        <div className={`${containerClass} ${sectionClass}`}>
          <Reveal>
            <article className="mx-auto max-w-4xl rounded-2xl border border-line bg-coal p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Guide location de voiture
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Location de voiture au Maroc : le guide complet pour bien choisir
              </h2>
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-steel">
                Vous cherchez une <strong className="text-white">location de voiture au Maroc</strong> ?
                Ce guide vous aide à comparer une agence de location de voitures,
                comprendre les conditions importantes et préparer votre réservation.
              </p>
              <div className="mt-7">
                <Link
                  href="/blog/location-de-voiture-maroc-guide"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-white"
                >
                  Lire le guide complet
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <BookingCTA
        title="Vous cherchez déjà une voiture à louer ?"
        text="Consultez les véhicules disponibles chez MDA CAR ou envoyez directement votre demande de réservation."
      />
    </>
  );
}
