// 用户相关类型
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  dateOfBirth: string;
  isAgeVerified: boolean;
  createdAt: string;
}

// 香烟商品类型
export interface Cigarette {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: 'regular' | 'menthol' | 'light' | 'premium';
  origin: string;
  nicotineContent: string;
  tarContent: string;
  packageSize: number; // 包装数量
  isHot?: boolean;
  createdAt: string;
  updatedAt: string;
}

// 订单相关类型
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  tokensPaid: number;  // 支付的代币数量
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: string;
}

export interface OrderItem {
  cigaretteId: string;
  quantity: number;
  price: number;
}

export interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// 年龄验证类型
export interface AgeVerification {
  userId: string;
  documentType: 'passport' | 'driverLicense' | 'idCard';
  documentNumber: string;
  dateOfBirth: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  documentImage: string;
  submittedAt: string;
}

// 代币相关类型
export interface TokenBalance {
  userId: string;
  amount: number;
  lastUpdated: string;
}

export interface TokenTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'purchase';  // deposit: 充值, purchase: 消费
  paymentMethod?: 'alipay' | 'wechat';  // 充值时的支付方式
  status: 'pending' | 'completed' | 'failed';
  paymentProof?: string;  // 支付凭证图片URL
  createdAt: string;
}

// 支付相关类型
export interface PaymentCode {
  id: string;
  type: 'alipay' | 'wechat';
  amount: number;
  qrCode: string;
  expireTime: string;
  status: 'active' | 'used' | 'expired';
} 