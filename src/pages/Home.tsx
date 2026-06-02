import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/data/products';
import { motion } from 'framer-motion';

export const Home = () => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="flex flex-col gap-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <img
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a36c363a-7b2e-4ade-a415-8477b8e68e71/hero-fashion-c74e7737-1780435104568.webp"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-start text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              New Season 2025
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Elegance in <br /> Every Detail
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
              Discover our latest collection of minimalist essentials designed for the modern lifestyle.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild className="rounded-full px-8 py-6 text-lg">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 py-6 text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black">
                <Link to="/shop?category=Summer">Summer Lookbook</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories / Featured */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Collection</h2>
            <p className="text-muted-foreground">Handpicked styles that define the season.</p>
          </div>
          <Button variant="link" asChild className="gap-2">
            <Link to="/shop">View All Collections <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px]">
          <div className="relative rounded-2xl overflow-hidden group">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a36c363a-7b2e-4ade-a415-8477b8e68e71/collection-summer-da96df9a-1780435103840.webp" 
              alt="Summer" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Summer Essentials</h3>
              <p className="mb-4 opacity-90">Lightweight linen and breezy silhouettes.</p>
              <Link to="/shop?category=Summer" className="flex items-center gap-2 font-semibold hover:gap-3 transition-all">
                Shop Summer <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a36c363a-7b2e-4ade-a415-8477b8e68e71/collection-jewelry-29a04374-1780435104676.webp" 
              alt="Accessories" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Signature Accents</h3>
              <p className="mb-4 opacity-90">Minimalist jewelry to complete your look.</p>
              <Link to="/shop?category=Accessories" className="flex items-center gap-2 font-semibold hover:gap-3 transition-all">
                Shop Accessories <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
            <p className="text-muted-foreground">The latest additions to our curated catalog.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: Truck, title: 'Global Shipping', desc: 'Fast and secure shipping worldwide.' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy for all items.' },
              { icon: ShieldCheck, title: 'Secure Payment', desc: 'Encrypted and safe checkout process.' },
              { icon: Star, title: 'Premium Quality', desc: 'Crafted with the finest materials.' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="bg-background p-4 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 text-center max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">Join the Collective</h2>
        <p className="text-muted-foreground mb-8">
          Subscribe to receive updates, access to exclusive deals, and more.
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 px-4 py-3 rounded-full border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Button className="rounded-full px-6">Subscribe</Button>
        </div>
      </section>
    </div>
  );
};