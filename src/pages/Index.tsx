import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/CategoryCard';
import { ServiceCard } from '@/components/ServiceCard';
import { Layout } from '@/components/layout/Layout';
import { services } from '@/data/services';
import heroBg from '@/assets/hero-bg.jpg';
import { ServiceCategory, categoryLabels } from '@/types';
import { ArrowRight, Zap, Shield, Headphones, Star } from 'lucide-react';

const categories: ServiceCategory[] = [
  'discord',
  'website',
  'graphic',
  'video',
  'fivem-scripts',
  'fivem-dev',
];

const featuredServices = services.slice(0, 6);

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '200+', label: 'Happy Clients' },
  { value: '24/7', label: 'Support Available' },
  { value: '99%', label: 'Satisfaction Rate' },
];

const features = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Quick turnaround without compromising quality. Ungal project-a time-la deliver pannuvom.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'All our work is secure, tested, and production-ready. No shortcuts, only quality.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock support via Discord and WhatsApp. Eppo venumnalum contact pannunga.',
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Top-tier work that stands out. We deliver only the best for our crew members.',
  },
];

export default function HomePage() {
  return (
    <Layout>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 text-sm text-primary animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Trusted by 200+ clients worldwide
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Welcome to{' '}
              <span className="text-gradient-primary glow-text">
                TAMIZH CREW
              </span>
              <br />
              <span className="text-gradient">Development</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Ungal idea-va next level-ku kondu pogum digital crew! 🔥
              <br />
              Discord, Websites, Graphics, Videos & FiveM - Everything under one roof.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/services">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Explore Services
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary glow-text">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-muted-foreground">
              Full-range digital services from Discord setup to complete FiveM server development. 
              Whatever you need, we got you covered!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category}
                category={category}
                count={services.filter((s) => s.category === category).length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">Tamizh Crew</span>?
            </h2>
            <p className="text-muted-foreground">
              Serious work, solid delivery, full support 💯
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-6 text-center group hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Featured <span className="text-primary">Services</span>
              </h2>
              <p className="text-muted-foreground">
                Most popular services picked by our crew members
              </p>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto glow-border">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your <span className="text-primary">Project</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join 200+ satisfied clients who trusted Tamizh Crew for their digital needs.
              Let's bring your vision to life!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button variant="hero" size="lg">
                  Browse Services
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a
                href="https://discord.gg/tamizhcrew"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="glass" size="lg">
                  Join Discord
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
