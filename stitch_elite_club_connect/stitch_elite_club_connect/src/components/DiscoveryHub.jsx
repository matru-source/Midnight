import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  MapPin, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Search,
  Music,
  CheckCircle
} from 'lucide-react';

export default function DiscoveryHub({ 
  clubs, 
  onSelectClub, 
  onOpenGuestlistModal,
  selectedCity 
}) {
  const [selectedVibe, setSelectedVibe] = useState('All Vibes');
  const [searchQuery, setSearchQuery] = useState('');

  const vibeOptions = [
    'All Vibes', 
    'Techno', 
    'Underground', 
    'House', 
    'Lounge', 
    'Rooftop', 
    'Jazz', 
    'RnB'
  ];

  const filteredClubs = clubs.filter((club) => {
    const matchesVibe = 
      selectedVibe === 'All Vibes' || 
      club.vibe.toLowerCase() === selectedVibe.toLowerCase() || 
      club.tag.toLowerCase() === selectedVibe.toLowerCase();
    
    const matchesSearch = 
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      club.vibe.toLowerCase().includes(searchQuery.toLowerCase()) || 
      club.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesVibe && matchesSearch;
  });

  const featuredClub = clubs.find(c => c.id === 'void-room') || clubs[0];

  return (
    <main className="pt-20 sm:pt-28 md:pt-32 px-4 sm:px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-6 sm:gap-10 pb-28 md:pb-32">
      {/* Hero Section: Trending Tonight */}
      <section className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] rounded-2xl overflow-hidden group shadow-2xl border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${featuredClub.coverImage}')` }}
        ></div>

        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 md:p-10 z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6">
          <div className="flex flex-col gap-2.5 sm:gap-4 max-w-2xl">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="glass-panel px-3 py-1 rounded-full font-label-sm text-[11px] sm:text-xs text-primary-fixed uppercase tracking-widest border-primary-fixed/50 neon-glow flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-primary-fixed" />
                Trending Tonight
              </span>
              <span className="glass-panel px-3 py-1 rounded-full font-label-sm text-[11px] sm:text-xs text-secondary uppercase tracking-widest border-secondary/50 font-bold">
                {featuredClub.vibe}
              </span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white text-glow tracking-tight leading-tight">
              {featuredClub.name}
            </h1>
            
            <p className="font-body text-xs sm:text-base md:text-lg text-on-surface-variant line-clamp-2 md:line-clamp-none max-w-xl">
              {featuredClub.description}
            </p>
          </div>

          <div className="flex flex-col items-stretch sm:items-end gap-3 sm:gap-4 w-full md:w-auto">
            <div className="flex items-center justify-between sm:justify-start gap-3 bg-surface-container/70 p-2.5 rounded-full border border-white/10 backdrop-blur-md">
              <div className="flex -space-x-3">
                <img className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbYqu6lq895DGop79x-FrcIjjFo_2bIbhBvclchAPcotsYJeOqKt4bXSBcgO4cHtQNAp3HOmWQn52RnNV2kfKBc5luOejsrxW9s56AwIzrR6jTOKkMikFWbVgjQ6B1UUxGGvcky8ygzMjhYkYW_f7kTYG_w9A2FJlVNtQAwhwfRFc_sGPacZWFfv3_f0qAcYvvHCsW74tbLEDONTalGwEKEqImiQL1OTaFKEkt5f8oqfLAHFuNIks-1w" alt="Attendee" />
                <img className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7FiTXGo44R1vTFDt4hErgtleO14zGa3ECIQni4QadmgT7DAjSLNBr-3DlHvoKhpinZTF6wKh9cFC5-337zZuhc3eGKRkSMtMpy9tOLL0-DhpuKlx9hMWFPV8tYa8dMph-iAvVcpcCRdVdCRxbFY6fi_StAnHA9u8UQh6kbGt_wLEWwprNbm9c8E21S6eKDnDWAG3hZZ60exVX25mpgH7GpoiHLgdM8zovbHvSm-TrWyzxAYwxOLBS4g" alt="Attendee" />
                <img className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCuobWXU2Vlg2z7ZBGL9FhuAblWiOe2aLNVkRbNbC6zLPoHrkcfJTs6nkHQV1kgaaVxaZLtklIoKubKLuRvy11b8W-v4bS30SNa67hcQ1I-q6SfWIOL8kAiZHAtAG5vE8jGjq9CQDLwK5-vHDTZnRMAxv2PVELXT9s6rUrt7ZcfDO-CvtwUPtRYu9z0k7dr2-r0qRPpWxRhjOna9wr6oiATqbeBLIejDl2LfPzxo3-0LEJ0v3Fpj9NSA" alt="Attendee" />
              </div>
              <span className="font-label-sm text-xs text-primary-fixed font-bold pr-2">
                +{featuredClub.attendingCount} Attending
              </span>
            </div>

            <div className="flex gap-2.5 sm:gap-3 w-full md:w-auto">
              <button 
                onClick={() => onSelectClub(featuredClub)}
                className="glass-card text-on-surface font-label-md text-xs sm:text-sm px-4 sm:px-6 py-3 rounded-xl hover:bg-white/10 transition-colors border border-white/20 flex-1 md:flex-initial"
              >
                View Club
              </button>
              <button 
                onClick={() => onOpenGuestlistModal(featuredClub)}
                className="gradient-btn px-5 sm:px-7 py-3 rounded-xl font-label-md text-xs sm:text-sm hover:opacity-90 transition-opacity active:scale-95 shadow-[0_0_20px_rgba(0,240,255,0.3)] flex-1 md:flex-initial font-bold"
              >
                Join Guestlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search Toolbar */}
      <section className="flex flex-col md:flex-row gap-3 sm:gap-4 justify-between items-center z-30">
        {/* Vibe Selection Pills */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto hide-scrollbar pb-1.5 md:pb-0">
          {vibeOptions.map((vibe) => (
            <button
              key={vibe}
              onClick={() => setSelectedVibe(vibe)}
              className={`px-4 sm:px-5 py-2.5 rounded-full font-label-md text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedVibe === vibe
                  ? 'glass-card text-primary-fixed border-primary-fixed/50 neon-glow bg-primary-container/20 font-bold'
                  : 'glass-panel text-on-surface-variant hover:text-white hover:bg-white/10'
              }`}
            >
              {vibe}
            </button>
          ))}
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search venue or artist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low/60 backdrop-blur-md border border-white/10 focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed rounded-full pl-10 pr-4 py-2.5 text-xs text-on-surface placeholder-on-surface-variant/50 transition-colors"
          />
        </div>
      </section>

      {/* Grid of Clubs */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredClubs.map((club) => (
          <article 
            key={club.id}
            className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer border border-white/10 hover:border-primary-fixed/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div 
              onClick={() => onSelectClub(club)}
              className="relative h-52 sm:h-60 w-full overflow-hidden"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${club.coverImage}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent"></div>
              
              <div className="absolute top-3 right-3 glass-panel px-2.5 py-1 rounded-full font-label-sm text-[11px] text-white flex items-center gap-1.5 backdrop-blur-md border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-primary-fixed" />
                <span>{club.distance}</span>
              </div>
            </div>

            <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 flex-grow relative -mt-8 z-10">
              <div className="flex gap-2">
                <span className="px-2.5 py-0.5 rounded border border-secondary/40 text-secondary font-label-sm text-[10px] font-bold uppercase tracking-wider bg-surface/80 backdrop-blur">
                  {club.vibe}
                </span>
                <span className="px-2.5 py-0.5 rounded border border-white/20 text-on-surface-variant font-label-sm text-[10px] uppercase tracking-wider bg-surface/80 backdrop-blur">
                  {club.tag}
                </span>
              </div>

              <div>
                <h3 
                  onClick={() => onSelectClub(club)}
                  className="font-headline text-xl sm:text-2xl font-semibold text-white group-hover:text-primary-fixed transition-colors mb-1"
                >
                  {club.name}
                </h3>
                <p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {club.description}
                </p>
              </div>

              <div className="mt-auto pt-3 flex items-center justify-between border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-on-surface-variant" />
                  <span className="font-label-md text-xs text-on-surface font-medium">
                    {club.attendingCount} Going
                  </span>
                </div>
                
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => onSelectClub(club)}
                    className="px-2.5 py-1.5 rounded-lg font-label-sm text-xs text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => onOpenGuestlistModal(club)}
                    className="ghost-btn px-3 py-1.5 rounded-lg font-label-sm text-xs hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors font-bold"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
