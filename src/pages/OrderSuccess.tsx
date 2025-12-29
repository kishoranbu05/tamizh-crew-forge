import { Link, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, MessageCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';

  return (
    <Layout>
      <section className="py-20 min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/10 flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-14 h-14 text-green-500" />
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Order <span className="text-primary">Confirmed!</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Nandri! Your order has been placed successfully.
            </p>

            <div className="glass-card p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-sm text-muted-foreground mb-2">Order ID</p>
              <p className="font-display font-bold text-xl text-primary">{orderId}</p>
            </div>

            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-muted-foreground text-sm">
                We'll contact you via Discord within 24 hours to start working on your project.
                Check your Discord DMs! 💬
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                    <Home className="w-4 h-4" />
                    Back to Home
                  </Button>
                </Link>
                <a
                  href="https://discord.gg/tamizhcrew"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="hero" size="lg" className="w-full sm:w-auto gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Join Discord
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
