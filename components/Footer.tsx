
import React from 'react';
import { Phone, MapPin, Instagram, Facebook, MessageCircle, Heart } from 'lucide-react';
import { useApp } from '../AppContext';
import { APP_CONFIG } from '../constants';

const Footer: React.FC = () => {
  const { settings } = useApp();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pt-16 pb-24 md:pb-12 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center md:text-right">
        <div className="space-y-6">
          <div className="flex items-center justify-center md:justify-start gap-3">
             <img 
                src={settings.logoUrl} 
                alt="Logo" 
                className="w-12 h-12 rounded-full border-2 border-red-600 object-contain bg-white"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=L&background=e11d48&color=fff'; }}
              />
              <h4 className="text-2xl font-black text-red-600">{settings.restaurantName}</h4>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
            أفضل تجربة لتناول البيتزا والكريب في المنطقة. نستخدم أجود أنواع الدقيق والموتزاريلا الطبيعية 100% لنضمن لك طعماً لا ينسى.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-bold border-r-4 border-red-600 pr-3">تواصل معنا</h4>
          <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
            <li className="flex items-center justify-center md:justify-start gap-3 group">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                <Phone size={18} />
              </div>
              <span className="font-bold">{settings.phone}</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3 group">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                <MapPin size={18} />
              </div>
              <span>كفر بهيدة - شارع المدارس - بجوار المسجد</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3 group">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                <MessageCircle size={18} />
              </div>
              <span className="font-bold">{settings.workingHours}</span>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-bold border-r-4 border-red-600 pr-3">روابط التواصل</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <SocialLink icon={<Facebook size={20} />} color="bg-blue-50 text-blue-600" hover="hover:bg-blue-600" />
            <SocialLink icon={<Instagram size={20} />} color="bg-pink-50 text-pink-600" hover="hover:bg-pink-600" />
            <a href={`https://wa.me/20${settings.phone}`} className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm">
              <MessageCircle size={20} />
            </a>
          </div>
          <div className="text-xs text-gray-400 font-medium">
            تطبيق لانجولتو الرسمي - نسخة الويب والجوال PWA
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-xs font-bold">
          {APP_CONFIG.footerText}
        </p>
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          Made with <Heart size={10} className="text-red-500 fill-red-500" /> for L'Angoletto
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ icon: React.ReactNode, color: string, hover: string }> = ({ icon, color, hover }) => (
  <a href="#" className={`p-4 ${color} dark:bg-slate-800 rounded-2xl transition-all transform hover:-translate-y-1 shadow-sm ${hover} hover:text-white`}>
    {icon}
  </a>
);

export default Footer;
