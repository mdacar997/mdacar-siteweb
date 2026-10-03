import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { articleJsonLd, faqJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { containerClass, sectionClass } from "@/lib/ui";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingCTA } from "@/components/BookingCTA";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { getSiteMediaMap } from "@/lib/site-media";

const articlePath = "/blog/location-de-voiture-maroc-guide";

const faqs = [
  {
    question: "Comment choisir une agence de location de voiture au Maroc ?",
    answer:
      "Comparez les véhicules, les conditions de location, l’assurance, le kilométrage, la politique de carburant, les modalités de remise du véhicule et la facilité de contact avec l’agence. Demandez toujours les conditions applicables avant de confirmer.",
  },
  {
    question: "Où louer une voiture à Agadir ?",
    answer:
      "MDA CAR propose la location de voitures à Agadir, avec une organisation possible à l’aéroport Agadir-Al Massira et, selon disponibilité et modalités confirmées, une livraison dans d’autres villes du Maroc.",
  },
  {
    question: "Peut-on trouver une location de voiture pas cher au Maroc ?",
    answer:
      "Oui, le prix dépend notamment du modèle, de la durée, des dates, de la disponibilité et des services demandés. Pour comparer correctement une voiture de location pas cher, il faut regarder le prix avec les conditions associées et pas uniquement le tarif affiché.",
  },
  {
    question: "Quels éléments faut-il vérifier avant de louer une voiture ?",
    answer:
      "Vérifiez les conditions de réservation, les documents demandés, l’assurance, le kilométrage, le carburant, les modalités de remise et de retour, les éventuels frais supplémentaires et les conditions de prolongation.",
  },
  {
    question: "MDA CAR propose-t-elle une location de voiture partout au Maroc ?",
    answer:
      "MDA CAR est basée sur un service orienté vers Agadir et Souss-Massa et peut organiser la livraison du véhicule dans d’autres villes du Maroc selon la disponibilité et les modalités confirmées avec le client.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Location de voiture au Maroc : guide complet | MDA CAR",
  description:
    "Guide MDA CAR pour choisir une agence de location de voiture au Maroc, comparer les offres, préparer votre réservation et louer à Agadir.",
  path: articlePath,
  ogTitle: "Location de voiture au Maroc : guide complet",
});

