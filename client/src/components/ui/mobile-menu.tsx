import React from 'react';
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Loader2, User } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLinkClick: (id: string) => void;
}

export default function MobileMenu({ isOpen, onClose, onLinkClick }: MobileMenuProps) {
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();
  
  const handleLogout = () => {
    logoutMutation.mutate();
    onClose(); // Close the mobile menu after logout
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); // Close the mobile menu after navigation
  };
  return (
    <div 
      className={`fixed top-0 left-0 h-full w-64 bg-[#1A365D] z-50 p-6 transition-transform duration-300 ${
        isOpen ? 'transform-none' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-['Playfair_Display'] font-bold text-white">
          Elegance<span className="text-[#D4AF37]">.</span>
        </h2>
        <button className="text-white text-xl" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <ul className="space-y-6">
        <li>
          <a 
            href="#home" 
            className="text-white hover:text-[#D4AF37] transition-colors duration-300 block"
            onClick={(e) => {
              e.preventDefault();
              onLinkClick('home');
            }}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#services" 
            className="text-white hover:text-[#D4AF37] transition-colors duration-300 block"
            onClick={(e) => {
              e.preventDefault();
              onLinkClick('services');
            }}
          >
            Services
          </a>
        </li>
        <li>
          <a 
            href="#team" 
            className="text-white hover:text-[#D4AF37] transition-colors duration-300 block"
            onClick={(e) => {
              e.preventDefault();
              onLinkClick('team');
            }}
          >
            Our Team
          </a>
        </li>
        <li>
          <a 
            href="#gallery" 
            className="text-white hover:text-[#D4AF37] transition-colors duration-300 block"
            onClick={(e) => {
              e.preventDefault();
              onLinkClick('gallery');
            }}
          >
            Gallery
          </a>
        </li>
        <li>
          <a 
            href="#contact" 
            className="text-white hover:text-[#D4AF37] transition-colors duration-300 block"
            onClick={(e) => {
              e.preventDefault();
              onLinkClick('contact');
            }}
          >
            Contact
          </a>
        </li>
        {/* Auth Links */}
        {user ? (
          <>
            <li>
              <button 
                className="text-white hover:text-[#D4AF37] transition-colors duration-300 block"
                onClick={() => handleNavigation('/dashboard')}
              >
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>Dashboard</span>
                </div>
              </button>
            </li>
            <li>
              <button 
                className="text-white hover:text-[#D4AF37] transition-colors duration-300 block"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <div className="flex items-center">
                  {logoutMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : null}
                  <span>Logout</span>
                </div>
              </button>
            </li>
          </>
        ) : (
          <li>
            <button 
              className="text-white hover:text-[#D4AF37] transition-colors duration-300 block"
              onClick={() => handleNavigation('/auth')}
            >
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Login / Register</span>
              </div>
            </button>
          </li>
        )}
        
        <li className="pt-4">
          <a 
            href="#appointment" 
            className="bg-[#D4AF37] hover:bg-opacity-90 text-[#1A365D] font-medium py-2 px-6 rounded-full transition-all duration-300 inline-block"
            onClick={(e) => {
              e.preventDefault();
              onLinkClick('appointment');
            }}
          >
            Book Now
          </a>
        </li>
      </ul>
    </div>
  );
}
