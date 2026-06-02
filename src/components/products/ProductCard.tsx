import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden border-none shadow-none bg-transparent">
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider">
            New
          </span>
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
      
      <CardContent className="pt-4 px-0 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">{product.category}</p>
            <Link to={`/product/${product.id}`} className="block">
              <h3 className="font-medium hover:underline decoration-1 underline-offset-4">{product.name}</h3>
            </Link>
          </div>
          <p className="font-semibold">GH₵{product.price.toLocaleString()}</p>
        </div>
      </CardContent>
      
      <CardFooter className="px-0 pt-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full gap-2 rounded-full"
          onClick={() => addToCart(product)}
        >
          <Plus className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};