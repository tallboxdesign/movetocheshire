import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Play, X } from 'lucide-react';

type Question = {
    id: string;
    question: string;
    options: {
        label: string;
        points: Record<string, number>;
    }[];
};

const questions: Question[] = [
    {
        id: 'priority',
        question: 'What is your absolute must-have for this move?',
        options: [
            { label: 'Outstanding state schools (grammar or comprehensive)', points: { 'Wilmslow': 3, 'Knutsford': 3, 'Altrincham': 4 } },
            { label: 'Sub-30-minute train commute to Manchester', points: { 'Wilmslow': 4, 'Macclesfield': 3, 'Alderley Edge': 3 } },
            { label: 'Maximum property and land for the budget', points: { 'Northwich': 4, 'Crewe': 4, 'Winsford': 3 } },
            { label: 'Historic charm and walkable city/town amenities', points: { 'Chester': 4, 'Knutsford': 3, 'Nantwich': 3 } },
        ]
    },
    {
        id: 'budget',
        question: 'What is your realistic target budget?',
        options: [
            { label: 'Under £350,000', points: { 'Northwich': 4, 'Crewe': 4, 'Chester': 2, 'Macclesfield': 2 } },
            { label: '£350,000 - £600,000', points: { 'Macclesfield': 4, 'Chester': 4, 'Northwich': 2, 'Knutsford': 2 } },
            { label: '£600,000 - £900,000', points: { 'Wilmslow': 3, 'Knutsford': 4, 'Alderley Edge': 2 } },
            { label: '£900,000+', points: { 'Alderley Edge': 4, 'Prestbury': 4, 'Wilmslow': 4 } },
        ]
    },
    {
        id: 'vibe',
        question: 'Which weekend vibe sounds best to you?',
        options: [
            { label: 'Bustling cafe culture with high-end boutiques and bars', points: { 'Wilmslow': 4, 'Alderley Edge': 4, 'Knutsford': 3 } },
            { label: 'A quiet village with a great local pub and nearby hiking', points: { 'Prestbury': 4, 'Macclesfield': 3, 'Tarporley': 4 } },
            { label: 'Riverside walks, Roman walls, and a thriving heritage center', points: { 'Chester': 5, 'Nantwich': 2 } },
            { label: 'I care mostly about practicality, retail parks, and family convenience', points: { 'Crewe': 4, 'Northwich': 4, 'Handforth': 3 } },
        ]
    }
];

const townProfiles: Record<string, { description: string }> = {
    'Wilmslow': { description: 'The premier commuter town: 17 mins to Manchester, top schools, premium prices.' },
    'Knutsford': { description: 'Historic market town charm, outstanding schools, and Tatton Park on your doorstep.' },
    'Chester': { description: 'Roman heritage, beautiful architecture, and great independent schools on a reasonable budget.' },
    'Northwich': { description: 'Rapidly regenerating, extremely family-friendly with massive value for money.' },
    'Macclesfield': { description: 'The gateway to the Peak District. Fast trains, rugged outdoors, and better value than Wilmslow.' },
    'Alderley Edge': { description: 'The absolute pinnacle of the Cheshire property market. Exclusive, glamorous, and very expensive.' },
    'Crewe': { description: 'The ultimate rail hub. Unbeatable connectivity and the most accessible property prices in the county.' },
    'Prestbury': { description: 'Deep Golden Triangle village. Quiet, discreet wealth, and beautiful countryside.' }
};

