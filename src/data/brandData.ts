export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  favoriteDrink: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: 'Flame' | 'Leaf' | 'Award' | 'Sparkles';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: 'roasting',
    title: 'Micro-Batch Roasting',
    description: 'We roast weekly in disciplined 12kg batches to preserve fragile volatile aromatics, guaranteeing every pour tastes peak fresh.',
    metric: '12 kg',
    metricLabel: 'Batch precision limit',
    iconName: 'Flame'
  },
  {
    id: 'origin',
    title: 'Direct-Trade Single Origins',
    description: 'Cultivated in high-altitude volcanic soils across Huila, Colombia and Yirgacheffe, Ethiopia. Sourced directly with fair producer premiums.',
    metric: '92+ SCA',
    metricLabel: 'Specialty cup score',
    iconName: 'Award'
  },
  {
    id: 'craft',
    title: 'Master Extraction Discipline',
    description: 'Every pull is dialed every morning to 0.1g precision and exact 9-bar pressure for uncompromised crema density and silk microfoam.',
    metric: '1:2.1',
    metricLabel: 'Brew ratio gold standard',
    iconName: 'Sparkles'
  },
  {
    id: 'sustainability',
    title: 'Eco-Minded Circular Footprint',
    description: '100% certified commercially compostable takeaway cups, sugarcane lids, and repurposed coffee ground soil amendment for local urban gardens.',
    metric: '100%',
    metricLabel: 'Zero plastic waste in service',
    iconName: 'Leaf'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Elena Rostova',
    role: 'Architect & Interior Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    comment: 'The Spanish Latte at HS LATTE redefined my standard for morning coffee. The balance between espresso punch and velvety sweetness is peerless.',
    favoriteDrink: 'Spanish Latte'
  },
  {
    id: 't2',
    name: 'Marcus Thorne',
    role: 'Editorial Director, Design Quarterly',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    comment: 'A genuinely civilized space. Between the acoustic warmth, natural travertine textures, and the 20-hour cold brew, it is my studio away from home.',
    favoriteDrink: 'Cold Brew & Chocolate Cookie'
  },
  {
    id: 't3',
    name: 'Dr. Sophia Chen',
    role: 'Research Fellow & Q-Grader',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    comment: 'As someone trained in sensory evaluation, their washed Ethiopian single-origin pulled as a straight double is clean, bright, and impeccably dialled.',
    favoriteDrink: 'Double Espresso'
  }
];

export const BRAND_STATS = [
  { value: '100%', label: 'Single-Origin Arabica' },
  { value: '92+', label: 'Specialty SCA Score' },
  { value: '20 hr', label: 'Artisan Cold Ferment' },
  { value: '18,500+', label: 'Happy Guests Served' }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Morning Dial-In & Extraction',
    category: 'Craft',
    image: '/src/assets/images/barista_pour_craft_1792015778508.jpg',
    alt: 'Barista pouring textured microfoam creating rosetta latte art'
  },
  {
    id: 'g2',
    title: 'The Coffee Sanctuary',
    category: 'Atmosphere',
    image: '/src/assets/images/about_coffee_interior_1792015777133.jpg',
    alt: 'Warm sunlit coffee bar interior with curved oak counter'
  },
  {
    id: 'g3',
    title: 'Specialty Cold Creations',
    category: 'Signature',
    image: '/src/assets/images/specialty_cold_beverage_1792015777439.jpg',
    alt: 'Ribbed glassware with iced Spanish latte and cold brew'
  },
  {
    id: 'g4',
    title: 'Fresh Morning Bakery',
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=900&auto=format&fit=crop',
    alt: 'Freshly baked artisanal pastries and chocolate chunk cookies'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig1',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop',
    caption: 'Quiet mornings before the rush. Steaming milk and dialed espresso.',
    likes: '842',
    tag: '#hslatte #specialtycoffee'
  },
  {
    id: 'ig2',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600&auto=format&fit=crop',
    caption: 'Our Spanish Latte in afternoon sunlight. Layered perfection.',
    likes: '1,219',
    tag: '#spanishlatte #artisanroast'
  },
  {
    id: 'ig3',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop',
    caption: 'Ethically sourced, freshly roasted, honestly served.',
    likes: '694',
    tag: '#singleorigin #baristacraft'
  },
  {
    id: 'ig4',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
    caption: 'Warm oak, smooth jazz, and the aroma of fresh beans.',
    likes: '1,048',
    tag: '#cafeculture #betterdays'
  }
];

export const CAFE_INFO = {
  address: '428 Artisan Way, Roast District, Suite 101',
  city: 'San Francisco, CA 94107',
  phone: '+1 (415) 890-5288',
  email: 'hello@hslatte.com',
  hours: [
    { days: 'Monday – Friday', time: '6:30 AM – 8:00 PM' },
    { days: 'Saturday', time: '7:30 AM – 9:00 PM' },
    { days: 'Sunday', time: '8:00 AM – 7:00 PM' }
  ]
};
