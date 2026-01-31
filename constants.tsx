
import { MenuItem, CategoryType } from './types';

export const INITIAL_MENU: MenuItem[] = [
  // --- PIZZA (S:90, M:110, L:130) ---
  { id: 'p1', name: 'مارجريتا', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنه', 'زيتون'], image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=400' },
  { id: 'p2', name: 'خضروات', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنه', 'فلفل', 'زيتون', 'مشروم'], image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
  { id: 'p3', name: 'عشاق الجبنة', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنه رومي', 'شيدر', 'كيري', 'زيتون'], image: 'https://images.unsplash.com/photo-1573821663912-56990145564c?w=400' },
  { id: 'p4', name: 'فراخ', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنه', 'فراخ', 'خضروات'], image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
  { id: 'p5', name: 'فراخ شاورما', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنه', 'شاورما', 'خضروات'], image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
  { id: 'p6', name: 'شيش طاووق', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنه', 'شيش', 'خضروات'], image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
  { id: 'p21', name: 'بيتزا لانجولتو', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنه', 'فراخ', 'سوسيس', 'بسطرمه', 'زيتون', 'خضروات'], image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400' },
  { id: 'p22', name: 'بيتزا جمبري', category: CategoryType.PIZZA, priceS: 120, priceM: 140, priceL: 170, ingredients: ['صوص طماطم', 'جبنه', 'جمبري', 'زيتون', 'خضروات'], image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },

  // --- CREPES (مثلث:80, رول:120) ---
  { id: 'c1', name: 'كريب جبنة مارجريتا', category: CategoryType.CREPE, priceS: 40, priceM: 60, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400' },
  { id: 'c2', name: 'كريب ميكس جبن', category: CategoryType.CREPE, priceS: 60, priceM: 90, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400' },
  { id: 'c3', name: 'كريب بانيه بارد', category: CategoryType.CREPE, priceS: 80, priceM: 120, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400' },
  { id: 'c4', name: 'كريب شاورما فراخ', category: CategoryType.CREPE, priceS: 80, priceM: 120, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400' },
  { id: 'c5', name: 'كريب شاورما لحمه', category: CategoryType.CREPE, priceS: 80, priceM: 120, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400' },
  { id: 'c6', name: 'كريب كرسبي حار', category: CategoryType.CREPE, priceS: 80, priceM: 120, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400' },
  { id: 'c21', name: 'كريب لانجولتو', category: CategoryType.CREPE, priceS: 80, priceM: 120, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400' },

  // --- SANDWICHES CHICKEN ---
  { id: 'sc1', name: 'سندوتش شاورما فراخ', category: CategoryType.SANDWICH_CHICKEN, priceDefault: 35, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400' },
  { id: 'sc2', name: 'سندوتش بانيه', category: CategoryType.SANDWICH_CHICKEN, priceDefault: 25, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400' },
  { id: 'sc3', name: 'سندوتش كرسبي', category: CategoryType.SANDWICH_CHICKEN, priceDefault: 35, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400' },
  { id: 'sc6', name: 'سندوتش فاهيتا فراخ', category: CategoryType.SANDWICH_CHICKEN, priceDefault: 35, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400' },
  { id: 'sc10', name: 'سوبر كرانشي', category: CategoryType.SANDWICH_CHICKEN, priceDefault: 30, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400' },

  // --- SANDWICHES MEAT ---
  { id: 'sm1', name: 'سندوتش شاورما لحمه', category: CategoryType.SANDWICH_MEAT, priceDefault: 30, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  { id: 'sm2', name: 'سندوتش برجر', category: CategoryType.SANDWICH_MEAT, priceDefault: 25, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  { id: 'sm3', name: 'برجر بيض', category: CategoryType.SANDWICH_MEAT, priceDefault: 35, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  { id: 'sm4', name: 'برجر جامبو', category: CategoryType.SANDWICH_MEAT, priceDefault: 50, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  { id: 'sm7', name: 'سجق', category: CategoryType.SANDWICH_MEAT, priceDefault: 20, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  { id: 'sm8', name: 'بطاطس', category: CategoryType.SANDWICH_MEAT, priceDefault: 20, image: 'https://images.unsplash.com/photo-1573082801869-026f1883e74e?w=400' },
  { id: 'sm9', name: 'بطاطس موتزاريلا', category: CategoryType.SANDWICH_MEAT, priceDefault: 30, image: 'https://images.unsplash.com/photo-1573082801869-026f1883e74e?w=400' },

  // --- ADDONS ---
  { id: 'ad1', name: 'باكت بطاطس', category: CategoryType.ADDONS, priceDefault: 15, image: 'https://images.unsplash.com/photo-1573082801869-026f1883e74e?w=400' },
];

export const APP_CONFIG = {
  adminCredentials: { username: 'admin', password: 'admin' },
  whatsappNumber: '01002006657',
  adminName: 'رضا البغدي',
  restaurantName: "لانجولتو",
  workingHours: "من 4 عصرًا حتى 12 صباحًا",
  footerText: "© Mahmoud Hassan",
};
