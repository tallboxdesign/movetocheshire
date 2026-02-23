// WebMCP tool registration for movetocheshire.uk
// Exposes structured area data to AI agents via navigator.modelContext (W3C draft, Chrome 146+)

const areas = [
  { area: 'Wilmslow', averagePrice: 490000, commuteToManchester: '17 mins', schools: 'Wilmslow High (Good)', bestFor: 'Families, commuters', priceCategory: 'premium' },
  { area: 'Alderley Edge', averagePrice: 700000, commuteToManchester: '22 mins', schools: 'Alderley Edge School for Girls', bestFor: 'Premium lifestyle', priceCategory: 'premium' },
  { area: 'Knutsford', averagePrice: 430000, commuteToManchester: '35 mins', schools: 'Knutsford Academy (Outstanding)', bestFor: 'Families, village feel', priceCategory: 'premium' },
  { area: 'Chester', averagePrice: 250000, commuteToManchester: '50 mins', schools: "King's School, Queen's School", bestFor: 'First-time buyers, history', priceCategory: 'mid' },
  { area: 'Macclesfield', averagePrice: 280000, commuteToManchester: '25 mins', schools: 'The Macclesfield Academy', bestFor: 'Value, Peak District access', priceCategory: 'mid' },
  { area: 'Tarporley', averagePrice: 380000, commuteToManchester: '55 mins (indirect)', schools: 'Tarporley High (Outstanding)', bestFor: 'Village life, families', priceCategory: 'mid' },
  { area: 'Crewe', averagePrice: 175000, commuteToManchester: '55 mins', schools: 'Ruskin Academy', bestFor: 'Budget buyers, investors', priceCategory: 'budget' },
  { area: 'Northwich', averagePrice: 220000, commuteToManchester: '40 mins', schools: 'Hartford High School', bestFor: 'Affordable, good links', priceCategory: 'budget' },
  { area: 'Nantwich', averagePrice: 295000, commuteToManchester: '60 mins (indirect)', schools: 'Malbank School', bestFor: 'Market town, SW Cheshire', priceCategory: 'mid' },
  { area: 'Prestbury', averagePrice: 650000, commuteToManchester: '20 mins', schools: 'Nearby independent schools', bestFor: 'Premium village, quiet', priceCategory: 'premium' },
] as const;

type AreaInfo = typeof areas[number];

const tiers = [
  {
    name: 'The Golden Triangle',
    towns: 'Wilmslow, Alderley Edge, Prestbury',
    avgPrice: 650000,
    getWhatYouGet: (budget: number) => {
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
    getWhatYouGet: (budget: number) => {
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
    getWhatYouGet: (budget: number) => {
      if (budget < 150000) return '2-3 bed traditional terrace';
      if (budget < 250000) return '3-bed modern semi-detached';
      if (budget < 400000) return 'Substantial 4-bed detached family home';
      if (budget < 600000) return 'Premium 5-bed modern detached executive home';
      return 'The very top of the local market - exceptional space and land';
    },
  },
] as const;

function findArea(name: string): AreaInfo | undefined {
  return areas.find(a => a.area.toLowerCase() === name.toLowerCase());
}

if ('modelContext' in navigator) {
  (navigator as any).modelContext.provideContext({
    tools: [
      {
        name: 'getAreaInfo',
        description: 'Get property prices, commute times, schools, and lifestyle info for a Cheshire area. Available areas: Wilmslow, Alderley Edge, Knutsford, Chester, Macclesfield, Tarporley, Crewe, Northwich, Nantwich, Prestbury.',
        inputSchema: {
          type: 'object',
          properties: {
            area: { type: 'string', description: 'Area name e.g. Wilmslow, Chester, Knutsford' },
          },
          required: ['area'],
        },
        annotations: { readOnlyHint: true },
        execute: async (input: { area: string }) => {
          const info = findArea(input.area);
          if (!info) return { error: `Area "${input.area}" not found. Available: ${areas.map(a => a.area).join(', ')}` };
          return info;
        },
      },
      {
        name: 'compareAreas',
        description: 'Compare two Cheshire areas side-by-side on price, commute, schools, and lifestyle.',
        inputSchema: {
          type: 'object',
          properties: {
            area1: { type: 'string', description: 'First area name' },
            area2: { type: 'string', description: 'Second area name' },
          },
          required: ['area1', 'area2'],
        },
        annotations: { readOnlyHint: true },
        execute: async (input: { area1: string; area2: string }) => {
          const a1 = findArea(input.area1);
          const a2 = findArea(input.area2);
          const available = areas.map(a => a.area).join(', ');
          if (!a1) return { error: `Area "${input.area1}" not found. Available: ${available}` };
          if (!a2) return { error: `Area "${input.area2}" not found. Available: ${available}` };
          return { comparison: [a1, a2] };
        },
      },
      {
        name: 'calculatePurchasingPower',
        description: 'See what property you could buy across Cheshire\'s three price tiers for a given budget in GBP.',
        inputSchema: {
          type: 'object',
          properties: {
            budget: { type: 'number', description: 'Budget in GBP e.g. 350000' },
          },
          required: ['budget'],
        },
        annotations: { readOnlyHint: true },
        execute: async (input: { budget: number }) => {
          return {
            budget: input.budget,
            tiers: tiers.map(t => ({
              name: t.name,
              towns: t.towns,
              avgPrice: t.avgPrice,
              whatYouGet: t.getWhatYouGet(input.budget),
            })),
          };
        },
      },
    ],
  });
}
