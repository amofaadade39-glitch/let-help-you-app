import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '../cart/CartDrawer';
import { useCart } from '@/hooks/useCart';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const handleWhatsAppClick = () => {
    const phoneNumber = "233539147743";
    const message = "Hello Hola Collections! 👋 I'm interested in your collections.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link to="/" className="text-xl font-bold tracking-tight">
            HOLA COLLECTIONS
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/shop?category=Summer" className="text-sm font-medium hover:text-primary transition-colors">
              Summer
            </Link>
            <Link to="/shop?category=Accessories" className="text-sm font-medium hover:text-primary transition-colors">
              Accessories
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleWhatsAppClick} className="text-[#25D366] hover:text-[#128C7E] hidden sm:flex">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <CartDrawer>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </CartDrawer>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-background border-b animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-4 gap-4">
            <Link 
              to="/shop" 
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop All
            </Link>
            <Link 
              to="/shop?category=Summer" 
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Summer Collection
            </Link>
            <Link 
              to="/shop?category=Accessories" 
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Accessories
            </Link>
            <Button 
              variant="outline" 
              className="justify-start gap-2 text-[#25D366] border-[#25D366]"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};