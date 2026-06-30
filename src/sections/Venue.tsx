import { FiMapPin } from "react-icons/fi";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import { eventData } from "../data/eventData";

import bgImage from "../assets/wedding.jpg";

export default function Venue() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Параллакс
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-90, 90]
  );

  // Глубина
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.15, 1]
  );

  return (
    <AnimatedSection>
      <section
        ref={ref}
        className="relative h-[75vh] overflow-hidden"
      >
        {/* Фото */}
        <motion.img
          src={bgImage}
          alt=""
          style={{ y, scale }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Затемнение */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Глубина */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

        {/* Контент */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="glass max-w-xl rounded-[32px] p-4 text-center backdrop-blur-xl">
            <SectionTitle
              subtitle="Venue"
              title="Өтетін жер"
            />

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
              className="
                mt-8 inline-flex rounded-full
                border border-[#d4af37]
                px-8 py-4
                text-sm uppercase tracking-[3px]
                text-[#d4af37]
                transition
                hover:bg-[#d4af37]
                hover:text-white
              "
            >
              Картаны ашу
            </a>
          </div>
        </div>

        {/* Рваный верх */}
        <svg
          className="absolute top-0 left-0 z-20 w-full rotate-180"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="
              M0,20
              C40,35 80,10 120,28
              C170,50 220,15 280,35
              C340,55 400,20 470,42
              C540,60 610,25 690,40
              C760,55 830,18 910,38
              C1000,60 1080,22 1170,45
              C1260,65 1340,30 1440,50
              L1440,120
              L0,120
              Z
            "
          />
        </svg>

        {/* Рваный низ */}
        <svg
          className="absolute bottom-0 left-0 z-20 w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="
              M0,20
              C40,35 80,10 120,28
              C170,50 220,15 280,35
              C340,55 400,20 470,42
              C540,60 610,25 690,40
              C760,55 830,18 910,38
              C1000,60 1080,22 1170,45
              C1260,65 1340,30 1440,50
              L1440,120
              L0,120
              Z
            "
          />
        </svg>
      </section>
    </AnimatedSection>
  );
}