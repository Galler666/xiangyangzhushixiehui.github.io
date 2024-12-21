import { Order, User, Cigarette } from './index';

export interface AdminState {
  orders: Order[];
  users: User[];
  statistics: {
    dailySales: number;
    totalOrders: number;
    totalUsers: number;
    lowStock: number;
  };
  loading: boolean;
  error: string | null;
}

export interface OrderStatistics {
  date: string;
  sales: number;
  orders: number;
}

export interface UserStatistics {
  date: string;
  newUsers: number;
  activeUsers: number;
}

export interface ProductForm extends Omit<Cigarette, 'id' | 'createdAt' | 'updatedAt'> {
  images: File[];
}

export interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
  lastLogin: string;
} 