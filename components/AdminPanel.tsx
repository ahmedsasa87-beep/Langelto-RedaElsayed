
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  BarChart, LayoutDashboard, Pizza, ShoppingBag, Users, Settings, 
  Plus, Search, Printer, Check, X, Edit2, Trash2, Tag, Trophy, FileText, Package, History, Image as ImageIcon, DollarSign, TrendingUp
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white shadow-xl">
             <Settings size={40} />
          </div>
          <h2 className="text-3xl font-black">مدخل الإدارة</h2>
          <p className="text-gray-500">يرجى إدخال كلمة المرور للمتابعة</p>
        </div>
        <form onSubmit={handleLogin} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl w-full max-w-sm space-y-4 border border-gray-100 dark:border-slate-700">
          <input 
            type="password" 
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 focus:ring-2 focus:ring-red-600"
            placeholder="كلمة المرور (admin)"
          />
          <button className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-600/20 active:scale-95 transition-transform">
            دخول لوحة التحكم
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600 text-white rounded-2xl shadow-lg">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black">لوحة التحكم</h2>
            <p className="text-xs text-gray-500">إدارة مطعم لانجولتو بالكامل</p>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide bg-gray-100 dark:bg-slate-800/50 p-2 rounded-2xl">
          <SubTab icon={<ShoppingBag size={18} />} label="الطلبات" active={activeSubTab === 'orders'} onClick={() => setActiveSubTab('orders')} />
          <SubTab icon={<TrendingUp size={18} />} label="التقارير" active={activeSubTab === 'reports'} onClick={() => setActiveSubTab('reports')} />
          <SubTab icon={<Printer size={18} />} label="طباعة الفواتير" active={activeSubTab === 'print'} onClick={() => setActiveSubTab('print')} />
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

