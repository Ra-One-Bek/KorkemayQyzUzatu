import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({
  targetDate,
}: CountdownProps) {
  const calculateTime = (): TimeLeft => {
    const difference =
      new Date(targetDate).getTime() - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(
        difference / (1000 * 60 * 60 * 24)
      ),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  };

  const [time, setTime] = useState(calculateTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    {
      label: "Күн",
      value: time.days,
    },
    {
      label: "Сағат",
      value: time.hours,
    },
    {
      label: "Мин",
      value: time.minutes,
    },
    {
      label: "Сек",
      value: time.seconds,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="glass rounded-3xl p-5 text-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={item.value}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.3,
              }}
              className="text-4xl text-[#1f1f1f]"
            >
              {item.value}
            </motion.div>
          </AnimatePresence>

          <p className="mt-2 text-sm uppercase tracking-[2px] text-[#d4af37]">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}