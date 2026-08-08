import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Wine, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Radio, 
  Volume2, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { mockCocktails, mockFriends, mockTables } from '../data/mockData';

export default function ClubDetail({ 
  club, 
  onOpenGuestlistModal, 
  onOpenTableModal,
  chatMessages,
  onSendMessage 
}) {
  const [chatInput, setChatInput] = useState('');
  const [selectedTable, setSelectedTable] = useState(mockTables[1]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendMessage(chatInput);
    setChatInput('');
  };

  const event = club.tonightEvent || {
    title: 'Neon Pulse: Mumbai Underground Techno',
    headliner: 'Nucleya & Anyma',
    supporting: 'Lost Stories, Arjun Vagale',
    date: 'Tonight • Oct 24, 2024',
    time: '10:30 PM - 4:30 AM',
    artistBio: 'Relentless, high-energy sets and deep basslines.'
  };

  return (
    <main className="flex-grow pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[75vh] min-h-[520px] flex items-end">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${club.detailHeroImage || club.coverImage}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-fixed/30 bg-primary-fixed/10 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
            <span className="font-label-sm text-xs text-primary-fixed uppercase tracking-widest font-bold">
              Live Tonight • Mumbai
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-on-surface mb-2 text-glow max-w-4xl tracking-tight">
            {event.title}
          </h1>

          <p className="font-display text-xl md:text-2xl text-primary mb-6 max-w-2xl">
            Featured Artist: {event.headliner} <span className="text-on-surface-variant font-body text-sm ml-2">+ Supporting Acts</span>
          </p>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-3 text-on-surface-variant">
              <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary-fixed border border-white/10">
                <Calendar className="w-5 h-5 text-primary-fixed" />
              </div>
              <div>
                <p className="font-label-md text-xs text-on-surface font-semibold">{event.date}</p>
                <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-on-surface-variant">
              <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary-fixed border border-white/10">
                <MapPin className="w-5 h-5 text-primary-fixed" />
              </div>
              <div>
                <p className="font-label-md text-xs text-on-surface font-semibold">{club.name}</p>
                <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">{club.address}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => onOpenGuestlistModal(club)}
              className="bg-gradient-to-r from-primary-container to-primary-fixed-dim text-on-primary-container font-label-md text-sm px-8 py-3.5 rounded-full neon-glow hover:opacity-90 transition-opacity active:scale-95 duration-200 font-bold"
            >
              Join Free VIP Guestlist
            </button>
            <button 
              onClick={() => onOpenTableModal(selectedTable)}
              className="glass-card text-on-surface font-label-md text-sm px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors border border-white/20 active:scale-95 duration-200"
            >
              Book VIP Table
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Main Details & Floorplan) */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Live Atmosphere Gauge */}
          <section className="glass-card rounded-2xl p-6 relative overflow-hidden border border-white/10">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 rounded-full blur-[80px]"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="font-headline text-2xl font-semibold text-on-surface mb-1">Live Atmosphere</h2>
                <p className="font-body text-xs text-on-surface-variant">Real-time club capacity & Indian VIP network arrivals.</p>
              </div>
              
              <div className="flex items-center gap-6 bg-surface-container/60 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                <div className="text-right">
                  <p className="font-display text-3xl font-bold text-primary-fixed leading-none">{club.attendingCount}</p>
                  <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Attending</p>
                </div>
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwgWlSrSmVQDSVKOjjD_Cc7yBUXYkYbY_zSM4zi88nDmP4knScWKfCQ1UfIw9rhGlfUBIUoIgDXOfp5WkTKqteZ_EDa9rK7s_kGRbZQUQdAiXcgqqSPY0LJRzphgnmT-pIBhcmxRKc-jOcxtsXNqtAqbMOisC9390PUTHVDLnaoMxnQ3XKG24jUUkE5fEc23ivpmkrtZWfViRt9IdH9LVCIGZ9WF5wf6lEcmUfe96TmzcqVP4t-kamSg" alt="Attendee" />
                  <img className="w-10 h-10 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfkiBU7Lr_RXuG45g49ztLqS5JBy85wRajE0WCkpCXxgibOvagwSONmEAPHyZFZOxcOSKzfJqSzr_OF-QZM6daBj8mso6PV2aoYEJZ4UcIIdmWDMiD9c1I02C2ASEEZfISipZw55IsUkwwKiWfzQg1NyEELK86zxWbt0KI9yItm9KkW1TuC9wxZaurkPLoT4vQUphV5r5nJWL6Kgnku0miKTZKRam7hhf7OCNpEo6VTqsXsgGX1W3zMg" alt="Attendee" />
                  <img className="w-10 h-10 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC41j7QvbiUM2M52X-gZ1DrUjWTQBhajjdVdNzDVlrd9DGSOL5UFWjZM-svG45X0B_UuEgHpHxboGtmB0RU8eDAfD-wh7MYkotQ8YNT7qHmm9JPnOKj0bbin8EiC8vy1gM7qpUJb1yT_AH9Auqa7mq9odLeG34RtsRorpJOgRsGsE4BKv3LWqDVSZvsnkDieKqO_B6Wk_fTiI8dSfc-IRC-Mni4JHV1hD5LsFQt3qOal86J2BPaLdZt_Q" alt="Attendee" />
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-high flex items-center justify-center font-label-sm text-xs text-primary-fixed font-bold">
                    +84
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive VIP Table Picker */}
          <section className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-headline text-2xl font-semibold text-on-surface">Interactive VIP Seating Plan</h2>
                <p className="font-body text-xs text-on-surface-variant">Select an available table to view pricing & instant reserve in ₹.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary-container/20 text-primary-fixed font-label-sm text-xs border border-primary-fixed/30">
                Live Floorplan
              </span>
            </div>

            {/* Table Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {mockTables.map((table) => {
                const isSelected = selectedTable.id === table.id;
                const isOccupied = table.status === 'occupied';
                const isReserved = table.status === 'reserved';

                return (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTable(table)}
                    className={`p-4 rounded-xl text-left border transition-all relative ${
                      isSelected
                        ? 'bg-primary-container/20 border-primary-fixed text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                        : isOccupied
                        ? 'bg-surface-container-lowest/40 border-white/5 opacity-50 cursor-not-allowed'
                        : isReserved
                        ? 'bg-secondary-container/10 border-secondary/30 text-secondary'
                        : 'bg-surface-container-high/40 border-white/10 hover:border-white/30 text-on-surface'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-label-sm text-xs font-bold">{table.id}</span>
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        isOccupied ? 'bg-error' : isReserved ? 'bg-secondary' : 'bg-primary-fixed animate-pulse'
                      }`}></span>
                    </div>
                    <p className="font-label-md text-xs font-semibold truncate">{table.name}</p>
                    <p className="font-body text-[11px] text-on-surface-variant mt-1">₹{table.minSpend.toLocaleString()} Min Spend</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Table Detail Card */}
            {selectedTable && (
              <div className="bg-surface-container-high/50 p-5 rounded-xl border border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline text-lg text-white font-semibold">{selectedTable.name}</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-surface-variant text-primary-fixed border border-primary-fixed/20">
                      {selectedTable.zone}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Limit: {selectedTable.capacity} VIP Guests • Status: <span className="uppercase font-bold text-primary-fixed">{selectedTable.status}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="text-right">
                    <p className="font-display text-xl font-bold text-primary-fixed">₹{selectedTable.minSpend.toLocaleString()}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase">Min Bottle Spend</p>
                  </div>
                  <button 
                    disabled={selectedTable.status === 'occupied'}
                    onClick={() => onOpenTableModal(selectedTable)}
                    className={`px-6 py-2.5 rounded-xl font-label-md text-xs font-bold transition-all ${
                      selectedTable.status === 'occupied'
                        ? 'bg-white/10 text-on-surface-variant cursor-not-allowed'
                        : 'gradient-btn hover:opacity-90 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    }`}
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Artist Spotlight */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <h2 className="font-headline text-2xl font-semibold text-on-surface whitespace-nowrap">Artist Spotlight</h2>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="relative rounded-2xl overflow-hidden group h-[380px] border border-white/10">
                <img 
                  src={event.artistImage || club.coverImage} 
                  alt={event.headliner} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-headline text-3xl text-on-surface font-semibold mb-1">{event.headliner}</h3>
                  <p className="font-label-sm text-xs text-primary-fixed uppercase tracking-widest font-bold">Headliner</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 flex flex-col justify-center border border-white/10">
                <div className="flex items-center gap-3 text-primary-fixed mb-4">
                  <Volume2 className="w-6 h-6 text-primary-fixed" />
                  <span className="font-label-sm text-xs uppercase tracking-widest text-primary-fixed font-bold">Live DJ Set</span>
                </div>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
                  {event.artistBio}
                </p>
                <a 
                  href="#" 
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 text-primary-fixed font-label-md text-xs hover:text-primary transition-colors font-bold"
                >
                  Listen to Latest Live Mix <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* Premium Offerings */}
          <section>
            <h2 className="font-headline text-2xl font-semibold text-on-surface mb-6">Premium Bottle Service & Artisanal Cocktails</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockCocktails.map((drink) => (
                <div key={drink.id} className="glass-card rounded-xl p-4 flex gap-4 items-center hover:bg-white/10 transition-colors border border-white/10">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-surface-container-high flex items-center justify-center text-primary-fixed">
                    {drink.image ? (
                      <img src={drink.image} alt={drink.name} className="w-full h-full object-cover" />
                    ) : (
                      <Wine className="w-7 h-7 text-primary-fixed" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-label-md text-sm text-on-surface font-semibold mb-0.5">{drink.name}</h4>
                    <p className="font-body text-xs text-on-surface-variant line-clamp-1">{drink.description}</p>
                    <p className="font-label-sm text-xs text-primary-fixed font-bold mt-1">₹{drink.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar (Community & Live Chat) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 border border-white/10 sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-xl text-on-surface font-semibold">Who's Going</h3>
              <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-xs px-3 py-1 rounded-full border border-white/10">
                Network
              </span>
            </div>

            {/* Network Friends List */}
            <div className="flex flex-col gap-4 mb-6">
              {mockFriends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {friend.avatar ? (
                        <img src={friend.avatar} alt={friend.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant border border-white/10">
                          <Users className="w-4 h-4" />
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary-fixed rounded-full border-2 border-surface"></div>
                    </div>
                    <div>
                      <p className="font-label-md text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">{friend.name}</p>
                      <p className="font-body text-[11px] text-on-surface-variant">{friend.table}</p>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary-fixed transition-colors p-1">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Live Event Chat Preview */}
            <div className="bg-surface-container-lowest/50 rounded-xl p-4 border border-white/10 mb-4">
              <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-secondary animate-pulse" />
                Live Event Chat Room
              </p>
              
              <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto custom-scrollbar pr-1 mb-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="text-xs">
                    <span className={`font-bold ${msg.color} mr-1.5`}>{msg.user}:</span>
                    <span className="text-on-surface">{msg.message}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Say something to guests..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-surface-container/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-on-surface placeholder-on-surface-variant/50 focus:border-primary-fixed focus:ring-0"
                />
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-primary-container/20 text-primary-fixed hover:bg-primary-container/40 transition-colors text-xs font-bold">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
