
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Trash2, Plus, Minus, Send, MapPin, Phone, CreditCard, ChevronRight, ShoppingCart } from 'lucide-react';
import { Order } from '../types';

interface CartViewProps {
  onBackToMenu: () => void;
}

const CartView: React.FC<CartViewProps> = ({ onBackToMenu }) => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, settings, currentUser, addOrder } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('نقدي عند الاستلام');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [isOrdering, setIsOrdering] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + settings.deliveryFee;

  const handleCheckout = () => {
    if (!currentUser) return;
    setIsOrdering(true);

    const orderId = '#' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: orderId,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      userAddress: address,
      items: [...cart],
      subtotal,
      deliveryFee: settings.deliveryFee,
      total,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    addOrder(newOrder);

    // بناء نص الرسالة بشكل منظم
    const itemsText = cart.map(i => {
      let detail = `• ${i.name} العدد(${i.quantity})`;
      if (i.crustStuffing) detail += ` [محشو الأطراف]`;
      detail += ` السعر: ${i.price * i.quantity} ج.م`;
      return detail;
    }).join('\n');

    const fullMessage = `*📦 طلب جديد من تطبيق لانجولتو*\n` +
      `--------------------------\n` +
      `*🔖 رقم الطلب:* ${orderId}\n` +
      `*👤 العميل:* ${currentUser.name}\n` +
      `*📞 الموبايل:* ${currentUser.phone}\n` +
      `*📍 العنوان:* ${address}\n` +
      `--------------------------\n` +
      `*🍕 الأصناف:*\n${itemsText}\n` +
      `--------------------------\n` +
      `*💰 المجموع:* ${subtotal} ج.م\n` +
      `*🚚 التوصيل:* ${settings.deliveryFee} ج.م\n` +
      `*💳 الإجمالي:* ${total} ج.م\n` +
      `*💵 الدفع:* ${paymentMethod}\n` +
      `--------------------------\n` +
      `_تم الطلب عبر التطبيق الرقمي_`;

    // تشفير الرسالة بالكامل لحل مشكلة الرموز مثل # و المسافات
    const encodedMessage = encodeURIComponent(fullMessage);
    
    // فتح الواتساب بالرسالة المشفرة
    window.open(`https://wa.me/20${settings.phone}?text=${encodedMessage}`, '_blank');
    
    setTimeout(() => {
      clearCart();
      setIsOrdering(false);
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400">
          <ShoppingCart size={48} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">سلتك فارغة</h2>
          <p className="text-gray-500">ابحث عن وجباتك المفضلة وأضفها للسلة</p>
        </div>
        <button 
          onClick={onBackToMenu}
          className="px-8 py-3 bg-red-600 text-white rounded-full font-bold shadow-lg transform active:scale-95 transition-all"
        >
          اذهب للمنيو
        </button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 pb-10">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          سلة المشتريات
          <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">{cart.length} أصناف</span>
        </h2>

        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
              <img 
                src={item.menuItemId.startsWith('m') ? `https://picsum.photos/seed/${item.menuItemId}/100/100` : `https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop`} 
                alt={item.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <h4 className="font-bold">{item.name}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  {item.crustStuffing && <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">مع حشو أطراف</span>}
                  <span>{item.price} ج.م</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-900 px-3 py-1 rounded-full border border-gray-200 dark:border-slate-700">
                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="text-red-600"><Minus size={16} /></button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="text-red-600"><Plus size={16} /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 space-y-6 sticky top-20">
          <h3 className="text-lg font-bold border-b pb-4 dark:border-slate-700">تفاصيل الدفع والتوصيل</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2"><MapPin size={16} className="text-red-600" /> عنوان التوصيل</label>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none focus:ring-2 ring-red-600 text-sm h-24"
                placeholder="أدخل عنوانك بالتفصيل لسهولة الوصول إليك"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2"><CreditCard size={16} className="text-red-600" /> طريقة الدفع</label>
              <select 
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none focus:ring-2 ring-red-600 text-sm font-bold"
              >
                <option>نقدي عند الاستلام</option>
                <option>فودافون كاش</option>
                <option>إنستا باي</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t dark:border-slate-700">
            <div className="flex justify-between text-gray-500">
              <span>المجموع الفرعي:</span>
              <span className="font-bold">{subtotal} ج.م</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>رسوم التوصيل:</span>
              <span className="font-bold">{settings.deliveryFee} ج.م</span>
            </div>
            <div className="flex justify-between text-xl font-black text-red-600 mt-2">
              <span>الإجمالي:</span>
              <span>{total} ج.م</span>
            </div>
          </div>

          <button 
            disabled={isOrdering}
            onClick={handleCheckout}
            className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-600/30 flex items-center justify-center gap-3 disabled:opacity-50 transform active:scale-95 transition-all"
          >
            <Send size={20} />
            {isOrdering ? 'جاري التحويل...' : 'تأكيد الطلب عبر واتساب'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;
