import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';
import { categoryLabels } from '@/types';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  LogOut,
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Order {
  id: string;
  customerName: string;
  email: string;
  discordId: string;
  items: Array<{ service: { name: string; price: number }; quantity: number }>;
  total: number;
  status: 'pending' | 'working' | 'completed';
  createdAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'services', label: 'Services', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
];

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const user = localStorage.getItem('tamizhcrew-user');
    if (!user) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(user);
    if (parsed.role !== 'admin') {
      navigate('/');
      return;
    }

    // Load data
    setOrders(JSON.parse(localStorage.getItem('tamizhcrew-orders') || '[]'));
    setMessages(JSON.parse(localStorage.getItem('tamizhcrew-messages') || '[]'));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('tamizhcrew-user');
    navigate('/login');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('tamizhcrew-orders', JSON.stringify(updatedOrders));
  };

  const stats = [
    { label: 'Total Services', value: services.length, color: 'text-primary' },
    { label: 'Total Orders', value: orders.length, color: 'text-green-500' },
    { label: 'Pending Orders', value: orders.filter((o) => o.status === 'pending').length, color: 'text-yellow-500' },
    { label: 'Messages', value: messages.length, color: 'text-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-display font-bold text-primary-foreground text-lg">
              TC
            </div>
            <span className="font-display font-bold text-lg">
              ADMIN
            </span>
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="font-display font-semibold text-lg capitalize">
            {activeTab}
          </h1>
          <div className="text-sm text-muted-foreground">
            Welcome, Admin
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass-card p-6">
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className={cn('font-display text-3xl font-bold mt-1', stat.color)}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="glass-card p-6">
                <h2 className="font-display font-semibold text-xl mb-4">Recent Orders</h2>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-bold text-primary">
                            ₹{order.total.toLocaleString()}
                          </p>
                          <span className={cn(
                            'text-xs px-2 py-1 rounded-full',
                            order.status === 'pending' && 'bg-yellow-500/20 text-yellow-500',
                            order.status === 'working' && 'bg-blue-500/20 text-blue-500',
                            order.status === 'completed' && 'bg-green-500/20 text-green-500'
                          )}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No orders yet</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-display font-semibold text-xl">All Services</h2>
                <Button variant="default" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Service
                </Button>
              </div>

              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-medium">Name</th>
                        <th className="text-left p-4 font-medium">Category</th>
                        <th className="text-left p-4 font-medium">Price</th>
                        <th className="text-right p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr key={service.id} className="border-t border-border">
                          <td className="p-4">{service.name}</td>
                          <td className="p-4 text-muted-foreground">
                            {categoryLabels[service.category]}
                          </td>
                          <td className="p-4 font-display font-bold text-primary">
                            ₹{service.price.toLocaleString()}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="font-display font-semibold text-xl">All Orders</h2>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="glass-card p-6">
                      <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{order.id}</p>
                          <p className="font-display font-semibold text-lg">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                          <p className="text-sm text-primary">Discord: {order.discordId}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-2xl font-bold text-primary">
                            ₹{order.total.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4 mb-4">
                        <p className="text-sm font-medium mb-2">Items:</p>
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm text-muted-foreground">
                            • {item.service.name} × {item.quantity}
                          </p>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant={order.status === 'pending' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'pending')}
                        >
                          Pending
                        </Button>
                        <Button
                          variant={order.status === 'working' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'working')}
                        >
                          Working
                        </Button>
                        <Button
                          variant={order.status === 'completed' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                        >
                          Completed
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-12 text-center">
                  <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No orders yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              <h2 className="font-display font-semibold text-xl">Contact Messages</h2>

              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="glass-card p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-semibold">{msg.name}</p>
                          <p className="text-sm text-muted-foreground">{msg.email}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="font-medium text-primary mb-2">{msg.subject}</p>
                      <p className="text-muted-foreground">{msg.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-12 text-center">
                  <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No messages yet</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
