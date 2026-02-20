import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Link, useLocation, useParams, Navigate } from 'react-router-dom';

// --- Types ---
interface CollectionImage {
  url: string;
  title: string;
  description: string;
  size: 'small' | 'medium' | 'large';
  offset: 'none' | 'top' | 'bottom';
}

interface Portfolio {
  id: string;
  title: string;
  coverImage: string;
  images: CollectionImage[];
}

interface Photographer {
  id: string;
  name: string;
  description: string;
  profileImage: string;
  portfolios: Portfolio[];
  isFeatured?: boolean;
}

interface Event {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  images: CollectionImage[];
  photographerAttribution?: string;
}

// --- Image Data Collections ---
// Stripping all descriptions and titles for photo entries

const NICO_BOWERS_IMAGES: CollectionImage[] = [
  { url: 'https://i.imgur.com/thZtuBX.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/OSszIsd.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/7cTUn90.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/QB54ZGN.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/miov8UT.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/9x8EKeN.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/1qjhaId.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/7ZpjSMX.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/4evqYe8.jpeg', title: '', description: '', size: 'small', offset: 'none' }
];

const TRAVEL_IMAGES: CollectionImage[] = [
  { url: 'https://i.imgur.com/bye48d9.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/zWQ7IKd.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/oSahuMO.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/Vw09dIS.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/W3viqoi.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/GqhL3gG.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/0PhEWzM.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/DPRx18r.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/LGjBvuE.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/opD3zpa.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/69QXHyA.jpeg', title: '', description: '', size: 'small', offset: 'none' }
];

