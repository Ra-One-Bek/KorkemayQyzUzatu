import { FiMapPin } from "react-icons/fi";
import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import { eventData } from "../data/eventData";

export default function Venue() {
  return (
    <AnimatedSection>
      <section className="section-padding">
        <SectionTitle
          subtitle="Venue"
          title="Өтетін орны"
        />

        <div className="glass rounded-[32px] p-8 text-center">
          <FiMapPin
            size={36}
            className="mx-auto text-[#d4af37]"
          />

          <h3 className="font-cormorant mt-5 text-3xl text-[#1f1f1f]">
            {eventData.venue.name}
          </h3>

          <p className="font-cormorant mt-4 leading-7 text-neutral-600">
            {eventData.venue.address}
          </p>

          <a
            href={eventData.venue.map}
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant mt-8 inline-flex rounded-full border border-[#d4af37] px-8 py-4 text-sm uppercase tracking-[3px] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-white"
          >
            Картаны ашу
          </a>
        </div>
      </section>
    </AnimatedSection>
  );
}