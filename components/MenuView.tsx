
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { MenuItem, CategoryType } from '../types';
import { Plus, Check, Info, ChevronDown } from 'lucide-react';

const MenuView: React.FC = () => {
  const { menu, addToCart, settings } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>(CategoryType.PIZZA);
  const [addingItem, setAddingItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'default'>('M');
  const [withCrust, setWithCrust] = useState(false);

  const categories = Object.values(CategoryType);
  const filteredMenu = menu.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItem) => {
    // If it's pizza or crepe, we need a size modal
    if (item.category === CategoryType.PIZZA || item.category === CategoryType.CREPE) {
      setAddingItem(item);
      setSelectedSize(item.category === CategoryType.PIZZA ? 'M' : 'S');
      setWithCrust(false);
      return;
    }

    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      menuItemId: item.id,
      name: item.name,
      size: 'default',
      price: item.priceDefault || 0,
      quantity: 1,
      crustStuffing: false,
      crustStuffingPrice: 0
    });
  };

  const confirmAdd = () => {
    if (!addingItem) return;
    
    let price = 0;
    if (selectedSize === 'S') price = addingItem.priceS || 0;
    else if (selectedSize === 'M') price = addingItem.priceM || 0;
    else if (selectedSize === 'L') price = addingItem.priceL || 0;

    const finalPrice = withCrust ? price + settings.crustStuffingPrice : price;

    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      menuItemId: addingItem.id,
      name: `${addingItem.name} (${selectedSize === 'S' ? 'صغير' : selectedSize === 'M' ? 'وسط' : 'كبير'})`,
      size: selectedSize,
      price: finalPrice,
      quantity: 1,
      crustStuffing: withCrust,
      crustStuffingPrice: withCrust ? settings.crustStuffingPrice : 0
    });
    setAddingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sticky top-16 z-30 bg-gray-50 dark:bg-slate-900 py-4 -mx-4 px-4 border-b border-gray-200 dark:border-slate-800">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-bold transition-all ${
              selectedCategory === cat 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map(item => (
          <div key={item.id} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 group hover:shadow-md transition-shadow">
            <div className="relative h-48 bg-gray-200 dark:bg-slate-700">
              <img 
                src={item.image || `https://picsum.photos/seed/${item.id}/400/300`} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-1 rounded-full font-black text-red-600 shadow-lg">
                {item.priceDefault || item.priceS || item.priceM} ج.م
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2">
                {item.ingredients?.join(' - ') || 'أشهى المكونات الطازجة المحضرة بكل حب لإرضاء ذوقكم.'}
              </p>
              <button 
                onClick={() => handleAddToCart(item)}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Plus size={20} />
                إضافة للسلة
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Item Options Modal */}
      {addingItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl p-8 space-y-8 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-black">{addingItem.name}</h3>
              <button onClick={() => setAddingItem(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
                <Plus className="rotate-45" />
              </button>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-500">اختر الحجم:</label>
              <div className="grid grid-cols-3 gap-3">
                {addingItem.priceS && (
                  <button 
                    onClick={() => setSelectedSize('S')}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${selectedSize === 'S' ? 'border-red-600 bg-red-50 dark:bg-red-900/20' : 'border-gray-100 dark:border-slate-700'}`}
                  >
                    <span className="font-bold">صغير</span>
                    <span className="text-sm">{addingItem.priceS} ج.م</span>
                  </button>
                )}
                {addingItem.priceM && (
                  <button 
                    onClick={() => setSelectedSize('M')}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${selectedSize === 'M' ? 'border-red-600 bg-red-50 dark:bg-red-900/20' : 'border-gray-100 dark:border-slate-700'}`}
                  >
                    <span className="font-bold">وسط</span>
                    <span className="text-sm">{addingItem.priceM} ج.م</span>
                  </button>
                )}
                {addingItem.priceL && (
                  <button 
                    onClick={() => setSelectedSize('L')}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${selectedSize === 'L' ? 'border-red-600 bg-red-50 dark:bg-red-900/20' : 'border-gray-100 dark:border-slate-700'}`}
                  >
                    <span className="font-bold">كبير</span>
                    <span className="text-sm">{addingItem.priceL} ج.م</span>
                  </button>
                )}
              </div>
            </div>

            {addingItem.category === CategoryType.PIZZA && (
              <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold">{settings.crustStuffingLabel}</h4>
                  <p className="text-xs text-gray-500">تكلفة إضافية {settings.crustStuffingPrice} ج.م</p>
                </div>
                <button 
                  onClick={() => setWithCrust(!withCrust)}
                  className={`w-12 h-6 rounded-full transition-all relative ${withCrust ? 'bg-green-500' : 'bg-gray-300 dark:bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${withCrust ? 'right-7' : 'right-1'}`} />
                </button>
              </div>
            )}

            <button 
              onClick={confirmAdd}
              className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-600/30"
            >
              إضافة ({withCrust ? (
                (selectedSize === 'S' ? addingItem.priceS! : selectedSize === 'M' ? addingItem.priceM! : addingItem.priceL!) + settings.crustStuffingPrice
              ) : (
                selectedSize === 'S' ? addingItem.priceS! : selectedSize === 'M' ? addingItem.priceM! : addingItem.priceL!
              )} ج.م)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuView;