const SubTab: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${active ? 'bg-red-600 text-white shadow-md' : 'text-gray-500 hover:bg-white dark:hover:bg-slate-700'}`}
  >
    {icon} {label}
  </button>
);

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
          <div className="text-xs text-green-700 dark:text-green-400">إجمالي المبيعات المحصلة</div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-3xl border border-yellow-100 dark:border-yellow-900/30">
          <div className="text-yellow-600 mb-2"><TrendingUp size={32} /></div>
          <div className="text-2xl font-black">{pendingSales} ج.م</div>
          <div className="text-xs text-yellow-700 dark:text-yellow-400">مبيعات قيد التنفيذ</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/30">
          <div className="text-blue-600 mb-2"><ShoppingBag size={32} /></div>
          <div className="text-2xl font-black">{totalOrders}</div>
          <div className="text-xs text-blue-700 dark:text-blue-400">عدد الطلبات الإجمالي</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-bold">أكثر الأصناف طلباً</h4>
        <div className="grid gap-2">
           {[1,2,3].map(i => (
             <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-slate-900 p-3 rounded-2xl">
               <span className="text-sm font-bold">صنف مميز #{i}</span>
               <span className="text-xs text-gray-400">100 طلب</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const CouponsManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">إدارة الكوبونات</h3>
        <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-600/20">
          <Plus size={16} /> إضافة كوبون جديد
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['SAVE20', 'LANGOLETTO10'].map(code => (
          <div key={code} className="p-6 bg-gray-50 dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-700 flex flex-col items-center gap-2">
            <div className="bg-white dark:bg-slate-800 px-4 py-1 rounded-full text-lg font-black tracking-widest text-red-600 shadow-sm">{code}</div>
            <div className="text-xs text-gray-500">خصم 20% | صالح حتى 2024-12-30</div>
            <div className="flex gap-2 mt-4">
              <button className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Edit2 size={16} /></button>
              <button className="p-2 bg-red-50 text-red-600 rounded-xl"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrdersManager: React.FC<{ orders: Order[], updateStatus: (id: string, s: any) => void }> = ({ orders, updateStatus }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold">إدارة الطلبات الحالية</h3>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold border border-blue-200" onClick={() => window.print()}>
          <FileText size={16} /> طباعة التقرير اليومي
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-right text-sm">
        <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700">
          <tr>
            <th className="p-4 rounded-r-2xl">رقم الطلب</th>
            <th className="p-4">العميل</th>
            <th className="p-4">العنوان</th>
            <th className="p-4">الإجمالي</th>
            <th className="p-4">الحالة</th>
            <th className="p-4 rounded-l-2xl text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
          {orders.length === 0 ? (
            <tr><td colSpan={6} className="text-center py-20 text-gray-400 font-bold">لا توجد طلبات لعرضها حالياً</td></tr>
          ) : orders.map(o => (
            <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors group">
              <td className="p-4 font-bold">{o.id}</td>
              <td className="p-4">
                <div className="font-bold">{o.userName}</div>
                <div className="text-[10px] text-gray-400">{o.userPhone}</div>
              </td>
              <td className="p-4 max-w-[200px] truncate text-xs text-gray-500">{o.userAddress}</td>
              <td className="p-4 font-bold text-red-600">{o.total} ج.م</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  o.status === 'delivered' ? 'bg-green-100 text-green-600' : 
                  o.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {o.status === 'pending' ? 'قيد الانتظار' : o.status === 'preparing' ? 'جاري التحضير' : 'تم التوصيل'}
                </span>
              </td>
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button onClick={() => updateStatus(o.id, 'preparing')} className="p-2 bg-blue-50 text-blue-600 rounded-lg" title="جاري التحضير"><Edit2 size={16} /></button>
                  <button onClick={() => updateStatus(o.id, 'delivered')} className="p-2 bg-green-50 text-green-600 rounded-lg" title="تم التوصيل"><Check size={16} /></button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity"><Printer size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const InvoicePrinting: React.FC<{ orders: Order[] }> = ({ orders }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold">طباعة الفواتير</h3>
      <div className="text-xs text-gray-500 italic">يمكنك طباعة الفاتورة أو تصديرها كـ PDF/JPG</div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.length === 0 ? <p className="col-span-full text-center py-20 text-gray-400">لا توجد طلبات للطباعة</p> : orders.map(order => (
        <div key={order.id} className="bg-gray-50 dark:bg-slate-900 p-6 rounded-3xl border-2 border-dashed border-gray-300 dark:border-slate-700 space-y-4 shadow-sm">
          <div className="flex justify-between items-start border-b border-dashed border-gray-400 pb-2">
            <div className="text-xs font-black text-red-600 uppercase">لانجولتو L'Angoletto</div>
            <div className="text-[10px] text-gray-500">{new Date(order.createdAt).toLocaleString('ar-EG')}</div>
          </div>
          <div className="text-center space-y-1">
            <h4 className="font-black text-xl">طلب {order.id}</h4>
            <p className="text-sm font-bold">{order.userName}</p>
            <p className="text-[10px] text-gray-400">{order.userPhone}</p>
          </div>
          <div className="space-y-2 py-4 border-b border-dashed border-gray-300">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs font-medium">
                <span>{item.name} x{item.quantity}</span>
                <span>{item.price * item.quantity} ج.م</span>
              </div>
            ))}
          </div>
          <div className="space-y-1 text-xs text-gray-500">
             <div className="flex justify-between"><span>المجموع:</span><span>{order.subtotal} ج.م</span></div>
             <div className="flex justify-between"><span>التوصيل:</span><span>{order.deliveryFee} ج.م</span></div>
          </div>
          <div className="pt-2 font-black text-lg flex justify-between text-red-600">
            <span>الإجمالي</span>
            <span>{order.total} ج.م</span>
          </div>
          <div className="flex gap-2 pt-4 no-print">
            <button onClick={() => window.print()} className="flex-1 py-3 bg-white dark:bg-slate-800 text-red-600 rounded-xl text-xs font-black border-2 border-red-600 flex items-center justify-center gap-1 hover:bg-red-50">
              <Printer size={16} /> طباعة
            </button>
            <button className="flex-1 py-3 bg-red-600 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1 shadow-lg shadow-red-600/20 active:scale-95 transition-transform">
              <ImageIcon size={16} /> صورة
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MenuManager: React.FC<{ menu: MenuItem[], setMenu: any }> = ({ menu, setMenu }) => {
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

  const updateItemImage = (id: string, newUrl: string) => {
    setMenu(menu.map(m => m.id === id ? { ...m, image: newUrl } : m));
  };

  return (
    <div className="space-y-8">
      <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-[40px] border border-red-100 dark:border-red-900/30 shadow-inner">
        <h4 className="text-xl font-black mb-6 flex items-center gap-2"><Plus size={24} className="text-red-600" /> إضافة صنف جديد</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-wider">اسم الصنف</label>
            <input 
              value={newItemName} 
              onChange={e => setNewItemName(e.target.value)} 
              className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 font-bold focus:ring-2 focus:ring-red-600" 
              placeholder="مثال: بيتزا سلامي"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-wider">القسم</label>
            <select value={newItemCat} onChange={e => setNewItemCat(e.target.value as any)} className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 font-bold focus:ring-2 focus:ring-red-600">
              {Object.values(CategoryType).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-wider">رابط الصورة (URL)</label>
            <div className="relative">
               <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
               <input 
                value={newItemImg} 
                onChange={e => setNewItemImg(e.target.value)} 
                className="w-full p-4 pl-12 rounded-2xl bg-white dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 text-xs focus:ring-2 focus:ring-red-600" 
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="flex items-end">
            <button onClick={addItem} className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-600/30 active:scale-95 transition-transform flex items-center justify-center gap-2">
              <Plus size={20} /> حفظ الصنف
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map(item => (
          <div key={item.id} className="p-4 bg-gray-50 dark:bg-slate-900 rounded-[30px] border border-gray-100 dark:border-slate-700 group hover:border-red-600/50 transition-all">
            <div className="flex gap-4 items-center">
               <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 flex-shrink-0 relative group/img">
                  <img src={item.image} className="w-full h-full object-cover transition-transform group-hover/img:scale-110" alt={item.name} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                     <button className="text-white bg-red-600 p-2 rounded-full shadow-lg" onClick={() => {
                       const url = prompt('أدخل رابط الصورة الجديد:', item.image);
                       if(url) updateItemImage(item.id, url);
                     }}><ImageIcon size={16} /></button>
                  </div>
               </div>
               <div className="flex-1 space-y-1">
                <h4 className="font-black text-sm">{item.name}</h4>
                <p className="text-[10px] text-gray-500 font-bold bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-full inline-block">{item.category}</p>
                <div className="text-[10px] text-red-600 font-black">{item.priceS || item.priceDefault} ج.م</div>
              </div>
              <div className="flex flex-col gap-1">
                <button className="text-blue-600 p-2 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={16} /></button>
                <button onClick={() => setMenu(menu.filter(m => m.id !== item.id))} className="text-red-600 p-2 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InventoryManager: React.FC = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold">سجل المشتريات والمخزون</h3>
      <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
        <Plus size={16} /> إضافة مشتريات
      </button>
    </div>
    <div className="overflow-x-auto rounded-3xl border border-gray-100 dark:border-slate-700">
      <table className="w-full text-right text-sm">
        <thead className="bg-gray-50 dark:bg-slate-900 border-b">
          <tr>
            <th className="p-4 font-black uppercase tracking-wider">الصنف</th>
            <th className="p-4 font-black uppercase tracking-wider">الكمية</th>
            <th className="p-4 font-black uppercase tracking-wider">تاريخ الشراء</th>
            <th className="p-4 font-black uppercase tracking-wider">تاريخ الانتهاء</th>
            <th className="p-4 font-black uppercase tracking-wider">الإجراء</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
          {[
            { name: 'دقيق فاخر', qty: '50 كجم', date: '2023-10-20', expiry: '2024-04-20' },
            { name: 'جبنة موتزاريلا', qty: '20 كجم', date: '2023-10-22', expiry: '2023-12-22' },
            { name: 'صوص طماطم', qty: '10 جالون', date: '2023-10-21', expiry: '2024-01-21' },
          ].map((item, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors">
              <td className="p-4 font-bold">{item.name}</td>
              <td className="p-4 font-medium">{item.qty}</td>
              <td className="p-4 text-xs text-gray-500">{item.date}</td>
              <td className="p-4">
                <span className="text-xs text-orange-600 font-black px-2 py-1 bg-orange-50 dark:bg-orange-900/20 rounded-full">{item.expiry}</span>
              </td>
              <td className="p-4"><Trash2 size={16} className="text-gray-300 hover:text-red-600 cursor-pointer transition-colors" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const UsersManager: React.FC = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold">إدارة العملاء والولاء</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { name: 'محمود حسن', phone: '01012345678', points: 120, orders: 15 },
        { name: 'أحمد علي', phone: '01298765432', points: 45, orders: 4 },
        { name: 'سارة محمد', phone: '01122334455', points: 80, orders: 9 },
      ].map((user, i) => (
        <div key={i} className="p-6 bg-gray-50 dark:bg-slate-900 rounded-[30px] flex items-center justify-between border border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 text-white flex items-center justify-center font-black text-xl shadow-lg">{user.name[0]}</div>
            <div>
              <div className="font-black text-base">{user.name}</div>
              <div className="text-xs text-gray-400 font-bold">{user.phone}</div>
            </div>
          </div>
          <div className="text-left space-y-1">
            <div className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-black border border-orange-200">{user.points} نقطة</div>
            <div className="text-[10px] text-gray-400 font-bold">{user.orders} طلب سابق</div>
          </div>
          <div className="flex gap-2 mr-4">
            <button className="text-blue-600 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700" title="سجل الطلبات"><History size={16} /></button>
            <button className="text-red-600 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700" title="حظر العميل"><X size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SettingsManager: React.FC<{ settings: any, updateSettings: any }> = ({ settings, updateSettings }) => (
  <div className="space-y-10">
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-8">
        <h4 className="font-black text-red-600 border-r-4 border-red-600 pr-3 flex items-center gap-2"><Settings size={20} /> إعدادات المتجر الأساسية</h4>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">رسوم التوصيل الافتراضية</label>
            <div className="relative">
               <DollarSign size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
               <input 
                type="number" 
                value={settings.deliveryFee} 
                onChange={(e) => updateSettings({ deliveryFee: Number(e.target.value) })}
                className="w-full p-4 pr-12 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 font-black focus:ring-2 focus:ring-red-600" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">سعر حشو الأطراف (بيتزا)</label>
            <input 
              type="number" 
              value={settings.crustStuffingPrice} 
              onChange={(e) => updateSettings({ crustStuffingPrice: Number(e.target.value) })}
              className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 font-black focus:ring-2 focus:ring-red-600" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">رقم الواتساب للاستلام</label>
            <input 
              value={settings.phone} 
              onChange={(e) => updateSettings({ phone: e.target.value })}
              className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 font-black focus:ring-2 focus:ring-red-600" 
              placeholder="01xxxxxxxxx"
            />
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <h4 className="font-black text-blue-600 border-r-4 border-blue-600 pr-3 flex items-center gap-2"><ImageIcon size={20} /> إعدادات الميديا والعروض</h4>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">رابط فيديو اليوتيوب (الرئيسية)</label>
            <input 
              value={settings.videoUrl} 
              onChange={(e) => updateSettings({ videoUrl: e.target.value })}
              className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 text-xs focus:ring-2 focus:ring-red-600" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">مواعيد العمل</label>
            <input 
              value={settings.workingHours} 
              onChange={(e) => updateSettings({ workingHours: e.target.value })}
              className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 font-bold focus:ring-2 focus:ring-red-600" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">شريط العروض (نص متحرك)</label>
            <textarea 
              value={settings.tickerTexts.join(', ')} 
              onChange={(e) => updateSettings({ tickerTexts: e.target.value.split(',').map(s => s.trim()) })}
              className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 h-32 font-medium focus:ring-2 focus:ring-red-600" 
              placeholder="افصل بين العروض بفاصلة (,)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminPanel;