export default async function LocationDeVoitureMarocGuidePage() {
  const media = await getSiteMediaMap();
  const headerImage = media["blog.header"]?.src || "/images/mda-car-conseils-header.webp";
  const headerAlt =
    media["blog.header"]?.alt ||
    "Deux personnes échangeant autour d’une table pour illustrer les conseils de location de voiture";

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: "Location de voiture au Maroc : le guide complet pour bien louer",
          description:
            "Guide MDA CAR pour choisir une agence de location de voiture au Maroc, comparer les offres et préparer une location à Agadir.",
          path: articlePath,
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHeader
        eyebrow="Guide MDA CAR · Location de voiture"
        title="Location de voiture au Maroc : le guide complet pour bien louer"
        description="Comment choisir une agence de location de voitures, comparer les offres et préparer une location à Agadir, à l’aéroport ou ailleurs au Maroc."
        image={{
          src: headerImage,
          alt: headerAlt,
        }}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Conseils", href: "/blog" },
              { label: "Location de voiture au Maroc", href: articlePath },
            ]}
          />
        }
      />

      <main>
        <article className={`${containerClass} ${sectionClass}`}>
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                Guide pratique
              </p>
              <p className="mt-3 text-sm leading-6 text-steel-dark">
                Mis à jour pour les voyageurs et clients qui recherchent une location de
                voiture au Maroc, notamment à Agadir et dans la région de Souss-Massa.
              </p>

              <div className="mt-8 space-y-10 text-[16px] leading-8 text-steel">
                <section>
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    Pourquoi louer une voiture au Maroc ?
                  </h2>
                  <p className="mt-4">
                    La location de voiture permet d’organiser un séjour avec davantage de
                    liberté : vous pouvez adapter vos déplacements à vos horaires, visiter
                    plusieurs endroits et ne pas dépendre uniquement des transports
                    disponibles. Pour un séjour à Agadir, par exemple, une voiture peut
                    être pratique pour explorer la région de Souss-Massa ou poursuivre son
                    trajet vers une autre destination.
                  </p>
                  <p className="mt-4">
                    Mais une bonne expérience commence avant de récupérer le véhicule.
                    Le choix de l’<strong className="text-white">agence de location de voitures</strong>,
                    les conditions, le modèle, l’assurance et les modalités de remise sont
                    aussi importants que le prix.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    1. Choisir la bonne agence de location de voiture
                  </h2>
                  <p className="mt-4">
                    Avant de réserver, vérifiez que l’agence explique clairement son service
                    et qu’elle est facile à contacter. Une <strong className="text-white">agence de location de voiture</strong>
                    doit pouvoir vous renseigner sur les véhicules disponibles, les dates,
                    les conditions de location et les modalités de remise.
                  </p>
                  <p className="mt-4">
                    Regardez également les informations présentes sur le site : coordonnées,
                    zone de service, pages consacrées aux véhicules, formulaire de réservation
                    et moyens de contact. Pour une réservation à distance, la possibilité
                    d’échanger directement avec l’agence peut être particulièrement utile.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    2. Comparer une voiture de location pas cher correctement
                  </h2>
                  <p className="mt-4">
                    Rechercher une <strong className="text-white">voiture de location pas cher</strong> ne
                    signifie pas forcément choisir le tarif affiché le plus bas. Il faut
                    comparer ce qui est réellement compris dans l’offre : modèle, durée,
                    kilométrage, assurance, carburant, lieu de remise et éventuels services
                    supplémentaires.
                  </p>
                  <p className="mt-4">
                    Le prix peut aussi varier selon les dates, la durée de la location, la
                    catégorie du véhicule et la disponibilité. Une <strong className="text-white">location de voiture pas cher</strong>
                    peut donc être intéressante lorsque le rapport entre le prix et les
                    conditions proposées correspond réellement à votre besoin.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    3. Vérifier les conditions avant de confirmer
                  </h2>
                  <p className="mt-4">
                    Prenez quelques minutes pour vérifier les règles applicables à votre
                    réservation. Les points importants comprennent notamment le kilométrage,
                    l’assurance, la politique de carburant, les horaires et lieux de remise
                    et de retour, ainsi que les modalités de prolongation.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      "Kilométrage et éventuelles limites",
                      "Assurance et conditions de couverture",
                      "Politique de carburant",
                      "Lieu et horaire de remise",
                      "Conditions de retour du véhicule",
                      "Modalités en cas de prolongation",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 rounded-xl border border-line bg-coal p-4"
                      >
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
                        <span className="text-sm leading-6 text-steel">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    4. Location de voiture à Agadir
                  </h2>
                  <p className="mt-4">
                    Agadir est un point de départ pratique pour de nombreux séjours au
                    Maroc. Si vous cherchez une <strong className="text-white">location de voiture à Agadir</strong>,
                    pensez à préciser dès la demande la date, l’horaire, le véhicule
                    souhaité et le lieu où vous souhaitez récupérer la voiture.
                  </p>
                  <p className="mt-4">
                    MDA CAR propose un service de location orienté vers Agadir et la région
                    de Souss-Massa. La remise peut être organisée à Agadir ou à l’aéroport
                    Agadir-Al Massira selon les disponibilités et modalités confirmées.
                  </p>
                  <p className="mt-4">
                    Pour consulter directement les services locaux de MDA CAR, vous pouvez
                    voir la page{" "}
                    <Link href="/services/location-voiture-agadir" className="font-semibold text-gold hover:text-white">
                      location de voitures à Agadir
                    </Link>.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    5. Location de voiture à l’aéroport
                  </h2>
                  <p className="mt-4">
                    Si vous arrivez par avion, précisez l’aéroport et l’horaire d’arrivée
                    dans votre demande. Pour l’aéroport Agadir-Al Massira, cela permet à
                    l’agence d’étudier l’organisation de la remise du véhicule selon les
                    disponibilités.
                  </p>
                  <p className="mt-4">
                    Pour éviter les incompréhensions, indiquez également votre date de
                    départ, la durée souhaitée et le type de véhicule recherché. Vous
                    pouvez consulter le service{" "}
                    <Link href="/services/location-voiture-aeroport" className="font-semibold text-gold hover:text-white">
                      location de voitures à l’aéroport
                    </Link>{" "}
                    de MDA CAR.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    6. Pourquoi réserver directement avec MDA CAR ?
                  </h2>
                  <p className="mt-4">
                    MDA CAR met en avant un contact direct avec l’agence : vous pouvez
                    envoyer une demande en ligne, appeler ou utiliser WhatsApp pour
                    préciser votre besoin. La disponibilité et le tarif sont ensuite
                    confirmés directement avec vous.
                  </p>
                  <p className="mt-4">
                    L’objectif est de garder une réservation simple : choisissez une voiture
                    dans la flotte, indiquez vos dates et vos informations, puis attendez
                    la confirmation de l’agence. Les véhicules présentés sur le site
                    permettent de comparer les catégories disponibles avant de faire votre
                    demande.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/nos-voitures"
                      className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-semibold text-night hover:bg-gold-hover"
                    >
                      Voir nos voitures
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-semibold text-white hover:border-line-gold hover:text-gold"
                    >
                      Contacter MDA CAR
                    </Link>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    7. Les bonnes pratiques pour les voyageurs
                  </h2>
                  <p className="mt-4">
                    Pour une location plus simple, préparez votre demande à l’avance.
                    Indiquez les dates exactes, le lieu souhaité, l’aéroport si nécessaire,
                    le nombre de jours et la catégorie de voiture recherchée. Si vous avez
                    un besoin particulier, expliquez-le dès le premier contact.
                  </p>
                  <p className="mt-4">
                    À la remise du véhicule, prenez le temps de vérifier son état et de
                    demander toute information utile sur son fonctionnement. Conservez les
                    coordonnées de l’agence pendant la location afin de pouvoir poser une
                    question rapidement si nécessaire.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    Conclusion : comment réussir sa location de voiture au Maroc ?
                  </h2>
                  <p className="mt-4">
                    Une bonne <strong className="text-white">location de voiture au Maroc</strong> commence par
                    une comparaison claire des véhicules et des conditions. Ne regardez pas
                    uniquement le prix : vérifiez ce qui est compris, la zone de service,
                    les modalités de remise et la facilité de contact avec l’agence.
                  </p>
                  <p className="mt-4">
                    Pour un séjour à Agadir, une arrivée à l’aéroport Agadir-Al Massira ou
                    un trajet dans la région de Souss-Massa, MDA CAR peut étudier votre
                    demande et confirmer directement la disponibilité, le tarif et les
                    modalités adaptées à votre réservation.
                  </p>
                  <p className="mt-4">
                    Pour commencer, consultez{" "}
                    <Link href="/nos-voitures" className="font-semibold text-gold hover:text-white">
                      les voitures disponibles
                    </Link>{" "}
                    ou envoyez votre{" "}
                    <Link href="/reservation" className="font-semibold text-gold hover:text-white">
                      demande de réservation
                    </Link>.
                  </p>
                </section>

                <section aria-labelledby="faq">
                  <h2 id="faq" className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    Questions fréquentes sur la location de voiture au Maroc
                  </h2>
                  <div className="mt-5 divide-y divide-line rounded-2xl border border-line bg-coal">
                    {faqs.map((faq) => (
                      <details key={faq.question} className="group px-5">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-[15px] font-semibold text-white hover:text-gold">
                          <span>{faq.question}</span>
                          <span className="text-gold" aria-hidden>+</span>
                        </summary>
                        <p className="pb-5 pr-6 text-sm leading-7 text-steel">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>

                <p className="border-t border-line pt-6 text-xs leading-6 text-steel-dark">
                  Informations générales fournies par MDA CAR. Les disponibilités, tarifs
                  et modalités de chaque location sont confirmés directement avec l’agence
                  avant réservation.
                </p>
              </div>
            </div>
          </Reveal>
        </article>
      </main>

      <BookingCTA
        title="Prêt à louer votre voiture ?"
        text={`Contactez ${site.name} pour vérifier la disponibilité d’un véhicule et les modalités de votre location.`}
      />
    </>
  );
}
