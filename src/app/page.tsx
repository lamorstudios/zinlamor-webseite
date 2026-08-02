import { Hero } from '@/components/sections/Hero';
import { BrandIntro } from '@/components/sections/BrandIntro';
import { LocationsOverview } from '@/components/sections/LocationsOverview';
import { SignatureDishes } from '@/components/sections/SignatureDishes';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { Gallery } from '@/components/sections/Gallery';
import { Reviews } from '@/components/sections/Reviews';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { ReservationCTA } from '@/components/sections/ReservationCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <LocationsOverview />
      <SignatureDishes />
      <ExperienceSection />
      <EventsSection />
      <Gallery />
      <Reviews />
      <NewsletterSection />
      <ReservationCTA />
    </>
  );
}
