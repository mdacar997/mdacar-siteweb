import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { containerClass, sectionClass } from "@/lib/ui";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Car, ChevronDown, Plane, Route } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { SeoKeyword } from "@/components/SeoKeyword";
import { RENTAL_FAQS, RENTAL_POLICY_TEXT } from "@/lib/rental-policy";
import { getSiteMediaMap } from "@/lib/site-media";
import { getSeoKeyword } from "@/lib/seo-keywords";

export async function generateMetadata(): Promise<Metadata> {
  const agadir = await getSeoKeyword("services.agadir", "Location de voitures à Agadir");
  const delivery = await getSeoKeyword("services.delivery", "Livraison de voitures partout au Maroc");
  return buildMetadata({
    // Kept under ~60 characters so Google does not truncate it in results.
    title: `${agadir.keyword} & partout au Maroc | MDA CAR`,
    description: `${agadir.keyword}, ${delivery.keyword} et location de voitures à l’aéroport avec MDA CAR.`,
    path: "/services",
    ogTitle: `${agadir.keyword} et services MDA CAR`,
  });
}

const services = [
  {
    icon: <Car className="h-6 w-6" aria-hidden />,
    title: "Location de voitures à Agadir",
    href: "/services/location-voiture-agadir",
    description: (
      <>
        <SeoKeyword keywordKey="services.agadir" fallback="Location de voitures à Agadir" className="text-cream" /> pour vos déplacements, vos sorties et vos trajets dans la région.
      </>
    ),
    image: {
      src: "__MEDIA_SERVICE_AGADIR__",
      alt: "Vue de la ville d’Agadir au Maroc",
    },
  },
  {
    icon: <Route className="h-6 w-6" aria-hidden />,
    title: "Livraison de voitures partout au Maroc",
    href: "/services/livraison-voiture-maroc",
    description: (
      <>
        <SeoKeyword keywordKey="services.delivery" fallback="Livraison de voitures partout au Maroc" className="text-cream" /> pour organiser votre location dans la ville de votre choix.
      </>
    ),
    image: {
      src: "__MEDIA_SERVICE_DELIVERY__",
      alt: "Route et autoroute au Maroc pour illustrer la livraison de voitures partout au Maroc",
    },
  },
  {
    icon: <Plane className="h-6 w-6" aria-hidden />,
    title: "Location de voitures à l’aéroport",
    href: "/services/location-voiture-aeroport",
    description: (
      <>
        <SeoKeyword keywordKey="services.airport" fallback="Location de voitures à l’aéroport" className="text-cream" /> pour organiser votre arrivée ou votre départ selon l’aéroport sélectionné.
      </>
    ),
    image: {
      src: "__MEDIA_SERVICE_AIRPORT__",
      alt: "Carte et navigation pour organiser une location de voiture à l’aéroport",
    },
  },
];