const PAXTON_HOPE_IMAGES: CollectionImage[] = [
  { url: 'https://i.imgur.com/EvHoJPa.png', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/nI3GHU2.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/riQAZZX.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/zNiUkhz.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/zeKbpZD.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/8W8N4Bf.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/yws7S0L.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/6r9vfwo.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/nAIEut2.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/fFbzSUW.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/HdyVPeN.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/1GVxJDQ.jpeg', title: '', description: '', size: 'small', offset: 'none' }
];

const FLYNN_KOHUT_IMAGES: CollectionImage[] = [
  { url: 'https://i.imgur.com/ZAmV1aL.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/nUMubKh.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/c2DsJs0.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/ys6wNFG.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/nz8SRth.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/T4tkbCW.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/cWFC5i7.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/pzRadjb.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/wtIIMNI.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/ZxyzUZ8.jpeg', title: '', description: '', size: 'medium', offset: 'top' }
];

const AALEYA_GANGULY_IMAGES: CollectionImage[] = [
  { url: 'https://i.imgur.com/O7QFHMz.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/QzsXnBW.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/pBAwkyy.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/fXcT3Xg.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/kKv6Vgy.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/dzG3N06.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/YVsxcux.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/Q14Dhyc.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/lYSMYaT.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/aA6nhov.jpeg', title: '', description: '', size: 'medium', offset: 'none' }
];

const GORDON_IMAGES: CollectionImage[] = [
  { url: 'https://i.imgur.com/H59aSOO.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/aaEKQHd.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/4wx4ZgW.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/SiR5G1X.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/UTWmyqE.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/jeF24FH.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/3Js3ZIQ.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/8thGFI9.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/PLG11i4.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/5Jtzghj.jpeg', title: '', description: '', size: 'large', offset: 'none' }
];

const FEATURED_PHOTOGRAPHERS: Photographer[] = [
  {
    id: 'flynn-kohut',
    name: 'Flynn Kohut',
    description: '',
    profileImage: 'https://i.imgur.com/de5Jzhw.png',
    portfolios: [{ id: 'peace', title: 'Peace in a World of Hate', coverImage: 'https://i.imgur.com/ZAmV1aL.jpeg', images: FLYNN_KOHUT_IMAGES }],
    isFeatured: true
  },
  {
    id: 'paxton-hope',
    name: 'Paxton Hope',
    description: '',
    profileImage: 'https://i.imgur.com/Jw3OYdG.jpeg',
    portfolios: [{ id: 'archive', title: 'Paxton Hope', coverImage: 'https://i.imgur.com/EvHoJPa.png', images: PAXTON_HOPE_IMAGES }],
    isFeatured: true
  },
  {
    id: 'aaleya-ganguly',
    name: 'Aaleya Ganguly',
    description: '',
    profileImage: 'https://i.imgur.com/fXY4l0G.png',
    portfolios: [{ id: 'cinematic', title: 'Aaleya Ganguly', coverImage: 'https://i.imgur.com/QzsXnBW.jpeg', images: AALEYA_GANGULY_IMAGES }],
    isFeatured: true
  },
  {
    id: 'nico-bowers',
    name: 'Nico Bowers',
    description: '',
    profileImage: 'https://i.imgur.com/RYXwCGo.jpeg',
    portfolios: [
      { id: 'jazz-cafe-night', title: 'Jazz Cafe Night', coverImage: 'https://i.imgur.com/thZtuBX.jpeg', images: NICO_BOWERS_IMAGES },
      { id: 'travel', title: 'Travel', coverImage: 'https://i.imgur.com/bye48d9.jpeg', images: TRAVEL_IMAGES }
    ],
    isFeatured: true
  },
  {
    id: 'gordon',
    name: 'Gordon Wiafe',
    description: '',
    profileImage: 'https://i.imgur.com/iHOcEM2.png',
    portfolios: [{ id: 'campus', title: 'Gordon Wiafe', coverImage: 'https://i.imgur.com/H59aSOO.jpeg', images: GORDON_IMAGES }],
    isFeatured: false
  }
];

const EVENTS: Event[] = [
  {
    id: 'jazz-cafe',
    title: 'Jazz Cafe',
    date: 'January 2026',
    coverImage: 'https://i.imgur.com/thZtuBX.jpeg',
    images: NICO_BOWERS_IMAGES,
    photographerAttribution: 'taken by Nico Bowers'
  }
];

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Events', path: '/events' },
  { label: 'Photographers', path: '/photographers' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

// --- Shared Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const DarkModeToggle: React.FC<{ isDark: boolean; toggle: () => void }> = ({ isDark, toggle }) => (
  <button 
    onClick={toggle}
    className="p-2 bg-transparent transition-transform hover:scale-110 active:scale-95 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white focus:outline-none"
    aria-label="Toggle Dark Mode"
  >
    {isDark ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )}
  </button>
);

