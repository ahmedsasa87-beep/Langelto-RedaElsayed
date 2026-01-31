
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Trophy, CheckCircle, Gift, Info } from 'lucide-react';

const CompetitionsView: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const competition = {
    question: "ما هي المكونات الأساسية لبيتزا المارجريتا في لانجولتو؟",
    options: [
      "جبنة موتزاريلا، صوص طماطم، زيتون",
      "جبنة كيري، صوص باربيكيو، فراخ",
      "بسطرمة، سوسيس، جمبري",
      "تونة، مشروم، شيدر"
    ],
    correctIndex: 0
  };

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <Trophy className="absolute -top-4 -right-4 w-32 h-32 opacity-20 rotate-12" />
        <h2 className="text-3xl font-black mb-2">مسابقة الأسبوع</h2>
        <p className="opacity-90">أجب على السؤال واربح 20 نقطة في حسابك فوراً!</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700">
        {!submitted ? (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">{competition.question}</h3>
            <div className="space-y-3">
              {competition.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full p-4 rounded-2xl text-right transition-all border-2 flex items-center justify-between ${
                    selectedAnswer === idx ? 'border-red-600 bg-red-50 dark:bg-red-900/20' : 'border-gray-100 dark:border-slate-700'
                  }`}
                >
                  <span className="font-bold">{opt}</span>
                  {selectedAnswer === idx && <CheckCircle size={20} className="text-red-600" />}
                </button>
              ))}
            </div>
            <button 
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
              className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-600/30 disabled:opacity-50"
            >
              إرسال الإجابة
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mx-auto">
              {selectedAnswer === competition.correctIndex ? <Gift size={40} /> : <Info size={40} />}
            </div>
            {selectedAnswer === competition.correctIndex ? (
              <>
                <h3 className="text-2xl font-black text-green-600">إجابة صحيحة!</h3>
                <p className="text-gray-500">تم إضافة 20 نقطة إلى حسابك بنجاح. مبروك!</p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-black text-red-600">للأسف، إجابة غير صحيحة</h3>
                <p className="text-gray-500">حاول مرة أخرى في مسابقة الغد!</p>
              </>
            )}
            <button 
              onClick={() => {setSubmitted(false); setSelectedAnswer(null);}}
              className="px-8 py-3 bg-gray-100 dark:bg-slate-700 rounded-full font-bold"
            >
              الرجوع
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionsView;
