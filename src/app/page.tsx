// import Image from "next/image";
import Hero from "../components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BannerMarquee from "@/components/BannerMarquee";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <BannerMarquee />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
