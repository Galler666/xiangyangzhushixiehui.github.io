import axios from 'axios';
import { Cigarette } from '../types';
import { ProductForm } from '../types/admin';

const api = axios.create({
  baseURL: '/api/cigarettes',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const cigaretteApi = {
  // 获取所有商品
  getAllCigarettes: () => 
    api.get<Cigarette[]>(''),

  // 创建商品
  createCigarette: (data: FormData) => 
    api.post<Cigarette>('', data),

  // 更新商品
  updateCigarette: (id: string, data: FormData) => 
    api.put<Cigarette>(`/${id}`, data),

  // 删除商品
  deleteCigarette: (id: string) => 
    api.delete(`/${id}`),

  // 更新商品库存
  updateStock: (id: string, quantity: number) =>
    api.patch(`/${id}/stock`, { quantity }),
}; 