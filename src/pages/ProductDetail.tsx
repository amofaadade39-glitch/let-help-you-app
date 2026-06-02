import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag, ArrowLeft, Truck, RotateCcw, ShieldCheck, Star, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/products/ProductCard';

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');

  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== id).slice(0, 4);

  const handleBuyOnWhatsApp = () => {
    if (!product) return;
    const phoneNumber = "233539147743";
    const message = `Hello Hola Collections! 👋 I would like to buy the ${product.name} (Size: ${selectedSize}) for GH₵${product.price.toLocaleString()}. Is it available?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button asChild>
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10">
        <ArrowLeft className="h-4 w-4" /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
        {/* Image */}
        <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-4 block">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <p className="text-3xl font-semibold">GH₵{product.price.toLocaleString()}</p>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <span className="text-muted-foreground text-sm ml-2">(4.9 / 5.0)</span>
              </div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator className="mb-8" />

          {/* Size Selection */}
          <div className="mb-8">
            <p className="font-semibold mb-4">Select Size</p>
            <div className="flex gap-3">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-12 w-14 rounded-md border flex items-center justify-center font-medium transition-all ${
                    selectedSize === size
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'hover:border-primary text-muted-foreground'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-10">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 py-7 text-lg rounded-xl gap-2" onClick={() => addToCart(product)}>
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1 py-7 text-lg rounded-xl border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all gap-2"
                onClick={handleBuyOnWhatsApp}
              >
                <MessageCircle className="h-5 w-5" />
                Buy on WhatsApp
              </Button>
            </div>
            <Button size="lg" variant="ghost" className="w-full text-muted-foreground">
              Add to Wishlist
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div className="text-xs">
                <p className="font-bold">Free Shipping</p>
                <p className="text-muted-foreground">On orders over GH₵500</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <div className="text-xs">
                <p className="font-bold">30-Day Returns</p>
                <p className="text-muted-foreground">Hassle-free exchanges</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="pt-20 border-t">
        <h2 className="text-2xl font-bold mb-10">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};