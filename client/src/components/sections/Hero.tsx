import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Elegant salon interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1A365D] opacity-60"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Elegance Salon
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-[#FAFAFA] mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Where beauty meets expertise
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="#appointment" 
            className="bg-[#D4AF37] hover:bg-opacity-90 text-[#1A365D] font-medium py-3 px-8 rounded-full transition-all duration-300 inline-block mr-4"
            onClick={scrollToSection('appointment')}
          >
            Book Appointment
          </a>
          <a 
            href="#services" 
            className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-medium py-3 px-8 rounded-full transition-all duration-300 inline-block"
            onClick={scrollToSection('services')}
          >
            Our Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
