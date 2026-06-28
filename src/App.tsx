import { useState } from "react";
import { motion } from "framer-motion";

import SplashScreen from "./components/SplashScreen";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";

import Hero from "./sections/Hero";
import Welcome from "./sections/Welcome";
import Story from "./sections/Story";
import Timeline from "./sections/Timeline";
import Venue from "./sections/Venue";
import CountdownSection from "./sections/CountdownSection";
import DressCode from "./sections/DressCode";
import Gallery from "./sections/Gallery";
import Wishes from "./sections/Wishes";
import RSVP from "./sections/RSVP";
import GuestTable from "./sections/GuestTable";
import DecorativeDivider from "./sections/DecorativeDivider";
import BridePhoto from "./sections/BridePhoto";

function App() {
  const [showSplash, setShowSplash] =
    useState(true);

  function handleOpen() {
    setTimeout(() => {
      setShowSplash(false);
    }, 1500);
  }

  return (
    <>
      <SplashScreen
        visible={showSplash}
        onOpen={handleOpen}
      />

      <MusicPlayer />

      <motion.main
        className="container-mobile min-h-screen"
        initial={{
          opacity: 0,
          scale: 1.05,
          filter: "blur(20px)",
        }}
        animate={{
          opacity: showSplash ? 0 : 1,
          scale: showSplash ? 1.05 : 1,
          filter: showSplash
            ? "blur(20px)"
            : "blur(0px)",
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <Hero />

        <Welcome />

        <Story />

        <BridePhoto />

        <Timeline />

        <DecorativeDivider />

        <Venue />

        <CountdownSection />

        <DressCode />

        <Gallery />

        <DecorativeDivider />

        <Wishes />

        <DecorativeDivider />

        <GuestTable />

        <RSVP />

        <Footer />

        
      </motion.main>
    </>
  );
}

export default App;