const Layout: React.FC<{ children: React.ReactNode; isDark: boolean; toggleDark: () => void }> = ({ children, isDark, toggleDark }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${isDark ? 'dark bg-[#121212]' : 'bg-[#fcfcfc]'}`}>
      <header className="py-4 px-4 md:px-8 sticky top-0 bg-inherit/95 backdrop-blur-md z-50 border-b border-gray-100/50 dark:border-white/5">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 relative">
          
          <div className={`flex flex-col md:flex-row items-center gap-4 ${isHome ? 'md:flex-1' : ''}`}>
            {!isHome && (
              <Link to="/" className="group text-center md:text-left">
                <h1 className="text-xl md:text-2xl font-light uppercase tracking-[0.5em] transition-all group-hover:opacity-60 leading-tight text-black dark:text-white">
                  Exeter Photography
                </h1>
                <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 dark:text-gray-500 mt-1 font-medium">
                  (hosted by nico bowers)
                </p>
              </Link>
            )}
          </div>

          <nav className={`flex gap-6 md:gap-10 ${isHome ? 'mt-0' : 'mt-2 md:mt-0'} flex-1 justify-center`}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[10px] uppercase tracking-[0.4em] transition-all relative pb-1 whitespace-nowrap ${
                  location.pathname === item.path 
                  ? 'text-black dark:text-white font-semibold' 
                  : 'text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black dark:bg-white"></span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end md:w-auto md:flex-1 md:absolute md:right-0">
             <DarkModeToggle isDark={isDark} toggle={toggleDark} />
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col py-2">
        <div className="max-w-screen-xl mx-auto w-full flex-grow flex flex-col">
          {children}
        </div>
      </main>

      <footer className="py-12 px-4 md:px-8 border-t border-gray-50 dark:border-white/5 text-center bg-inherit">
        <div className="max-w-screen-sm mx-auto space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 dark:text-gray-600 font-medium">Exeter • NH</p>
          </div>
          <div className="flex justify-center gap-6 items-center opacity-40 dark:opacity-20">
             <div className="h-[1px] w-8 bg-gray-400 dark:bg-gray-600"></div>
             <p className="text-[9px] uppercase tracking-[0.2em] text-black dark:text-gray-400 font-medium">© The Exeter Collection</p>
             <div className="h-[1px] w-8 bg-gray-400 dark:bg-gray-600"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Page Components ---

const Home: React.FC = () => (
  <section className="text-center reveal w-full flex-grow flex flex-col items-center">
    <div className="flex-grow flex flex-col items-center justify-center w-full px-4 text-center">
      <div className="mb-8 w-full">
          <h1 className="text-[14vw] md:text-[8rem] lg:text-[10rem] serif font-light uppercase tracking-tighter leading-[0.85] mx-auto text-center w-full text-black dark:text-white">
            <span className="block">Exeter</span>
            <span className="block">Photography</span>
          </h1>
      </div>

      <div className="mb-6 space-y-5 max-w-xl mx-auto text-center flex flex-col items-center">
          <p className="text-base md:text-xl text-black dark:text-gray-400 font-light leading-relaxed italic serif px-4">
            A place to share all campus events through your own lense.
          </p>
          <div className="pt-2">
            <Link to="/contact" className="inline-block border border-black dark:border-white/10 px-10 py-3 text-[9px] uppercase tracking-[0.4em] text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-700">
              Submit Here
            </Link>
          </div>
      </div>
    </div>

    <div className="w-full pb-16 px-4 md:px-8">
      <div className="mb-10 space-y-2 pt-6 border-t border-gray-100 dark:border-white/5 max-w-md mx-auto flex flex-col items-center justify-center">
          <h2 className="text-[9px] font-medium uppercase tracking-[0.6em] text-black dark:text-gray-600 text-center">This month's photographers</h2>
          <div className="h-[1px] w-12 bg-black/10 dark:bg-white/10 mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 justify-items-center max-w-6xl mx-auto w-full">
        {FEATURED_PHOTOGRAPHERS.filter(p => p.isFeatured).map((photographer) => (
          <Link
            key={photographer.id}
            to={`/photographer/${photographer.id}`}
            className="group w-full flex flex-col items-center"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-900 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-700">
              <img 
                src={photographer.profileImage} 
                alt={photographer.name}
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-700"></div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-black dark:text-gray-600 font-medium transition-colors group-hover:opacity-60">{photographer.name}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const EventsPage: React.FC = () => (
  <section className="reveal w-full px-4 md:px-8 pb-24 flex flex-col items-center">
    <div className="max-w-4xl mx-auto mb-16 mt-12 text-center">
      <h2 className="text-[9px] uppercase tracking-[0.8em] text-black dark:text-gray-700 block mb-4">The Archive</h2>
      <h3 className="text-5xl md:text-7xl font-light uppercase tracking-tighter mb-6 text-black dark:text-white">Events</h3>
      <div className="h-[1px] w-24 bg-black/10 dark:bg-white/10 mx-auto"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto w-full">
      {EVENTS.map((event) => (
        <Link
          key={event.id}
          to={`/event/${event.id}`}
          className="group w-full text-center md:text-left flex flex-col"
        >
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-900 mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
            <img 
              src={event.coverImage} 
              alt={event.title}
              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 group-hover:bg-black/0 dark:group-hover:bg-white/0 transition-all duration-700"></div>
          </div>
          <div className="space-y-2">
             <span className="text-[9px] uppercase tracking-[0.4em] text-black dark:text-gray-600 block font-medium">{event.date}</span>
             <h3 className="text-3xl md:text-5xl serif italic text-black dark:text-white group-hover:opacity-70 transition-opacity leading-tight">{event.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

const PhotographerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const photographer = FEATURED_PHOTOGRAPHERS.find(p => p.id === id);

  if (!photographer) {
    return <Navigate to="/" />;
  }

  return (
    <div className="reveal w-full px-4 md:px-8 pb-24">
      <section className="max-w-5xl mx-auto mb-16 mt-12 text-center">
        <div className="mb-4">
            <span className="text-[9px] uppercase tracking-[0.8em] text-black dark:text-gray-700 block mb-4">Registry // Photographer</span>
            <h2 className="text-6xl md:text-[8rem] font-light uppercase tracking-tighter mb-6 leading-[0.85] text-black dark:text-white">
              <span className="block">{photographer.name.split(' ')[0]}</span>
              <span className="block">{photographer.name.split(' ')[1] || ''}</span>
            </h2>
        </div>
        <div className="h-[1px] w-16 bg-black/10 dark:bg-white/10 mx-auto mt-12"></div>
      </section>

      <section className="max-w-6xl mx-auto mb-24 px-4">
        <div className="mb-12 text-center md:text-left">
           <h3 className="text-[10px] uppercase tracking-[0.6em] text-black dark:text-gray-600 font-bold mb-4">Portfolios</h3>
           <div className="h-[1px] w-12 bg-black/20 dark:bg-white/10 mx-auto md:mx-0"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {photographer.portfolios.map((portfolio) => (
             <Link key={portfolio.id} to={`/photographer/${id}/portfolio/${portfolio.id}`} className="group block text-center md:text-left">
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-700">
                   <img 
                     src={portfolio.coverImage} 
                     alt={portfolio.title}
                     className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.02]"
                   />
                </div>
                <h4 className="text-2xl md:text-3xl serif italic text-black dark:text-white">{portfolio.title}</h4>
                <span className="text-[9px] uppercase tracking-[0.4em] text-black dark:text-gray-600 block mt-1">View Portfolio</span>
             </Link>
           ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto text-center py-20 border-t border-gray-100 dark:border-white/5 mt-24">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl serif italic mb-6 text-black dark:text-white">Inquiries & Correspondence</h3>
            <div className="pt-2">
                <Link to="/contact" className="inline-block border border-black dark:border-white/10 px-12 py-4 text-[10px] uppercase tracking-[0.4em] hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-1000 font-medium text-black dark:text-white">
                    Contact Nico Bowers
                </Link>
            </div>
          </div>
      </section>
    </div>
  );
};

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = EVENTS.find(e => e.id === id);

  if (!event) {
    return <Navigate to="/events" />;
  }

  return (
    <div className="reveal w-full px-4 md:px-8 pb-24">
      <section className="max-w-5xl mx-auto mb-24 mt-8 text-center">
        <div className="mb-4">
            <span className="text-[9px] uppercase tracking-[0.8em] text-black dark:text-gray-700 block mb-3">Event Archive // {event.date}</span>
            <h2 className="text-6xl md:text-[8rem] font-light uppercase tracking-tighter mb-2 leading-[0.85] text-black dark:text-white text-center">
              {event.title}
            </h2>
            {event.photographerAttribution && (
              <p className="text-[10px] uppercase tracking-[0.4em] text-black dark:text-gray-600 mt-4">{event.photographerAttribution}</p>
            )}
        </div>
        <div className="h-[1px] w-16 bg-black/10 dark:bg-white/10 mx-auto mt-8"></div>
      </section>

      <section className="space-y-32 md:space-y-48 mb-24 max-w-6xl mx-auto px-4">
        {event.images.map((image, index) => {
          const containerClasses = `relative flex flex-col ${
            image.size === 'large' ? 'md:w-full' : 
            image.size === 'medium' ? 'md:w-2/3 mx-auto' : 
            'md:w-1/2 mx-auto'
          } ${
            image.offset === 'top' ? 'md:-mt-24' : 
            image.offset === 'bottom' ? 'md:mt-24' : ''
          } ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`;

          return (
            <div key={index} className={containerClasses}>
              <div className="group relative overflow-hidden bg-gray-100 dark:bg-gray-900 w-full shadow-2xl shadow-black/5 dark:shadow-white/5 flex justify-center items-center">
                <img 
                  src={image.url} 
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[85vh] mx-auto block brightness-[1.05] contrast-[1.02] transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.04]" 
                  alt="" 
                />
              </div>
            </div>
          );
        })}
      </section>

      <div className="max-w-xl mx-auto text-center py-20 border-t border-gray-100 dark:border-white/5">
          <Link to="/events" className="inline-block border border-black dark:border-white/10 px-12 py-4 text-[9px] uppercase tracking-[0.4em] text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-700">
              Back to Events
          </Link>
      </div>
    </div>
  );
};

const PortfolioDetail: React.FC = () => {
  const { id, portfolioId } = useParams<{ id: string, portfolioId: string }>();
  const photographer = FEATURED_PHOTOGRAPHERS.find(p => p.id === id);
  const portfolio = photographer?.portfolios.find(p => p.id === portfolioId);

  if (!photographer || !portfolio) {
    return <Navigate to={`/photographer/${id}`} />;
  }

  return (
    <div className="reveal w-full px-4 md:px-8 pb-24">
      <section className="max-w-5xl mx-auto mb-24 mt-8 text-center">
        <div className="mb-4">
            <span className="text-[9px] uppercase tracking-[0.8em] text-black dark:text-gray-700 block mb-3">{photographer.name} // Archive</span>
            <h2 className="text-6xl md:text-[8rem] font-light uppercase tracking-tighter mb-2 leading-[0.85] text-black dark:text-white text-center">
              {portfolio.title}
            </h2>
        </div>
        <div className="h-[1px] w-16 bg-black/10 dark:bg-white/10 mx-auto mt-8"></div>
      </section>

      {/* Editorial Grid System (Staggered Layout) */}
      <section className="space-y-32 md:space-y-48 mb-24 max-w-6xl mx-auto px-4">
        {portfolio.images.map((image, index) => {
          const containerClasses = `relative flex flex-col ${
            image.size === 'large' ? 'md:w-full' : 
            image.size === 'medium' ? 'md:w-2/3 mx-auto' : 
            'md:w-1/2 mx-auto'
          } ${
            image.offset === 'top' ? 'md:-mt-24' : 
            image.offset === 'bottom' ? 'md:mt-24' : ''
          } ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`;

          return (
            <div key={index} className={containerClasses}>
              <div className="group relative overflow-hidden bg-gray-100 dark:bg-gray-900 w-full shadow-2xl shadow-black/5 dark:shadow-white/5 flex justify-center items-center">
                <img 
                  src={image.url} 
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[85vh] mx-auto block brightness-[1.05] contrast-[1.02] transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.04]" 
                  alt="" 
                />
              </div>
            </div>
          );
        })}
      </section>

      <div className="max-w-xl mx-auto text-center py-20 border-t border-gray-100 dark:border-white/5">
          <Link to={`/photographer/${id}`} className="inline-block border border-black dark:border-white/10 px-12 py-4 text-[9px] uppercase tracking-[0.4em] text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-700">
              Back to {photographer.name.split(' ')[0]}'s Page
          </Link>
      </div>
    </div>
  );
};

const PhotographersPage: React.FC = () => (
  <section className="reveal w-full px-4 md:px-8 pb-24 flex flex-col items-center">
    <div className="max-w-4xl mx-auto mb-16 mt-12 text-center">
      <h2 className="text-[9px] uppercase tracking-[0.8em] text-black dark:text-gray-700 block mb-4">Registry</h2>
      <h3 className="text-5xl md:text-7xl font-light uppercase tracking-tighter mb-6 text-black dark:text-white">Photographers</h3>
      <div className="h-[1px] w-24 bg-black/10 dark:bg-white/10 mx-auto mb-12"></div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto w-full">
      {FEATURED_PHOTOGRAPHERS.map((photographer) => (
        <Link
          key={photographer.id}
          to={`/photographer/${photographer.id}`}
          className="group w-full flex flex-col items-center"
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-900 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-700">
            <img 
              src={photographer.profileImage} 
              alt={photographer.name}
              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 dark:bg-white/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-700"></div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-black dark:text-gray-600 font-medium transition-colors group-hover:opacity-60">{photographer.name}</span>
        </Link>
      ))}
    </div>
    
    <div className="mt-32 max-w-3xl mx-auto text-center border-t border-gray-100 dark:border-white/5 pt-16">
      <h4 className="text-xl serif italic mb-8 text-black dark:text-white">Join Us</h4>
      <Link to="/contact" className="inline-block border border-black dark:border-white/10 px-12 py-4 text-[9px] uppercase tracking-[0.4em] text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-700">
        Submit Archive
      </Link>
    </div>
  </section>
);

const About: React.FC = () => (
  <section className="max-w-3xl mx-auto px-8 reveal space-y-6 py-12 flex-grow flex flex-col justify-center text-center">
    <header className="space-y-4">
        <h2 className="text-[9px] uppercase tracking-[0.6em] text-black dark:text-gray-700">Mission Statement</h2>
        <h3 className="text-4xl md:text-5xl serif italic text-black dark:text-white">Exeter Photography</h3>
    </header>

    <div className="text-xl md:text-2xl leading-[1.7] text-black dark:text-gray-400 font-light italic serif max-w-2xl mx-auto">
      <p>
        Exeter Photography is an archive for students around the world to share the world through their own lenses. 
        Based in <span className="text-black dark:text-white font-normal not-italic underline decoration-black/10">Exeter, New Hampshire</span>, this collection is made special by the students who contribute to it!
      </p>
    </div>
  </section>
);

const Contact: React.FC = () => (
  <section className="max-w-2xl mx-auto px-8 reveal text-center py-12 flex-grow flex flex-col justify-center">
    <div className="mb-8">
        <h3 className="text-4xl md:text-5xl serif italic text-black dark:text-white">Contact Nico Bowers</h3>
    </div>

    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50 dark:border-white/5">
        <div className="space-y-2">
          <span className="block text-[8px] uppercase tracking-[0.4em] text-black dark:text-gray-600">Photographer</span>
          <a href="mailto:nbowers@exeter.edu" className="text-base text-black dark:text-white hover:opacity-40 transition-opacity font-light tracking-wide border-b border-black/5 dark:border-white/5 pb-1">
            nbowers@exeter.edu
          </a>
        </div>

        <div className="space-y-2">
          <span className="block text-[8px] uppercase tracking-[0.4em] text-black dark:text-gray-600">Digital Registry</span>
          <a 
            href="https://www.instagram.com/nicobowers2010/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-base text-black dark:text-white hover:opacity-40 transition-opacity font-light tracking-wide border-b border-black/5 dark:border-white/5 pb-1"
          >
            @nicobowers2010
          </a>
        </div>
      </div>
    </div>
  </section>
);

// --- App Root ---

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <HashRouter>
      <ScrollToTop />
      <Layout isDark={isDark} toggleDark={() => setIsDark(!isDark)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/photographers" element={<PhotographersPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/photographer/:id" element={<PhotographerDetail />} />
          <Route path="/photographer/:id/portfolio/:portfolioId" element={<PortfolioDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}