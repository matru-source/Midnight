import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  IndianRupee, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Eye, 
  TrendingUp, 
  Gavel, 
  AlertTriangle, 
  BarChart3,
  Search,
  Sparkles
} from 'lucide-react';
import { mockPendingClubs, mockModerationFlags } from '../data/mockData';

export default function AdminControlPanel({ onShowNotification }) {
  const [pendingClubs, setPendingClubs] = useState(mockPendingClubs);
  const [moderationFlags, setModerationFlags] = useState(mockModerationFlags);
  const [activeChartRange, setActiveChartRange] = useState('7D');

  const handleApproveClub = (clubId, clubName) => {
    setPendingClubs((prev) => prev.filter((c) => c.id !== clubId));
    onShowNotification(`Club "${clubName}" has been verified & approved across India!`);
  };

  const handleDeclineClub = (clubId, clubName) => {
    setPendingClubs((prev) => prev.filter((c) => c.id !== clubId));
    onShowNotification(`Application for "${clubName}" was declined.`);
  };

  const handleResolveFlag = (flagId) => {
    setModerationFlags((prev) => prev.filter((f) => f.id !== flagId));
    onShowNotification('Moderation incident resolved and logged in security ledger.');
  };

  return (
    <main className="pt-24 md:pt-28 px-margin-mobile md:px-margin-desktop pb-32 max-w-container-max mx-auto">
      {/* Dashboard Header */}
      <section className="space-y-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary-fixed font-label-sm">India Admin Control Center</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">Platform Command</h1>
          <p className="font-body text-sm text-on-surface-variant mt-1 max-w-2xl">
            Global overview of Midnight Premium Indian nightlife operations, venue verification, and security moderation.
          </p>
        </div>

        {/* Global Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group border border-white/10 shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <Building2 className="w-12 h-12 text-primary-container" />
            </div>
            <p className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant mb-2 font-bold">Verified Indian Venues</p>
            <p className="font-display text-4xl font-bold text-white">342</p>
            <div className="mt-4 flex items-center gap-1.5 text-primary-fixed text-xs font-semibold">
              <TrendingUp className="w-4 h-4 text-primary-fixed" />
              <span>+12 approved this month</span>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group border border-white/10 shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <Users className="w-12 h-12 text-secondary" />
            </div>
            <p className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant mb-2 font-bold">Monthly Active VIP Members</p>
            <p className="font-display text-4xl font-bold text-white">184.5k</p>
            <div className="mt-4 flex items-center gap-1.5 text-primary-fixed text-xs font-semibold">
              <TrendingUp className="w-4 h-4 text-primary-fixed" />
              <span>+14.2% across Tier-1 Cities</span>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group neon-glow border border-primary-fixed/40 shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <IndianRupee className="w-12 h-12 text-primary-container" />
            </div>
            <p className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant mb-2 font-bold">Platform GMV (Gross Value)</p>
            <p className="font-display text-4xl font-bold text-primary-fixed">₹18.4 Cr</p>
            <div className="mt-4 flex items-center gap-1.5 text-primary-fixed text-xs font-semibold">
              <TrendingUp className="w-4 h-4 text-primary-fixed" />
              <span>+24% QOQ growth in India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Club Verification Queue */}
        <section className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col min-h-[480px] border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-headline text-2xl text-white font-semibold">Club Verification Queue</h3>
              <p className="text-xs text-on-surface-variant">Review new venue applications requiring admin clearance in India.</p>
            </div>
            <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full font-label-sm text-xs font-bold border border-error/30">
              {pendingClubs.length} Pending
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
            {pendingClubs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center border border-dashed border-white/10 rounded-xl">
                <CheckCircle className="w-10 h-10 text-primary-fixed mb-2" />
                <p className="text-sm font-semibold text-white">All Indian Club Applications Cleared!</p>
                <p className="text-xs text-on-surface-variant mt-1">No pending venues requiring verification.</p>
              </div>
            ) : (
              pendingClubs.map((club) => (
                <div 
                  key={club.id} 
                  className="bg-surface-container-high/50 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant overflow-hidden shrink-0 border border-white/10">
                      {club.image ? (
                        <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className="w-6 h-6 text-primary-fixed" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-label-md text-sm text-white font-bold">{club.name}</h4>
                      <p className="font-body text-xs text-on-surface-variant">{club.city} • Capacity: {club.capacity}</p>
                      <p className="font-label-sm text-[11px] text-primary-fixed mt-0.5">{club.submittedTime}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <button 
                      onClick={() => onShowNotification(`Reviewing detailed GST license documentation for ${club.name}.`)}
                      className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeclineClub(club.id, club.name)}
                      className="px-3.5 py-2 rounded-lg bg-error-container/30 text-error hover:bg-error-container/60 transition-colors font-label-md text-xs font-bold border border-error/30"
                    >
                      Decline
                    </button>
                    <button 
                      onClick={() => handleApproveClub(club.id, club.name)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-container to-on-primary-container text-on-primary font-label-md text-xs font-bold hover:opacity-90 transition-opacity shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Moderation Center */}
        <section className="glass-card rounded-2xl p-6 flex flex-col min-h-[480px] border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-headline text-2xl text-white font-semibold">Moderation Center</h3>
              <p className="text-xs text-on-surface-variant">Live safety & incident reports.</p>
            </div>
            <Gavel className="w-5 h-5 text-secondary" />
          </div>

          <div className="flex-1 space-y-4">
            {moderationFlags.length === 0 ? (
              <div className="p-6 text-center text-xs text-on-surface-variant">No active security flags requiring action.</div>
            ) : (
              moderationFlags.map((flag) => (
                <div 
                  key={flag.id}
                  className={`p-4 rounded-xl border ${
                    flag.severity === 'high' 
                      ? 'bg-error-container/20 border-error/30' 
                      : 'bg-surface-container-high/40 border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className={`font-label-sm text-[10px] uppercase font-bold tracking-wider ${
                      flag.severity === 'high' ? 'text-error' : 'text-on-surface-variant'
                    }`}>
                      {flag.type}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">{flag.timestamp}</span>
                  </div>
                  <p className="font-body text-xs text-white mb-3 leading-relaxed">{flag.description}</p>
                  <button 
                    onClick={() => handleResolveFlag(flag.id)}
                    className="w-full py-2 rounded-lg border border-white/20 text-xs font-bold text-primary-fixed hover:bg-primary-container/10 transition-colors"
                  >
                    Resolve & Dismiss Flag
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* System Wide Stats & Engagement Trends */}
      <section className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h3 className="font-headline text-2xl text-white font-semibold">System Engagement Trends</h3>
            <p className="text-xs text-on-surface-variant">Active user logins & guestlist conversions across Indian cities.</p>
          </div>
          
          <div className="flex gap-2 bg-surface-container-lowest/60 p-1 rounded-full border border-white/10">
            {['7D', '30D', 'YTD'].map((range) => (
              <button
                key={range}
                onClick={() => setActiveChartRange(range)}
                className={`px-4 py-1.5 rounded-full font-label-sm text-xs font-bold transition-all ${
                  activeChartRange === range
                    ? 'bg-primary-container/30 text-primary-fixed border border-primary-fixed/40 neon-glow'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-60 w-full relative border-l border-b border-white/15 flex items-end justify-between pt-4 pr-4 pl-2">
          {/* Y Axis Guide Lines */}
          <div className="absolute left-0 right-0 top-1/4 border-b border-white/5"></div>
          <div className="absolute left-0 right-0 top-2/4 border-b border-white/5"></div>
          <div className="absolute left-0 right-0 top-3/4 border-b border-white/5"></div>

          {/* Chart Bars */}
          {[
            { day: 'Mon', val: '35%', num: '14.2k' },
            { day: 'Tue', val: '50%', num: '18.1k' },
            { day: 'Wed', val: '45%', num: '16.5k' },
            { day: 'Thu', val: '68%', num: '24.4k' },
            { day: 'Fri', val: '92%', num: '44.2k', highlight: true },
            { day: 'Sat', val: '98%', num: '52.8k', highlight: true },
            { day: 'Sun', val: '60%', num: '27.9k' }
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end px-1">
              <div className="text-[10px] text-primary-fixed mb-1 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                {bar.num}
              </div>
              <div 
                style={{ height: bar.val }}
                className={`w-full rounded-t-md transition-all duration-500 ${
                  bar.highlight 
                    ? 'bg-gradient-to-t from-secondary/40 to-secondary neon-glow-magenta'
                    : 'bg-gradient-to-t from-primary-container/20 to-primary-container/80 group-hover:bg-primary-fixed'
                }`}
              ></div>
              <span className="text-[11px] text-on-surface-variant mt-2">{bar.day}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
