import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Ticket, 
  Share2, 
  Heart, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Info,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Send
} from 'lucide-react';

export default function ClubDetail({ 
  club, 
  onOpenGuestlistModal, 
  onOpenTableModal,
  chatMessages,
  onSendMessage 
}) {
  const [activeTab, setActiveTab] = useState('about');
  const [userChatInput, setUserChatInput] = useState('');

  if (!club) return null;

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userChatInput.trim()) return;
    onSendMessage(userChatInput.trim());
    setUserChatInput('');
  };

  return (
    <main className="pt-20 sm:pt-28 md:pt-32 px-4 sm:px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-8 pb-32 overflow-hidden">
      
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => window.history.back() || window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 text-xs font-bold text-primary-fixed hover:underline bg-primary-container/10 px-4 py-2 rounded-full border border-primary-fixed/30"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Experiences</span>
        </button>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors">
            <Heart className="w-4 h-4 text-secondary" />
          </button>
        </div>
      </div>

      {/* HERO SECTION MATCHING SCREENSHOT 2 */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Large Poster & Thumbnails (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 w-full">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/15 shadow-2xl bg-black w-full">
            <img 
              src={club.coverImage || club.detailHeroImage} 
              alt={club.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 border border-white/20">
              <Users className="w-3.5 h-3.5 text-primary-fixed" />
              <span>{club.attendingCount} Interested</span>
            </div>
          </div>

          {/* Thumbnail Gallery Row */}
          {club.thumbnails && club.thumbnails.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {club.thumbnails.map((img, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden h-24 border border-white/10 relative group cursor-pointer">
                  <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title, Quick Info Box & Action Button (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full min-w-0">
          
          {/* Header Title & Venue */}
          <div className="min-w-0 max-w-full">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-primary-container/20 border border-primary-fixed/40 text-primary-fixed text-xs font-bold uppercase tracking-wider">
                {club.vibe}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-on-surface-variant text-xs font-semibold">
                {club.tag}
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-3 break-words max-w-full">
              {club.name}
            </h1>
            
            <p className="text-xs sm:text-sm text-on-surface-variant flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary-fixed shrink-0" />
              <span className="truncate">{club.address || club.location}</span>
            </p>
          </div>

          {/* Quick Info Box */}
          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary-fixed">Quick Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-primary-fixed shrink-0 mt-0.5" />
                <div>
                  <p className="text-on-surface-variant font-semibold">Date & Time</p>
                  <p className="text-white font-bold">{club.dateTimeFull || club.dateLabel || 'Tonight • 10:30 PM'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Ticket className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="text-on-surface-variant font-semibold">Category / Vibe</p>
                  <p className="text-white font-bold">{club.vibe} • {club.tag}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-tertiary-fixed-dim shrink-0 mt-0.5" />
                <div>
                  <p className="text-on-surface-variant font-semibold">Venue</p>
                  <p className="text-white font-bold">{club.venueName || club.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-primary-fixed shrink-0 mt-0.5" />
                <div>
                  <p className="text-on-surface-variant font-semibold">Price / Entry</p>
                  <p className="text-primary-fixed font-bold text-sm">{club.priceLabel || `₹${club.price || 1699}`}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onOpenGuestlistModal(club)}
              className="flex-1 gradient-btn py-4 rounded-2xl font-bold text-sm shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:opacity-90 transition-all text-center flex items-center justify-center gap-2"
            >
              <Ticket className="w-5 h-5" />
              <span>Select Tickets / Join Guestlist</span>
            </button>

            <button
              onClick={() => onOpenTableModal({ id: 'VIP-01', name: 'VIP Booth', zone: 'Stage Front', minSpend: 30000, capacity: 6 })}
              className="flex-1 glass-card py-4 rounded-2xl font-bold text-sm text-white hover:bg-white/10 transition-all border border-white/20 text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-secondary" />
              <span>Reserve VIP Table</span>
            </button>
          </div>

        </div>
      </section>

      {/* HIGHLIGHTS & EVENT DESCRIPTION SECTION */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <h2 className="font-headline text-2xl font-bold text-white">Event Overview & Highlights</h2>
        
        {club.highlights && club.highlights.length > 0 && (
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase text-primary-fixed tracking-wider">Highlights</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-on-surface">
              {club.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-primary-fixed shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="text-xs font-bold uppercase text-on-surface-variant tracking-wider mb-2">About The Experience</h3>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            {club.description}
          </p>
        </div>
      </section>

      {/* TERMS & CONDITIONS SECTION */}
      {club.termsConditions && (
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
          <h2 className="font-headline text-xl font-bold text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-secondary" />
            <span>Terms & Conditions</span>
          </h2>
          <ul className="list-disc list-inside space-y-2 text-xs text-on-surface-variant">
            {club.termsConditions.map((tc, idx) => (
              <li key={idx}>{tc}</li>
            ))}
          </ul>
        </section>
      )}

      {/* VENUE DETAILS & MAP GALLERY */}
      {club.venueDetails && (
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
          <h2 className="font-headline text-2xl font-bold text-white">Venue Information</h2>
          <div>
            <h3 className="text-lg font-bold text-primary-fixed">{club.venueDetails.name}</h3>
            <p className="text-xs text-on-surface-variant">{club.venueDetails.area}</p>
            <p className="text-xs text-on-surface mt-2">{club.venueDetails.description}</p>
          </div>

          {club.venueDetails.gallery && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {club.venueDetails.gallery.map((img, i) => (
                <img key={i} src={img} alt="Venue Photo" className="rounded-xl h-36 w-full object-cover border border-white/10" />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ARTIST / LINEUP SECTION */}
      {club.artist && (
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
          <h2 className="font-headline text-2xl font-bold text-white">Artist Lineup</h2>
          <div className="flex items-center gap-4">
            {club.artist.photos && club.artist.photos[0] && (
              <img src={club.artist.photos[0]} alt={club.artist.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary-fixed" />
            )}
            <div>
              <h3 className="text-lg font-bold text-white">{club.artist.name}</h3>
              <p className="text-xs text-primary-fixed font-semibold">{club.artist.role}</p>
              <p className="text-xs text-on-surface-variant mt-1">{club.artist.bio}</p>
            </div>
          </div>
        </section>
      )}

      {/* LIVE VIP COMMUNITY CHAT */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary-fixed" />
            <span>Live VIP Community Chat</span>
          </h2>
          <span className="text-[10px] uppercase font-bold text-primary-fixed bg-primary-container/20 px-2.5 py-1 rounded-full border border-primary-fixed/30">
            Live Stream
          </span>
        </div>

        <div className="bg-surface-container-lowest/60 rounded-2xl p-4 border border-white/10 max-h-48 overflow-y-auto space-y-2 text-xs custom-scrollbar">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-2">
              <span className={msg.color}>{msg.user}:</span>
              <span className="text-on-surface">{msg.message}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleChatSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message to the venue chat..."
            value={userChatInput}
            onChange={(e) => setUserChatInput(e.target.value)}
            className="flex-1 bg-surface-container-high/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-primary-fixed focus:ring-0"
          />
          <button 
            type="submit"
            className="gradient-btn px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </section>

    </main>
  );
}
