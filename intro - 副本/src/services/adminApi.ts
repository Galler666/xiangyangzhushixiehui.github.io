import axios from 'axios';
import { ProductForm, AdminUser } from '../types/admin';
import { Order, User, Cigarette } from '../types';

const api = axios.create({
  baseURL: '/api/admin',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const adminApi = {
  // 商品管理
  getProducts: () => api.get<Cigarette[]>('/products'),
  createProduct: (data: ProductForm) => api.post<Cigarette>('/products', data),
  updateProduct: (id: string, data: Partial<ProductForm>) => 
    api.put<Cigarette>(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),

  // 订单管理
  getOrders: () => api.get<Order[]>('/orders'),
  updateOrderStatus: (id: string, status: Order['status']) =>
    api.put(`/orders/${id}/status`, { status }),

  // 用户管理
  getUsers: () => api.get<User[]>('/users'),
  updateUserStatus: (id: string, status: 'active' | 'blocked') =>
    api.put(`/users/${id}/status`, { status }),

  // 统计数据
  getDashboardStats: () => api.get('/stats/dashboard'),
  getSalesStats: (period: 'day' | 'week' | 'month') =>
    api.get(`/stats/sales?period=${period}`),
  getUserStats: (period: 'day' | 'week' | 'month') =>
    api.get(`/stats/users?period=${period}`),
}; 