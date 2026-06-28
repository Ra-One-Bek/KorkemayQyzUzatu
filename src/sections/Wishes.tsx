import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import { eventData } from "../data/eventData";

export default function Wishes() {
  return (
    <AnimatedSection>
      <section className="section-padding">
        <SectionTitle
          subtitle="Wishes"
          title="Ізгі тілек"
        />

        <div className="glass rounded-sm p-10 text-center">
          <p className="font-cormorant text-xl leading-9 text-neutral-700">
            {eventData.wishes}
          </p>
        </div>
      </section>
    </AnimatedSection>
  );
}