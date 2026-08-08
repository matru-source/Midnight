import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  Send, 
  Sparkles, 
  ArrowLeft, 
  Circle, 
  Search,
  Building2,
  Wine,
  Instagram,
  Briefcase,
  Heart,
  UserCheck,
  Volume2,
  Edit3
} from 'lucide-react';
import { mockClubs } from '../data/mockData';

export default function TalkyTalki({ 
  selectedCity, 
  onSelectClub, 
  talkyProfile, 
  onOpenProfileSetup 
}) {
  const [selectedChatClub, setSelectedChatClub] = useState(null); // null = list view; object = open club chat room
  const [messageInput, setMessageInput] = useState('');
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [activeMemberCard, setActiveMemberCard] = useState(null); // Member details popup

  // Sample club-wise chat messages and live members
  const [clubChatData, setClubChatData] = useState({
    'raghu-dixit-25': {
      onlineCount: 826,
      currentSet: 'Acoustic Folk Soundcheck Live',
      messages: [
        { id: 1, user: 'Aarav Sharma', instaId: '@aarav_bkc', designation: 'Tech Founder', drinkType: 'Alcoholic', text: 'Stage front lines moving super smooth! High energy!', time: '10m ago', isVIP: true },
        { id: 2, user: 'Priya Patel', instaId: '@priya_vibe', designation: 'Architect', drinkType: 'Non-Alcoholic', text: 'Anyone at Sahakar Nagar entry gate right now?', time: '7m ago', isVIP: false },
        { id: 3, user: 'Kabir Malhotra', instaId: '@kabir_m', designation: 'Venture Capitalist', drinkType: 'Alcoholic', text: 'Soundcheck sounds legendary! Get here early folks.', time: '2m ago', isVIP: true }
      ],
      members: [
        { 
          name: 'Rohan Sharma', 
          instaId: '@rohan_sharma_vip', 
          designation: 'Tech Founder & Investor', 
          passion: 'Folk Rock & Single Malts', 
          drinkType: 'Alcoholic', 
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', 
          role: 'VIP Member' 
        },
        { 
          name: 'Ananya Roy', 
          instaId: '@ananya_roy_designs', 
          designation: 'UI/UX Director', 
          passion: 'Acoustic & Artisanal Gin', 
          drinkType: 'Non-Alcoholic', 
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80', 
          role: 'VIP Member' 
        },
        { 
          name: 'Kabir Malhotra', 
          instaId: '@kabir_m', 
          designation: 'Music Producer', 
          passion: 'Live Drums & Bourbon', 
          drinkType: 'Alcoholic', 
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80', 
          role: 'VIP Member' 
        }
      ]
    },
    'necropsycho-live': {
      onlineCount: 657,
      currentSet: 'Necropsycho Dark Psy Intro',
      messages: [
        { id: 1, user: 'Karan Mehta', instaId: '@karan_psy', designation: 'Sound Engineer', drinkType: 'Non-Alcoholic', text: 'Funktion-One system is vibrating the floor!', time: '12m ago', isVIP: true }
      ],
      members: [
        { name: 'Karan Mehta', instaId: '@karan_psy', designation: 'Sound Engineer', passion: 'Psytrance & Espresso', drinkType: 'Non-Alcoholic', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80', role: 'VIP Member' }
      ]
    },
    'mafia-madness': {
      onlineCount: 776,
      currentSet: 'DJ Sukant Bolly-Tech Remix',
      messages: [
        { id: 1, user: 'Rohan M', instaId: '@rohan_m', designation: 'Creative Director', drinkType: 'Alcoholic', text: 'Secret speakeasy password working at door!', time: '15m ago', isVIP: true }
      ],
      members: [
        { name: 'Rohan M', instaId: '@rohan_m', designation: 'Creative Director', passion: 'Retro Speakeasy', drinkType: 'Alcoholic', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80', role: 'VIP Member' }
      ]
    },
    'void-room': {
      onlineCount: 1240,
      currentSet: 'Nucleya & Anyma Midnight Warehouse Set',
      messages: [
        { id: 1, user: 'Aarav Sharma', instaId: '@aarav_bkc', designation: 'Product Lead', drinkType: 'Alcoholic', text: 'VIP entry gate at BKC Annex is moving super fast!', time: '18m ago', isVIP: true },
        { id: 2, user: 'Priya Patel', instaId: '@priya_patel', designation: 'Architect', drinkType: 'Non-Alcoholic', text: 'Who is at the main bar right now? Drink specials live!', time: '14m ago', isVIP: false }
      ],
      members: [
        { name: 'Rohan Sharma', instaId: '@rohan_bkc', designation: 'Product Lead', passion: 'Melodic Techno', drinkType: 'Alcoholic', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', role: 'VIP Member' }
      ]
    }
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedChatClub) return;

    if (!talkyProfile) {
      onOpenProfileSetup();
      return;
    }

    const clubId = selectedChatClub.id;
    const newMsg = {
      id: Date.now(),
      user: talkyProfile.name || 'You (VIP)',
      instaId: talkyProfile.instaId || '',
      designation: talkyProfile.designation || 'VIP Member',
      drinkType: talkyProfile.drinkType || 'Alcoholic',
      text: messageInput.trim(),
      time: 'Just now',
      isVIP: true
    };

    setClubChatData((prev) => ({
      ...prev,
      [clubId]: {
        ...prev[clubId],
        messages: [...(prev[clubId]?.messages || []), newMsg]
      }
    }));

    setMessageInput('');
  };

  const filteredClubList = mockClubs.filter(c => 
    c.name.toLowerCase().includes(chatSearchQuery.toLowerCase()) || 
    c.location.toLowerCase().includes(chatSearchQuery.toLowerCase()) || 
    c.vibe.toLowerCase().includes(chatSearchQuery.toLowerCase())
  );

  return (
    <main className="pt-20 sm:pt-28 md:pt-32 px-4 sm:px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-6 pb-32">
      
      {/* Talky Talky Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Club Member Network
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Talky Talky
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Club-wise members joining tonight in <span className="text-primary-fixed font-bold">{selectedCity || 'All India'}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* User Profile Card Status Pill */}
          <button
            onClick={onOpenProfileSetup}
            className="flex items-center gap-2 bg-surface-container-high/80 hover:bg-white/15 px-4 py-2 rounded-full border border-white/20 text-xs font-bold text-white transition-all shadow-lg"
          >
            {talkyProfile ? (
              <>
                <img src={talkyProfile.avatar} alt="Profile" className="w-5 h-5 rounded-full object-cover border border-primary-fixed" />
                <span>{talkyProfile.name}</span>
                <span className="text-[10px] text-primary-fixed">({talkyProfile.drinkType === 'Alcoholic' ? '🍷 Alcoholic' : '🍹 Non-Alcoholic'})</span>
                <Edit3 className="w-3.5 h-3.5 text-on-surface-variant ml-1" />
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4 text-primary-fixed" />
                <span>Create Talky Profile</span>
              </>
            )}
          </button>

          {selectedChatClub && (
            <button
              onClick={() => setSelectedChatClub(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-primary-fixed hover:underline bg-primary-container/10 px-4 py-2 rounded-full border border-primary-fixed/30"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Club Directory</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: CLUB-WISE MEMBERS DIRECTORY */}
      {!selectedChatClub && (
        <div className="flex flex-col gap-6">
          {/* Search Chat Room Input */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search club chat room..."
              value={chatSearchQuery}
              onChange={(e) => setChatSearchQuery(e.target.value)}
              className="w-full bg-surface-container-high/60 border border-white/10 focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-on-surface-variant/50"
            />
          </div>

          {/* Club Chat Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredClubList.map((club) => {
              const data = clubChatData[club.id] || {
                onlineCount: club.attendingCount || 250,
                currentSet: 'Live Set Stream Active',
                messages: [{ id: 1, user: 'VIP Member', text: 'Great vibe tonight at venue!', time: '15m ago', isVIP: true }],
                members: []
              };

              return (
                <div
                  key={club.id}
                  onClick={() => {
                    if (!talkyProfile) {
                      onOpenProfileSetup();
                    }
                    setSelectedChatClub(club);
                  }}
                  className="glass-card rounded-2xl p-5 border border-white/10 hover:border-primary-fixed/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 shrink-0">
                        <img src={club.coverImage} alt={club.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h3 className="font-headline text-base font-bold text-white group-hover:text-primary-fixed transition-colors line-clamp-1">
                          {club.name}
                        </h3>
                        <p className="text-[11px] text-on-surface-variant line-clamp-1">{club.address || club.location}</p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-500/30 shrink-0">
                      <Circle className="w-2 h-2 fill-emerald-400 animate-pulse" />
                      <span>{data.onlineCount} Online</span>
                    </span>
                  </div>

                  {/* Current Playing / Active Set */}
                  <div className="bg-surface-container-lowest/60 rounded-xl p-3 border border-white/5 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-primary-fixed font-bold text-[11px]">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Now Live: {data.currentSet}</span>
                    </div>
                    <p className="text-on-surface-variant text-[11px] line-clamp-1 italic">
                      "{data.messages[data.messages.length - 1]?.text || 'Welcome to club chat!'}"
                    </p>
                  </div>

                  {/* Open Chat Room Button */}
                  <button className="w-full py-2.5 rounded-xl gradient-btn font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    <MessageSquare className="w-4 h-4" />
                    <span>Open Club Talky Room</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: INDIVIDUAL CLUB TALKY CHAT ROOM */}
      {selectedChatClub && (
        <div className="glass-card rounded-3xl border border-white/15 p-6 sm:p-8 flex flex-col lg:flex-row gap-6 shadow-2xl">
          
          {/* Main Chat Box Area (Left 8 Cols) */}
          <div className="flex-1 flex flex-col gap-4">
            
            {/* Chat Room Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-primary-fixed">
                  <img src={selectedChatClub.coverImage} alt={selectedChatClub.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-headline text-xl font-bold text-white">{selectedChatClub.name}</h2>
                  <p className="text-xs text-primary-fixed font-semibold flex items-center gap-2">
                    <span>🔴 Live Talky Room</span>
                    <span>•</span>
                    <span>{(clubChatData[selectedChatClub.id]?.onlineCount || 250)} Members Joined</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectClub(selectedChatClub)}
                className="text-xs text-on-surface-variant hover:text-white underline font-medium"
              >
                View Details
              </button>
            </div>

            {/* Chat Messages Stream */}
            <div className="bg-surface-container-lowest/80 rounded-2xl p-4 sm:p-6 border border-white/10 h-[380px] overflow-y-auto space-y-4 custom-scrollbar">
              {(clubChatData[selectedChatClub.id]?.messages || []).map((msg) => (
                <div key={msg.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-primary-fixed">{msg.user}</span>
                    {msg.instaId && <span className="text-[10px] text-secondary font-medium">{msg.instaId}</span>}
                    {msg.designation && <span className="text-[10px] text-on-surface-variant">• {msg.designation}</span>}
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-on-surface-variant">
                      {msg.drinkType === 'Alcoholic' ? '🍷 Alcoholic' : '🍹 Non-Alcoholic'}
                    </span>
                    <span className="text-[10px] text-on-surface-variant/60 ml-auto">{msg.time}</span>
                  </div>
                  <div className="bg-surface-container-high/60 border border-white/10 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs text-white max-w-md w-fit">
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder={talkyProfile ? `Message as ${talkyProfile.name}...` : "Click to setup profile and chat..."}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onClick={() => {
                  if (!talkyProfile) onOpenProfileSetup();
                }}
                className="flex-1 bg-surface-container-high/60 border border-white/10 focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed rounded-2xl px-4 py-3 text-xs text-white placeholder-on-surface-variant/50"
              />
              <button
                type="submit"
                className="gradient-btn px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Members Sidebar (Right 4 Cols) */}
          <div className="w-full lg:w-80 bg-surface-container-lowest/60 rounded-2xl p-5 border border-white/10 space-y-4 shrink-0">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Users className="w-4 h-4 text-primary-fixed" />
                <span>Joined Members</span>
              </div>
              <span className="text-[10px] text-primary-fixed font-bold">
                {clubChatData[selectedChatClub.id]?.onlineCount || 250} Online
              </span>
            </div>

            {/* Member Card List */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
              {(clubChatData[selectedChatClub.id]?.members || []).map((m, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveMemberCard(m)}
                  className="p-3 rounded-xl bg-surface-container-high/40 border border-white/10 hover:border-primary-fixed/50 cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-primary-fixed shrink-0" />
                    <div className="overflow-hidden flex-1">
                      <p className="text-xs font-bold text-white group-hover:text-primary-fixed transition-colors truncate">{m.name}</p>
                      <p className="text-[10px] text-secondary font-semibold truncate">{m.instaId || '@member_vip'}</p>
                    </div>
                  </div>

                  <div className="text-[10px] space-y-1 text-on-surface-variant border-t border-white/5 pt-2">
                    <p className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-primary-fixed shrink-0" />
                      <span className="truncate">{m.designation}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span className="truncate">{m.passion}</span>
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        m.drinkType === 'Alcoholic' ? 'bg-secondary-container/20 text-secondary border border-secondary/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {m.drinkType === 'Alcoholic' ? '🍷 Alcoholic' : '🍹 Non-Alcoholic'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MEMBER CARD DETAILS POPUP MODAL */}
      {activeMemberCard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-card rounded-3xl max-w-sm w-full p-6 border border-white/20 relative shadow-2xl text-center space-y-4">
            <button 
              onClick={() => setActiveMemberCard(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <img src={activeMemberCard.avatar} alt={activeMemberCard.name} className="w-20 h-20 rounded-full object-cover border-2 border-primary-fixed mx-auto shadow-lg" />
            
            <div>
              <h3 className="font-headline text-xl font-bold text-white">{activeMemberCard.name}</h3>
              {activeMemberCard.instaId && (
                <p className="text-xs text-secondary font-bold flex items-center justify-center gap-1 mt-0.5">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{activeMemberCard.instaId}</span>
                </p>
              )}
            </div>

            <div className="bg-surface-container-lowest/60 rounded-2xl p-4 border border-white/10 text-xs space-y-2 text-left">
              <div className="flex items-center gap-2 text-on-surface">
                <Briefcase className="w-4 h-4 text-primary-fixed" />
                <span className="font-semibold">Role / Profession:</span>
                <span className="text-white font-bold ml-auto">{activeMemberCard.designation}</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface">
                <Heart className="w-4 h-4 text-secondary" />
                <span className="font-semibold">Music & Vibe:</span>
                <span className="text-white font-bold ml-auto">{activeMemberCard.passion}</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface">
                <Wine className="w-4 h-4 text-tertiary-fixed-dim" />
                <span className="font-semibold">Drink Choice:</span>
                <span className="text-primary-fixed font-bold ml-auto">
                  {activeMemberCard.drinkType === 'Alcoholic' ? '🍷 Alcoholic' : '🍹 Non-Alcoholic'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveMemberCard(null)}
              className="w-full py-2.5 rounded-xl border border-white/20 text-white font-bold text-xs hover:bg-white/10"
            >
              Close Member Card
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
