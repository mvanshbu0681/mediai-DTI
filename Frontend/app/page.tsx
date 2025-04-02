"use client";

import Navbar from "./_Components/Navbar";
import HeroSection from "./_Components/HeroSection";
import FeaturesSection from "./_Components/FeatureSection";
import Footer from "./_Components/Footer";
import { useTranslation } from "react-i18next";

export default function Home() {

  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
