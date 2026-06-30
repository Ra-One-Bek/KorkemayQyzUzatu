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

        {/* рваный низ — крупный, неравномерный, волокнистый разрыв */}
        <svg
          className="absolute bottom-0 left-0 w-full [transform:scaleY(-1)]"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          {/* теневой слой */}
          <path
            fill="#000"
            opacity="0.08"
            transform="translate(0,10)"
            d="
              M0,0
              L0,96

              L32,82
              L54,84
              L76,58
              L98,62
              L126,42
              L156,20
              L182,10
              L206,28
              L236,46
              L266,48

              L294,76
              L316,110
              L338,104
              L362,98
              L392,90
              L426,84
              L452,70
              L472,82
              L498,58
              L530,30
              L564,18

              L596,36
              L624,58
              L648,78
              L690,78
              L716,118
              L754,118
              L786,118
              L814,98
              L842,100
              L868,84

              L894,92
              L914,126
              L954,114
              L984,118
              L1016,118
              L1046,102
              L1078,88
              L1110,92

              L1138,122
              L1182,112
              L1228,116
              L1266,118
              L1302,96
              L1336,108
              L1372,116
              L1410,110
              L1440,120

              L1440,0
              Z
            "
          />

          {/* белая бумага */}
          <path
            fill="#ffffff"
            d="
              M0,0
              L0,96

              L32,82
              L54,84
              L76,58
              L98,62
              L126,42
              L156,20
              L182,10
              L206,28
              L236,46
              L266,48

              L294,76
              L316,110
              L338,104
              L362,98
              L392,90
              L426,84
              L452,70
              L472,82
              L498,58
              L530,30
              L564,18

              L596,36
              L624,58
              L648,78
              L690,78
              L716,118
              L754,118
              L786,118
              L814,98
              L842,100
              L868,84

              L894,92
              L914,126
              L954,114
              L984,118
              L1016,118
              L1046,102
              L1078,88
              L1110,92

              L1138,122
              L1182,112
              L1228,116
              L1266,118
              L1302,96
              L1336,108
              L1372,116
              L1410,110
              L1440,120

              L1440,0
              Z
            "
          />
        </svg>
      </div>

      {/* Нижний контент */}
      <div className="relative z-10 px-6 pb-20 pt-2 text-center">

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            mx-auto flex items-center justify-center gap-3
            font-kz-2
            italic
            text-[26px]
            text-amber-900
          "
        >
          <span className="h-px w-8 bg-[#d4af37]/60" />
          {eventData.event}
          <span className="h-px w-8 bg-[#d4af37]/60" />
        </motion.p>

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
            mt-3
            text-6xl
            leading-[1.05]
            text-[#b8922e]
            drop-shadow-md
            md:text-7xl
          "
        >
          {eventData.bride}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="mx-auto my-4 h-px w-24 origin-center bg-[#d4af37]"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="
            font-cormorant
            text-xl
            italic
            tracking-[-0.5px]
            text-neutral-700
          "
        >
          Салтанатты кеш
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-3 flex flex-col items-center gap-1"
        >
          <p className="font-cormorant italic text-3xl text-amber-900">
            {eventData.date}
          </p>
          <p className="font-cormorant italic text-xl text-neutral-500">
            {eventData.time}
          </p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-4"
        >
          <div className="mx-auto h-7 w-px bg-[#d4af37]/50" />

          <p className="mt-1 text-xs uppercase tracking-[5px] text-neutral-400">
            scroll
          </p>
        </motion.div>
      </div>
    </section>
  );
}