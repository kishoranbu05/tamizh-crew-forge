import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { categoryLabels } from '@/types';
import { toast } from '@/hooks/use-toast';
import { ShieldCheck, CreditCard, Package } from 'lucide-react';
import { z } from 'zod';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  discordId: z.string().min(2, 'Discord ID is required').max(50),
  notes: z.string().max(500).optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    email: '',
    discordId: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = checkoutSchema.parse(formData);

      // Simulate order placement
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        ...validatedData,
        items,
        total: totalPrice,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // Store in localStorage for demo purposes
      const existingOrders = JSON.parse(localStorage.getItem('tamizhcrew-orders') || '[]');
      localStorage.setItem('tamizhcrew-orders', JSON.stringify([...existingOrders, order]));

      clearCart();

      toast({
        title: 'Order Placed Successfully! 🎉',
        description: `Order #${order.id} has been placed. We'll contact you on Discord soon!`,
      });

      navigate('/order-success', { state: { orderId: order.id } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof CheckoutForm, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof CheckoutForm] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8">
                <h2 className="font-display font-semibold text-xl mb-6">
                  Your Information
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`w-full h-12 px-4 rounded-lg bg-muted border ${
                        errors.name ? 'border-destructive' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full h-12 px-4 rounded-lg bg-muted border ${
                        errors.email ? 'border-destructive' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Discord ID *
                    </label>
                    <input
                      type="text"
                      name="discordId"
                      value={formData.discordId}
                      onChange={handleChange}
                      placeholder="username#1234 or username"
                      className={`w-full h-12 px-4 rounded-lg bg-muted border ${
                        errors.discordId ? 'border-destructive' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                    />
                    {errors.discordId && (
                      <p className="text-destructive text-sm mt-1">{errors.discordId}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any special requirements or notes for your order..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/50">
                  {[
                    { icon: ShieldCheck, label: 'Secure Checkout' },
                    { icon: CreditCard, label: 'Safe Payment' },
                    { icon: Package, label: 'Fast Delivery' },
                  ].map((badge) => (
                    <div key={badge.label} className="text-center">
                      <badge.icon className="w-6 h-6 mx-auto text-primary mb-1" />
                      <span className="text-xs text-muted-foreground">{badge.label}</span>
                    </div>
                  ))}
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full mt-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <h3 className="font-display font-semibold text-xl mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.service.id} className="flex gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">
                          {item.service.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {categoryLabels[item.service.category]} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-sm">
                        ₹{(item.service.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-border/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className="border-t border-border/50 pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="font-display text-xl text-primary">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
