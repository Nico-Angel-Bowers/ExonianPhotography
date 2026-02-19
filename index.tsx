import React, { useEffect } from 'react';
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
  { url: 'https://i.imgur.com/O7QFHMz.jpeg', title: '01', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/QzsXnBW.jpeg', title: '02', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/pBAwkyy.jpeg', title: '03', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/fXcT3Xg.jpeg', title: '04', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/kKv6Vgy.jpeg', title: '05', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/dzG3N06.jpeg', title: '06', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/YVsxcux.jpeg', title: '07', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/Q14Dhyc.jpeg', title: '08', description: '', size: 'medium', offset: 'none' },
  { url: 'https://i.imgur.com/lYSMYaT.jpeg', title: '09', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/aA6nhov.jpeg', title: '10', description: '', size: 'medium', offset: 'none' }
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
    description: 'Scenes that demand a pause, finding profound peace in a world of hate.',
    profileImage: 'https://i.imgur.com/de5Jzhw.png',
    portfolios: [{ id: 'peace', title: 'Peace in a World of Hate', coverImage: 'https://i.imgur.com/ZAmV1aL.jpeg', images: FLYNN_KOHUT_IMAGES }],
    isFeatured: true
  },
  {
    id: 'paxton-hope',
    name: 'Paxton Hope',
    description: 'An exploration of the ephemeral and the discarded.',
    profileImage: 'https://i.imgur.com/Jw3OYdG.jpeg',
    portfolios: [{ id: 'archive', title: 'Archival Study', coverImage: 'https://i.imgur.com/EvHoJPa.png', images: PAXTON_HOPE_IMAGES }],
    isFeatured: true
  },
  {
    id: 'aaleya-ganguly',
    name: 'Aaleya Ganguly',
    description: 'A cinematic perspective on the mundane, capturing light and shadow in motion.',
    profileImage: 'https://i.imgur.com/fXY4l0G.png',
    portfolios: [{ id: 'cinematic', title: 'Light & Motion', coverImage: 'https://i.imgur.com/QzsXnBW.jpeg', images: AALEYA_GANGULY_IMAGES }],
    isFeatured: true
  },
  {
    id: 'nico-bowers',
    name: 'Nico Bowers',
    description: 'Focused on creating calm, intentional images that emphasize atmosphere, composition, and honesty.',
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
    description: 'Capturing the raw essence of campus life and architectural nuances.',
    profileImage: 'https://i.imgur.com/iHOcEM2.png',
    portfolios: [{ id: 'campus', title: 'Campus Archive', coverImage: 'https://i.imgur.com/H59aSOO.jpeg', images: GORDON_IMAGES }],
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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
      <header className="py-4 px-8 sticky top-0 bg-[#fcfcfc]/95 backdrop-blur-md z-50 border-b border-gray-100/50">
        <div className={`max-w-screen-xl mx-auto flex flex-col md:flex-row items-center ${isHome ? 'justify-center' : 'justify-between'} gap-2 md:gap-4`}>
          {!isHome && (
            <Link to="/" className="group text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-light uppercase tracking-[0.5em] transition-all group-hover:opacity-60 leading-tight">
                Exeter Photography
              </h1>
              <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mt-1 font-medium">
                (hosted by nico bowers)
              </p>
            </Link>
          )}

          <nav className={`flex gap-6 md:gap-10 ${isHome ? 'mt-0' : 'mt-2 md:mt-0'}`}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[10px] uppercase tracking-[0.4em] transition-all relative pb-1 whitespace-nowrap ${
                  location.pathname === item.path 
                  ? 'text-black font-semibold' 
                  : 'text-gray-400 hover:text-black'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black"></span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col py-2">
        <div className="max-w-screen-xl mx-auto w-full flex-grow flex flex-col">
          {children}
        </div>
      </main>

      <footer className="py-6 px-8 border-t border-gray-50 text-center bg-white">
        <div className="max-w-screen-sm mx-auto space-y-2">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-medium">Exeter • NH</p>
          </div>
          <div className="flex justify-center gap-6 items-center opacity-40">
             <div className="h-[1px] w-8 bg-gray-400"></div>
             <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600 font-medium">© The Exeter Collection</p>
             <div className="h-[1px] w-8 bg-gray-400"></div>
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
          <h1 className="text-[14vw] md:text-[8rem] lg:text-[10rem] serif font-light uppercase tracking-tighter leading-[0.85] mx-auto text-center w-full">
            <span className="block">Exeter</span>
            <span className="block">Photography</span>
          </h1>
      </div>

      <div className="mb-6 space-y-5 max-w-xl mx-auto text-center flex flex-col items-center">
          <p className="text-base md:text-xl text-gray-500 font-light leading-relaxed italic serif px-4">
            A place to share all campus events through your own lense.
          </p>
          <div className="pt-2">
            <Link to="/contact" className="inline-block border border-black/10 px-10 py-3 text-[9px] uppercase tracking-[0.4em] text-black hover:bg-black hover:text-white transition-all duration-700">
              Submit Here
            </Link>
          </div>
      </div>
    </div>

    <div className="w-full pb-16 px-8">
      <div className="mb-10 space-y-2 pt-6 border-t border-gray-100 max-w-md mx-auto flex flex-col items-center justify-center">
          <h2 className="text-[9px] font-medium uppercase tracking-[0.6em] text-gray-400 text-center">This month's photographers</h2>
          <div className="h-[1px] w-12 bg-black/10 mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 justify-items-center max-w-6xl mx-auto w-full">
        {FEATURED_PHOTOGRAPHERS.filter(p => p.isFeatured).map((photographer) => (
          <Link
            key={photographer.id}
            to={`/photographer/${photographer.id}`}
            className="group w-full flex flex-col items-center"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-700">
              <img 
                src={photographer.profileImage} 
                alt={photographer.name}
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700"></div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium transition-colors group-hover:text-black">{photographer.name}</span>
          </Link>
        ))}
      </div>
    </div>

    <div className="w-full pb-24 px-8 border-t border-gray-50">
      <div className="mb-12 space-y-2 pt-12 max-w-md mx-auto flex flex-col items-center justify-center">
          <h2 className="text-[9px] font-medium uppercase tracking-[0.6em] text-gray-400 text-center">Recent Events</h2>
          <div className="h-[1px] w-12 bg-black/10 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto w-full">
        {EVENTS.slice(0, 3).map((event) => (
          <Link
            key={event.id}
            to={`/event/${event.id}`}
            className="group w-full text-left flex flex-col"
          >
            <div className="relative w-full aspect-video overflow-hidden bg-gray-100 mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-700">
              <img 
                src={event.coverImage} 
                alt={event.title}
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700"></div>
              <div className="absolute bottom-6 left-6 text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                 <span className="text-[8px] uppercase tracking-[0.4em] font-bold">Open Archive</span>
              </div>
            </div>
            <div className="space-y-1">
               <span className="text-[8px] uppercase tracking-[0.4em] text-gray-400 block">{event.date}</span>
               <h3 className="text-2xl md:text-3xl serif italic text-gray-900 group-hover:text-black transition-colors">{event.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-16">
        <Link to="/events" className="inline-block border-b border-black/10 pb-2 text-[9px] uppercase tracking-[0.4em] text-gray-400 hover:text-black hover:border-black transition-all">
          View All Events
        </Link>
      </div>
    </div>
  </section>
);

const EventsPage: React.FC = () => (
  <section className="reveal w-full px-8 pb-24 flex flex-col items-center">
    <div className="max-w-4xl mx-auto mb-16 mt-12 text-center">
      <h2 className="text-[9px] uppercase tracking-[0.8em] text-gray-300 block mb-4">The Archive</h2>
      <h3 className="text-5xl md:text-7xl font-light uppercase tracking-tighter mb-6 text-black">Events</h3>
      <div className="h-[1px] w-24 bg-black/10 mx-auto"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto w-full">
      {EVENTS.map((event) => (
        <Link
          key={event.id}
          to={`/event/${event.id}`}
          className="group w-full text-left flex flex-col"
        >
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
            <img 
              src={event.coverImage} 
              alt={event.title}
              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-700"></div>
          </div>
          <div className="space-y-2">
             <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block font-medium">{event.date}</span>
             <h3 className="text-3xl md:text-5xl serif italic text-gray-900 group-hover:text-black transition-colors leading-tight">{event.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = EVENTS.find(e => e.id === id);

  if (!event) {
    return <Navigate to="/events" />;
  }

  return (
    <div className="reveal w-full px-4 md:px-8 pb-24">
      <section className="max-w-5xl mx-auto mb-20 mt-12 text-center">
        <div className="mb-6">
            <span className="text-[9px] uppercase tracking-[0.8em] text-gray-300 block mb-4">Event Archive // {event.date}</span>
            <h2 className="text-6xl md:text-[8rem] font-light uppercase tracking-tighter mb-4 leading-[0.85] text-black">
              {event.title}
            </h2>
            {event.photographerAttribution && (
              <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-medium mt-4 italic">
                {event.photographerAttribution}
              </p>
            )}
            <div className="h-[1px] w-16 bg-black/10 mx-auto mt-12"></div>
        </div>
      </section>

      <section className="space-y-40 mb-32 max-w-6xl mx-auto">
        {event.images.map((image, index) => (
          <div key={index} className="relative flex flex-col items-center w-full">
            <div className="group relative flex items-center justify-center w-full bg-transparent">
              <div className="relative overflow-hidden shadow-2xl shadow-black/10 bg-gray-50/50 flex items-center justify-center">
                  <img 
                    src={image.url} 
                    alt={`Event Frame ${index + 1}`}
                    loading="lazy"
                    className="max-h-[82vh] w-auto max-w-full object-contain brightness-[1.01] transition-all duration-[2000ms] cubic-bezier(0.19, 1, 0.22, 1) group-hover:scale-[1.02]"
                  />
              </div>
            </div>
            <div className="mt-8 text-center w-full">
              <div className="flex items-center justify-center gap-4 text-[9px] uppercase tracking-[0.6em] text-gray-300">
                  <span className="font-bold text-black/20">Frame // 0{index + 1}</span>
                  <div className="h-[1px] w-8 bg-gray-100"></div>
                  <span className="opacity-40 font-medium">Archival Entry</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="max-w-xl mx-auto text-center py-20 border-t border-gray-100">
          <Link to="/events" className="inline-block border border-black/10 px-12 py-4 text-[9px] uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all duration-700">
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
      <section className="max-w-5xl mx-auto mb-16 mt-8 text-center">
        <div className="mb-4">
            <span className="text-[9px] uppercase tracking-[0.8em] text-gray-300 block mb-3">{photographer.name} // Portfolio</span>
            <h2 className="text-6xl md:text-[8rem] font-light uppercase tracking-tighter mb-2 leading-[0.85] text-black text-center">
              {portfolio.title}
            </h2>
        </div>
        <div className="h-[1px] w-16 bg-black/10 mx-auto mt-8"></div>
      </section>

      <section className="space-y-32 mb-24 max-w-6xl mx-auto">
        {portfolio.images.map((image, index) => (
          <div key={index} className="relative flex flex-col items-center w-full">
            <div className="group relative flex items-center justify-center w-full bg-transparent">
              <div className="relative overflow-hidden shadow-2xl shadow-black/10 bg-gray-50/50 flex items-center justify-center">
                  <img 
                    src={image.url} 
                    alt={`Portfolio Entry ${index + 1}`}
                    loading="lazy"
                    className="max-h-[82vh] w-auto max-w-full object-contain brightness-[1.01] transition-all duration-[2000ms] cubic-bezier(0.19, 1, 0.22, 1) group-hover:scale-[1.02]"
                  />
              </div>
            </div>
            <div className="mt-8 text-center w-full">
              <div className="flex items-center justify-center gap-4 text-[9px] uppercase tracking-[0.6em] text-gray-300">
                  <span className="font-bold text-black/20">Archive // 0{index + 1}</span>
                  <div className="h-[1px] w-8 bg-gray-100"></div>
                  <span className="opacity-40 font-medium">Archival Selection</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="max-w-xl mx-auto text-center py-20 border-t border-gray-100">
          <Link to={`/photographer/${id}`} className="inline-block border border-black/10 px-12 py-4 text-[9px] uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all duration-700">
              Back to {photographer.name.split(' ')[0]}'s Page
          </Link>
      </div>
    </div>
  );
};

const PhotographerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const photographer = FEATURED_PHOTOGRAPHERS.find(p => p.id === id);

  if (!photographer) {
    return <Navigate to="/" />;
  }

  const photographerEvents = EVENTS.filter(e => e.photographerAttribution?.includes(photographer.name));

  return (
    <div className="reveal w-full px-4 md:px-8 pb-24">
      <section className="max-w-5xl mx-auto mb-16 mt-12 text-center">
        <div className="mb-4">
            <span className="text-[9px] uppercase tracking-[0.8em] text-gray-300 block mb-4">Registry // Photographer</span>
            <h2 className="text-6xl md:text-[8rem] font-light uppercase tracking-tighter mb-6 leading-[0.85] text-black">
              <span className="block">{photographer.name.split(' ')[0]}</span>
              <span className="block">{photographer.name.split(' ')[1] || ''}</span>
            </h2>
        </div>
        <p className="text-xl md:text-2xl leading-relaxed text-gray-500 font-light max-w-2xl mx-auto italic serif mb-12">
          {photographer.description}
        </p>
        <div className="h-[1px] w-16 bg-black/10 mx-auto mt-12"></div>
      </section>

      {/* Portfolios Section */}
      <section className="max-w-6xl mx-auto mb-24 px-4">
        <div className="mb-12 text-left">
           <h3 className="text-[10px] uppercase tracking-[0.6em] text-gray-400 font-bold mb-4">Portfolios</h3>
           <div className="h-[1px] w-12 bg-black/20"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {photographer.portfolios.map((portfolio) => (
             <Link key={portfolio.id} to={`/photographer/${id}/portfolio/${portfolio.id}`} className="group block">
                <div className="relative aspect-video overflow-hidden bg-gray-100 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-700">
                   <img 
                     src={portfolio.coverImage} 
                     alt={portfolio.title}
                     className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.02]"
                   />
                </div>
                <h4 className="text-2xl md:text-3xl serif italic text-gray-900">{portfolio.title}</h4>
                <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 block mt-1">View Portfolio</span>
             </Link>
           ))}
        </div>
      </section>

      {/* Events Section */}
      {photographerEvents.length > 0 && (
        <section className="max-w-6xl mx-auto mb-24 px-4 border-t border-gray-50 pt-16">
          <div className="mb-12 text-left">
             <h3 className="text-[10px] uppercase tracking-[0.6em] text-gray-400 font-bold mb-4">Events</h3>
             <div className="h-[1px] w-12 bg-black/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {photographerEvents.map((event) => (
              <Link
                key={event.id}
                to={`/event/${event.id}`}
                className="group w-full text-left flex flex-col"
              >
                <div className="relative w-full aspect-video overflow-hidden bg-gray-100 mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                  <img 
                    src={event.coverImage} 
                    alt={event.title}
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700"></div>
                </div>
                <div className="space-y-1">
                   <span className="text-[8px] uppercase tracking-[0.4em] text-gray-400 block">{event.date}</span>
                   <h3 className="text-2xl serif italic text-gray-900 group-hover:text-black transition-colors">{event.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-3xl mx-auto text-center py-20 border-t border-gray-100 mt-24">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl serif italic mb-6">Inquiries & Correspondence</h3>
            <div className="pt-2">
                <Link to="/contact" className="inline-block border border-black/10 px-12 py-4 text-[10px] uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all duration-1000 font-medium">
                    Contact Nico Bowers
                </Link>
            </div>
          </div>
      </section>
    </div>
  );
};

const PhotographersPage: React.FC = () => (
  <section className="reveal w-full px-8 pb-24 flex flex-col items-center">
    <div className="max-w-4xl mx-auto mb-16 mt-12 text-center">
      <h2 className="text-[9px] uppercase tracking-[0.8em] text-gray-300 block mb-4">Registry</h2>
      <h3 className="text-5xl md:text-7xl font-light uppercase tracking-tighter mb-6 text-black">Photographers</h3>
      <div className="h-[1px] w-24 bg-black/10 mx-auto mb-12"></div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto w-full">
      {FEATURED_PHOTOGRAPHERS.map((photographer) => (
        <Link
          key={photographer.id}
          to={`/photographer/${photographer.id}`}
          className="group w-full flex flex-col items-center"
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-700">
            <img 
              src={photographer.profileImage} 
              alt={photographer.name}
              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700"></div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium transition-colors group-hover:text-black">{photographer.name}</span>
        </Link>
      ))}
    </div>
    
    <div className="mt-32 max-w-3xl mx-auto text-center border-t border-gray-100 pt-16">
      <h4 className="text-xl serif italic mb-8">Join Us</h4>
      <Link to="/contact" className="inline-block border border-black/10 px-12 py-4 text-[9px] uppercase tracking-[0.4em] text-black hover:bg-black hover:text-white transition-all duration-700">
        Submit Archive
      </Link>
    </div>
  </section>
);

const About: React.FC = () => (
  <section className="max-w-3xl mx-auto px-8 reveal space-y-6 py-6 flex-grow flex flex-col justify-center">
    <header className="text-center space-y-4">
        <h2 className="text-[9px] uppercase tracking-[0.6em] text-gray-300">Mission Statement</h2>
        <h3 className="text-4xl md:text-5xl serif italic text-gray-900">Exeter Photography</h3>
    </header>

    <div className="text-xl md:text-2xl leading-[1.7] text-gray-500 font-light text-center serif italic max-w-2xl mx-auto">
      <p>
        Exeter Photography is an archive for students around the world to share the world through their own lenses. 
        Based in <span className="text-black font-normal not-italic">Exeter, New Hampshire</span>, this collection is made special by the students who contribute to it!
      </p>
    </div>
  </section>
);

const Contact: React.FC = () => (
  <section className="max-w-2xl mx-auto px-8 reveal text-center py-6 flex-grow flex flex-col justify-center">
    <div className="mb-8">
        <h3 className="text-4xl md:text-5xl serif italic text-gray-900">Contact Nico Bowers</h3>
    </div>

    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
        <div className="space-y-2">
          <span className="block text-[8px] uppercase tracking-[0.4em] text-gray-400">Photographer</span>
          <a href="mailto:nbowers@exeter.edu" className="text-base text-black hover:opacity-40 transition-opacity font-light tracking-wide border-b border-black/5 pb-1">
            nbowers@exeter.edu
          </a>
        </div>

        <div className="space-y-2">
          <span className="block text-[8px] uppercase tracking-[0.4em] text-gray-400">Digital Registry</span>
          <a 
            href="https://www.instagram.com/nicobowers2010/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-base text-black hover:opacity-40 transition-opacity font-light tracking-wide border-b border-black/5 pb-1"
          >
            @nicobowers2010
          </a>
        </div>
      </div>
    </div>
  </section>
);

// --- App Root ---

const App: React.FC = () => (
  <HashRouter>
    <ScrollToTop />
    <Layout>
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

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}