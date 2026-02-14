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
  collectionTitle: string;
  images: CollectionImage[];
}

// --- Image Data Collections ---

const NICO_BOWERS_IMAGES: CollectionImage[] = [
  { url: 'https://i.imgur.com/1ty6NW1.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/OSszIsd.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/7cTUn90.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/QB54ZGN.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/miov8UT.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/9x8EKeN.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/1qjhaId.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/7ZpjSMX.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/4evqYe8.jpeg', title: '', description: '', size: 'small', offset: 'none' }
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

const FEATURED_PHOTOGRAPHERS: Photographer[] = [
  {
    id: 'nico-bowers',
    name: 'Nico Bowers',
    description: 'Focused on creating calm, intentional images that emphasize atmosphere, composition, and honesty.',
    collectionTitle: 'Jazz Cafe Night',
    images: NICO_BOWERS_IMAGES
  },
  {
    id: 'paxton-hope',
    name: 'Paxton Hope',
    description: 'An exploration of the ephemeral and the discarded.',
    collectionTitle: 'The Transient Archive',
    images: PAXTON_HOPE_IMAGES
  },
  {
    id: 'flynn-kohut',
    name: 'Flynn Kohut',
    description: 'Scenes that demand a pause, finding profound peace in a world of hate.',
    collectionTitle: 'Peace in a World of Hate',
    images: FLYNN_KOHUT_IMAGES
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
      <header className="py-12 px-8 sticky top-0 bg-[#fcfcfc]/95 backdrop-blur-md z-50 border-b border-gray-100/50">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="group text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-light uppercase tracking-[0.5em] transition-all group-hover:opacity-60 leading-tight">
              Exonian Photography
            </h1>
            <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mt-2 font-medium">
              (hosted by nico bowers)
            </p>
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
              Curated Archive 2026
            </p>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">Exeter • NH</p>
          </div>
          <div className="flex justify-center gap-6 items-center opacity-30">
             <div className="h-[1px] w-12 bg-gray-400"></div>
             <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600">© Nico Bowers Collective</p>
             <div className="h-[1px] w-12 bg-gray-400"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Page Components ---

const Home: React.FC = () => (
  <section className="text-center reveal py-10">
    <div className="mb-40 space-y-12">
        <h1 className="text-6xl md:text-[10rem] serif font-light uppercase tracking-tighter leading-none mb-4 scale-y-110">
          Exonian <br/> Photography
        </h1>
        <p className="text-[11px] uppercase tracking-[1em] text-gray-400 font-medium italic mt-12 block">
          (hosted by nico bowers)
        </p>
    </div>

    <div className="mb-32 space-y-10 max-w-2xl mx-auto">
        <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed italic serif">
          A space to share campus events through your own lens.
        </p>
        <div className="pt-4">
          <Link to="/contact" className="inline-block border border-black/10 px-12 py-4 text-[10px] uppercase tracking-[0.5em] text-black hover:bg-black hover:text-white transition-all duration-700">
            Submit Here
          </Link>
        </div>
    </div>

    <div className="mb-24 space-y-6 pt-20 border-t border-gray-100 max-w-sm mx-auto">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.8em] text-gray-400">Monthly Selection</h2>
        <div className="h-[1px] w-16 bg-black/10 mx-auto"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-items-center max-w-6xl mx-auto">
      {FEATURED_PHOTOGRAPHERS.map((photographer) => (
        <Link
          key={photographer.id}
          to={`/photographer/${photographer.id}`}
          className="group border border-black/5 p-20 min-w-[280px] w-full text-[12px] uppercase tracking-[0.4em] text-black transition-all hover:bg-black hover:text-white flex flex-col items-center justify-center relative overflow-hidden h-80 shadow-sm hover:shadow-2xl hover:shadow-black/20"
        >
          <span className="relative z-10 text-center font-light text-sm tracking-[0.5em]">{photographer.name}</span>
          <span className="relative z-10 mt-6 text-[8px] tracking-[0.6em] text-gray-400 group-hover:text-white/40 opacity-0 group-hover:opacity-100 transition-all duration-700 uppercase">Enter Archive</span>
          <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-[800ms] cubic-bezier(0.19, 1, 0.22, 1)"></div>
        </Link>
      ))}
    </div>
  </section>
);

const About: React.FC = () => (
  <section className="max-w-2xl mx-auto px-4 reveal space-y-24">
    <header className="text-center space-y-6">
        <h2 className="text-[10px] uppercase tracking-[0.8em] text-gray-300">Mission Statement</h2>
        <h3 className="text-5xl serif italic text-gray-900">Exonian Photography</h3>
    </header>

    <div className="space-y-12 text-xl leading-[2.1] text-gray-700 font-light text-justify serif">
      <p>
        Exonian Photography is an intentional archive for freedom of expression.
        Based in <span className="text-black font-normal not-italic">Exeter, New Hampshire</span>, this collective began as a vessel to share 
        visual narratives in a clean, curated environment.
      </p>

      <p>
        We believe in the quiet power of observation. Our work seeks to find resonance in the mundane,
        prioritizing atmosphere and composition over the noise of the spectacle. 
        What started as a personal portfolio has evolved into a shared platform for like-minded observers.
      </p>

      <div className="pt-12 border-t border-gray-100 text-center">
          <p className="italic text-2xl text-gray-300 leading-relaxed max-w-md mx-auto">
            "Capturing the moments between the highlights."
          </p>
      </div>
    </div>
  </section>
);

const Contact: React.FC = () => (
  <section className="max-w-2xl mx-auto px-4 reveal text-center py-24">
    <div className="space-y-6 mb-24">
        <h2 className="text-[10px] uppercase tracking-[0.8em] text-gray-300">Correspondence</h2>
        <h3 className="text-5xl serif italic text-gray-900">Collaborate</h3>
    </div>

    <div className="space-y-20">
      <p className="text-xl text-gray-500 font-light leading-relaxed max-w-lg mx-auto serif italic">
        For limited prints, editorial assignments, or to be featured in the collective, 
        reach out via the official archive index.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-gray-50">
        <div className="space-y-3">
          <span className="block text-[9px] uppercase tracking-[0.5em] text-gray-400">Archivist</span>
          <a href="mailto:nbowers@exeter.edu" className="text-lg text-black hover:opacity-40 transition-opacity font-light tracking-wide border-b border-black/5 pb-2">
            nbowers@exeter.edu
          </a>
        </div>

        <div className="space-y-3">
          <span className="block text-[9px] uppercase tracking-[0.5em] text-gray-400">Digital Registry</span>
          <a 
            href="https://www.instagram.com/nicobowers2010/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg text-black hover:opacity-40 transition-opacity font-light tracking-wide border-b border-black/5 pb-2"
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

  if (!photographer) {
    return <Navigate to="/" />;
  }

  return (
    <div className="reveal">
      <section className="max-w-5xl mx-auto mb-56 text-center">
        <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[1em] text-gray-300 block mb-12">Exonian Archive // {id === 'nico-bowers' ? 'VOL I' : id === 'paxton-hope' ? 'VOL II' : 'VOL III'}</span>
            <h2 className="text-7xl md:text-[10rem] font-light uppercase tracking-tighter mb-12 leading-[0.82] text-black">
              {photographer.name.split(' ')[0]}<br/>{photographer.name.split(' ')[1]}
            </h2>
        </div>
        
        <div className="flex items-center justify-center gap-12 mb-20">
            <div className="h-[1px] w-24 bg-black/10"></div>
            <span className="text-[12px] uppercase tracking-[0.6em] font-medium text-gray-400 italic serif">{photographer.collectionTitle}</span>
            <div className="h-[1px] w-24 bg-black/10"></div>
        </div>
      </section>

      <section className="space-y-[24rem] mb-[30rem]">
        {photographer.images.map((image, index) => {
          const containerClasses = `relative flex flex-col ${
            image.size === 'large' ? 'md:w-full' : 
            image.size === 'medium' ? 'md:w-[85%] mx-auto' : 
            'md:w-[60%] mx-auto'
          } ${
            image.offset === 'top' ? 'md:-mt-64' : 
            image.offset === 'bottom' ? 'md:mt-64' : ''
          } ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`;

          return (
            <div key={index} className={containerClasses}>
              <div className="group relative overflow-hidden bg-gray-50 w-full shadow-2xl shadow-black/[0.04]">
                <img 
                  src={image.url} 
                  alt={`Archival Plate ${index + 1}`}
                  loading="lazy"
                  className="w-full h-auto grayscale brightness-[1.03] contrast-[1.01] transition-all duration-[3000ms] cubic-bezier(0.19, 1, 0.22, 1) group-hover:grayscale-0 group-hover:scale-[1.06]"
                />
                
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex items-end p-16 pointer-events-none">
                   <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-[1200ms] ease-out">
                      <h4 className="text-white text-5xl serif italic mb-4 drop-shadow-xl">0{index + 1}</h4>
                   </div>
                </div>
              </div>

              <div className={`mt-16 max-w-sm ${index % 2 === 0 ? 'text-left pl-4' : 'text-right md:ml-auto pr-4'}`}>
                <div className={`flex items-center gap-6 mb-6 text-[10px] uppercase tracking-[0.8em] text-gray-300 ${index % 2 !== 0 && 'flex-row-reverse'}`}>
                    <span className="font-bold text-black/20">0{index + 1}</span>
                    <div className="h-[1px] w-12 bg-gray-100"></div>
                    <span className="opacity-50">Entry</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="max-w-3xl mx-auto text-center py-64 border-t border-gray-100">
          <div className="space-y-16">
            <h3 className="text-5xl serif italic text-gray-900">Archive Request</h3>
            <p className="text-xl text-gray-400 tracking-wide leading-[2.1] font-light italic serif max-w-xl mx-auto">
              "To preserve a moment is to acknowledge its transient beauty. All archival work is available for editorial license."
            </p>
            <div className="pt-12">
                <Link to="/contact" className="inline-block border-b border-black/20 py-6 px-16 text-[11px] uppercase tracking-[0.6em] hover:text-gray-400 hover:border-gray-200 transition-all duration-1000">
                    Open Correspondence
                </Link>
            </div>
          </div>
      </section>
    </div>
  );
};

// --- App Root ---

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

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
