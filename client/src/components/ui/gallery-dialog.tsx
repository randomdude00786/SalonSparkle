import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface GalleryDialogProps {
  isOpen: boolean;
  image: string;
  onClose: () => void;
}

export default function GalleryDialog({ isOpen, image, onClose }: GalleryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-all duration-300"
          >
            <i className="fas fa-times"></i>
          </button>
          <img 
            src={image} 
            alt="Gallery item" 
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
