import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { eventData } from "../data/eventData";
import bgImage from "../assets/HeroKorkemay.jpg";

export default function Hero() {

  const ref = useRef(null);

    const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    });

    // Параллакс
    const y = useTransform(scrollYProgress, [0, 1], [0, 420]);

    // Глубина
    const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.15, 1]
    );  
  return (
    <section
    ref={ref}
    className="relative overflow-hidden bg-white"
    >
      {/* Верхнее фото */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white/20" />
        <motion.img
        src={bgImage}
        alt=""
        style={{
            y,
            scale,
        }}
        className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
        "
        />

        {/* затемнение */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/10 from-white/100" />

        {/* легкий blur */}
        <div className="absolute inset-0 " />

        {/* название поверх фото */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            absolute left-1/2 top-10
            w-full flex items-center justify-center
            -translate-x-1/2
            rounded-full
            px-10 py-3
            font-kz-3
            text-4xl
            text-[#b8922e]
          "
        >
          {eventData.event}
        </motion.p>

        {/* рваный низ */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="
              M0,96
              C240,180 420,20 720,80
              C1020,140 1200,20 1440,100
              L1440,180
              L0,180
              Z
            "
          />
        </svg>
      </div>

      {/* Нижний контент */}
      <div className="relative z-10 mt-2 px-6 pb-20 text-center">
        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            delay: 0.2,
            duration: 1.2,
          }}
          className="
            font-kz-1
            text-6xl
            text-[#b8922e]
            drop-shadow-md
            md:text-7xl
          "
        >
          {eventData.bride}
        </motion.h1>

        <div className="mx-auto my-2 h-px w-24 bg-[#d4af37]" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="
            font-cormorant
            text-2xl
            italic
            tracking-[-1px]
            text-neutral-700
          "
        >
          Салтанатты кеш
        </motion.p>

        <p className="font-cormorant italic mt-2 text-4xl text-neutral-800">
          {eventData.date}
        </p>

        <p className="font-cormorant italic text-3xl text-neutral-900">
          {eventData.time}
        </p>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-14"
        >
          <div className="mx-auto h-10 w-px bg-[#d4af37]/50" />

          <p className=" text-xs uppercase tracking-[5px] text-neutral-400">
            scroll
          </p>
        </motion.div>
      </div>
    </section>
  );
}