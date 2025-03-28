import React from "react";

export default function Footer() {
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A365D] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-['Playfair_Display'] font-bold mb-4">
              Elegance<span className="text-[#D4AF37]">.</span>
            </h3>
            <p className="mb-4">Premium hair and beauty services in a luxurious, relaxing environment.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#D4AF37] transition-colors duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-[#D4AF37] transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-[#D4AF37] transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-[#D4AF37] transition-colors duration-300">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-['Playfair_Display'] font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  className="hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={scrollToSection('home')}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={scrollToSection('services')}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#team" 
                  className="hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={scrollToSection('team')}
                >
                  Our Team
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  className="hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={scrollToSection('gallery')}
                >
                  Gallery
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={scrollToSection('contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-['Playfair_Display'] font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#services" 
                  className="hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={scrollToSection('services')}
                >
                  Haircut & Styling
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={scrollToSection('services')}
                >
                  Hair Coloring
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={scrollToSection('services')}
                >
                  Hair Treatments
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={scrollToSection('services')}
                >
                  Makeup Services
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={scrollToSection('services')}
                >
                  Nail Care
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-['Playfair_Display'] font-bold mb-4">Hours</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-[#D4AF37]">9AM - 8PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-[#D4AF37]">9AM - 6PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-[#D4AF37]">10AM - 5PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Elegance Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
