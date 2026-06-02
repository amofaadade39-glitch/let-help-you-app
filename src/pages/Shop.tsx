import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Filter } from 'lucide-react';

const categories = ['All', 'Summer', 'Accessories', 'Footwear', 'Lifestyle'];

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('Featured');
  
  const currentCategory = searchParams.get('category') || 'All';

  const filteredProducts = useMemo(() => {
    let result = products;
    if (currentCategory !== 'All') {
      result = result.filter(p => p.category === currentCategory);
    }
    
    if (sortBy === 'Price: Low to High') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    
    return result;
  }, [currentCategory, sortBy]);

  const setCategory = (cat: string) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Shop Collections</h1>
        <p className="text-muted-foreground">Explore our curated selection of modern essentials.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={currentCategory === cat ? 'default' : 'outline'}
              size="sm"
              className="rounded-full px-5"
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Showing {filteredProducts.length} products
          </span>
          <Separator orientation="vertical" className="h-6 hidden sm:block" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                Sort by: {sortBy} <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy('Featured')}>Featured</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('Price: Low to High')}>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('Price: High to Low')}>Price: High to Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/30 rounded-3xl">
          <p className="text-lg text-muted-foreground">No products found in this category.</p>
          <Button variant="link" onClick={() => setCategory('All')}>Clear filters</Button>
        </div>
      )}
    </div>
  );
};