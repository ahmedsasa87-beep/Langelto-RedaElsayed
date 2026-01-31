
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MenuItem, CartItem, User, Order, AppSettings, Review, CategoryType } from './types';
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

const STORAGE_KEY = 'l-angoletto-data-v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([
    { id: 'r1', userName: 'أحمد علي', rating: 5, comment: 'أفضل بيتزا في كفر بهيدة!', date: '2023-10-01' },
    { id: 'r2', userName: 'سارة محمد', rating: 4, comment: 'الكريب طعمه رائع والتوصيل سريع.', date: '2023-10-05' },
  ]);

  const [settings, setSettings] = useState<AppSettings>({
    restaurantName: APP_CONFIG.restaurantName,
    adminName: APP_CONFIG.adminName,
    phone: APP_CONFIG.whatsappNumber,
    workingHours: APP_CONFIG.workingHours,
    deliveryFee: 10,
    crustStuffingPrice: 20,
    crustStuffingLabel: 'إضافة حشو أطراف؟',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    musicUrl: '',
    tickerTexts: ['عروض خاصة على البيتزا الكبيرة!', 'جرب كريب لانجولتو المميز الآن', 'خصم 10% لأول طلب من التطبيق'],
    isMusicPlaying: false,
  });

  // Persistence
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.menu) setMenu(parsed.menu);
      if (parsed.orders) setOrders(parsed.orders);
      if (parsed.settings) setSettings(parsed.settings);
      if (parsed.reviews) setReviews(parsed.reviews);
      if (parsed.currentUser) setCurrentUser(parsed.currentUser);
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const dataToSave = { menu, orders, settings, reviews, currentUser };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [menu, orders, settings, reviews, currentUser]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.menuItemId === item.menuItemId && i.size === item.size && i.crustStuffing === item.crustStuffing);
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
    // Reward points
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
