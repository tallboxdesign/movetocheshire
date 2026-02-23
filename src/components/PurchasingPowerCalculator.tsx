import React, { useState, useEffect } from 'react';
import { Calculator, MapPin, Home, ArrowRight, PoundSterling } from 'lucide-react';

interface PropertyTier {
    name: string;
    towns: string;
    avgPrice: number;
    description: string;
    getPropertyAtBudget: (budget: number) => string;
}

const tiers: PropertyTier[] = [
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
        }
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
        }
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
        }
    }
];

export default function PurchasingPowerCalculator() {
    const [budgetStr, setBudgetStr] = useState<string>('500000');
    const [budget, setBudget] = useState<number>(500000);

    useEffect(() => {
        const rawVal = budgetStr.replace(/,/g, '').replace(/£/g, '');
        const num = parseInt(rawVal, 10);
        if (!isNaN(num)) {
            setBudget(num);
        }
    }, [budgetStr]);

    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // allow only numbers and commas
        const val = e.target.value.replace(/[^0-9]/g, '');
        setBudgetStr(val);
    };

    const formatCurrency = (val: number | string) => {
        if (!val) return '';
        return Number(val).toLocaleString('en-GB');
    };

    return (
        <section className="py-16 bg-white border-y border-stone-200" id="purchasing-power">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4 tracking-tight">
                        Relocation Purchasing Power Calculator
                    </h2>
                    <p className="text-lg text-slate-600">
                        See exactly how far your budget stretches across the county. Enter your maximum budget to compare equivalent property types across our three key regional tiers.
                    </p>
                </div>

                <div className="bg-stone-50 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-sm border border-stone-100">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-10 border-b border-stone-200">
                        <div className="flex-shrink-0 bg-blue-100 p-4 rounded-full text-blue-600">
                            <Calculator className="w-8 h-8" />
                        </div>
                        <div className="flex-grow w-full">
                            <label htmlFor="budget-input" className="block text-sm font-medium text-slate-700 mb-2">
                                Your Target Budget
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-slate-500 sm:text-lg font-medium">£</span>
                                </div>
                                <input
                                    type="text"
                                    name="budget"
                                    id="budget-input"
                                    inputMode="numeric"
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-xl border-stone-300 rounded-lg py-4 font-semibold text-slate-900"
                                    placeholder="500,000"
                                    value={formatCurrency(budgetStr)}
                                    onChange={handleBudgetChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-serif text-slate-900 mb-6">What £{formatCurrency(budget)} buys you:</h3>

                        <div className="grid md:grid-cols-3 gap-6">
                            {tiers.map((tier, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 flex flex-col h-full transform transition-transform hover:scale-[1.02]">
                                    <h4 className="font-semibold text-slate-900 text-lg mb-1">{tier.name}</h4>
                                    <p className="text-xs text-slate-500 mb-4 font-medium h-8">{tier.towns}</p>

                                    <div className="mt-auto pt-4 border-t border-stone-100">
                                        <div className="flex items-start gap-3 mt-4">
                                            <Home className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <p className="text-slate-800 font-medium leading-snug">
                                                {tier.getPropertyAtBudget(budget)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
