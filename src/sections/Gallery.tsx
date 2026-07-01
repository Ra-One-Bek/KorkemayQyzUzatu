import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";

import image1 from "../assets/gallery_1.webp";
import image2 from "../assets/gallery_2.webp";
import image3 from "../assets/gallery_3.webp";
import image4 from "../assets/gallery_4.webp";
import image5 from "../assets/gallery_5.webp";
import image6 from "../assets/gallery_6.webp";
import image7 from "../assets/gallery_7.webp";
import image8 from "../assets/gallery_8.webp";
import image9 from "../assets/gallery_9.webp";
import image10 from "../assets/gallery_10.webp";
import image11 from "../assets/gallery_11.webp";
import image12 from "../assets/gallery_12.webp";
import image13 from "../assets/gallery_13.webp";
import image14 from "../assets/gallery_14.webp";
import image15 from "../assets/gallery_15.webp";
import image16 from "../assets/gallery_16.webp";
import image17 from "../assets/gallery_17.webp";
import image18 from "../assets/gallery_18.webp";
import image19 from "../assets/gallery_19.webp";



const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18, image19];

// Дублируем ряд, чтобы лента всегда оставалась заполненной при любой ширине экрана
const row = [...images, ...images];

export default function Gallery() {
  return (
    <AnimatedSection>
      <section className="relative section-padding overflow-hidden">
        <SectionTitle subtitle="Естелік" title="Естелік сәттер" />

        <div className="relative -mx-6 sm:-mx-10">
          {/* Туманные края — картинки "проявляются" */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f8f8f8] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f8f8f8] to-transparent sm:w-24" />

          <MarqueeRow
            items={row}
            direction="right"
            depth="near"
            speed={28}
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
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const sign = direction === "right" ? 1 : -1;
  const half = trackWidth / 2 || 1; // длина одной копии набора (у нас 2 копии)

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
    if (paused || !inView) return;
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
      style={{ x, willChange: "transform", translateZ: 0 }}
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
      className={`relative mx-3 shrink-0 overflow-hidden rounded-[32px] sm:mx-4 will-change-transform ${
        isNear
          ? "h-64 w-80 shadow-[0_18px_32px_-14px_rgba(0,0,0,0.20)] sm:h-80 sm:w-[26rem]"
          : "h-56 w-72 opacity-80 shadow-[0_12px_22px_-12px_rgba(0,0,0,0.15)] sm:h-72 sm:w-96"
      }`}
      style={!isNear ? { filter: "saturate(0.92) brightness(0.96)" } : undefined}
    >
      <img
        src={src}
        alt="Естелік сурет"
        draggable={false}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-[center_30%]"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-black/5" />
    </motion.div>
  );
}