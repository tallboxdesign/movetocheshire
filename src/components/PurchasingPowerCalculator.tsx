import React, { useState, useEffect } from 'react';
import { Calculator, MapPin, Home, ArrowRight, PoundSterling, Lock, Sparkles, Mail } from 'lucide-react';
import { tiers } from '../data/areas';

export default function PurchasingPowerCalculator() {
    const [budgetStr, setBudgetStr] = useState<string>('500000');
    const [budget, setBudget] = useState<number>(500000);
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setIsSubmitting(true);

        try {
            // MVP Email Capture: Replace this URL with your actual Formspree endpoint
            const formspreeUrl = 'https://formspree.io/f/your_form_id_here';

            if (formspreeUrl.includes('your_form_id_here')) {
                // If the user hasn't added their custom URL yet, just simulate the delay
                await new Promise(r => setTimeout(r, 800));
            } else {
                // Send the email to Formspree
                await fetch(formspreeUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        source: 'Purchasing Power Calculator',
                        budget: budget
                    })
                });
            }

            // Unlock the ui
            setIsRevealed(true);
        } catch (err) {
            console.error("Email submission failed", err);
            // In case of ad-blockers or network errors, unlock it anyway to preserve UX
            setIsRevealed(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-stone-200 overflow-hidden w-full max-w-[480px] mx-auto" id="purchasing-power">
            <div className="p-6 md:p-8 bg-[#F9F7F4] border-b border-stone-200 relative z-20">
                <div className="flex items-center gap-3 mb-5">
                    <div className="bg-[#3D5A3E] text-white p-2.5 rounded-xl shadow-sm">
                        <Calculator className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-serif text-slate-900 font-bold tracking-tight">
                        Cheshire Buying Power
                    </h2>
                </div>

                <label htmlFor="budget-input" className="block text-[13px] font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                    Your maximum property budget
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-slate-500 sm:text-xl font-medium">£</span>
                    </div>
                    <input
                        type="text"
                        name="budget"
                        id="budget-input"
                        inputMode="numeric"
                        className="focus:ring-2 focus:ring-[#3D5A3E]/20 focus:border-[#3D5A3E] block w-full pl-10 pr-12 sm:text-2xl border-stone-300 rounded-xl py-3.5 font-bold text-slate-900 outline-none transition-all"
                        placeholder="500,000"
                        value={formatCurrency(budgetStr)}
                        onChange={handleBudgetChange}
                    />
                </div>
            </div>

            <div className="p-6 md:p-8 bg-white">
                {!isRevealed && (
                    <div className="mb-6 p-4 bg-emerald-50/80 rounded-xl border border-emerald-100 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-[14px] font-bold text-emerald-950 leading-tight">Area Analysis Complete</h4>
                            <p className="text-[13px] text-emerald-800/80 mt-1 leading-relaxed">
                                We've cross-referenced a budget of £{formatCurrency(budget)} against all Cheshire postcodes. Reveal your tailored matches below.
                            </p>
                        </div>
                    </div>
                )}

                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#3D5A3E] mb-5">Matching Cheshire Areas</h3>

                <div className={`transition-all duration-700 ease-in-out ${!isRevealed ? 'h-[220px] overflow-hidden relative' : ''}`}>
                    <div className={`space-y-6 pb-2 ${!isRevealed ? 'filter blur-[5px] select-none opacity-40 pointer-events-none' : ''}`}>
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

                {!isRevealed && (
                    <div className="relative z-20 -mt-[140px] flex flex-col items-center justify-center pt-10 pb-2 px-2 sm:px-4">
                        <div className="absolute inset-x-0 bottom-0 top-[-60px] bg-gradient-to-t from-white via-white/95 to-white/0 pointer-events-none"></div>
                        <div className="bg-white border border-stone-200 shadow-xl rounded-2xl p-6 sm:p-7 text-center max-w-sm w-full animate-in fade-in zoom-in-95 duration-500 relative ring-1 ring-black/5 z-20 mx-auto mt-4">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white border border-stone-200 rounded-full flex items-center justify-center shadow-sm">
                                <Lock className="w-5 h-5 text-[#3D5A3E]" />
                            </div>
                            <h4 className="font-serif font-bold text-[22px] text-slate-900 mt-4 mb-2 tracking-tight">Reveal Your Matches</h4>
                            <p className="text-[14px] text-slate-500 mb-6 leading-relaxed px-2">Join our free relocation newsletter to instantly unlock the specific towns and properties that fit your budget.</p>
                            <form onSubmit={handleEmailSubmit} className="space-y-3">
                                <input
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="your@email.com"
                                    className="w-full text-[15px] border-stone-300 rounded-xl py-3.5 px-5 focus:ring-2 focus:ring-[#3D5A3E]/20 focus:border-[#3D5A3E] text-center outline-none transition-all placeholder:text-stone-400 font-medium text-slate-800 relative z-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#3D5A3E] hover:bg-[#2A3E2A] text-white font-semibold py-3.5 rounded-xl transition-all text-[15px] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg relative z-10"
                                >
                                    {isSubmitting ? 'Unlocking...' : 'Reveal Results Now'}
                                </button>
                            </form>
                            <div className="mt-6 pt-5 border-t border-stone-100 relative z-10">
                                <p className="text-[13px] text-slate-500 font-medium">
                                    Just browsing today?
                                </p>
                                <a href="/where-to-live" className="text-[14px] font-bold text-[#3D5A3E] hover:text-[#2A3E2A] transition-colors mt-1 inline-flex items-center justify-center gap-1.5 group">
                                    Explore free area guides <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 text-center relative z-20">
                <a href="#town-quiz" className="text-sm font-semibold text-[#3D5A3E] hover:text-[#2A3E2A] flex items-center justify-center gap-2 transition-colors">
                    Not sure where yet? Take the area quiz <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}
