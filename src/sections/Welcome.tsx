import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import { eventData } from "../data/eventData";
import womanImg from "../assets/woman_qyzuzatu3.png";
import oyuImg from "../assets/oyu_circle.png";
import { motion } from "framer-motion";


export default function Welcome() {
  return (
    <AnimatedSection>
      <section className="section-padding flex flex-col items-center justify-center gap-5 relative overflow-hidden">
        {/* absolute image */}
        <img
          src={womanImg}
          alt="decoration"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[50px] w-64 md:w-80 lg:w-96 opacity-90 pointer-events-none select-none"
        />
        <motion.img
        src={oyuImg}
        alt="decoration"
        animate={{
            rotate: 360,
        }}
        transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
        }}
        className="
            absolute
            -left-40
            top-1/2
            z-0
            -translate-x-[80px]
            -translate-y-1/2
            w-94
            opacity-60
            pointer-events-none
            select-none
            md:w-80
            lg:w-96
        "
        />

        <SectionTitle
          subtitle="Қош келдіңіз"
          title="Құрметті қонақтар"
        />

        <div className="w-4/5 rounded-3xl p-8 text-center relative z-10">
          <p className="font-cormorant text-md leading-8 text-neutral-700">
            {eventData.welcome}
          </p>
        </div>
      </section>
    </AnimatedSection>
  );
}