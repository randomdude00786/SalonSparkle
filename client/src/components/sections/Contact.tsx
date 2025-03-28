import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#333333] mb-4">
            Contact Us
          </h2>
          <p className="max-w-2xl mx-auto text-lg">
            Have questions or need assistance? Reach out to us using any of the methods below.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-[#E5E5E5] bg-opacity-30 rounded-lg">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-map-marker-alt text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#333333] mb-2">Visit Us</h3>
            <p className="text-[#333333]">123 Beauty Lane<br />New York, NY 10001</p>
          </div>
          
          <div className="text-center p-6 bg-[#E5E5E5] bg-opacity-30 rounded-lg">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-phone-alt text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#333333] mb-2">Call Us</h3>
            <p className="text-[#333333] mb-1">(555) 123-4567</p>
            <p className="text-[#333333] text-sm">Mon-Fri: 9AM-8PM</p>
          </div>
          
          <div className="text-center p-6 bg-[#E5E5E5] bg-opacity-30 rounded-lg">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-envelope text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#333333] mb-2">Email Us</h3>
            <p className="text-[#333333]">info@elegancesalon.com</p>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25903e4fee355%3A0x151a5c75f5c2de93!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1617030823244!5m2!1sen!2s" 
            width="100%" 
            height="450" 
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Salon Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
