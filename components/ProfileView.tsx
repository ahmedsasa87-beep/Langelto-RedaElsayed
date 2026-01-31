
import React from 'react';
import { useApp } from '../AppContext';
import { User, ShoppingBag, Gift, Award, LogOut, ChevronLeft } from 'lucide-react';

interface ProfileViewProps {
  onTrack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onTrack }) => {
  const { currentUser, setCurrentUser, orders } = useApp();

  if (!currentUser) return null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-red-600/30">
          {currentUser.name[0]}
        </div>
        <div className="flex-1 text-center md:text-right space-y-1">
          <h2 className="text-3xl font-black">{currentUser.name}</h2>
          <p className="text-gray-500">{currentUser.phone}</p>
          <p className="text-gray-400 text-sm">{currentUser.address}</p>
        </div>
        <button 
          onClick={() => setCurrentUser(null)}
          className="p-3 bg-gray-50 dark:bg-slate-900 text-red-600 rounded-2xl hover:bg-red-50 transition-all"
        >
          <LogOut size={24} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-600 to-orange-500 p-8 rounded-3xl text-white shadow-xl space-y-4">
          <div className="flex justify-between items-start">
            <Award size={48} className="opacity-40" />
            <div className="text-right">
              <span className="text-xs opacity-70">رصيدك من النقاط</span>
              <div className="text-5xl font-black">{currentUser.points}</div>
            </div>
          </div>
          <p className="text-sm opacity-90">اجمع 100 نقطة لتحصل على طلب مجاني!</p>
          <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl font-bold transition-all">
            استبدال النقاط
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag size={20} className="text-red-600" />
            آخر الطلبات
          </h3>
          <div className="space-y-4">
            {orders.filter(o => o.userId === currentUser.id).length === 0 ? (
              <p className="text-gray-400 text-center py-8">لا يوجد طلبات سابقة</p>
            ) : (
              orders.filter(o => o.userId === currentUser.id).slice(0, 3).map(o => (
                <div key={o.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl">
                  <div>
                    <span className="font-bold">{o.id}</span>
                    <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleDateString('ar-EG')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-red-600">{o.total} ج.م</div>
                    <button onClick={onTrack} className="text-xs text-blue-600 font-bold">تتبع الطلب</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
