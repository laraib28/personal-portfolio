import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graveyard | Laraib Tabbassum",
  description: "A visual gallery of graveyard photography.",
};

const graveyardImages = [
  { src: "/graveyard/graveyard.jpeg", alt: "Graveyard" },
  { src: "/graveyard/graveyard1.jpeg", alt: "Graveyard 1" },
  { src: "/graveyard/graveyard3.jpeg", alt: "Graveyard 3" },
  { src: "/graveyard/graveyard4.jpeg", alt: "Graveyard 4" },
  { src: "/graveyard/graveyard5.jpeg", alt: "Graveyard 5" },
  { src: "/graveyard/graveyard6.jpeg", alt: "Graveyard 6" },
];

export default function GraveyardPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Graveyard
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A collection of graveyard photography.
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {graveyardImages.map((image) => (
              <div
                key={image.src}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.alt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
