import { Hero } from '@/components/sections/Hero';
import { BrandIntro } from '@/components/sections/BrandIntro';
import { FoodSequence } from '@/components/sections/FoodSequence';
import { LocationsOverview } from '@/components/sections/LocationsOverview';
import { SignatureDishes } from '@/components/sections/SignatureDishes';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { Gallery } from '@/components/sections/Gallery';
import { ReservationCTA } from '@/components/sections/ReservationCTA';

/**
 * Startseite — bewusst reduziert. Weniger, dafür stärkere Sektionen.
 * (Newsletter, Bewertungen, Instagram und Franchise bewusst NICHT auf der
 * Startseite — sie leben auf ihren eigenen Seiten.)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <FoodSequence />
      <LocationsOverview />
      <SignatureDishes />
      <ExperienceSection />
      <EventsSection />
      <Gallery />
      <ReservationCTA />
    </>
  );
}
