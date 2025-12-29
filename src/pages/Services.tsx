import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ServiceCard } from '@/components/ServiceCard';
import { services } from '@/data/services';
import { ServiceCategory, categoryLabels, categoryIcons } from '@/types';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories: (ServiceCategory | 'all')[] = [
  'all',
  'discord',
  'website',
  'graphic',
  'video',
  'fivem-scripts',
  'fivem-dev',
];

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  const selectedCategory = (searchParams.get('category') as ServiceCategory) || 'all';

  const filteredServices = useMemo(() => {
    let result = services;
    
    if (selectedCategory !== 'all') {
      result = result.filter((s) => s.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category: ServiceCategory | 'all') => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our complete range of digital services. From Discord setup to full FiveM server development,
              we've got everything you need to level up your project.
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Services */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'glass'}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className="gap-2"
              >
                {category !== 'all' && (
                  <span>{categoryIcons[category]}</span>
                )}
                {category === 'all' ? 'All Services' : categoryLabels[category]}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredServices.length}</span> services
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              {selectedCategory !== 'all' ? categoryLabels[selectedCategory] : 'All Categories'}
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😕</div>
              <h3 className="font-display text-xl font-semibold mb-2">
                No services found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                handleCategoryChange('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 md:p-12 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Need a <span className="text-primary">Custom Service</span>?
            </h2>
            <p className="text-muted-foreground mb-6">
              Don't see exactly what you need? Contact us and we'll create a custom package just for you!
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
