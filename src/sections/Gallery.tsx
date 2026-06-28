import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";

import image1 from "../assets/gallery-1.png";
import image2 from "../assets/gallery-2.jpg";
import image3 from "../assets/gallery-3.jpg";
import image4 from "../assets/gallery-4.jpg";

const images = [image1, image2, image3, image4];

// Дублируем ряд, чтобы лента всегда оставалась заполненной при любой ширине экрана
const topRow = [...images, ...images, ...images];
const bottomRow = [...images.slice().reverse(), ...images.slice().reverse(), ...images.slice().reverse()];

export default function Gallery() {
  return (
    <AnimatedSection>
      <section className="section-padding overflow-hidden">
        <SectionTitle subtitle="Gallery" title="Естелік сәттер" />

        <div className="relative -mx-6 sm:-mx-10">
          {/* Туманные края — картинки "проявляются" */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f8f8f8] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f8f8f8] to-transparent sm:w-24" />

          <MarqueeRow
            items={topRow}
            direction="right"
            depth="near"
            speed={32}
          />

          <div className="h-4 sm:h-6" />

          <MarqueeRow
            items={bottomRow}
            direction="left"
            depth="far"
            speed={26}
          />
        </div>
      </section>
    </AnimatedSection>
  );
}

interface MarqueeRowProps {
  items: string[];
  direction: "left" | "right";
  depth: "near" | "far";
  speed: number;
}

function MarqueeRow({ items, direction, depth, speed }: MarqueeRowProps) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sign = direction === "right" ? 1 : -1;
  const half = trackWidth / 3 || 1; // длина одной копии набора (у нас 3 копии)

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const measure = () => setTrackWidth(node.scrollWidth);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    const next = x.get() + sign * speed * (delta / 1000);
    x.set(wrap(next, half));
  });

  function wrap(value: number, range: number) {
    if (range <= 0) return value;
    let v = value % range;
    if (v > 0) v -= range;
    return v;
  }

  function pauseThenResume() {
    setPaused(true);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setPaused(false), 1800);
  }

  const isNear = depth === "near";

  return (
    <motion.div
      ref={trackRef}
      drag="x"
      dragConstraints={{ left: -Infinity, right: Infinity }}
      dragMomentum={true}
      dragElastic={0.08}
      onDragStart={() => {
        if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
        setPaused(true);
      }}
      onDragEnd={() => {
        pauseThenResume();
      }}
      style={{ x }}
      className="flex w-max cursor-grab select-none active:cursor-grabbing"
    >
      {items.map((src, i) => (
        <MarqueeCard
          key={i}
          src={src}
          isNear={isNear}
          onPressStart={pauseThenResume}
        />
      ))}
    </motion.div>
  );
}

function MarqueeCard({
  src,
  isNear,
  onPressStart,
}: {
  src: string;
  isNear: boolean;
  onPressStart: () => void;
}) {
  return (
    <motion.div
      onPointerDown={onPressStart}
      whileHover={{
        scale: isNear ? 1.04 : 1.02,
        y: isNear ? -6 : -3,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mx-2 shrink-0 overflow-hidden rounded-[28px] sm:mx-3 ${
        isNear
          ? "h-44 w-60 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.22)] sm:h-56 sm:w-72"
          : "h-36 w-48 opacity-80 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.16)] sm:h-44 sm:w-60"
      }`}
      style={!isNear ? { filter: "saturate(0.92) brightness(0.96)" } : undefined}
    >
      <img
        src={src}
        alt="Естелік сурет"
        draggable={false}
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-black/5" />
    </motion.div>
  );
}