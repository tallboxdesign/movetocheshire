import React, { useState, useEffect } from 'react';
import { Calculator, MapPin, Home, ArrowRight, PoundSterling } from 'lucide-react';
import { tiers } from '../data/areas';

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
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-stone-200 overflow-hidden w-full max-w-[480px] mx-auto" id="purchasing-power">
            <div className="p-6 md:p-8 bg-[#F9F7F4] border-b border-stone-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#3D5A3E] text-white p-2 rounded-lg">
                        <Calculator className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-serif text-slate-900 font-bold">
                        Purchasing Power
                    </h2>
                </div>

                <label htmlFor="budget-input" className="block text-sm font-medium text-slate-700 mb-2">
                    Your Cheshire property budget
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
                        className="focus:ring-[#3D5A3E] focus:border-[#3D5A3E] block w-full pl-10 pr-12 sm:text-xl border-stone-300 rounded-lg py-3 font-semibold text-slate-900"
                        placeholder="500,000"
                        value={formatCurrency(budgetStr)}
                        onChange={handleBudgetChange}
                    />
                </div>
            </div>

            <div className="p-6 md:p-8 bg-white">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">What £{formatCurrency(budget)} buys</h3>

                <div className="space-y-6">
                    {tiers.map((tier, idx) => (
                        <div key={idx} className="relative pl-5 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:bg-[#3D5A3E] before:rounded-full before:opacity-20 hover:before:opacity-100 before:transition-opacity">
                            <h4 className="font-bold text-slate-900 text-[15px] mb-0.5">{tier.name}</h4>
                            <p className="text-xs text-slate-500 mb-2">{tier.towns}</p>
                            <div className="flex items-start gap-2">
                                <Home className="w-4 h-4 text-[#3D5A3E] mt-0.5 flex-shrink-0" />
                                <p className="text-[14px] text-slate-800 font-medium leading-snug">
                                    {tier.getPropertyAtBudget(budget)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 text-center">
                <a href="#town-quiz" className="text-sm font-semibold text-[#3D5A3E] hover:text-[#2A3E2A] flex items-center justify-center gap-2">
                    Not sure where yet? Take the area quiz <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}
