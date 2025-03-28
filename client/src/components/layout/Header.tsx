import React, { useState } from "react";
import MobileMenu from "@/components/ui/mobile-menu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative" id="home">
      <div className="absolute inset-0 bg-[#1A365D] opacity-70 z-10"></div>
      <div className="relative z-20 container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="logo">
          <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-white">
            Elegance<span className="text-[#D4AF37]">.</span>
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <a 
                href="#home" 
                className="nav-link text-white hover:text-[#D4AF37] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] after:transition-[width] after:duration-300 hover:after:w-full"
                onClick={scrollToSection('home')}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                className="nav-link text-white hover:text-[#D4AF37] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] after:transition-[width] after:duration-300 hover:after:w-full"
                onClick={scrollToSection('services')}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#team" 
                className="nav-link text-white hover:text-[#D4AF37] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] after:transition-[width] after:duration-300 hover:after:w-full"
                onClick={scrollToSection('team')}
              >
                Our Team
              </a>
            </li>
            <li>
              <a 
                href="#gallery" 
                className="nav-link text-white hover:text-[#D4AF37] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] after:transition-[width] after:duration-300 hover:after:w-full"
                onClick={scrollToSection('gallery')}
              >
                Gallery
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="nav-link text-white hover:text-[#D4AF37] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] after:transition-[width] after:duration-300 hover:after:w-full"
                onClick={scrollToSection('contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        
        {/* Booking Button */}
        <a 
          href="#appointment" 
          className="hidden md:block bg-[#D4AF37] hover:bg-opacity-90 text-[#1A365D] font-medium py-2 px-6 rounded-full transition-all duration-300"
          onClick={scrollToSection('appointment')}
        >
          Book Now
        </a>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-xl"
          onClick={() => setMobileMenuOpen(true)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        onLinkClick={(id) => {
          setMobileMenuOpen(false);
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />
    </header>
  );
}
