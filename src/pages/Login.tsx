import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  password: z.string().min(1, 'Password is required'),
});

// Admin credentials
const ADMIN_USERS: Record<string, { password: string; name: string }> = {
  'shinobu': { password: 'admin1', name: 'Shinobu' },
  'minion': { password: 'admin2', name: 'Minion' },
  'black skull': { password: 'admin3', name: 'Black Skull' },
  'max': { password: 'admin4', name: 'Max' },
  'mjgaming': { password: 'admin5', name: 'MJ Gaming' },
};

const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [loginData, setLoginData] = useState<LoginForm>({
    username: '',
    password: '',
  });
  
  const [registerData, setRegisterData] = useState<RegisterForm>({
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      loginSchema.parse(loginData);

      const usernameKey = loginData.username.toLowerCase();
      const adminUser = ADMIN_USERS[usernameKey];

      // Check if admin
      if (adminUser && adminUser.password === loginData.password) {
        localStorage.setItem('tamizhcrew-user', JSON.stringify({
          username: loginData.username,
          name: adminUser.name,
          role: 'admin',
        }));
        toast({
          title: `Welcome ${adminUser.name}! 👋`,
          description: 'Redirecting to admin panel...',
        });
        navigate('/admin');
      } else {
        toast({
          title: 'Invalid Credentials',
          description: 'Please check your username and password.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      registerSchema.parse(registerData);

      // Simulate registration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const users = JSON.parse(localStorage.getItem('tamizhcrew-users') || '[]');
      users.push({
        name: registerData.name,
        username: registerData.username,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('tamizhcrew-users', JSON.stringify(users));

      localStorage.setItem('tamizhcrew-user', JSON.stringify({
        username: registerData.username,
        name: registerData.name,
        role: 'user',
      }));

      toast({
        title: 'Account Created! 🎉',
        description: 'Welcome to Tamizh Crew!',
      });
      navigate('/');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="glass-card p-8">
              {/* Toggle */}
              <div className="flex gap-2 mb-8 p-1 bg-muted rounded-lg">
                <button
                  onClick={() => { setIsLogin(true); setErrors({}); }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    isLogin
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <LogIn className="w-4 h-4 inline mr-2" />
                  Login
                </button>
                <button
                  onClick={() => { setIsLogin(false); setErrors({}); }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    !isLogin
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <UserPlus className="w-4 h-4 inline mr-2" />
                  Register
                </button>
              </div>

              <h1 className="font-display text-2xl font-bold mb-2">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h1>
              <p className="text-muted-foreground text-sm mb-6">
                {isLogin
                  ? 'Enter your credentials to access your account.'
                  : 'Join Tamizh Crew and start your journey!'}
              </p>

              {isLogin ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={loginData.username}
                      onChange={handleLoginChange}
                      placeholder="Enter username"
                      className={`w-full h-12 px-4 rounded-lg bg-muted border ${
                        errors.username ? 'border-destructive' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none`}
                    />
                    {errors.username && (
                      <p className="text-destructive text-sm mt-1">{errors.username}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        placeholder="••••••••"
                        className={`w-full h-12 px-4 pr-12 rounded-lg bg-muted border ${
                          errors.password ? 'border-destructive' : 'border-border'
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-destructive text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      placeholder="Your name"
                      className={`w-full h-12 px-4 rounded-lg bg-muted border ${
                        errors.name ? 'border-destructive' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none`}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={registerData.username}
                      onChange={handleRegisterChange}
                      placeholder="Choose a username"
                      className={`w-full h-12 px-4 rounded-lg bg-muted border ${
                        errors.username ? 'border-destructive' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none`}
                    />
                    {errors.username && (
                      <p className="text-destructive text-sm mt-1">{errors.username}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        placeholder="••••••••"
                        className={`w-full h-12 px-4 pr-12 rounded-lg bg-muted border ${
                          errors.password ? 'border-destructive' : 'border-border'
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-destructive text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      placeholder="••••••••"
                      className={`w-full h-12 px-4 rounded-lg bg-muted border ${
                        errors.confirmPassword ? 'border-destructive' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              )}

              {!isLogin && (
                <p className="text-center text-sm text-muted-foreground mt-6">
                  By registering, you agree to our Terms of Service.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
