'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the built-in towel in JERSFITT Plus work?',
      a: 'A dedicated anti-microbial microfiber terry panel is discreetly sewn into the inner lower hemline of the jersey. When sweat drips into your eyes or obscures your vision during play, you simply flip up the bottom corner of your jersey for an instant, super-soft wipe without disrupting game momentum.',
    },
    {
      q: 'Does the built-in towel make the jersey bulky or heavy?',
      a: 'Not at all. The microfiber panel is ultra-thin and lightweight (adding less than 15 grams total). The jersey maintains the identical sleek drape, breathability, and weight of elite professional kits.',
    },
    {
      q: 'How does the Quick-Dry fabric perform under intense football match conditions?',
      a: 'JERSFITT Plus uses high-density hydro-filament aeromesh. It accelerates moisture transport from your skin to the outside fabric surface, allowing sweat to vaporize up to 3x faster than traditional polyester jerseys.',
    },
    {
      q: 'How should I wash and care for my JERSFITT Plus jersey?',
      a: 'Machine wash cold (30°C) with like colors on a gentle cycle. Do not use chemical fabric softeners on the microfiber towel area, and hang dry in the shade to preserve the moisture-wicking and quick-dry filaments.',
    },
    {
      q: 'What payment methods are supported?',
      a: 'We support all major Indian payment options including UPI (Google Pay, PhonePe, Paytm, BHIM, Cred), Debit & Credit cards (Visa, Mastercard, RuPay), NetBanking, and Cash on Delivery (COD).',
    },
    {
      q: 'What is the delivery timeline and exchange policy?',
      a: 'We deliver nationwide across India in 2–5 business days. Free shipping is provided for all orders above ₹1,499. We also offer a 7-day easy size exchange guarantee if your kit does not fit perfectly.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-electric-blue/15 border border-electric-blue/30 text-electric-blue flex items-center justify-center mx-auto mb-2 shadow-glow">
            <HelpCircle className="w-6 h-6" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-electric-blue">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight text-white">
            Everything You Need To Know
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Answers regarding our football jersey technology, sizing, shipping, and care.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#101118] border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white uppercase font-display">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-electric-blue shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
