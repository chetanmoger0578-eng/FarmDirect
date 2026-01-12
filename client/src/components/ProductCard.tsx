import { ShoppingCart, MapPin } from "lucide-react";
import { Product } from "../types";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "../contexts/LanguageContext";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { t } = useLanguage();
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{product.name}</h3>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
          <MapPin className="w-3 h-3" />
          <span>{product.farmerName}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-semibold">₹{product.price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground ml-1">{product.unit}</span>
          </div>
          <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {t.addToCart}
        </Button>
      </CardFooter>
    </Card>
  );
}