export default async function ServicesPage() {
  const media = await getSiteMediaMap();
  const headerImage = media["home.services"]?.src || "/images/mda-car-services-road-trip-agadir.webp";
  const localServiceImages = {
    agadir: "/images/mda-car-agadir-corniche-location-voiture.webp",
    delivery: "/images/mda-car-route-maroc.webp",
    airport: "/images/mda-car-contact-navigation-bg.webp",
  } as const;

  // Older database seeds used third-party stock-photo URLs. Keep any
  // administrator-selected image, but automatically fall back to the local
  // project assets when one of those known legacy defaults is still stored.
  const isLegacyServiceImage = (src: string | undefined) => {
    if (!src) return false;
    try {
      const hostname = new URL(src, "https://www.mdacar.com").hostname.toLowerCase();
      return (
        hostname === "cdn.getyourguide.com" ||
        hostname === "industries.ma" ||
        hostname === "media.istockphoto.com"
      );
    } catch {
      return false;
    }
  };

  const resolved = services.map((service) => {
    if (service.image.src === "__MEDIA_SERVICE_AGADIR__") {
      const src = media["service.agadir"]?.src;
      return { ...service, image: { ...service.image, src: src && !isLegacyServiceImage(src) ? src : localServiceImages.agadir } };
    }
    if (service.image.src === "__MEDIA_SERVICE_DELIVERY__") {
      const src = media["service.delivery"]?.src;
      return { ...service, image: { ...service.image, src: src && !isLegacyServiceImage(src) ? src : localServiceImages.delivery } };
    }
    if (service.image.src === "__MEDIA_SERVICE_AIRPORT__") {
      const src = media["service.airport"]?.src;
      return { ...service, image: { ...service.image, src: src && !isLegacyServiceImage(src) ? src : localServiceImages.airport } };
    }
    return service;
  });
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Location de voitures à Agadir et livraison partout au Maroc",
          description:
            "Location de voitures à Agadir, livraison de véhicules partout au Maroc et remise possible à l’aéroport Agadir Al Massira, selon disponibilité et modalités confirmées.",
          path: "/services",
        })}
      />
      <PageHeader
        eyebrow="Services MDA CAR"
        title={<> <SeoKeyword keywordKey="services.agadir" fallback="Location de voitures à Agadir" className="font-extrabold text-gold" /> &amp; <SeoKeyword keywordKey="home.morocco" fallback="partout au Maroc" className="font-extrabold text-gold" /></>}
        description={<>Trois services principaux : <SeoKeyword keywordKey="services.agadir" fallback="location de voitures à Agadir" className="text-white" />, <SeoKeyword keywordKey="services.delivery" fallback="livraison de voitures partout au Maroc" className="text-white" /> et <SeoKeyword keywordKey="services.airport" fallback="location de voitures à l’aéroport" className="text-white" />.</>}
        image={{
          src: headerImage,
          alt: "Voyageuse profitant de la route au Maroc, symbole de liberté offerte par la location de voiture MDA CAR",
        }}
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Accueil", href: "/" }, { label: "Services", href: "/services" }]}
          />
        }
      />

      <section aria-labelledby="service-location">
        <div className={`${containerClass} ${sectionClass}`}>
          <Reveal>
            <SectionHeading
              eyebrow="Nos trois services"
              title="Choisissez le service adapté à votre trajet"
              description="Les trois services principaux sont présentés en premier. Ouvrez celui qui correspond à votre besoin pour voir les détails et accéder à la réservation."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {resolved.map((service, index) => (
              <Reveal key={service.title} delay={index * 90} className="h-full">
                <ServiceCard {...service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="conditions-location" className="border-t border-line bg-night">
        <div className={`${containerClass} ${sectionClass}`}>
          <Reveal>
            <SectionHeading
              eyebrow="À savoir avant de réserver"
              title="Les conditions essentielles"
              description="Retrouvez ici les informations pratiques à connaître avant d’envoyer votre demande de réservation."
            />
          </Reveal>
          <div id="conditions-location" className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { title: "Kilométrage", text: RENTAL_POLICY_TEXT.kilometers },
              { title: "Assurance", text: RENTAL_POLICY_TEXT.insurance },
              { title: "Prolongation", text: RENTAL_POLICY_TEXT.extension },
            ].map((item) => (
              <article key={item.title} className="h-full rounded-xl border border-line bg-coal p-5">
                <h2 className="text-base font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-steel">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-coal p-6 sm:p-8">
            <div className="flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <div>
                <h2 className="text-xl font-semibold text-white sm:text-2xl">Questions fréquentes</h2>
                <p className="mt-2 text-sm leading-6 text-steel">Cliquez sur une question pour afficher sa réponse.</p>
              </div>
              <span className="inline-flex w-fit items-center rounded-full border border-line-gold/60 bg-surface px-3 py-1.5 text-xs font-semibold text-gold">
                Cliquez pour voir la réponse
              </span>
            </div>
            <div className="mt-2 divide-y divide-line">
              {RENTAL_FAQS.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-[15px] font-semibold text-white transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-gold transition-transform duration-200 group-open:rotate-180" aria-hidden />
                  </summary>
                  <div className="pb-5 pr-8 text-sm leading-7 text-steel">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd([...RENTAL_FAQS])} />

    </>
  );
}
