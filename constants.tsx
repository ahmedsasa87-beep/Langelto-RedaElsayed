
import { MenuItem, CategoryType } from './types';

// Using more specific food placeholder images for better aesthetics
export const INITIAL_MENU: MenuItem[] = [
  // Pizza
  { id: 'p1', name: 'مارجريتا', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنة', 'زيتون'], image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=400&q=80' },
  { id: 'p2', name: 'خضروات', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنة', 'فلفل', 'زيتون', 'مشروم'], image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
  { id: 'p3', name: 'عشاق الجبنة', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنة رومي', 'شيدر', 'كيري', 'زيتون'], image: 'https://images.unsplash.com/photo-1573821663912-56990145564c?auto=format&fit=crop&w=400&q=80' },
  { id: 'p4', name: 'فراخ', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنة', 'فراخ', 'زيتون', 'خضروات'], image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
  { id: 'p5', name: 'فراخ شاورما', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنة', 'شاورما', 'زيتون', 'خضروات'], image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
  { id: 'p21', name: 'بيتزا لانجولتو', category: CategoryType.PIZZA, priceS: 90, priceM: 110, priceL: 130, ingredients: ['صوص طماطم', 'جبنة', 'فراخ', 'سوسيس', 'بسطرمة', 'زيتون', 'خضروات'], image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=400&q=80' },
  { id: 'p22', name: 'بيتزا جمبري', category: CategoryType.PIZZA, priceS: 120, priceM: 140, priceL: 170, ingredients: ['صوص طماطم', 'جبنة', 'جمبري', 'زيتون', 'خضروات'], image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80' },

  // Crepes
  { id: 'c1', name: 'كريب جبنة مارجريتا', category: CategoryType.CREPE, priceS: 40, priceM: 60, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=400&q=80' },
  { id: 'c2', name: 'كريب ميكس جبن', category: CategoryType.CREPE, priceS: 60, priceM: 90, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=400&q=80' },
  { id: 'c3', name: 'كريب بانيه بارد', category: CategoryType.CREPE, priceS: 80, priceM: 120, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=400&q=80' },
  { id: 'c15', name: 'كريب سوبر كرانشي', category: CategoryType.CREPE, priceS: 80, priceM: 120, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=400&q=80' },
  { id: 'c21', name: 'كريب لانجولتو', category: CategoryType.CREPE, priceS: 80, priceM: 120, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=400&q=80' },

  // Sandwiches
  { id: 's1', name: 'سندوتش شاورما لحمة', category: CategoryType.SANDWICH, priceDefault: 30, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=400&q=80' },
  { id: 's2', name: 'سندوتش برجر', category: CategoryType.SANDWICH, priceDefault: 25, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
  { id: 's3', name: 'سندوتش برجر بيض', category: CategoryType.SANDWICH, priceDefault: 35, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
  { id: 's4', name: 'سندوتش برجر جامبو', category: CategoryType.SANDWICH, priceDefault: 50, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
  { id: 's9', name: 'سندوتش بطاطس', category: CategoryType.SANDWICH, priceDefault: 20, image: 'https://images.unsplash.com/photo-1573082801869-026f1883e74e?auto=format&fit=crop&w=400&q=80' },
  { id: 's10', name: 'سندوتش بطاطس موتزاريلا', category: CategoryType.SANDWICH, priceDefault: 30, image: 'https://images.unsplash.com/photo-1573082801869-026f1883e74e?auto=format&fit=crop&w=400&q=80' },
];

export const APP_CONFIG = {
  adminCredentials: { username: 'admin', password: 'admin' },
  whatsappNumber: '01002006657',
  adminName: 'رضا البغدي',
  restaurantName: "لانجولتو",
  workingHours: "من 4 عصرًا حتى 12 صباحًا",
  footerText: "© Mahmoud Hassan",
};
