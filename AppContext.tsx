
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, User, Order, AppSettings, Review } from './types';
import { INITIAL_MENU, APP_CONFIG } from './constants';

interface AppContextType {
  menu: MenuItem[];
  setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  reviews: Review[];
  addReview: (review: Review) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'l-angoletto-permanent-data-v3';

const loadInitialState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const saved = loadInitialState();

  const [menu, setMenu] = useState<MenuItem[]>(saved.menu || INITIAL_MENU);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(saved.currentUser || null);
  const [orders, setOrders] = useState<Order[]>(saved.orders || []);
  const [reviews, setReviews] = useState<Review[]>(saved.reviews || [
    { id: 'r1', userName: 'أحمد علي', rating: 5, comment: 'أفضل بيتزا في كفر بهيدة!', date: '2023-10-01' },
    { id: 'r2', userName: 'سارة محمد', rating: 4, comment: 'الكريب طعمه رائع والتوصيل سريع.', date: '2023-10-05' },
  ]);

  const [settings, setSettings] = useState<AppSettings>(saved.settings || {
    restaurantName: APP_CONFIG.restaurantName,
    adminName: APP_CONFIG.adminName,
    phone: APP_CONFIG.whatsappNumber,
    workingHours: APP_CONFIG.workingHours,
    deliveryFee: 15,
    crustStuffingPrice: 20,
    crustStuffingLabel: 'إضافة حشو أطراف؟',
    videoUrl: 'https://youtu.be/G-GO2-j71JY?si=gNsFzRGCuQ7bzFGW', 
    musicUrl: '',
    tickerTexts: ['عروض خاصة على البيتزا الكبيرة!', 'جرب كريب لانجولتو المميز الآن', 'خصم 10% لأول طلب من التطبيق'],
    isMusicPlaying: false,
    logoUrl: 'https://i.ibb.co/L5k6jYF/logo.jpg',
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    const data = { menu, orders, settings, reviews, currentUser };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [menu, orders, settings, reviews, currentUser]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newVal = !prev;
      localStorage.setItem('theme', newVal ? 'dark' : 'light');
      return newVal;
    });
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => 
        i.menuItemId === item.menuItemId && 
        i.size === item.size && 
        i.crustStuffing === item.crustStuffing
      );
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, qty: number) => {
    setCart(prev => prev.map(i => i.id === cartItemId ? { ...i, quantity: Math.max(1, qty) } : i));
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    if (currentUser) {
      const earnedPoints = Math.floor(order.total / 100);
      setCurrentUser(prev => prev ? { ...prev, points: prev.points + earnedPoints } : null);
    }
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addReview = (review: Review) => {
    setReviews(prev => [review, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      menu, setMenu, cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      currentUser, setCurrentUser, orders, addOrder, updateOrderStatus,
      settings, updateSettings, reviews, addReview, darkMode, toggleDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
