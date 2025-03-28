import React from "react";
import { teamData } from "@/lib/types";

export default function Team() {
  return (
    <section id="team" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#333333] mb-4">
            Meet Our Team
          </h2>
          <p className="max-w-2xl mx-auto text-lg">
            Our talented stylists and beauty experts are passionate about helping you look and feel your best.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((member, index) => (
            <div key={index} className="team-card group relative rounded-lg overflow-hidden shadow-md">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-[#1A365D] bg-opacity-20 group-hover:bg-opacity-70 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-all duration-300">
                <h3 className="text-xl font-['Playfair_Display'] font-bold">{member.name}</h3>
                <p className="text-white text-opacity-90 mb-3">{member.role}</p>
                <div className="social-icons flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="text-white hover:text-[#D4AF37] transition-colors duration-300">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-white hover:text-[#D4AF37] transition-colors duration-300">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="text-white hover:text-[#D4AF37] transition-colors duration-300">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
