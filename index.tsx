
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

interface Photographer {
  id: string;
  name: string;
  description: string;
  isPlaceholder?: boolean;
}

// --- Static Data ---
const JAZZ_CAFE_IMAGES: CollectionImage[] = [
  {
    url: 'https://i.imgur.com/1ty6NW1.jpeg',
    title: 'The Blue Note',
    description: 'Capturing the deep, atmospheric hues of the opening set.',
    size: 'large',
    offset: 'none'
  },
  {
    url: 'https://i.imgur.com/OSszIsd.jpeg',
    title: 'Rhythm & Bloom',
    description: 'A study of movement and floral accents in the venue.',
    size: 'medium',
    offset: 'top'
  },
  {
    url: 'https://i.imgur.com/7cTUn90.jpeg',
    title: 'Intimate Echoes',
    description: 'The subtle resonance of the acoustics in a quiet corner.',
    size: 'medium',
    offset: 'bottom'
  },
  {
    url: 'https://i.imgur.com/QB54ZGN.jpeg',
    title: 'Brass Textures',
    description: 'Detailed focus on the instruments that define the night.',
    size: 'small',
    offset: 'none'
  },
  {
    url: 'https://i.imgur.com/miov8UT.jpeg',
    title: 'The Collective Voice',
    description: 'Unity through improvisation and shared presence.',
    size: 'large',
    offset: 'none'
  },
  {
    url: 'https://i.imgur.com/9x8EKeN.jpeg',
    title: 'Shadow Play',
    description: 'Tracing the silhouettes against the stage lights.',
    size: 'medium',
    offset: 'top'
  },
  {
    url: 'https://i.imgur.com/1qjhaId.jpeg',
    title: 'Strings Attached',
    description: 'The delicate tension of a performance in progress.',
    size: 'medium',
    offset: 'bottom'
  },
  {
    url: 'https://i.imgur.com/7ZpjSMX.jpeg',
    title: 'Cafe Noir',
    description: 'High-contrast moments from the edge of the stage.',
    size: 'large',
    offset: 'none'
  },
  {
    url: 'https://i.imgur.com/4evqYe8.jpeg',
    title: 'The Final Set',
    description: 'A lasting impression as the lights begin to dim.',
    size: 'small',
    offset: 'none'
  }
];

const FEATURED_PHOTOGRAPHERS: Photographer[] = [
  {
    id: 'nico-bowers',
    name: 'Nico Bowers',
    description: 'Focused on creating calm, intentional images that emphasize atmosphere, composition, and honesty. Work centers on observation and presence rather than spectacle.'
  },
  {
    id: 'paxton-hope',
    name: 'Paxton Hope',
    description: 'Coming Soon',
    isPlaceholder: true,
  },
  {
    id: 'isaiah-gibson',
    name: 'Isaiah Gibson',
    description: 'Coming Soon',
    isPlaceholder: true,
  }
];

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
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

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
      <header className="py-12 px-8 sticky top-0 bg-[#fcfcfc]/90 backdrop-blur-md z-50 border-b border-gray-50/50">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="group">
            <h1 className="text-2xl font-light uppercase tracking-[0.6em] transition-all group-hover:opacity-50">
              Nico Bowers
            </h1>
          </Link>

          <nav className="flex gap-8 md:gap-12">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[10px] uppercase tracking-[0.4em] transition-all relative pb-2 ${
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

      <main className="flex-grow py-20 px-8">
        <div className="max-w-screen-xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="py-24 px-8 border-t border-gray-50 text-center bg-white">
        <div className="max-w-screen-sm mx-auto space-y-8">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.8em] text-gray-300">
              New Hampshire Archive
            </p>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">Est. 2026</p>
          </div>
          <div className="flex justify-center gap-6 items-center opacity-40">
             <div className="h-[1px] w-12 bg-gray-300"></div>
             <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500">© 2026 Nico Bowers. All Rights Reserved.</p>
             <div className="h-[1px] w-12 bg-gray-300"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Page Components ---

const Home: React.FC = () => (
  <section className="text-center reveal py-10">
    <div className="mb-20 space-y-6">
        <h2 className="text-sm font-medium uppercase tracking-[0.5em] text-gray-400">Catalogue</h2>
        <div className="h-[1px] w-20 bg-black/10 mx-auto"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center max-w-5xl mx-auto">
      {FEATURED_PHOTOGRAPHERS.map((photographer) => (
        photographer.isPlaceholder ? (
          <div 
            key={photographer.id}
            className="group border border-gray-100 p-16 min-w-[260px] w-full flex items-center justify-center text-gray-200 text-[11px] uppercase tracking-[0.3em] select-none italic"
          >
            {photographer.name}
          </div>
        ) : (
          <Link
            key={photographer.id}
            to={`/photographer/${photographer.id}`}
            className="group border border-black/10 p-16 min-w-[260px] w-full text-[12px] uppercase tracking-[0.3em] text-black transition-all hover:bg-black hover:text-white flex items-center justify-center relative overflow-hidden"
          >
            <span className="relative z-10">{photographer.name}</span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </Link>
        )
      ))}
    </div>
  </section>
);

