import { Service, categoryLabels } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const { addToCart, items } = useCart();
  const isInCart = items.some((item) => item.service.id === service.id);

  return (
    <div
      className={cn(
        'group glass-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10',
        featured && 'border-primary/30 relative overflow-hidden'
      )}
    >
      {featured && (
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
          POPULAR
        </div>
      )}

      <div className="space-y-4">
        <div>
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {categoryLabels[service.category]}
          </span>
          <h3 className="font-display font-semibold text-lg mt-1 group-hover:text-primary transition-colors">
            {service.name}
          </h3>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2">
          {service.description}
        </p>

        {service.features && (
          <ul className="space-y-1">
            {service.features.slice(0, 3).map((feature) => (
              <li
                key={feature}
                className="text-sm text-muted-foreground flex items-center gap-2"
              >
                <Check className="w-3 h-3 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            <span className="text-2xl font-display font-bold text-primary">
              ₹{service.price.toLocaleString()}
            </span>
          </div>
          <Button
            variant={isInCart ? 'outline' : 'default'}
            size="sm"
            onClick={() => addToCart(service)}
            className="gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {isInCart ? 'Add More' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}
