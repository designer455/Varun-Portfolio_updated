import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PersonalVisualIntro from "@/components/PersonalVisualIntro";
import Portfolio from "@/components/Portfolio";
import AILab from "@/components/AILab";
import About from "@/components/About";
import Services from "@/components/Services";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JarvisAssistant from "@/components/JarvisAssistant";
import CustomCursor from "@/components/CustomCursor";
import AmbientBackground from "@/components/AmbientBackground";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <AmbientBackground />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PersonalVisualIntro />
        <Portfolio />
        <AILab />
        <About />
        <Services />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <JarvisAssistant />
    </SmoothScroll>
  );
}
