
import React from 'react';
import { useApp } from '../AppContext';
import { CheckCircle, Clock, Package, MapPin } from 'lucide-react';

const OrderTracking: React.FC = () => {
  const { orders, currentUser } = useApp();
  const userOrders = orders.filter(o => o.userId === currentUser?.id);

  if (userOrders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">لا توجد طلبات لتتبعها حالياً.</div>
    );
  }

  const latest = userOrders[0];

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <h2 className="text-3xl font-black text-center mb-8">تتبع طلبك</h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex justify-between items-center mb-12">
          <div className="text-right">
            <span className="text-xs text-gray-500">رقم الطلب</span>
            <div className="text-2xl font-black">{latest.id}</div>
          </div>
          <div className="text-left">
            <span className="text-xs text-gray-500">الوقت المقدر</span>
            <div className="text-2xl font-black">30-45 دقيقة</div>
          </div>
        </div>

        <div className="relative flex justify-between items-center px-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 dark:bg-slate-700 -translate-y-1/2 -z-10" />
          <div className={`absolute top-1/2 left-0 h-1 bg-red-600 -translate-y-1/2 -z-10 transition-all duration-1000`} 
               style={{ width: latest.status === 'pending' ? '0%' : latest.status === 'preparing' ? '50%' : '100%' }} />
          
          <Step icon={<Clock />} label="استلام" active={true} />
          <Step icon={<Package />} label="تحضير" active={latest.status !== 'pending'} />
          <Step icon={<MapPin />} label="توصيل" active={latest.status === 'delivered'} />
          <Step icon={<CheckCircle />} label="تم" active={latest.status === 'delivered'} />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
        <h3 className="font-bold mb-4">ملخص الطلب:</h3>
        <div className="space-y-2">
          {latest.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{item.name} x {item.quantity}</span>
              <span className="font-bold">{item.price * item.quantity} ج.م</span>
            </div>
          ))}
          <div className="border-t dark:border-slate-700 mt-4 pt-4 flex justify-between font-black text-lg text-red-600">
            <span>الإجمالي</span>
            <span>{latest.total} ج.م</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step: React.FC<{ icon: React.ReactNode, label: string, active: boolean }> = ({ icon, label, active }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all ${active ? 'bg-red-600 border-red-100 dark:border-red-900/30 text-white' : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-300'}`}>
      {icon}
    </div>
    <span className={`text-xs font-bold ${active ? 'text-red-600' : 'text-gray-400'}`}>{label}</span>
  </div>
);

export default OrderTracking;
