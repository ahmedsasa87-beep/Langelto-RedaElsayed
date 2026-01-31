
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  LayoutDashboard, Pizza, ShoppingBag, Users, Settings, 
  Printer, Check, Edit2, Trash2, Tag, Package, Image as ImageIcon, 
  DollarSign, TrendingUp, Copy, Eye, X
} from 'lucide-react';
import { CategoryType, MenuItem, Order } from '../types';

const AdminPanel: React.FC = () => {
  const { orders, menu, settings, updateOrderStatus, updateSettings, setMenu } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'menu' | 'users' | 'settings' | 'inventory' | 'print' | 'coupons' | 'reports'>('orders');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') setIsLoggedIn(true);
    else alert('كلمة مرور خاطئة');
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 no-print">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white shadow-xl">
             <Settings size={40} />
          </div>
          <h2 className="text-3xl font-black">مدخل الإدارة</h2>
          <p className="text-gray-500 font-bold">يرجى إدخال كلمة المرور للمتابعة</p>
        </div>
        <form onSubmit={handleLogin} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl w-full max-w-sm space-y-4 border border-gray-100 dark:border-slate-700">
          <input 
            type="password" 
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 focus:ring-2 focus:ring-red-600 font-bold text-center"
            placeholder="كلمة المرور"
          />
          <button className="w-full py-4 bg-red-600 text-white rounded-2xl font-black shadow-lg hover:bg-red-700 transition-colors">
            دخول لوحة التحكم
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 no-print">
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600 text-white rounded-2xl shadow-lg">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black">لوحة التحكم</h2>
            <p className="text-xs text-gray-500 font-bold">إدارة مطعم لانجولتو بالكامل</p>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide bg-gray-100 dark:bg-slate-800/50 p-2 rounded-2xl">
          <SubTab icon={<ShoppingBag size={18} />} label="الطلبات" active={activeSubTab === 'orders'} onClick={() => setActiveSubTab('orders')} />
          <SubTab icon={<TrendingUp size={18} />} label="التقارير" active={activeSubTab === 'reports'} onClick={() => setActiveSubTab('reports')} />
          <SubTab icon={<Printer size={18} />} label="الفواتير" active={activeSubTab === 'print'} onClick={() => setActiveSubTab('print')} />
          <SubTab icon={<Pizza size={18} />} label="المنيو" active={activeSubTab === 'menu'} onClick={() => setActiveSubTab('menu')} />
          <SubTab icon={<Tag size={18} />} label="الكوبونات" active={activeSubTab === 'coupons'} onClick={() => setActiveSubTab('coupons')} />
          <SubTab icon={<Package size={18} />} label="المخزون" active={activeSubTab === 'inventory'} onClick={() => setActiveSubTab('inventory')} />
          <SubTab icon={<Users size={18} />} label="العملاء" active={activeSubTab === 'users'} onClick={() => setActiveSubTab('users')} />
          <SubTab icon={<Settings size={18} />} label="الإعدادات" active={activeSubTab === 'settings'} onClick={() => setActiveSubTab('settings')} />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 min-h-[500px]">
        {activeSubTab === 'orders' && <OrdersManager orders={orders} updateStatus={updateOrderStatus} />}
        {activeSubTab === 'reports' && <ReportsManager orders={orders} />}
        {activeSubTab === 'print' && <InvoicePrinting orders={orders} />}
        {activeSubTab === 'menu' && <MenuManager menu={menu} setMenu={setMenu} />}
        {activeSubTab === 'inventory' && <InventoryManager />}
        {activeSubTab === 'settings' && <SettingsManager settings={settings} updateSettings={updateSettings} />}
        {activeSubTab === 'users' && <UsersManager />}
        {activeSubTab === 'coupons' && <CouponsManager />}
      </div>
    </div>
  );
};

