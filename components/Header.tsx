
import React from 'react';
import { useApp } from '../AppContext';
import { 
  ShoppingCart, LayoutDashboard, User as UserIcon, 
  Menu as MenuIcon, Sun, Moon, Pizza, Home, Trophy, Settings, Lock
} from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { darkMode, toggleDarkMode, currentUser, cart, settings } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-600 bg-white flex items-center justify-center shadow-sm">
              <img 
                src={settings.logoUrl} 
                alt="Logo" 
                className="w-full h-full object-cover"
                onError={(e) => { 
                  (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=L&background=e11d48&color=fff'; 
                }}
              />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-l from-red-600 to-orange-500 bg-clip-text text-transparent hidden sm:block">
              {settings.restaurantName}
            </h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => setActiveTab('home')} className={`hover:text-red-600 transition-colors ${activeTab === 'home' ? 'text-red-600 font-bold underline decoration-2 underline-offset-8' : ''}`}>الرئيسية</button>
          <button onClick={() => setActiveTab('menu')} className={`hover:text-red-600 transition-colors ${activeTab === 'menu' ? 'text-red-600 font-bold underline decoration-2 underline-offset-8' : ''}`}>المنيو</button>
          <button onClick={() => setActiveTab('comps')} className={`hover:text-red-600 transition-colors ${activeTab === 'comps' ? 'text-red-600 font-bold underline decoration-2 underline-offset-8' : ''}`}>المسابقات</button>
          <button onClick={() => setActiveTab('profile')} className={`hover:text-red-600 transition-colors ${activeTab === 'profile' ? 'text-red-600 font-bold underline decoration-2 underline-offset-8' : ''}`}>حسابي</button>
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-xs font-bold border ${
              activeTab === 'admin' 
                ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30' 
                : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 border-orange-200 dark:border-orange-800 hover:bg-orange-100'
            }`}
          >
            <Lock size={14} />
            <span className="hidden sm:inline">لوحة الإدارة</span>
          </button>

          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 transition-all hover:scale-110"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setActiveTab('cart')}
              className={`p-2 rounded-full transition-all hover:scale-110 ${activeTab === 'cart' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300'}`}
            >
              <ShoppingCart size={20} />
            </button>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
