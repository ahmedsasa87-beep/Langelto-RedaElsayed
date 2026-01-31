
import React, { useState } from 'react';
import { AppProvider, useApp } from './AppContext';
import { 
  Home, ShoppingCart, User as UserIcon, Settings, Search, 
  Menu as MenuIcon, X, Pizza, Coffee, Gift, Trophy, 
  Star, MessageCircle, Phone, MapPin, LogOut, Sun, Moon,
  Trash2, Plus, Minus, CheckCircle, Clock, Send, Printer, LayoutDashboard
} from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import CartView from './components/CartView';
import ProfileView from './components/ProfileView';
import AdminPanel from './components/AdminPanel';
import LoginOverlay from './components/LoginOverlay';
import Ticker from './components/Ticker';
import OrderTracking from './components/OrderTracking';
import CompetitionsView from './components/CompetitionsView';

const AppContent: React.FC = () => {
  const { currentUser, darkMode, toggleDarkMode, cart, orders } = useApp();
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'cart' | 'profile' | 'admin' | 'tracking' | 'comps'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // If user not logged in, show mandatory login except for admin access check
  const showLogin = !currentUser && activeTab !== 'admin';

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} transition-colors`}>
      <Ticker />
      
      <Header 
        onOpenMenu={() => setIsMenuOpen(true)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="pb-24 pt-4 px-4 max-w-7xl mx-auto">
        {activeTab === 'home' && <HomeView onOrderNow={() => setActiveTab('menu')} onOpenComps={() => setActiveTab('comps')} />}
        {activeTab === 'menu' && <MenuView />}
        {activeTab === 'cart' && <CartView onBackToMenu={() => setActiveTab('menu')} />}
        {activeTab === 'profile' && <ProfileView onTrack={() => setActiveTab('tracking')} />}
        {activeTab === 'admin' && <AdminPanel />}
        {activeTab === 'tracking' && <OrderTracking />}
        {activeTab === 'comps' && <CompetitionsView />}
      </main>

      {/* Navigation Mobile Dock */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-40 md:hidden">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-red-600' : 'text-gray-500'}`}>
          <Home size={24} />
          <span className="text-xs mt-1">الرئيسية</span>
        </button>
        <button onClick={() => setActiveTab('menu')} className={`flex flex-col items-center ${activeTab === 'menu' ? 'text-red-600' : 'text-gray-500'}`}>
          <Pizza size={24} />
          <span className="text-xs mt-1">المنيو</span>
        </button>
        <div className="relative">
          <button onClick={() => setActiveTab('cart')} className={`flex flex-col items-center ${activeTab === 'cart' ? 'text-red-600' : 'text-gray-500'}`}>
            <ShoppingCart size={24} />
            <span className="text-xs mt-1">السلة</span>
          </button>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
              {cart.length}
            </span>
          )}
        </div>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-red-600' : 'text-gray-500'}`}>
          <UserIcon size={24} />
          <span className="text-xs mt-1">حسابي</span>
        </button>
      </nav>

      <Footer />

      {/* Login Modal Overlay */}
      {showLogin && <LoginOverlay />}

      {/* Audio Element for Music */}
      <audio id="bg-music" loop />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
