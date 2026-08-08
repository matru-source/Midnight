import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  MapPin, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Search,
  Music,
  CheckCircle,
  Filter,
  Calendar,
  X,
  UserCheck
} from 'lucide-react';

export default function DiscoveryHub({ 
  clubs, 
  onSelectClub, 
  onOpenGuestlistModal,
  selectedCity,
  onOpenFilterModal,
  selectedFilters,
  onClearFilters
}) {
  const [activeDateFilter, setActiveDateFilter] = useState('All');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Quick Pills from Screenshots
  const datePills = [
    { label: 'Today', count: 81 },
    { label: 'Tomorrow', count: 86 },
    { label: 'This Weekend', count: 146 }
  ];

  const categoryPills = [
    { label: 'Dj Night', count: 105 },
    { label: 'Bollywood Night', count: 99 },
    { label: 'Ladies Night', count: 51 },
    { label: 'Offers', count: 50 },
    { label: 'Commercial', count: 49 },
    { label: 'Workshops & Classes', count: 45 },
    { label: 'Bolly-Tech', count: 23 },
    { label: 'Regional Music', count: 23 }
  ];

  const totalActiveFiltersCount = 
    (selectedFilters?.dates?.length || 0) + 
    (selectedFilters?.locations?.length || 0) + 
    (selectedFilters?.categories?.length || 0) + 
    (selectedFilters?.tags?.length || 0) + 
    (activeDateFilter !== 'All' ? 1 : 0) + 
    (activeCategoryFilter !== 'All' ? 1 : 0);

  const filteredClubs = clubs.filter((club) => {
    // Quick Category Filter
    if (activeCategoryFilter !== 'All') {
      const catLower = activeCategoryFilter.toLowerCase();
      const clubVibeLower = club.vibe.toLowerCase();
      const clubTagLower = club.tag.toLowerCase();
      const clubDescLower = club.description.toLowerCase();
      if (!clubVibeLower.includes(catLower) && !clubTagLower.includes(catLower) && !clubDescLower.includes(catLower)) {
        return false;
      }
    }

    // Modal Filters (Categories)
    if (selectedFilters?.categories?.length > 0) {
      const matchCat = selectedFilters.categories.some(c => 
        club.vibe.toLowerCase().includes(c.toLowerCase()) || 
        club.tag.toLowerCase().includes(c.toLowerCase())
      );
      if (!matchCat) return false;
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        club.name.toLowerCase().includes(q) || 
        club.vibe.toLowerCase().includes(q) || 
        club.description.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    return true;
  });

  return (
    <main className="pt-20 sm:pt-28 md:pt-32 px-4 sm:px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-6 sm:gap-8 pb-28 md:pb-32">
      
      {/* FILTER BAR SYSTEM MATCHING USER SCREENSHOTS */}
      <section className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col gap-4">
        
        {/* Top Row: Search Input & Advanced "Filters" Modal Button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search event, venue, artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-high/60 border border-white/10 focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed rounded-full pl-10 pr-4 py-2.5 text-xs text-on-surface placeholder-on-surface-variant/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {totalActiveFiltersCount > 0 && (
              <button
                onClick={() => {
                  setActiveDateFilter('All');
                  setActiveCategoryFilter('All');
                  onClearFilters();
                }}
                className="text-xs text-error hover:underline flex items-center gap-1 font-bold"
              >
                <X className="w-3.5 h-3.5" />
                Clear Filters
              </button>
            )}

            {/* Filter Trigger Button matching Screenshot 1 */}
            <button
              onClick={onOpenFilterModal}
              className="flex items-center gap-2 bg-surface-container-high/80 hover:bg-white/15 text-white px-5 py-2.5 rounded-full border border-white/20 font-bold text-xs shadow-lg transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary-fixed" />
              <span>Filters</span>
              {totalActiveFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary-fixed text-black text-[10px] font-bold flex items-center justify-center">
                  {totalActiveFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Row 1: Date Quick Filter Pills (Matches Screenshot 1) */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button
            onClick={() => setActiveDateFilter('All')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              activeDateFilter === 'All'
                ? 'bg-white/15 border-white text-white font-bold'
                : 'bg-surface-container-high/30 border-white/10 text-on-surface-variant hover:text-white'
            }`}
          >
            All Dates
          </button>
          {datePills.map((item) => {
            const isSelected = activeDateFilter === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveDateFilter(isSelected ? 'All' : item.label)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-all flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? 'bg-white/15 border-white text-white font-bold shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                    : 'bg-surface-container-high/40 border-white/10 text-on-surface hover:bg-white/10'
                }`}
              >
                <span>{item.label}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px] text-on-surface-variant">
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Category Quick Filter Pills (Matches Screenshot 1) */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveCategoryFilter('All')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              activeCategoryFilter === 'All'
                ? 'bg-white/15 border-white text-white font-bold'
                : 'bg-surface-container-high/30 border-white/10 text-on-surface-variant hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categoryPills.map((item) => {
            const isSelected = activeCategoryFilter === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveCategoryFilter(isSelected ? 'All' : item.label)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-all flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? 'bg-white/15 border-white text-white font-bold shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                    : 'bg-surface-container-high/40 border-white/10 text-on-surface hover:bg-white/10'
                }`}
              >
                <span>{item.label}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px] text-on-surface-variant">
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Title Section matching Screenshot 1 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline text-2xl font-bold text-white tracking-tight">
            All Experiences in {selectedCity || 'Bangalore'}
          </h2>
          <p className="text-xs text-on-surface-variant">
            Parties, Concerts, Nightlife & Trips in {selectedCity || 'Bangalore'}
          </p>
        </div>
      </div>

      {/* GRID OF EVENT CARDS MATCHING SCREENSHOT 1 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredClubs.length === 0 ? (
          <div className="col-span-full py-12 text-center glass-card rounded-2xl p-8 border border-white/10">
            <SlidersHorizontal className="w-8 h-8 text-on-surface-variant mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg mb-1">No Experiences Found</h3>
            <p className="text-xs text-on-surface-variant mb-4">Try adjusting your filters or search keywords.</p>
            <button
              onClick={() => {
                setActiveDateFilter('All');
                setActiveCategoryFilter('All');
                setSearchQuery('');
                onClearFilters();
              }}
              className="gradient-btn px-6 py-2.5 rounded-full text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredClubs.map((event) => (
            <article 
              key={event.id}
              onClick={() => onSelectClub(event)}
              className="bg-[#121316] rounded-2xl overflow-hidden flex flex-col cursor-pointer border border-white/10 hover:border-primary-fixed/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl group relative"
            >
              {/* Event Poster Image (Aspect 4:5) */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
                <img 
                  src={event.coverImage} 
                  alt={event.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/30"></div>

                {/* Top Right Attendee Count Pill Badge matching Screenshot 1 */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1 border border-white/15">
                  <Users className="w-3 h-3 text-primary-fixed" />
                  <span>{event.attendingCount}</span>
                </div>

                {/* Top Left Vibe Pill Badge */}
                <div className="absolute top-3 left-3 bg-primary-fixed/20 border border-primary-fixed/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary-fixed">
                  {event.vibe}
                </div>
              </div>

              {/* Card Bottom Metadata Section matching Screenshot 1 */}
              <div className="p-4 flex flex-col gap-1.5 flex-1 bg-[#121316]">
                {/* Cyan Date Line */}
                <p className="text-xs font-bold text-primary-fixed uppercase tracking-wide">
                  {event.dateLabel || 'Aug 08'}
                </p>

                {/* Event Title Line */}
                <h3 className="font-headline text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-primary-fixed transition-colors">
                  {event.name}
                </h3>

                {/* Venue Location Line */}
                <p className="text-[11px] text-on-surface-variant line-clamp-1">
                  {event.address || event.location}
                </p>

                {/* Price Tag Line */}
                <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    {event.priceLabel || `₹${event.price || 1699}`}
                  </span>
                  <span className="text-[10px] font-semibold text-primary-fixed group-hover:underline flex items-center gap-1">
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