// Shared SubTab component for the Admin Panel sidebar/top navigation
const SubTab: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${active ? 'bg-red-600 text-white shadow-md' : 'text-gray-500 hover:bg-white dark:hover:bg-slate-700'}`}
  >
    {icon} {label}
  </button>
);

const InvoicePrinting: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePrint = (order: Order) => {
    setSelectedOrder(order);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const openPreview = (order: Order) => {
    setSelectedOrder(order);
    setIsPreviewOpen(true);
  };

  const copyToClipboard = (order: Order) => {
    const text = `لانجولتو - طلب رقم ${order.id}\nالعميل: ${order.userName}\nالعنوان: ${order.userAddress}\n\nالأصناف:\n${order.items.map(i => `- ${i.name} x${i.quantity}`).join('\n')}\n\nالإجمالي: ${order.total} ج.م`;
    navigator.clipboard.writeText(text);
    alert('تم نسخ تفاصيل الطلب بنجاح!');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">نظام طباعة الفواتير</h3>

      {/* منطقة الفاتورة المخفية للطباعة فقط */}
      <div id="printable-receipt" className="print-only">
        {selectedOrder && (
          <div style={{ textAlign: 'center', fontFamily: 'monospace', direction: 'rtl', padding: '10px', background: 'white' }}>
            <h2 style={{ margin: '5px 0' }}>لانجولتو - L'Angoletto</h2>
            <p style={{ margin: '2px 0', fontSize: '12px' }}>إدارة رضا البغدي</p>
            <p>--------------------------------</p>
            <h3 style={{ margin: '10px 0' }}>رقم الطلب: {selectedOrder.id}</h3>
            <p style={{ fontSize: '11px' }}>التاريخ: {new Date(selectedOrder.createdAt).toLocaleString('ar-EG')}</p>
            <div style={{ textAlign: 'right', fontSize: '12px', marginTop: '10px' }}>
              <p>👤 العميل: {selectedOrder.userName}</p>
              <p>📞 الموبايل: {selectedOrder.userPhone}</p>
              <p>📍 العنوان: {selectedOrder.userAddress}</p>
            </div>
            <p>--------------------------------</p>
            <table style={{ width: '100%', textAlign: 'right', fontSize: '12px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid black', padding: '4px' }}>الصنف</th>
                  <th style={{ borderBottom: '1px solid black', padding: '4px' }}>كم</th>
                  <th style={{ borderBottom: '1px solid black', padding: '4px' }}>سعر</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((i, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: '4px' }}>{i.name}</td>
                    <td style={{ padding: '4px' }}>{i.quantity}</td>
                    <td style={{ padding: '4px' }}>{i.price * i.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>--------------------------------</p>
            <div style={{ textAlign: 'left', fontSize: '13px' }}>
              <p>المجموع: {selectedOrder.subtotal} ج.م</p>
              <p>التوصيل: {selectedOrder.deliveryFee} ج.م</p>
              <h2 style={{ border: '2px solid black', padding: '5px', marginTop: '10px', display: 'inline-block' }}>الإجمالي: {selectedOrder.total} ج.م</h2>
            </div>
            <p style={{ marginTop: '20px', fontSize: '10px' }}>شكراً لزيارتكم! نتمنى لكم وجبة شهية.</p>
            <p style={{ fontSize: '9px', opacity: 0.7 }}>Powered by Mahmoud Hassan</p>
          </div>
        )}
      </div>

      {/* مودال معاينة الفاتورة قبل الطباعة */}
      {isPreviewOpen && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 no-print">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-800">
              <h4 className="font-bold flex items-center gap-2"><Eye size={18} /> معاينة الفاتورة</h4>
              <button onClick={() => setIsPreviewOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[70vh] bg-white text-black">
              {/* نفس شكل الفاتورة المطبوعة للمعاينة */}
              <div className="text-center font-mono" dir="rtl">
                <h2 className="text-xl font-black">لانجولتو - L'Angoletto</h2>
                <p className="text-xs">إدارة رضا البغدي</p>
                <div className="my-4 border-t border-dashed border-gray-300" />
                <h3 className="text-lg font-bold">رقم الطلب: {selectedOrder.id}</h3>
                <p className="text-[10px] text-gray-500">{new Date(selectedOrder.createdAt).toLocaleString('ar-EG')}</p>
                
                <div className="text-right text-xs mt-4 space-y-1">
                  <p>👤 العميل: {selectedOrder.userName}</p>
                  <p>📞 الموبايل: {selectedOrder.userPhone}</p>
                  <p>📍 العنوان: {selectedOrder.userAddress}</p>
                </div>
                
                <div className="my-4 border-t border-dashed border-gray-300" />
                
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-2">الصنف</th>
                      <th className="py-2">كم</th>
                      <th className="py-2">سعر</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((i, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="py-2">{i.name}</td>
                        <td className="py-2">{i.quantity}</td>
                        <td className="py-2">{i.price * i.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="mt-4 text-left space-y-1 text-sm">
                  <p>المجموع: {selectedOrder.subtotal} ج.م</p>
                  <p>التوصيل: {selectedOrder.deliveryFee} ج.م</p>
                  <div className="mt-2 inline-block border-2 border-black px-4 py-2 font-black text-lg">
                    الإجمالي: {selectedOrder.total} ج.م
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-slate-800 border-t dark:border-slate-800 flex gap-3">
              <button 
                onClick={() => handlePrint(selectedOrder)}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 active:scale-95 transition-transform"
              >
                <Printer size={18} /> طباعة الفاتورة
              </button>
              <button 
                onClick={() => copyToClipboard(selectedOrder)}
                className="px-6 py-3 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 border dark:border-slate-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <Copy size={18} /> نسخ
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-print">
        {orders.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400 font-bold bg-gray-50 dark:bg-slate-900 rounded-[40px]">
            لا توجد طلبات في السجل حالياً
          </div>
        ) : orders.map(order => (
          <div key={order.id} className="p-6 bg-gray-50 dark:bg-slate-900 rounded-[40px] border border-gray-200 dark:border-slate-800 space-y-4 hover:border-red-600 transition-all group">
            <div className="flex justify-between font-black items-start">
              <div>
                <span className="text-red-600 block text-xs">رقم الطلب</span>
                <span className="text-xl">#{order.id.replace('#', '')}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-500 block text-[10px] font-bold">{new Date(order.createdAt).toLocaleDateString('ar-EG')}</span>
                <span className="text-lg text-green-600 font-black">{order.total} ج.م</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-xs space-y-1 border border-gray-100 dark:border-slate-700">
               <p className="font-bold flex items-center gap-2">👤 {order.userName}</p>
               <p className="text-gray-500">📍 {order.userAddress}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => openPreview(order)}
                className="flex-1 py-3 bg-white dark:bg-slate-800 text-blue-600 rounded-2xl text-xs font-black border-2 border-blue-50 dark:border-slate-700 flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                <Eye size={16} /> فتح ومعاينة
              </button>
              <button 
                onClick={() => handlePrint(order)}
                className="flex-1 py-3 bg-red-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 hover:bg-red-700 transition-all active:scale-95"
              >
                <Printer size={16} /> طباعة سريعة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReportsManager: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const totalSales = orders.filter(o => o.status === 'delivered').reduce((acc, o) => acc + o.total, 0);
  const pendingSales = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').reduce((acc, o) => acc + o.total, 0);
  const totalOrders = orders.length;

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold">تقارير المبيعات</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-3xl border border-green-100 dark:border-green-900/30">
          <div className="text-green-600 mb-2"><DollarSign size={32} /></div>
          <div className="text-2xl font-black">{totalSales} ج.م</div>
          <div className="text-xs text-green-700 dark:text-green-400 font-bold">مبيعات محصلة</div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-3xl border border-yellow-100 dark:border-yellow-900/30">
          <div className="text-yellow-600 mb-2"><TrendingUp size={32} /></div>
          <div className="text-2xl font-black">{pendingSales} ج.م</div>
          <div className="text-xs text-yellow-700 dark:text-yellow-400 font-bold">قيد التنفيذ</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/30">
          <div className="text-blue-600 mb-2"><ShoppingBag size={32} /></div>
          <div className="text-2xl font-black">{totalOrders}</div>
          <div className="text-xs text-blue-700 dark:text-blue-400 font-bold">عدد الطلبات</div>
        </div>
      </div>
    </div>
  );
};

const MenuManager: React.FC<{ menu: MenuItem[], setMenu: any }> = ({ menu, setMenu }) => {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState(CategoryType.PIZZA);
  const [newItemImg, setNewItemImg] = useState('');

  const addItem = () => {
    if (!newItemName) return;
    const newItem: MenuItem = {
      id: 'm_' + Math.random().toString(36).substr(2, 9),
      name: newItemName,
      category: newItemCat,
      priceS: 90, priceM: 110, priceL: 130,
      image: newItemImg || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80'
    };
    setMenu([...menu, newItem]);
    setNewItemName('');
    setNewItemImg('');
  };

  const handleEditSave = () => {
    if (!editingItem) return;
    setMenu(menu.map(m => m.id === editingItem.id ? editingItem : m));
    setEditingItem(null);
  };

  return (
    <div className="space-y-8">
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md no-print">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-[40px] p-8 space-y-6 shadow-2xl">
            <h3 className="text-2xl font-black">تعديل: {editingItem.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">سعر الصغير (S)</label>
                <input type="number" value={editingItem.priceS || 0} onChange={e => setEditingItem({...editingItem, priceS: Number(e.target.value)})} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">سعر الوسط (M)</label>
                <input type="number" value={editingItem.priceM || 0} onChange={e => setEditingItem({...editingItem, priceM: Number(e.target.value)})} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">سعر الكبير (L)</label>
                <input type="number" value={editingItem.priceL || 0} onChange={e => setEditingItem({...editingItem, priceL: Number(e.target.value)})} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">السعر الثابت</label>
                <input type="number" value={editingItem.priceDefault || 0} onChange={e => setEditingItem({...editingItem, priceDefault: Number(e.target.value)})} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">رابط الصورة</label>
              <input value={editingItem.image || ''} onChange={e => setEditingItem({...editingItem, image: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700" />
            </div>
            <div className="flex gap-4">
               <button onClick={handleEditSave} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-black shadow-lg shadow-red-600/20 active:scale-95 transition-all">حفظ التغييرات</button>
               <button onClick={() => setEditingItem(null)} className="flex-1 py-4 bg-gray-100 dark:bg-slate-700 rounded-2xl font-black">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-[40px] border border-red-100 dark:border-red-900/30">
        <h4 className="text-xl font-black mb-6">إضافة صنف جديد</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <input 
            value={newItemName} 
            onChange={e => setNewItemName(e.target.value)} 
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 font-bold text-sm border-none ring-1 ring-gray-100 dark:ring-slate-800" 
            placeholder="اسم الصنف"
          />
          <select value={newItemCat} onChange={e => setNewItemCat(e.target.value as any)} className="p-4 rounded-2xl bg-white dark:bg-slate-900 font-bold text-sm border-none ring-1 ring-gray-100 dark:ring-slate-800">
            {Object.values(CategoryType).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input 
            value={newItemImg} 
            onChange={e => setNewItemImg(e.target.value)} 
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 text-xs border-none ring-1 ring-gray-100 dark:ring-slate-800" 
            placeholder="رابط الصورة (Unsplash/ImgBB)"
          />
          <button onClick={addItem} className="py-4 bg-red-600 text-white rounded-2xl font-black shadow-lg shadow-red-600/20 transform active:scale-95 transition-all">إضافة للمنيو</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map(item => (
          <div key={item.id} className="p-4 bg-gray-50 dark:bg-slate-900 rounded-[40px] border border-gray-100 dark:border-slate-800 flex flex-col gap-4 group">
            <div className="relative h-48 rounded-[30px] overflow-hidden shadow-inner">
              <img src={item.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={item.name} />
              <div className="absolute top-3 right-3 flex gap-2">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="bg-white/90 p-2.5 rounded-full text-blue-600 shadow-xl hover:scale-110 transition-all"
                  title="تعديل تفصيلي"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => { if(confirm('هل أنت متأكد من الحذف؟')) setMenu(menu.filter(m => m.id !== item.id)) }}
                  className="bg-white/90 p-2.5 rounded-full text-red-600 shadow-xl hover:scale-110 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="px-2 space-y-1 pb-2">
              <h4 className="font-black text-lg">{item.name}</h4>
              <p className="text-xs text-gray-500 font-bold">{item.category}</p>
              <div className="flex flex-wrap gap-2 text-[10px] font-black text-red-600 mt-2">
                {item.priceS && <span className="bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg border border-red-100 dark:border-red-900/30">S: {item.priceS}</span>}
                {item.priceM && <span className="bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg border border-red-100 dark:border-red-900/30">M: {item.priceM}</span>}
                {item.priceL && <span className="bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg border border-red-100 dark:border-red-900/30">L: {item.priceL}</span>}
                {item.priceDefault && <span className="bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg border border-red-100 dark:border-red-900/30">السعر: {item.priceDefault}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrdersManager: React.FC<{ orders: Order[], updateStatus: (id: string, s: any) => void }> = ({ orders, updateStatus }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold">إدارة الطلبات الواردة</h3>
    <div className="overflow-x-auto rounded-[30px] border border-gray-100 dark:border-slate-800">
      <table className="w-full text-right text-sm">
        <thead className="bg-gray-50 dark:bg-slate-900 border-b dark:border-slate-800">
          <tr>
            <th className="p-4 font-black">رقم الطلب</th>
            <th className="p-4 font-black">العميل</th>
            <th className="p-4 font-black">المجموع</th>
            <th className="p-4 font-black text-center">الحالة</th>
            <th className="p-4 font-black text-center">إجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
          {orders.map(o => (
            <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors">
              <td className="p-4 font-bold">{o.id}</td>
              <td className="p-4">
                 <div className="font-bold">{o.userName}</div>
                 <div className="text-[10px] text-gray-500">{o.userPhone}</div>
              </td>
              <td className="p-4 font-black text-red-600">{o.total} ج.م</td>
              <td className="p-4 text-center">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${o.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  {o.status === 'pending' ? 'بانتظار التأكيد' : o.status === 'preparing' ? 'قيد التحضير' : 'تم التسليم'}
                </span>
              </td>
              <td className="p-4 flex justify-center gap-2">
                <button onClick={() => updateStatus(o.id, 'preparing')} className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm" title="تحضير"><Edit2 size={16} /></button>
                <button onClick={() => updateStatus(o.id, 'delivered')} className="p-2.5 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm" title="تم"><Check size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const InventoryManager = () => <div className="text-center py-20 text-gray-400 font-bold bg-gray-50 dark:bg-slate-900 rounded-[40px]">جاري تطوير نظام المخزون الرقمي...</div>;
const UsersManager = () => <div className="text-center py-20 text-gray-400 font-bold bg-gray-50 dark:bg-slate-900 rounded-[40px]">جاري تطوير سجل العملاء وتحليل البيانات...</div>;
const CouponsManager = () => <div className="text-center py-20 text-gray-400 font-bold bg-gray-50 dark:bg-slate-900 rounded-[40px]">جاري تطوير نظام الكوبونات والخصومات...</div>;

const SettingsManager: React.FC<{ settings: any, updateSettings: any }> = ({ settings, updateSettings }) => (
  <div className="grid md:grid-cols-2 gap-10">
    <div className="space-y-6">
      <h4 className="font-black border-r-4 border-red-600 pr-3">الإعدادات التشغيلية</h4>
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500">رسوم التوصيل (ج.م)</label>
          <input type="number" value={settings.deliveryFee} onChange={e => updateSettings({ deliveryFee: Number(e.target.value) })} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 ring-1 ring-gray-100 dark:ring-slate-800 border-none font-black" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500">رقم واتساب المطعم (للاستقبال)</label>
          <input value={settings.phone} onChange={e => updateSettings({ phone: e.target.value })} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 ring-1 ring-gray-100 dark:ring-slate-800 border-none font-bold" />
        </div>
      </div>
    </div>
    <div className="space-y-6">
      <h4 className="font-black border-r-4 border-blue-600 pr-3">المحتوى التفاعلي</h4>
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500">رابط الفيديو في الصفحة الرئيسية</label>
        <input value={settings.videoUrl} onChange={e => updateSettings({ videoUrl: e.target.value })} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 ring-1 ring-gray-100 dark:ring-slate-800 border-none font-medium" placeholder="https://youtu.be/..." />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500">شريط العروض (افصل بين العروض بفاصلة)</label>
        <textarea value={settings.tickerTexts.join(', ')} onChange={e => updateSettings({ tickerTexts: e.target.value.split(',').map(s => s.trim()) })} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 h-24 ring-1 ring-gray-100 dark:ring-slate-800 border-none font-medium" />
      </div>
    </div>
  </div>
);

export default AdminPanel;
