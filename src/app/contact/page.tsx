import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#08080a] text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-electric-blue">
            Athlete Support
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase font-display tracking-tight text-white">
            Contact JERSFITT Plus
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Have questions about sizing, team kit bulk orders, or custom football apparel? Reach out to our performance team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#101118] border border-white/10 space-y-4">
              <h3 className="text-base font-bold uppercase text-white tracking-wider">
                Support Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-electric-blue/15 text-electric-blue flex items-center justify-center shrink-0 border border-electric-blue/30">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email Inquiries:</span>
                    <strong className="text-white">support@jersfitt.com</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-electric-blue/15 text-electric-blue flex items-center justify-center shrink-0 border border-electric-blue/30">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block">Matchday Hotline:</span>
                    <strong className="text-white">+91 98765 43210 (10 AM - 7 PM IST)</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-electric-blue/15 text-electric-blue flex items-center justify-center shrink-0 border border-electric-blue/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block">Fulfillment Hub:</span>
                    <strong className="text-white">Bengaluru Football Innovation Lab, Karnataka, India</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! Your message has been received by our athlete support team.');
              }}
              className="p-8 rounded-3xl bg-[#101118] border border-white/10 space-y-4 shadow-2xl"
            >
              <h3 className="text-base font-bold uppercase text-white tracking-wider mb-2">
                Send Us a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Pereira"
                    className="w-full px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="athlete@domain.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Question on jersey sizing or team order"
                  className="w-full px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can our matchday team help you?"
                  className="w-full px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-electric-blue text-black font-extrabold text-xs uppercase tracking-wider shadow-glow hover:bg-cyan-300 transition-colors flex items-center gap-2"
              >
                Send Message <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
