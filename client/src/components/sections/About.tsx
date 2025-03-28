import React from "react";

export default function About() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <img 
              src="https://images.unsplash.com/photo-1470259078422-826894b933aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Salon stylists at work" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#333333] mb-6">
              Welcome to Elegance Salon
            </h2>
            <p className="text-lg text-[#333333] mb-6">
              We believe that beauty is an expression of individuality. Our skilled team of professionals is dedicated to helping you look and feel your absolute best with personalized services tailored to your unique style.
            </p>
            <p className="text-lg text-[#333333] mb-8">
              Founded in 2010, Elegance has grown from a small local salon to a premier beauty destination, known for exceptional service and attention to detail.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center">
                <i className="fas fa-certificate text-[#D4AF37] text-2xl mr-4"></i>
                <div>
                  <h4 className="font-bold">Certified Experts</h4>
                  <p className="text-sm">Industry-leading stylists</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <i className="fas fa-leaf text-[#D4AF37] text-2xl mr-4"></i>
                <div>
                  <h4 className="font-bold">Premium Products</h4>
                  <p className="text-sm">Eco-friendly brands</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <i className="fas fa-gem text-[#D4AF37] text-2xl mr-4"></i>
                <div>
                  <h4 className="font-bold">Luxury Experience</h4>
                  <p className="text-sm">Relaxing atmosphere</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <i className="fas fa-heart text-[#D4AF37] text-2xl mr-4"></i>
                <div>
                  <h4 className="font-bold">Personalized Care</h4>
                  <p className="text-sm">Tailored to your needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
