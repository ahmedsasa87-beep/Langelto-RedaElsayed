
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  Pizza, Coffee, Gift, Trophy, Star, MessageCircle, ChevronLeft, 
  ChevronRight, Play, Volume2, VolumeX, Send, Camera, UserCheck
} from 'lucide-react';

interface HomeViewProps {
  onOrderNow: () => void;
  onOpenComps: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onOrderNow, onOpenComps }) => {
  const { settings, reviews, updateSettings, currentUser } = useApp();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');

  const toggleMusic = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (settings.isMusicPlaying) {
      audio?.pause();
      updateSettings({ isMusicPlaying: false });
    } else {
      audio?.play().catch(e => console.log('Autoplay blocked'));
      updateSettings({ isMusicPlaying: true });
    }
  };

  // Improved extraction for all YouTube URL types
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(settings.videoUrl) || 'G-GO2-j71JY';

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-12">
      {/* Hero Section with Video - Fixed Video Playback */}
      <section className="relative h-[450px] md:h-[600px] rounded-[40px] overflow-hidden shadow-2xl group bg-slate-900">
        <div className="absolute inset-0 z-0">
          <iframe 
            className="w-full h-full object-cover scale-110 pointer-events-none"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`}
            title="Restaurant Video"
            allow="autoplay; encrypted-media; fullscreen"
            frameBorder="0"
          />
        </div>
        
        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-center justify-center text-center p-6 space-y-6">
          <div className="bg-red-600/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-white text-sm font-bold animate-pulse">
             🍕 أطعم بيتزا وكريب في كفر بهيدة 🍕
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-white drop-shadow-2xl mb-2 tracking-tight">لانجولتو</h2>
          <p className="text-xl md:text-3xl text-gray-200 max-w-2xl font-light drop-shadow-lg">
            إدارة رضا البغدي.. الطعم الأصلي للبيتزا والكريب
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button 
              onClick={onOrderNow}
              className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xl shadow-2xl shadow-red-600/40 transform transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <Pizza size={28} />
              اطلب دلوقتي
            </button>
            <button 
              onClick={toggleMusic}
              className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl backdrop-blur-xl border border-white/10 transition-all flex items-center gap-2 group"
            >
              <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/40">
                {settings.isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </div>
              <span className="font-bold">الموسيقى</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="px-2">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-3xl font-black border-r-4 border-red-600 pr-4">أقسام المطعم</h3>
            <p className="text-gray-500 text-sm mt-1 font-bold">اختار وجبتك المفضلة من المنيو بتاعنا</p>
          </div>
          <button onClick={onOrderNow} className="text-red-600 font-black flex items-center gap-1 hover:translate-x-[-4px] transition-transform">
            كل الأصناف <ChevronLeft size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <CategoryCard icon={<Pizza size={48} />} label="البيتزا" onClick={onOrderNow} color="bg-orange-500" />
          <CategoryCard icon={<Coffee size={48} />} label="الكريب" onClick={onOrderNow} color="bg-red-500" />
          <CategoryCard icon={<Gift size={48} />} label="العروض" onClick={onOrderNow} color="bg-blue-500" />
          <CategoryCard icon={<Trophy size={48} />} label="المسابقات" onClick={onOpenComps} color="bg-yellow-500" />
        </div>
      </section>

      {/* Loyalty Preview */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-red-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-600 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-xs font-bold border border-white/10">
              <Star className="text-yellow-400 fill-yellow-400" size={14} /> برنامج الولاء
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white">اطلب وجباتك.. وجمع نقاطك!</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              كل 100 جنيه بتطلبها بترجعلك بـ 1 نقطة. والنقاط دي تقدر تستبدلها بوجبات مجانية أو خصومات حصرية.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <div className="bg-white/5 p-4 rounded-3xl border border-white/5 text-center min-w-[120px]">
                  <div className="text-2xl font-black text-red-500">{currentUser?.points || 0}</div>
                  <div className="text-[10px] text-gray-500 font-bold">نقاطك الحالية</div>
               </div>
               <div className="bg-white/5 p-4 rounded-3xl border border-white/5 text-center min-w-[120px]">
                  <div className="text-2xl font-black text-green-500">100</div>
                  <div className="text-[10px] text-gray-500 font-bold">للحصول على هدية</div>
               </div>
            </div>
          </div>
          <div className="w-full max-w-sm">
             <div className="bg-white/10 p-6 rounded-[30px] backdrop-blur-xl border border-white/10 space-y-4">
                <h4 className="font-bold text-center">العملاء المميزين لهذا الشهر</h4>
                <div className="space-y-3">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border-2 border-red-500" alt="Avatar" />
                        <div className="flex-1">
                          <div className="text-xs font-bold">عميل مميز #{i}</div>
                          <div className="w-full bg-white/10 h-1.5 rounded-full mt-1">
                            <div className="bg-red-600 h-full rounded-full" style={{ width: `${90 - i*20}%` }} />
                          </div>
                        </div>
                        <UserCheck size={16} className="text-green-500" />
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section>
        <div className="text-center space-y-2 mb-12">
          <h3 className="text-3xl font-black">آراء عملائنا</h3>
          <p className="text-gray-500 font-medium">اللي جرب لانجولتو مبيقدرش يقاوم</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review) => (
            <div key={review.id} className="bg-white dark:bg-slate-800 p-8 rounded-[30px] shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 font-black text-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                    {review.userName[0]}
                  </div>
                  <div>
                    <h4 className="font-bold">{review.userName}</h4>
                    <span className="text-[10px] text-gray-400 font-bold">{review.date}</span>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Chat Button */}
      <div className="fixed bottom-24 left-6 z-50 md:bottom-6">
         {isChatOpen ? (
           <div className="bg-white dark:bg-slate-900 w-80 h-96 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
              <div className="bg-red-600 p-4 text-white flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><MessageCircle size={18} /></div>
                    <span className="font-bold">دردشة لانجولتو</span>
                 </div>
                 <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors"><ChevronRight size={20} className="rotate-90" /></button>
              </div>
              <div className="flex-1 p-4 space-y-4 overflow-y-auto text-xs">
                 <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tr-none ml-4 font-bold">
                    أهلاً بك يا {currentUser?.name || 'زائر'}! كيف يمكننا مساعدتك اليوم؟
                 </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-slate-800 flex items-center gap-2 border-t dark:border-slate-700">
                 <button className="text-gray-400 hover:text-red-600 transition-colors"><Camera size={20} /></button>
                 <input 
                    value={chatMsg}
                    onChange={(e) => setChatMsg(e.target.value)}
                    className="flex-1 bg-white dark:bg-slate-900 p-2 rounded-xl text-xs border-none focus:ring-1 focus:ring-red-600 font-bold" 
                    placeholder="اكتب رسالتك..."
                  />
                 <button className="text-red-600 hover:scale-110 transition-transform"><Send size={20} /></button>
              </div>
           </div>
         ) : (
           <button 
             onClick={() => setIsChatOpen(true)}
             className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-600/40 transform transition-all hover:scale-110 active:scale-95 group"
           >
             <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
             <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
           </button>
         )}
      </div>
    </div>
  );
};

const CategoryCard: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void, color: string }> = ({ icon, label, onClick, color }) => (
  <button 
    onClick={onClick}
    className={`${color} p-8 md:p-12 rounded-[35px] text-white flex flex-col items-center gap-6 transition-all hover:scale-105 hover:shadow-2xl active:scale-95 shadow-lg group`}
  >
    <div className="p-4 bg-white/20 rounded-3xl group-hover:rotate-12 transition-transform">
      {icon}
    </div>
    <span className="text-xl md:text-2xl font-black">{label}</span>
  </button>
);

export default HomeView;
