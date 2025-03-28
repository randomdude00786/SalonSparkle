import React, { useState } from "react";
import { galleryData } from "@/lib/types";
import GalleryDialog from "@/components/ui/gallery-dialog";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openGallery = (image: string) => {
    setSelectedImage(image);
  };

  const closeGallery = () => {
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#E5E5E5] bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#333333] mb-4">
            Our Gallery
          </h2>
          <p className="max-w-2xl mx-auto text-lg">
            Browse through our portfolio of stunning hair and beauty transformations.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryData.map((item, index) => (
            <div 
              key={index} 
              className="gallery-item relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openGallery(item.image)}
            >
              <img 
                src={item.image} 
                alt={item.alt} 
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="gallery-overlay absolute inset-0 bg-[#1A365D] bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <i className="fas fa-search-plus text-white text-2xl"></i>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#full-gallery" className="inline-flex items-center text-[#1A365D] hover:text-[#D4AF37] transition-colors duration-300 font-medium">
            View Full Gallery <i className="fas fa-angle-right ml-2"></i>
          </a>
        </div>
      </div>

      {/* Gallery Lightbox Dialog */}
      <GalleryDialog 
        isOpen={!!selectedImage} 
        image={selectedImage || ''} 
        onClose={closeGallery} 
      />
    </section>
  );
}
