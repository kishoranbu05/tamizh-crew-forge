export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ServiceCategory;
  image?: string;
  features?: string[];
}

export type ServiceCategory = 
  | 'discord'
  | 'website'
  | 'graphic'
  | 'video'
  | 'fivem-scripts'
  | 'fivem-dev';

export interface CartItem {
  service: Service;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  email: string;
  discordId: string;
  notes?: string;
  status: 'pending' | 'working' | 'completed';
  total: number;
  createdAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export const categoryLabels: Record<ServiceCategory, string> = {
  'discord': 'Discord Services',
  'website': 'Website Development',
  'graphic': 'Graphic Design',
  'video': 'Video Editing',
  'fivem-scripts': 'FiveM Scripts',
  'fivem-dev': 'FiveM Development',
};

export const categoryIcons: Record<ServiceCategory, string> = {
  'discord': '💬',
  'website': '🌐',
  'graphic': '🎨',
  'video': '🎬',
  'fivem-scripts': '📜',
  'fivem-dev': '🛠️',
};
