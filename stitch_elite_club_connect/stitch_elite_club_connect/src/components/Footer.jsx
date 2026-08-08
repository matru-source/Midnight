import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail,
  ArrowRight
} from 'lucide-react';

export default function Footer({ onSwitchRole }) {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/10 pt-16 pb-24 md:pb-12 px-margin-mobile md:px-margin-desktop text-on-surface-variant">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-primary-fixed tracking-tight">
              Midnight Premium
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-primary-container/20 text-primary-fixed border border-primary-fixed/30">
              INDIA VIP
            </span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            India's premier invite-only nightlife & VIP table booking network across Mumbai, Bengaluru, Delhi NCR, and Goa.
          </p>
          <div className="flex gap-3 text-primary-fixed pt-1">
            <a href="#" onClick={(e) => e.preventDefault()} className="p-2 rounded-full glass-card hover:bg-white/10 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="p-2 rounded-full glass-card hover:bg-white/10 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="p-2 rounded-full glass-card hover:bg-white/10 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Cities Covered */}
        <div>
          <h4 className="font-label-md text-xs font-bold text-white uppercase tracking-wider mb-4">Indian Destinations</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-primary-fixed cursor-pointer">Mumbai (BKC & Lower Parel)</li>
            <li className="hover:text-primary-fixed cursor-pointer">Bengaluru (Indiranagar)</li>
            <li className="hover:text-primary-fixed cursor-pointer">Delhi NCR (CyberHub & Aerocity)</li>
            <li className="hover:text-primary-fixed cursor-pointer">Goa (Vagator & Anjuna)</li>
            <li className="hover:text-primary-fixed cursor-pointer">Hyderabad (Jubilee Hills)</li>
          </ul>
        </div>

        {/* Member Services */}
        <div>
          <h4 className="font-label-md text-xs font-bold text-white uppercase tracking-wider mb-4">Member Concierge</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-primary-fixed cursor-pointer">Free Fast-Pass Guestlists</li>
            <li className="hover:text-primary-fixed cursor-pointer">VIP Table Reservations</li>
            <li className="hover:text-primary-fixed cursor-pointer">Bottle Service Packages</li>
            <li className="hover:text-primary-fixed cursor-pointer">Private Chauffeur Escort</li>
            <li className="hover:text-primary-fixed cursor-pointer">24/7 Midnight Helpline</li>
          </ul>
        </div>

        {/* Partner & Admin Portals */}
        <div className="space-y-4">
          <h4 className="font-label-md text-xs font-bold text-white uppercase tracking-wider mb-4">Business & HQ Portals</h4>
          <p className="text-xs text-on-surface-variant">
            Own a premium nightlife venue or manage platform operations? Access dedicated portals below:
          </p>

          <div className="space-y-2 pt-1">
            <button
              onClick={() => onSwitchRole('owner')}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface-container-high/60 border border-white/10 hover:border-primary-fixed text-xs text-white transition-all group"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary-fixed" />
                <span className="font-semibold">Partner Console</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary-fixed transition-colors" />
            </button>

            <button
              onClick={() => onSwitchRole('admin')}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface-container-high/60 border border-white/10 hover:border-secondary text-xs text-white transition-all group"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span className="font-semibold">Admin Command HQ</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-secondary transition-colors" />
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-container-max mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-on-surface-variant/70 gap-4">
        <p>© 2026 Midnight Premium Technologies Pvt Ltd. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Privacy Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Terms of VIP Access</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">GST Compliance</a>
        </div>
      </div>
    </footer>
  );
}
