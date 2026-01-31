
import React, { useState, useRef } from 'react';
import { useApp } from '../AppContext';
import { 
  LayoutDashboard, Pizza, ShoppingBag, Users, Settings, 
  Printer, Check, Edit2, Trash2, Tag, Package, Image as ImageIcon, 
  DollarSign, TrendingUp, Copy, Eye, X, Upload, Camera
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
        {activeSubTab === 'print' && <InvoicePrinting orders={orders} settings={settings} />}
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

const InvoicePrinting: React.FC<{ orders: Order[], settings: any }> = ({ orders, settings }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePrint = (order: Order) => {
    setSelectedOrder(order);
    setTimeout(() => { window.print(); }, 300);
  };

  const openPreview = (order: Order) => {
    setSelectedOrder(order);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">نظام طباعة الفواتير</h3>

      {/* منطقة الفاتورة المخفية للطباعة فقط - تطابق الصورة بالمللي */}
      <div id="printable-receipt" className="print-only">
        {selectedOrder && (
          <div style={{ textAlign: 'center', fontFamily: 'Cairo, sans-serif', direction: 'rtl', padding: '15px', background: 'white', color: 'black' }}>
            {/* اللوجو والبيانات العلوية */}
            <div style={{ marginBottom: '10px' }}>
              <img 
                src={settings.logoUrl} 
                style={{ width: '80px', height: '80px', objectFit: 'contain', margin: '0 auto', display: 'block', backgroundColor: 'white' }} 
                alt="Logo" 
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=L&background=e11d48&color=fff'; }}
              />
              <h1 style={{ margin: '5px 0', fontSize: '26px', fontWeight: '900' }}>{settings.restaurantName}</h1>
              <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>كفر بهيدة – بجوار مسجد عمر</p>
              <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>{settings.phone}</p>
            </div>

            <div style={{ borderTop: '1px dashed #000', margin: '12px 0' }}></div>

            {/* بيانات الطلب */}
            <div style={{ textAlign: 'right', fontSize: '14px', lineHeight: '1.8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>رقم الطلب:</span>
                <span style={{ fontWeight: '900', fontSize: '20px' }}>{selectedOrder.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>التاريخ:</span>
                <span>{new Date(selectedOrder.createdAt).toLocaleString('ar-EG', { dateStyle: 'long', timeStyle: 'short' })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>طريقة الدفع:</span>
                <span>{selectedOrder.paymentMethod}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px dashed #000', margin: '12px 0' }}></div>

            {/* بيانات العميل */}
            <div style={{ textAlign: 'right', fontSize: '14px', lineHeight: '1.6' }}>
               <h3 style={{ margin: '0 0 6px 0', fontWeight: '900', fontSize: '16px' }}>بيانات العميل</h3>
               <p style={{ margin: '2px 0' }}><span style={{ fontWeight: 'bold' }}>الاسم:</span> {selectedOrder.userName}</p>
               <p style={{ margin: '2px 0' }}><span style={{ fontWeight: 'bold' }}>الموبايل:</span> {selectedOrder.userPhone}</p>
               <p style={{ margin: '2px 0' }}><span style={{ fontWeight: 'bold' }}>العنوان:</span> {selectedOrder.userAddress}</p>
            </div>

            <div style={{ borderTop: '1px dashed #000', margin: '12px 0' }}></div>

            {/* تفاصيل الطلب */}
            <h3 style={{ margin: '0 0 10px 0', fontWeight: '900', textAlign: 'right', fontSize: '16px' }}>تفاصيل الطلب</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'right' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #000' }}>
                  <th style={{ padding: '8px 0' }}>الصنف</th>
                  <th style={{ padding: '8px 0', textAlign: 'center' }}>الكمية</th>
                  <th style={{ padding: '8px 0', textAlign: 'left' }}>السعر</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((i, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 0' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{i.name}</div>
                      <div style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>
                        سعر الصنف: {i.price - (i.crustStuffing ? i.crustStuffingPrice : 0)} جنيه
                        {i.crustStuffing && <br />}
                        {i.crustStuffing && `+ حشو أطراف: ${i.crustStuffingPrice} جنيه`}
                      </div>
                    </td>
                    <td style={{ padding: '8px 0', textAlign: 'center', fontSize: '14px' }}>{i.quantity}</td>
                    <td style={{ padding: '8px 0', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>{i.price * i.quantity} جنيه</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ borderTop: '1px dashed #000', margin: '12px 0' }}></div>

            {/* المجاميع */}
            <div style={{ fontSize: '15px', lineHeight: '1.8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>المجموع الفرعي:</span>
                <span style={{ fontWeight: 'bold' }}>{selectedOrder.subtotal} جنيه</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>رسوم التوصيل:</span>
                <span style={{ fontWeight: 'bold' }}>{selectedOrder.deliveryFee} جنيه</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '22px', fontWeight: '900' }}>
                <span>الإجمالي:</span>
                <span>{selectedOrder.total} جنيه</span>
              </div>
            </div>

            <div style={{ borderTop: '1px dashed #000', margin: '15px 0' }}></div>

            {/* الفوتر */}
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
              <p style={{ margin: '5px 0' }}>شكراً لتعاملك معنا ❤️</p>
              <p style={{ margin: '5px 0' }}>نتمنى لكم وجبة شهية!</p>
              <p style={{ margin: '10px 0 0 0', fontSize: '11px', opacity: 0.8 }}>ساعات العمل: {settings.workingHours}</p>
            </div>
          </div>
        )}
      </div>

      {/* مودال المعاينة (شكل الفاتورة في التطبيق) */}
      {isPreviewOpen && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 no-print">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-800">
              <h4 className="font-bold flex items-center gap-2"><Eye size={18} /> معاينة الفاتورة</h4>
              <button onClick={() => setIsPreviewOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[75vh] bg-white text-black">
               <div style={{ textAlign: 'center', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
                  <img src={settings.logoUrl} style={{ width: '70px', height: '70px', objectFit: 'contain', margin: '0 auto', display: 'block', backgroundColor: 'white' }} alt="Logo" />
                  <h2 className="text-2xl font-black mt-2">{settings.restaurantName}</h2>
                  <p className="text-xs font-bold text-gray-500">كفر بهيدة – بجوار مسجد عمر</p>
                  <div className="border-t border-dashed border-gray-300 my-4"></div>
                  <div className="text-right text-sm space-y-1">
                    <div className="flex justify-between"><span>رقم الطلب:</span> <span className="font-black text-xl">{selectedOrder.id}</span></div>
                    <div className="flex justify-between text-xs text-gray-600"><span>التاريخ:</span> <span>{new Date(selectedOrder.createdAt).toLocaleString('ar-EG')}</span></div>
                  </div>
                  <div className="border-t border-dashed border-gray-300 my-4"></div>
                  <div className="text-right text-xs space-y-1">
                    <p className="font-black text-sm mb-1">بيانات العميل</p>
                    <p>الاسم: {selectedOrder.userName}</p>
                    <p>الموبايل: {selectedOrder.userPhone}</p>
                    <p>العنوان: {selectedOrder.userAddress}</p>
                  </div>
                  <div className="border-t border-dashed border-gray-300 my-4"></div>
                  <table className="w-full text-right text-xs">
                     <thead><tr className="border-b border-gray-200 font-bold"><th className="pb-2">الصنف</th><th className="pb-2 text-center">كمية</th><th className="pb-2 text-left">سعر</th></tr></thead>
                     <tbody>
                        {selectedOrder.items.map((i, idx) => (
                          <tr key={idx} className="border-b border-gray-50">
                            <td className="py-2">
                               <div className="font-bold">{i.name}</div>
                               <div className="text-[10px] text-gray-400 mt-0.5">سعر الصنف: {i.price - (i.crustStuffing ? i.crustStuffingPrice : 0)} ج</div>
                               {i.crustStuffing && <div className="text-[10px] text-red-500 font-bold">+ حشو أطراف: {i.crustStuffingPrice} ج</div>}
                            </td>
                            <td className="text-center">{i.quantity}</td>
                            <td className="text-left font-bold">{i.price * i.quantity} ج</td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
                  <div className="mt-4 space-y-1 text-sm">
                     <div className="flex justify-between text-gray-500"><span>المجموع الفرعي:</span> <span>{selectedOrder.subtotal} ج</span></div>
                     <div className="flex justify-between text-gray-500"><span>رسوم التوصيل:</span> <span>{selectedOrder.deliveryFee} ج</span></div>
                     <div className="flex justify-between font-black text-2xl text-red-600 mt-2"><span>الإجمالي:</span> <span>{selectedOrder.total} ج</span></div>
                  </div>
                  <p className="mt-6 font-bold text-sm">شكراً لتعاملك معنا ❤️</p>
               </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-slate-800 border-t dark:border-slate-800 flex gap-3">
              <button onClick={() => handlePrint(selectedOrder)} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform"><Printer size={20} /> طباعة الفاتورة</button>
            </div>
          </div>
        </div>
      )}

      {/* شبكة الطلبات في لوحة التحكم */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-print">
        {orders.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400 font-bold bg-gray-50 dark:bg-slate-900 rounded-[40px]">لا توجد طلبات حالياً</div>
        ) : orders.map(order => (
          <div key={order.id} className="p-6 bg-gray-50 dark:bg-slate-900 rounded-[40px] border border-gray-200 dark:border-slate-800 space-y-4 hover:border-red-600 transition-all group">
            <div className="flex justify-between font-black items-start">
              <div><span className="text-red-600 block text-xs">رقم الطلب</span><span className="text-xl">{order.id}</span></div>
              <div className="text-right"><span className="text-lg text-green-600 font-black">{order.total} ج.م</span></div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl text-xs space-y-1">
               <p className="font-bold flex items-center gap-2 text-sm">👤 {order.userName}</p>
               <p className="text-gray-500">📍 {order.userAddress}</p>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => openPreview(order)} className="flex-1 py-3 bg-white dark:bg-slate-800 text-blue-600 rounded-2xl text-xs font-black border-2 border-blue-50 dark:border-slate-700 flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Eye size={16} /> معاينة</button>
              <button onClick={() => handlePrint(order)} className="flex-1 py-3 bg-red-600 text-white rounded-2xl text-xs font-black shadow-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-all active:scale-95"><Printer size={16} /> طباعة</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MenuManager: React.FC<{ menu: MenuItem[], setMenu: any }> = ({ menu, setMenu }) => {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState(CategoryType.PIZZA);
  const [newItemImg, setNewItemImg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addItem = () => {
    if (!newItemName) return;
    const newItem: MenuItem = {
      id: 'm_' + Math.random().toString(36).substr(2, 9),
      name: newItemName,
      category: newItemCat,
      priceS: 90, priceM: 110, priceL: 130,
      image: newItemImg || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'
    };
    setMenu([...menu, newItem]);
    setNewItemName('');
    setNewItemImg('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isEditing && editingItem) {
          setEditingItem({ ...editingItem, image: base64String });
        } else {
          setNewItemImg(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSave = () => {
    if (!editingItem) return;
    setMenu(menu.map(m => m.id === editingItem.id ? editingItem : m));
    setEditingItem(null);
  };

  return (
    <div className="space-y-8">
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-[40px] p-8 space-y-6 shadow-2xl">
            <h3 className="text-2xl font-black">تعديل: {editingItem.name}</h3>
            
            <div className="flex flex-col items-center gap-4">
               <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-red-600 shadow-lg bg-gray-100">
                  <img src={editingItem.image} className="w-full h-full object-cover" alt="Item" />
               </div>
               <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold border border-red-200">
                  <Upload size={16} /> تغيير الصورة من الموبايل
               </button>
               <input type="file" ref={fileInputRef} onChange={(e) => handleFileUpload(e, true)} className="hidden" accept="image/*" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">سعر S</label>
                <input type="number" value={editingItem.priceS || 0} onChange={e => setEditingItem({...editingItem, priceS: Number(e.target.value)})} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">سعر M</label>
                <input type="number" value={editingItem.priceM || 0} onChange={e => setEditingItem({...editingItem, priceM: Number(e.target.value)})} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700" />
              </div>
            </div>
            <div className="flex gap-4">
               <button onClick={handleEditSave} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-black shadow-lg active:scale-95 transition-all">حفظ التغييرات</button>
               <button onClick={() => setEditingItem(null)} className="flex-1 py-4 bg-gray-100 dark:bg-slate-700 rounded-2xl font-black">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-[40px] border border-red-100 dark:border-red-900/30">
        <h4 className="text-xl font-black mb-6">إضافة صنف جديد</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <input value={newItemName} onChange={e => setNewItemName(e.target.value)} className="p-4 rounded-2xl bg-white dark:bg-slate-900 font-bold border-none ring-1 ring-gray-100 dark:ring-slate-800" placeholder="اسم الصنف" />
          <select value={newItemCat} onChange={e => setNewItemCat(e.target.value as any)} className="p-4 rounded-2xl bg-white dark:bg-slate-900 font-bold border-none ring-1 ring-gray-100 dark:ring-slate-800">
            {Object.values(CategoryType).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="flex gap-2">
             <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 text-gray-500 flex items-center justify-center gap-2 hover:border-red-600 transition-colors">
               <Camera size={20} /> {newItemImg ? 'تم اختيار صورة' : 'صورة الصنف'}
             </button>
             <button onClick={addItem} className="px-8 bg-red-600 text-white rounded-2xl font-black shadow-lg transform active:scale-95">إضافة</button>
          </div>
          <input type="file" ref={fileInputRef} onChange={(e) => handleFileUpload(e, false)} className="hidden" accept="image/*" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map(item => (
          <div key={item.id} className="p-4 bg-gray-50 dark:bg-slate-900 rounded-[40px] border border-gray-100 dark:border-slate-800 flex flex-col gap-4 group">
            <div className="relative h-48 rounded-[30px] overflow-hidden shadow-inner">
              <img src={item.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={item.name} />
              <div className="absolute top-3 right-3 flex gap-2">
                <button onClick={() => setEditingItem(item)} className="bg-white/90 p-2.5 rounded-full text-blue-600 shadow-xl hover:scale-110 transition-all"><Edit2 size={18} /></button>
                <button onClick={() => { if(confirm('حذف؟')) setMenu(menu.filter(m => m.id !== item.id)) }} className="bg-white/90 p-2.5 rounded-full text-red-600 shadow-xl hover:scale-110 transition-all"><Trash2 size={18} /></button>
              </div>
            </div>
            <div className="px-2 space-y-1 pb-2 text-center">
              <h4 className="font-black text-lg">{item.name}</h4>
              <p className="text-xs text-gray-500 font-bold">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsManager: React.FC<{ settings: any, updateSettings: any }> = ({ settings, updateSettings }) => {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSettings({ logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-6">
        <h4 className="font-black border-r-4 border-red-600 pr-3">إدارة هوية المطعم</h4>
        
        {/* رفع اللوجو من الموبايل */}
        <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-[40px] border border-gray-100 dark:border-slate-800 flex flex-col items-center gap-6">
           <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-white flex items-center justify-center">
              <img src={settings.logoUrl} className="w-full h-full object-contain" alt="Current Logo" onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=L&background=e11d48&color=fff'; }} />
           </div>
           <button onClick={() => logoInputRef.current?.click()} className="px-8 py-3 bg-red-600 text-white rounded-2xl font-black shadow-lg shadow-red-600/20 flex items-center gap-2 active:scale-95 transition-all">
              <Upload size={20} /> رفع لوجو جديد من الموبايل
           </button>
           <input type="file" ref={logoInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
           <p className="text-[10px] text-gray-400 font-bold text-center">يفضل استخدام صورة مربعة بخلفية بيضاء أو شفافة</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500">اسم المطعم</label>
            <input value={settings.restaurantName} onChange={e => updateSettings({ restaurantName: e.target.value })} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-100 dark:ring-slate-800 font-black" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500">رسوم التوصيل (ج.م)</label>
            <input type="number" value={settings.deliveryFee} onChange={e => updateSettings({ deliveryFee: Number(e.target.value) })} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 ring-1 ring-gray-100 dark:ring-slate-800 border-none font-black" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="font-black border-r-4 border-blue-600 pr-3">المحتوى التفاعلي</h4>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500">ساعات العمل</label>
            <input value={settings.workingHours} onChange={e => updateSettings({ workingHours: e.target.value })} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 ring-1 ring-gray-100 dark:ring-slate-800 border-none font-bold" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500">رابط الفيديو</label>
            <input value={settings.videoUrl} onChange={e => updateSettings({ videoUrl: e.target.value })} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 ring-1 ring-gray-100 dark:ring-slate-800 border-none font-medium" />
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdersManager = ({ orders, updateStatus }: any) => <div className="text-center py-10">إدارة الطلبات مفعلة في تبويب الطلبات</div>;
const ReportsManager = ({ orders }: any) => <div className="text-center py-10">التقارير مفعلة في تبويب التقارير</div>;
const InventoryManager = () => <div className="text-center py-20 text-gray-400 font-bold bg-gray-50 dark:bg-slate-900 rounded-[40px]">نظام المخزون الرقمي...</div>;
const UsersManager = () => <div className="text-center py-20 text-gray-400 font-bold bg-gray-50 dark:bg-slate-900 rounded-[40px]">سجل العملاء...</div>;
const CouponsManager = () => <div className="text-center py-20 text-gray-400 font-bold bg-gray-50 dark:bg-slate-900 rounded-[40px]">الكوبونات...</div>;

export default AdminPanel;
