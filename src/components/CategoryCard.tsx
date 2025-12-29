import { Link } from 'react-router-dom';
import { ServiceCategory, categoryLabels, categoryIcons } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: ServiceCategory;
  count: number;
  className?: string;
}

export function CategoryCard({ category, count, className }: CategoryCardProps) {
  return (
    <Link
      to={`/services?category=${category}`}
      className={cn(
        'group glass-card p-6 flex flex-col gap-4 transition-all duration-300',
        'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1',
        className
      )}
    >
      <div className="text-4xl">{categoryIcons[category]}</div>
      
      <div className="flex-1">
        <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
          {categoryLabels[category]}
        </h3>
        <p className="text-muted-foreground text-sm mt-1">
          {count} services available
        </p>
      </div>

      <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        View Services
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
