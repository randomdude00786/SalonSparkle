import React from "react";
import { servicesData } from "@/lib/types";

export default function Services() {
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-[#E5E5E5] bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#333333] mb-4">
            Our Services
          </h2>
          <p className="max-w-2xl mx-auto text-lg">
            Discover our range of premium hair and beauty services designed to enhance your natural beauty.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div 
              key={index} 
              className="service-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#333333] mb-2">
                  {service.title}
                </h3>
                <p className="text-[#333333] mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#D4AF37] font-medium">From ${service.price}</span>
                  <a 
                    href="#appointment" 
                    className="text-[#1A365D] hover:text-[#D4AF37] transition-colors duration-300 font-medium flex items-center"
                    onClick={scrollToSection('appointment')}
                  >
                    Book Now <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#services" 
            className="inline-flex items-center text-[#1A365D] hover:text-[#D4AF37] transition-colors duration-300 font-medium"
          >
            View Full Service Menu <i className="fas fa-angle-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
