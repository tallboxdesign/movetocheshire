// WebMCP tool registration for movetocheshire.uk
// Exposes structured area data to AI agents via navigator.modelContext (W3C draft, Chrome 146+)

import { areas, tiers } from '../data/areas';

function findArea(name: string) {
  return areas.find(a => a.area.toLowerCase() === name.toLowerCase());
}

function formatAreaInfo(a: typeof areas[number]) {
  return {
    area: a.area,
    averagePrice: a.priceNum,
    commuteToManchester: a.commute,
    schools: a.schools,
    bestFor: a.bestFor,
    priceCategory: a.priceCategory,
  };
}

if ('modelContext' in navigator) {
  (navigator as any).modelContext.provideContext({
    tools: [
      {
        name: 'getAreaInfo',
        description: 'Get property prices, commute times, schools, and lifestyle info for a Cheshire area. Available areas: ' + areas.map(a => a.area).join(', ') + '.',
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
          return formatAreaInfo(info);
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
          return { comparison: [formatAreaInfo(a1), formatAreaInfo(a2)] };
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
              whatYouGet: t.getPropertyAtBudget(input.budget),
            })),
          };
        },
      },
    ],
  });
}
