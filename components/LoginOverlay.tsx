
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { User } from '../types';

const LoginOverlay: React.FC = () => {
  const { setCurrentUser } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    // Device check simulation for registration points
    const deviceId = localStorage.getItem('l-angoletto-device-id') || 'dev_' + Math.random().toString(36).substr(2, 9);
    const hasRegisteredBefore = !!localStorage.getItem('l-angoletto-has-registered');
    
    const newUser: User = {
      id: 'u_' + Math.random().toString(36).substr(2, 9),
      name,
      phone,
      address,
      points: hasRegisteredBefore ? 0 : 10,
      isAdmin: false,
      isBlocked: false,
      registeredAt: new Date().toISOString(),
      deviceId
    };

    localStorage.setItem('l-angoletto-device-id', deviceId);
    if (!hasRegisteredBefore) {
      localStorage.setItem('l-angoletto-has-registered', 'true');
      alert('تم تسجيلك بنجاح! حصلت على 10 نقاط هدية التسجيل.');
    }

    setCurrentUser(newUser);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl p-8 space-y-6 animate-in slide-in-from-bottom-10 duration-500">
        <div className="text-center space-y-2">
          <img src="https://i.ibb.co/L5k6jYF/logo.jpg" alt="Logo" className="w-20 h-20 rounded-full mx-auto border-4 border-red-600" />
          <h2 className="text-3xl font-black">مرحباً بك في لانجولتو</h2>
          <p className="text-gray-500">سجل بياناتك لتبدأ في طلب وجباتك المفضلة</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold mr-2">الاسم بالكامل</label>
            <input 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 focus:ring-2 focus:ring-red-600"
              placeholder="مثال: محمود حسن"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold mr-2">رقم الموبايل</label>
            <input 
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 focus:ring-2 focus:ring-red-600"
              placeholder="01xxxxxxxxx"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold mr-2">العنوان بالتفصيل</label>
            <input 
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-none ring-1 ring-gray-200 dark:ring-slate-700 focus:ring-2 focus:ring-red-600"
              placeholder="كفر بهيدة - بجوار مسجد عمر"
            />
          </div>
          <button className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-600/30 transition-transform active:scale-95">
            ابدأ الآن واحصل على 10 نقاط!
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginOverlay;
