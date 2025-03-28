import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import Gallery from "@/components/sections/Gallery";
import Appointment from "@/components/sections/Appointment";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <About />
      <Services />
      <Team />
      <Gallery />
      <Appointment />
      <Contact />
      <Footer />
      
      {/* Mobile Booking Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-30">
        <a 
          href="#appointment" 
          className="bg-[#D4AF37] hover:bg-opacity-90 text-[#1A365D] font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <i className="fas fa-calendar-alt mr-2"></i> Book Now
        </a>
      </div>
    </div>
  );
}
