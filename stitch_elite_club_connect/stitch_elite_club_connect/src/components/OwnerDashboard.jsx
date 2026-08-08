import React, { useState } from 'react';
import { 
  Users, 
  IndianRupee, 
  Star, 
  UploadCloud, 
  Megaphone, 
  Plus, 
  FileText, 
  CheckCircle, 
  Layers, 
  ShieldCheck,
  TrendingUp,
  Image,
  Clock,
  Radio
} from 'lucide-react';
import { mockTables } from '../data/mockData';

export default function OwnerDashboard({ onShowNotification }) {
  const [tables, setTables] = useState(mockTables);
  const [posterTitle, setPosterTitle] = useState('');
  const [posterDate, setPosterDate] = useState('');
  const [posterTime, setPosterTime] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [sendPushNotification, setSendPushNotification] = useState(true);

  // Toggle Table status dynamically
  const handleToggleTable = (tableId) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id === tableId) {
          const nextStatus = 
            t.status === 'available' ? 'reserved' : 
            t.status === 'reserved' ? 'occupied' : 'available';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
    onShowNotification(`Table ${tableId} status updated successfully.`);
  };

  const handlePublishPoster = (e) => {
    e.preventDefault();
    if (!posterTitle) {
      onShowNotification('Please enter an event title for the promotional poster.');
      return;
    }
    onShowNotification(`Poster published for event "${posterTitle}"!`);
    setPosterTitle('');
    setPosterDate('');
    setPosterTime('');
  };

  const handlePublishAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementText.trim()) {
      onShowNotification('Please enter an announcement message.');
      return;
    }
    onShowNotification(`Announcement broadcasted to active attendees! ${sendPushNotification ? '(Push Sent)' : ''}`);
    setAnnouncementText('');
  };

  // Calculate live revenue from tables in Rupees
  const currentRevenue = tables.reduce((acc, t) => {
    return acc + (t.status === 'occupied' ? t.minSpend : t.status === 'reserved' ? t.minSpend * 0.5 : 0);
  }, 245000);

  return (
    <main className="pt-24 md:pt-28 px-margin-mobile md:px-margin-desktop pb-32 max-w-container-max mx-auto">
      {/* Header Banner */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-secondary font-label-sm">Live Owner Portal • Mumbai</span>
          </div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">The Void Room (BKC) Command</h1>
          <p className="text-on-surface-variant text-sm mt-1">Real-time metrics, table reservation controls & venue broadcasting.</p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => onShowNotification('Full nightly revenue report exported as PDF.')}
            className="bg-transparent border border-primary-fixed/50 text-primary-fixed px-5 py-2.5 rounded-full font-label-md text-xs hover:bg-primary-fixed/10 transition-colors"
          >
            Export GST Report
          </button>
          <button 
            onClick={() => onShowNotification('New Event Scheduler Form Opened.')}
            className="bg-gradient-to-r from-primary-container to-tertiary text-on-primary-fixed px-6 py-2.5 rounded-full font-label-md text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            <Plus className="w-4 h-4" />
            New Event
          </button>
        </div>
      </header>

      {/* Bento Grid Analytics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Attendance Card */}
        <div className="bg-white/[0.05] backdrop-blur-[20px] rounded-2xl border border-white/10 p-6 relative overflow-hidden group shadow-lg">
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-secondary-container/20 rounded-full blur-[40px] group-hover:bg-secondary-container/30 transition-colors"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary-fixed" />
              <h3 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-bold">Attendance</h3>
            </div>
            <span className="bg-secondary-container/20 text-secondary-fixed px-2.5 py-1 rounded text-[10px] font-bold border border-secondary-fixed/30 animate-pulse flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-secondary-fixed rounded-full inline-block"></span> LIVE DOOR SCAN
            </span>
          </div>
          <div className="relative z-10">
            <div className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-1">842 / 1,200</div>
            <div className="flex items-center gap-1.5 text-primary-fixed text-xs font-semibold">
              <TrendingUp className="w-4 h-4 text-primary-fixed" />
              <span>+12% vs last hour</span>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white/[0.05] backdrop-blur-[20px] rounded-2xl border border-white/10 p-6 relative overflow-hidden group shadow-lg">
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary-container/10 rounded-full blur-[40px] group-hover:bg-primary-container/20 transition-colors"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-primary-fixed" />
              <h3 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-bold">Nightly Revenue</h3>
            </div>
            <span className="text-xs text-primary-fixed font-bold">Live Sync</span>
          </div>
          <div className="relative z-10">
            <div className="font-display text-4xl md:text-5xl font-bold text-primary-fixed mb-1">
              ₹{currentRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-primary-fixed text-xs">
              <TrendingUp className="w-4 h-4 text-primary-fixed" />
              <span>Projected: ₹5,50,000 tonight</span>
            </div>
          </div>
        </div>

        {/* VIP Reach Card */}
        <div className="bg-white/[0.05] backdrop-blur-[20px] rounded-2xl border border-white/10 p-6 relative overflow-hidden group shadow-lg">
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-tertiary/10 rounded-full blur-[40px] group-hover:bg-tertiary/20 transition-colors"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-tertiary-fixed-dim" />
              <h3 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-bold">VIP Check-ins</h3>
            </div>
            <span className="text-xs text-tertiary-fixed font-bold">90% Full</span>
          </div>
          <div className="relative z-10">
            <div className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-3">45 / 50</div>
            <div className="w-full bg-surface-variant h-2.5 rounded-full overflow-hidden border border-white/10">
              <div className="bg-gradient-to-r from-tertiary-container to-tertiary-fixed-dim h-full rounded-full transition-all duration-500" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Table Floorplan Management Grid */}
      <section className="bg-surface-container-low/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-headline text-2xl font-semibold text-on-surface">Floorplan Table Control</h2>
            <p className="text-xs text-on-surface-variant">Click table boxes to toggle live status (Available → Reserved → Occupied).</p>
          </div>
          <div className="flex gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-primary-fixed"><span className="w-2.5 h-2.5 rounded-full bg-primary-fixed"></span> Available</span>
            <span className="flex items-center gap-1.5 text-secondary"><span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> Reserved</span>
            <span className="flex items-center gap-1.5 text-error"><span className="w-2.5 h-2.5 rounded-full bg-error"></span> Occupied</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {tables.map((t) => (
            <div
              key={t.id}
              onClick={() => handleToggleTable(t.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                t.status === 'occupied'
                  ? 'bg-error-container/20 border-error/30 text-white'
                  : t.status === 'reserved'
                  ? 'bg-secondary-container/20 border-secondary/40 text-secondary'
                  : 'bg-surface-container-high/60 border-primary-fixed/40 text-primary-fixed hover:bg-primary-container/20'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs">{t.id}</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-surface/50">{t.status}</span>
              </div>
              <p className="font-semibold text-sm truncate">{t.name}</p>
              <p className="text-[11px] text-on-surface-variant mt-1">{t.zone} • ₹{t.minSpend.toLocaleString()}</p>
              {t.client && <p className="text-[10px] text-white font-bold mt-1">Client: {t.client}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Management Center Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Promotional Poster Upload */}
        <div className="bg-surface-container-low/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-label-md text-xs text-primary-fixed uppercase tracking-widest font-bold">New Promotional Poster</h3>
            <Image className="w-5 h-5 text-on-surface-variant" />
          </div>

          <form onSubmit={handlePublishPoster} className="space-y-4">
            <div className="border-2 border-dashed border-outline-variant hover:border-primary-fixed/60 transition-colors rounded-xl h-44 flex flex-col items-center justify-center bg-surface/50 cursor-pointer group relative overflow-hidden">
              <UploadCloud className="w-10 h-10 text-on-surface-variant group-hover:text-primary-fixed transition-colors mb-2" />
              <p className="font-label-md text-xs text-on-surface-variant group-hover:text-on-surface transition-colors font-medium">
                Drag & Drop high-res event poster artwork
              </p>
              <p className="text-[10px] text-outline mt-1">JPEG, PNG or MP4 (Max 50MB)</p>
            </div>

            <div>
              <input
                type="text"
                placeholder="Event Title (e.g. Desi Cyber Techno: Midnight Edition)"
                value={posterTitle}
                onChange={(e) => setPosterTitle(e.target.value)}
                className="w-full bg-surface/60 border-0 border-b border-white/20 focus:border-primary-fixed focus:ring-0 text-on-surface placeholder-on-surface-variant/50 px-0 py-2.5 text-sm transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={posterDate}
                onChange={(e) => setPosterDate(e.target.value)}
                className="w-full bg-surface/60 border-0 border-b border-white/20 focus:border-primary-fixed focus:ring-0 text-on-surface px-0 py-2 text-xs transition-colors [color-scheme:dark]"
              />
              <input
                type="time"
                value={posterTime}
                onChange={(e) => setPosterTime(e.target.value)}
                className="w-full bg-surface/60 border-0 border-b border-white/20 focus:border-primary-fixed focus:ring-0 text-on-surface px-0 py-2 text-xs transition-colors [color-scheme:dark]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-container to-primary-fixed text-on-primary-fixed py-3 rounded-xl font-label-md text-xs font-bold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,240,255,0.2)] mt-2"
            >
              Publish Poster
            </button>
          </form>
        </div>

        {/* Live Announcements */}
        <div className="bg-surface-container-low/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-label-md text-xs text-secondary-fixed uppercase tracking-widest font-bold">Live Community Announcement</h3>
            <Megaphone className="w-5 h-5 text-on-surface-variant" />
          </div>

          <form onSubmit={handlePublishAnnouncement} className="flex-1 flex flex-col space-y-4">
            <textarea
              placeholder="Broadcast an instant message to all active club attendees..."
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full flex-1 bg-surface/60 border border-white/10 focus:border-secondary-fixed focus:ring-0 text-on-surface placeholder-on-surface-variant/50 p-4 rounded-xl resize-none min-h-[140px] text-xs transition-colors"
            ></textarea>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setAnnouncementText('🍸 2-for-1 Cardamom Midnight Mule Special at the BKC Main Bar for the next 30 minutes!')}
                className="border border-secondary-fixed/50 text-secondary-fixed px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-secondary-fixed/10 transition-colors"
              >
                Drink Special
              </button>
              <button
                type="button"
                onClick={() => setAnnouncementText('🎧 Headliner Nucleya & Anyma taking the stage in 15 minutes! Prepare your vibe.')}
                className="border border-secondary-fixed/50 text-secondary-fixed px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-secondary-fixed/10 transition-colors"
              >
                DJ Stage Update
              </button>
              <button
                type="button"
                onClick={() => setAnnouncementText('⭐ Emperor Suite 05 Bottle Service celebration is now live. VIP wristband check at Deck entrance.')}
                className="border border-secondary-fixed/50 text-secondary-fixed px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-secondary-fixed/10 transition-colors"
              >
                VIP Notice
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
              <label className="flex items-center gap-2 text-xs text-on-surface-variant cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendPushNotification}
                  onChange={(e) => setSendPushNotification(e.target.checked)}
                  className="rounded border-white/20 bg-surface/50 text-secondary-container focus:ring-secondary-fixed"
                />
                <span>Send Push Notification</span>
              </label>

              <button
                type="submit"
                className="bg-transparent border border-secondary-fixed text-secondary-fixed hover:bg-secondary-fixed/10 py-2.5 px-6 rounded-xl font-label-md text-xs font-bold transition-colors"
              >
                Post Now
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
