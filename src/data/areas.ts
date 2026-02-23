export interface AreaRow {
  area: string;
  priceNum: number;
  price: string;
  commute: string;
  commuteNum: number;
  schools: string;
  bestFor: string;
  indirect?: boolean;
  priceCategory: 'budget' | 'mid' | 'premium';
}

export const areas: AreaRow[] = [
  { area: 'Wilmslow', priceNum: 490000, price: '£490,000', commute: '17 mins', commuteNum: 17, schools: 'Wilmslow High (Good)', bestFor: 'Families, commuters', priceCategory: 'premium' },
  { area: 'Alderley Edge', priceNum: 700000, price: '£700,000+', commute: '22 mins', commuteNum: 22, schools: 'Alderley Edge School for Girls', bestFor: 'Premium lifestyle', priceCategory: 'premium' },
  { area: 'Knutsford', priceNum: 430000, price: '£430,000', commute: '35 mins', commuteNum: 35, schools: 'Knutsford Academy (Outstanding)', bestFor: 'Families, village feel', priceCategory: 'premium' },
  { area: 'Chester', priceNum: 250000, price: '£250,000', commute: '50 mins', commuteNum: 50, schools: "King's School, Queen's School", bestFor: 'First-time buyers, history', priceCategory: 'mid' },
  { area: 'Macclesfield', priceNum: 280000, price: '£280,000', commute: '25 mins', commuteNum: 25, schools: 'The Macclesfield Academy', bestFor: 'Value, Peak District access', priceCategory: 'mid' },
  { area: 'Tarporley', priceNum: 380000, price: '£380,000', commute: '55 mins*', commuteNum: 55, schools: 'Tarporley High (Outstanding)', bestFor: 'Village life, families', priceCategory: 'mid', indirect: true },
  { area: 'Crewe', priceNum: 175000, price: '£175,000', commute: '55 mins', commuteNum: 55, schools: 'Ruskin Academy', bestFor: 'Budget buyers, investors', priceCategory: 'budget' },
  { area: 'Northwich', priceNum: 220000, price: '£220,000', commute: '40 mins', commuteNum: 40, schools: 'Hartford High School', bestFor: 'Affordable, good links', priceCategory: 'budget' },
  { area: 'Nantwich', priceNum: 295000, price: '£295,000', commute: '60 mins*', commuteNum: 60, schools: 'Malbank School', bestFor: 'Market town, SW Cheshire', priceCategory: 'mid', indirect: true },
  { area: 'Prestbury', priceNum: 650000, price: '£650,000+', commute: '20 mins', commuteNum: 20, schools: 'Nearby independent schools', bestFor: 'Premium village, quiet', priceCategory: 'premium' },
];

export interface PropertyTier {
  name: string;
  towns: string;
  avgPrice: number;
  description: string;
  getPropertyAtBudget: (budget: number) => string;
}

export const tiers: PropertyTier[] = [
  {
    name: 'The Golden Triangle',
    towns: 'Wilmslow, Alderley Edge, Prestbury',
    avgPrice: 650000,
    description: 'Ultra-premium commuter belt with top schools and direct London/Manchester rail links.',
    getPropertyAtBudget: (budget) => {
      if (budget < 350000) return '1-2 bed apartment or small terrace needing work';
      if (budget < 600000) return '3-bed semi-detached or modernized terrace';
      if (budget < 900000) return '4-bed detached family home';
      if (budget < 1500000) return 'Substantial 5-bed detached with large garden';
      return 'Luxury mansion or exclusive gated property';
    },
  },
  {
    name: 'The Balanced Middle',
    towns: 'Knutsford, Macclesfield, Chester',
    avgPrice: 380000,
    description: 'Excellent value offering great schools, heritage, and strong amenities.',
    getPropertyAtBudget: (budget) => {
      if (budget < 250000) return '2-bed terrace or modern apartment';
      if (budget < 450000) return '3-4 bed modern semi-detached';
      if (budget < 700000) return 'Large 4-bed detached family home';
      if (budget < 1000000) return 'Premium 5-bed detached or character property';
      return 'Exceptional luxury estate or substantial period home';
    },
  },
  {
    name: 'The Accessible Tier',
    towns: 'Northwich, Crewe, Winsford',
    avgPrice: 220000,
    description: 'High affordability with massive ongoing regeneration and great transport connectivity.',
    getPropertyAtBudget: (budget) => {
      if (budget < 150000) return '2-3 bed traditional terrace';
      if (budget < 250000) return '3-bed modern semi-detached';
      if (budget < 400000) return 'Substantial 4-bed detached family home';
      if (budget < 600000) return 'Premium 5-bed modern detached executive home';
      return 'The very top of the local market - exceptional space and land';
    },
  },
];
