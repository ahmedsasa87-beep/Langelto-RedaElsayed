
export enum CategoryType {
  PIZZA = 'بيتزا',
  CREPE = 'كريب',
  SANDWICH = 'سندوتشات',
  OFFERS = 'عروض',
  DRINKS = 'مشروبات'
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  priceS?: number; // For Pizza Small / Crepe Triangle
  priceM?: number; // For Pizza Medium / Crepe Roll
  priceL?: number; // For Pizza Large
  priceDefault?: number; // For items with single price
  ingredients?: string[];
  image?: string;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  size: 'S' | 'M' | 'L' | 'default';
  price: number;
  quantity: number;
  crustStuffing: boolean;
  crustStuffingPrice: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  address: string;
  points: number;
  isAdmin: boolean;
  isBlocked: boolean;
  registeredAt: string;
  deviceId: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  receiptImage?: string;
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface AppSettings {
  restaurantName: string;
  adminName: string;
  phone: string;
  workingHours: string;
  deliveryFee: number;
  crustStuffingPrice: number;
  crustStuffingLabel: string;
  videoUrl: string;
  musicUrl: string;
  tickerTexts: string[];
  isMusicPlaying: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Competition {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  rewardType: 'points' | 'order';
  rewardValue: number | string;
  isActive: boolean;
}
