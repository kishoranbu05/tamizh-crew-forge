import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ServiceCard } from '@/components/ServiceCard';
import { services } from '@/data/services';
import { ServiceCategory, categoryLabels, categoryIcons } from '@/types';
import { Button } from '@/components/ui/button';
import { Search, ShoppingBag } from 'lucide-react';

const categories: (ServiceCategory | 'all')[] = [
  'all',
  'discord',
  'website',
  'graphic',
  'video',
  'fivem-scripts',
  'fivem-dev',
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'name'>('name');

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
    
    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 text-sm text-primary mb-6">
              <ShoppingBag className="w-4 h-4" />
              {services.length} Products Available
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Shop <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse and purchase our digital services. Add to cart and checkout when ready!
            </p>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="glass-card p-6 sticky top-24">
                <h3 className="font-display font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {category !== 'all' && <span>{categoryIcons[category]}</span>}
                        {category === 'all' ? 'All Services' : categoryLabels[category]}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-border/50 mt-6 pt-6">
                  <h3 className="font-display font-semibold mb-4">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full h-10 px-3 rounded-lg bg-muted border border-border text-sm focus:border-primary outline-none"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              {/* Results */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="text-foreground font-medium">{filteredServices.length}</span> products
                </p>
              </div>

              {/* Products Grid */}
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 glass-card">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter.
                  </p>
                  <Button onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
