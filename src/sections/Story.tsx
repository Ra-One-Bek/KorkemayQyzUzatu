import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import { eventData } from "../data/eventData";

export default function Story() {
  return (
    <AnimatedSection>
      <section className="section-padding">
        <SectionTitle
          subtitle="Story"
          title="Мереке туралы"
        />

        <div className="space-y-6">
          {eventData.story.map((text, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              className="glass rounded-[30px] p-8"
            >
              <p className="font-cormorant text-lg leading-8 text-neutral-700">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}