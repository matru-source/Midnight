import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Check, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  Search, 
  MapPin, 
  Wine, 
  Instagram, 
  Briefcase, 
  Heart, 
  Send, 
  UserCheck, 
  ShieldCheck,
  CheckCircle,
  X,
  Circle
} from 'lucide-react';

export default function MateFinder({ selectedCity, talkyProfile, onOpenProfileSetup }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'requests' | 'direct-chats'
  const [selectedPrivateChatMate, setSelectedPrivateChatMate] = useState(null); // Direct 1-on-1 chat
  const [privateChatMessageInput, setPrivateChatMessageInput] = useState('');

  // Sample Active People attending events/clubs today in the city
  const [activeMates, setActiveMates] = useState([
    {
      id: 'm-1',
      name: 'Rohan Sharma',
      instaId: '@rohan_sharma_vip',
      designation: 'Tech Founder & Investor',
      passion: 'Folk Rock & Single Malts',
      drinkType: 'Alcoholic',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      attendingEvent: '25 Years of The Raghu Dixit Project',
      venue: 'Phoenix Mall Of Asia',
      status: 'Attending Tonight',
      requestStatus: 'none', // 'none' | 'sent' | 'accepted'
      chatHistory: [
        { id: 1, sender: 'them', text: 'Hey! Are you going to the Raghu Dixit concert tonight?', time: '10m ago' }
      ]
    },
    {
      id: 'm-2',
      name: 'Ananya Roy',
      instaId: '@ananya_roy_designs',
      designation: 'UI/UX Director',
      passion: 'Acoustic & Artisanal Gin',
      drinkType: 'Non-Alcoholic',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
      attendingEvent: 'Necropsycho Live In Bangalore',
      venue: 'GYLT Bengaluru',
      status: 'Active Now at Venue',
      requestStatus: 'accepted', // Pre-accepted for demo direct chat!
      chatHistory: [
        { id: 1, sender: 'them', text: 'Hey there! I am near the VIP lounge at GYLT. Want to meet up?', time: '15m ago' },
        { id: 2, sender: 'me', text: 'Sounds awesome! Heading there in 10 minutes!', time: '12m ago' }
      ]
    },
    {
      id: 'm-3',
      name: 'Kabir Malhotra',
      instaId: '@kabir_m',
      designation: 'Venture Capitalist',
      passion: 'Melodic Techno',
      drinkType: 'Alcoholic',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      attendingEvent: 'The Void Room Techno Night',
      venue: 'The Void Room BKC',
      status: 'Attending Tonight',
      requestStatus: 'none',
      chatHistory: []
    },
    {
      id: 'm-4',
      name: 'Neha Joshi',
      instaId: '@neha_vibes',
      designation: 'Architect & Creator',
      passion: 'Bollywood & Craft Cocktails',
      drinkType: 'Alcoholic',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
      attendingEvent: 'Mafia Madness Speakeasy',
      venue: 'Euphoria Cafe Koramangala',
      status: 'Active Now at Venue',
      requestStatus: 'none',
      chatHistory: []
    }
  ]);

  // Handle Send Connection Request
  const handleSendRequest = (mateId) => {
    if (!talkyProfile) {
      onOpenProfileSetup();
      return;
    }

    setActiveMates((prev) =>
      prev.map((m) =>
        m.id === mateId ? { ...m, requestStatus: 'sent' } : m
      )
    );
  };

  // Simulate Accept Request for testing direct chat
  const handleAcceptRequest = (mateId) => {
    setActiveMates((prev) =>
      prev.map((m) =>
        m.id === mateId ? { ...m, requestStatus: 'accepted' } : m
      )
    );
  };

  // Handle Send Direct Message
  const handleSendDirectMessage = (e) => {
    e.preventDefault();
    if (!privateChatMessageInput.trim() || !selectedPrivateChatMate) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: privateChatMessageInput.trim(),
      time: 'Just now'
    };

    setActiveMates((prev) =>
      prev.map((m) =>
        m.id === selectedPrivateChatMate.id
          ? { ...m, chatHistory: [...m.chatHistory, newMsg] }
          : m
      )
    );

    setSelectedPrivateChatMate((prev) => ({
      ...prev,
      chatHistory: [...prev.chatHistory, newMsg]
    }));

    setPrivateChatMessageInput('');
  };

  const filteredMates = activeMates.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.attendingEvent.toLowerCase().includes(q) ||
      m.venue.toLowerCase().includes(q) ||
      m.designation.toLowerCase().includes(q)
    );
  });

  const acceptedMates = activeMates.filter((m) => m.requestStatus === 'accepted');

  return (
    <main className="pt-20 sm:pt-28 md:pt-32 px-4 sm:px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-6 pb-32">
      
      {/* Mate Finder Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 border border-primary-fixed/40 text-primary-fixed text-xs font-bold uppercase tracking-wider mb-2">
            <UserPlus className="w-3.5 h-3.5" />
            Connect With Mates Attending Today
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Mate Finder
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Discover active members attending events & clubs today in <span className="text-primary-fixed font-bold">{selectedCity || 'All India'}</span>.
          </p>
        </div>

        {/* Tab Switcher: Active Mates vs Direct Chats */}
        <div className="flex items-center gap-2 bg-[#121316] p-1.5 rounded-full border border-white/10">
          <button
            onClick={() => {
              setActiveTab('active');
              setSelectedPrivateChatMate(null);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'active'
                ? 'bg-primary-container/30 text-primary-fixed border border-primary-fixed/50 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Active Mates ({activeMates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('direct-chats')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'direct-chats'
                ? 'bg-secondary-container/30 text-secondary border border-secondary/50 shadow-[0_0_12px_rgba(255,36,228,0.25)]'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Matched Direct Chats ({acceptedMates.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: ACTIVE MATES DIRECTORY */}
      {activeTab === 'active' && !selectedPrivateChatMate && (
        <div className="flex flex-col gap-6">
          
          {/* Search Input */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search active mates by name, event, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-high/60 border border-white/10 focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-on-surface-variant/50"
            />
          </div>

          {/* Active Mates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMates.map((mate) => (
              <div
                key={mate.id}
                className="glass-card rounded-2xl p-5 border border-white/10 hover:border-primary-fixed/50 transition-all duration-300 flex flex-col justify-between space-y-4 relative group"
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-500/30">
                    <Circle className="w-2 h-2 fill-emerald-400 animate-pulse" />
                    <span>{mate.status}</span>
                  </span>

                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    mate.drinkType === 'Alcoholic' ? 'bg-secondary-container/20 text-secondary border border-secondary/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {mate.drinkType === 'Alcoholic' ? '🍷 Alcoholic' : '🍹 Non-Alcoholic'}
                  </span>
                </div>

                {/* Member Profile info */}
                <div className="flex items-start gap-3.5">
                  <img 
                    src={mate.avatar} 
                    alt={mate.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary-fixed shadow-md shrink-0" 
                  />
                  <div>
                    <h3 className="font-headline text-lg font-bold text-white group-hover:text-primary-fixed transition-colors">
                      {mate.name}
                    </h3>
                    <p className="text-xs text-secondary font-bold flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5" />
                      <span>{mate.instaId}</span>
                    </p>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                      <Briefcase className="w-3.5 h-3.5 text-primary-fixed shrink-0" />
                      <span className="truncate">{mate.designation}</span>
                    </p>
                  </div>
                </div>

                {/* Attending Event Banner */}
                <div className="bg-surface-container-lowest/70 rounded-xl p-3 border border-white/5 space-y-1">
                  <p className="text-[10px] uppercase font-bold text-primary-fixed tracking-wider">Attending Event Today</p>
                  <p className="text-xs font-bold text-white line-clamp-1">{mate.attendingEvent}</p>
                  <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary-fixed" />
                    <span>{mate.venue}</span>
                  </p>
                </div>

                {/* Request Interaction Button */}
                <div>
                  {mate.requestStatus === 'none' && (
                    <button
                      onClick={() => handleSendRequest(mate.id)}
                      className="w-full py-2.5 rounded-xl gradient-btn font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:opacity-90 transition-opacity"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Request Mate (Connect)</span>
                    </button>
                  )}

                  {mate.requestStatus === 'sent' && (
                    <div className="space-y-2">
                      <button
                        disabled
                        className="w-full py-2.5 rounded-xl bg-white/10 text-on-surface-variant font-bold text-xs flex items-center justify-center gap-2 border border-white/10"
                      >
                        <Clock className="w-4 h-4 text-primary-fixed animate-spin" />
                        <span>Request Sent • Pending Acceptance</span>
                      </button>
                      <button
                        onClick={() => handleAcceptRequest(mate.id)}
                        className="w-full text-[10px] text-emerald-400 hover:underline font-bold text-center block"
                      >
                        (Simulate Mate Accepted Request)
                      </button>
                    </div>
                  )}

                  {mate.requestStatus === 'accepted' && (
                    <button
                      onClick={() => {
                        setSelectedPrivateChatMate(mate);
                        setActiveTab('direct-chats');
                      }}
                      className="w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Request Accepted! Start Direct Chat</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* VIEW 2: MATCHED DIRECT CHATS LIST / CHAT ROOM */}
      {(activeTab === 'direct-chats' || selectedPrivateChatMate) && (
        <div className="glass-card rounded-3xl border border-white/15 p-6 sm:p-8 flex flex-col lg:flex-row gap-6 shadow-2xl">
          
          {/* Direct Chats List Sidebar (Left 4 Cols) */}
          <div className="w-full lg:w-80 bg-surface-container-lowest/60 rounded-2xl p-5 border border-white/10 space-y-4 shrink-0">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-headline text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-secondary" />
                <span>Direct Messages</span>
              </h3>
              <span className="text-[10px] text-secondary font-bold bg-secondary-container/20 px-2 py-0.5 rounded border border-secondary/30">
                {acceptedMates.length} Accepted
              </span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto custom-scrollbar">
              {acceptedMates.length === 0 ? (
                <p className="text-xs text-on-surface-variant py-8 text-center">
                  No accepted mates yet. Request mates from the active directory!
                </p>
              ) : (
                acceptedMates.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedPrivateChatMate(m)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedPrivateChatMate?.id === m.id
                        ? 'bg-secondary-container/20 border-secondary text-white font-bold'
                        : 'bg-surface-container-high/40 border-white/10 hover:bg-white/10 text-on-surface'
                    }`}
                  >
                    <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-secondary shrink-0" />
                    <div className="overflow-hidden flex-1">
                      <p className="text-xs font-bold text-white truncate">{m.name}</p>
                      <p className="text-[10px] text-secondary font-medium truncate">{m.instaId}</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Private Chat Window Area (Right 8 Cols) */}
          <div className="flex-1 flex flex-col gap-4">
            {selectedPrivateChatMate ? (
              <>
                {/* Chat Room Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <img src={selectedPrivateChatMate.avatar} alt={selectedPrivateChatMate.name} className="w-10 h-10 rounded-full object-cover border border-secondary" />
                    <div>
                      <h2 className="font-headline text-lg font-bold text-white">{selectedPrivateChatMate.name}</h2>
                      <p className="text-xs text-secondary font-bold flex items-center gap-2">
                        <span>{selectedPrivateChatMate.instaId}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-semibold">Accepted Request</span>
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    🟢 Active Chat
                  </span>
                </div>

                {/* Direct Messages Container */}
                <div className="bg-surface-container-lowest/80 rounded-2xl p-4 sm:p-6 border border-white/10 h-[360px] overflow-y-auto space-y-3 custom-scrollbar">
                  {selectedPrivateChatMate.chatHistory.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[10px] text-on-surface-variant mb-1">{msg.time}</span>
                      <div className={`px-4 py-2.5 rounded-2xl text-xs max-w-sm ${
                        msg.sender === 'me'
                          ? 'bg-primary-container/40 border border-primary-fixed/40 text-white rounded-tr-none'
                          : 'bg-surface-container-high/80 border border-white/10 text-white rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Send Direct Message Form */}
                <form onSubmit={handleSendDirectMessage} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Direct message ${selectedPrivateChatMate.name}...`}
                    value={privateChatMessageInput}
                    onChange={(e) => setPrivateChatMessageInput(e.target.value)}
                    className="flex-1 bg-surface-container-high/60 border border-white/10 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl px-4 py-3 text-xs text-white placeholder-on-surface-variant/50"
                  />
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-2xl bg-secondary-container text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(255,36,228,0.3)] hover:opacity-90"
                  >
                    <span>Send</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="py-24 text-center glass-card rounded-2xl p-8 border border-white/10 my-auto">
                <UserPlus className="w-10 h-10 text-primary-fixed mx-auto mb-3" />
                <h3 className="text-white font-bold text-lg mb-1">Select a Matched Mate</h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                  Click on an accepted mate from the sidebar to open your private 1-on-1 chat window.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

    </main>
  );
}