const About: React.FC = () => (
  <section className="max-w-2xl mx-auto px-4 reveal space-y-20">
    <header className="text-center space-y-4">
        <h2 className="text-sm uppercase tracking-[0.6em] text-gray-300">Identity</h2>
        <h3 className="text-4xl serif italic">Nico Bowers</h3>
    </header>

    <div className="space-y-12 text-lg leading-[2] text-gray-700 font-light text-justify">
      <p>
        I am passionate about creating a space for freedom of expression through photography.
        Based in <span className="text-black font-normal">Exeter, New Hampshire</span>, this archive began as a vessel to share 
        visual narratives in a clean, intentional environment.
      </p>

      <p>
        I believe in the quiet power of observation. My work seeks to find resonance in the mundane,
        prioritizing atmosphere and composition over the noise of the spectacle. 
        Nico’s Photography is designed to evolve into a collective platform for like-minded observers.
      </p>

      <div className="pt-10 border-t border-gray-50">
          <p className="italic serif text-2xl text-gray-400 text-center leading-relaxed">
            "Seeking the quiet moments between the spectacle."
          </p>
      </div>
    </div>
  </section>
);

const Contact: React.FC = () => (
  <section className="max-w-2xl mx-auto px-4 reveal text-center py-20">
    <div className="space-y-6 mb-20">
        <h2 className="text-sm uppercase tracking-[0.6em] text-gray-300">Correspondence</h2>
        <h3 className="text-4xl serif italic">Get in touch</h3>
    </div>

    <div className="space-y-16">
      <p className="text-lg text-gray-500 font-light leading-relaxed max-w-md mx-auto">
        For limited edition prints, collaborative projects, or archival inquiries, 
        please use the channels below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
        <div className="space-y-2">
          <span className="block text-[10px] uppercase tracking-[0.4em] text-gray-300">Digital Mail</span>
          <a href="mailto:nbowers@exeter.edu" className="text-lg text-black hover:opacity-40 transition-opacity border-b border-black/5 pb-1">
            nbowers@exeter.edu
          </a>
        </div>

        <div className="space-y-2">
          <span className="block text-[10px] uppercase tracking-[0.4em] text-gray-300">Social Archive</span>
          <a 
            href="https://www.instagram.com/nicobowers2010/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg text-black hover:opacity-40 transition-opacity border-b border-black/5 pb-1"
          >
            @nicobowers2010
          </a>
        </div>
      </div>
    </div>
  </section>
);

const PhotographerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const photographer = FEATURED_PHOTOGRAPHERS.find(p => p.id === id);

  if (!photographer || photographer.isPlaceholder) {
    return <Navigate to="/" />;
  }

  return (
    <div className="reveal">
      <section className="max-w-4xl mx-auto mb-48 text-center">
        <div className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.8em] text-gray-400 block mb-6">Archive Plate Series 01</span>
            <h2 className="text-7xl md:text-[10rem] font-light uppercase tracking-tighter mb-8 leading-[0.85] text-black">
              {photographer.name.split(' ')[0]}<br/>{photographer.name.split(' ')[1]}
            </h2>
        </div>
        
        <div className="flex items-center justify-center gap-8 mb-20">
            <div className="h-[1px] w-16 bg-black/10"></div>
            <span className="text-[11px] uppercase tracking-[0.4em] font-medium text-gray-300 italic serif">Jazz Cafe Night</span>
            <div className="h-[1px] w-16 bg-black/10"></div>
        </div>

        <p className="text-xl md:text-3xl leading-relaxed text-gray-500 font-light max-w-2xl mx-auto italic serif">
          "{photographer.description}"
        </p>
      </section>

      <section className="space-y-64 mb-80">
        {JAZZ_CAFE_IMAGES.map((image, index) => {
          const containerClasses = `relative flex flex-col ${
            image.size === 'large' ? 'md:w-full' : 
            image.size === 'medium' ? 'md:w-4/5 mx-auto' : 
            'md:w-3/5 mx-auto'
          } ${
            image.offset === 'top' ? 'md:-mt-40' : 
            image.offset === 'bottom' ? 'md:mt-40' : ''
          } ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`;

          return (
            <div key={index} className={containerClasses}>
              <div className="group relative overflow-hidden bg-gray-50 w-full shadow-2xl shadow-black/[0.02]">
                <img 
                  src={image.url} 
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-auto grayscale brightness-[1.03] contrast-[1.02] transition-all duration-[3000ms] cubic-bezier(0.19, 1, 0.22, 1) group-hover:grayscale-0 group-hover:scale-[1.05]"
                />
                
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex items-end p-12 pointer-events-none">
                   <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-1000 ease-out">
                      <h4 className="text-white text-4xl serif italic mb-3 shadow-sm">{image.title}</h4>
                      <p className="text-white/80 text-[10px] uppercase tracking-[0.5em] font-medium">{image.description}</p>
                   </div>
                </div>
              </div>

              <div className={`mt-12 max-w-sm ${index % 2 === 0 ? 'text-left' : 'text-right md:ml-auto'}`}>
                <div className="flex items-center gap-4 mb-4 text-[9px] uppercase tracking-[0.6em] text-gray-300">
                    <span className="font-bold text-black/20">0{index + 1}</span>
                    <div className="h-[1px] w-8 bg-gray-100"></div>
                    <span>Archive Entry</span>
                </div>
                <p className="text-base text-gray-900 font-light uppercase tracking-[0.2em]">{image.title}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="max-w-2xl mx-auto text-center py-40 border-t border-gray-100">
          <div className="space-y-12">
            <h3 className="text-4xl serif italic text-black">Editorial Archive</h3>
            <p className="text-lg text-gray-400 tracking-wide leading-relaxed font-light italic">
              "Each image is a silent witness to a moment that will never repeat."
            </p>
            <div className="pt-8">
                <Link to="/contact" className="inline-block border-b border-black py-4 px-2 text-[11px] uppercase tracking-[0.5em] hover:text-gray-400 hover:border-gray-200 transition-all duration-700">
                    Inquire for Access
                </Link>
            </div>
          </div>
      </section>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => (
  <HashRouter>
    <ScrollToTop />
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/photographer/:id" element={<PhotographerDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  </HashRouter>
);

// --- Initialization ---

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