export default function TownQuiz() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState<number>(-1);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [results, setResults] = useState<{ town: string, score: number }[]>([]);

    // Prevent scrolling on body when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
        setCurrentStep(0);
        setAnswers({});
        setResults([]);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = { ...answers, [currentStep]: optionIndex };
        setAnswers(newAnswers);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            calculateResults(newAnswers);
        }
    };

    const calculateResults = (finalAnswers: Record<number, number>) => {
        const scores: Record<string, number> = {};
        Object.keys(finalAnswers).forEach((stepIndexStr) => {
            const stepIndex = parseInt(stepIndexStr, 10);
            const optionIndex = finalAnswers[stepIndex];
            const selectedOption = questions[stepIndex].options[optionIndex];

            Object.entries(selectedOption.points).forEach(([town, points]) => {
                scores[town] = (scores[town] || 0) + points;
            });
        });

        const sorted = Object.entries(scores)
            .map(([town, score]) => ({ town, score }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 2);

        setResults(sorted);
        setCurrentStep(questions.length);
    };

    const scrollToData = () => {
        handleClose();
        const table = document.getElementById('area-table-section');
        if (table) {
            table.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-12 bg-white border-b border-stone-200" id="town-quiz-banner">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-slate-900 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1 text-left">
                            <h2 className="text-3xl font-serif text-white mb-3">Not sure where to start?</h2>
                            <p className="text-slate-300 text-lg">Take our 1-minute intelligent quiz. We'll cross-reference your budget and priorities to recommend the two best Cheshire towns for your specific situation.</p>
                        </div>
                        <button
                            onClick={handleOpen}
                            className="bg-white text-slate-900 hover:bg-stone-50 font-semibold px-8 py-4 rounded-lg flex items-center gap-2 transition-transform hover:scale-105 flex-shrink-0"
                        >
                            Start the Quiz <Play className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden relative">

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors z-10"
                            aria-label="Close quiz"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Quiz Screen */}
                        {currentStep >= 0 && currentStep < questions.length && (
                            <div className="p-6 md:p-10 overflow-y-auto">
                                <div className="flex items-center justify-between mb-8 pr-12">
                                    <p className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
                                        Question {currentStep + 1} of {questions.length}
                                    </p>
                                    <div className="flex gap-1">
                                        {questions.map((_, i) => (
                                            <div key={i} className={`h-2 w-6 md:w-8 rounded-full ${i <= currentStep ? 'bg-blue-600' : 'bg-slate-200'}`} />
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-serif text-slate-900 mb-8">
                                    {questions[currentStep].question}
                                </h3>

                                <div className="grid gap-3">
                                    {questions[currentStep].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className="w-full text-left p-4 md:p-5 border-2 border-stone-100 hover:border-blue-500 hover:bg-blue-50 rounded-xl font-medium text-slate-800 transition-colors flex justify-between items-center group"
                                        >
                                            <span className="pr-4">{option.label}</span>
                                            <div className="w-5 h-5 rounded-full border-2 border-stone-300 group-hover:border-blue-500 flex items-center justify-center flex-shrink-0">
                                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Results Screen */}
                        {currentStep === questions.length && (
                            <div className="p-8 md:p-10 overflow-y-auto text-center">
                                <div className="mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                        <MapPin className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h2 className="text-3xl font-serif text-slate-900">Your Perfect Matches</h2>
                                    <p className="text-slate-600 mt-2">Based on your answers, focus your search on these areas.</p>
                                </div>

                                <div className="space-y-4 mb-8 text-left">
                                    {results.map((result, idx) => {
                                        const profile = townProfiles[result.town] || { description: '' };
                                        return (
                                            <div key={idx} className="bg-stone-50 border border-stone-100 rounded-xl p-5 md:p-6">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="bg-slate-900 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                        {idx + 1}
                                                    </div>
                                                    <h3 className="text-xl md:text-2xl font-serif text-slate-900">{result.town}</h3>
                                                </div>
                                                <p className="text-slate-600 ml-10">
                                                    {profile.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-stone-100">
                                    <button
                                        onClick={scrollToData}
                                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                                    >
                                        View Area Data Below
                                    </button>
                                    <button
                                        onClick={() => { setCurrentStep(0); setAnswers({}); setResults([]); }}
                                        className="w-full sm:w-auto text-slate-500 font-medium hover:text-slate-800 px-6 py-3 flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Start Over
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
