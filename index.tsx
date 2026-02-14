
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

// --- Static Data: Collections ---

const NICO_BOWERS_IMAGES: CollectionImage[] = [
  { url: 'https://i.imgur.com/1ty6NW1.jpeg', title: 'The Blue Note', description: 'Atmospheric opening sets.', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/OSszIsd.jpeg', title: 'Rhythm & Bloom', description: 'Floral accents in transit.', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/7cTUn90.jpeg', title: 'Intimate Echoes', description: 'Resonance in the quiet corners.', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/QB54ZGN.jpeg', title: 'Brass Textures', description: 'Focus on defined instruments.', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/miov8UT.jpeg', title: 'The Collective', description: 'Unity through improvisation.', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/9x8EKeN.jpeg', title: 'Shadow Play', description: 'Silhouettes against the stage.', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/1qjhaId.jpeg', title: 'Strings Attached', description: 'Delicate performance tension.', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/7ZpjSMX.jpeg', title: 'Cafe Noir', description: 'High-contrast edge moments.', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/4evqYe8.jpeg', title: 'The Final Set', description: 'Lasting impressions.', size: 'small', offset: 'none' }
];

const PAXTON_HOPE_IMAGES: CollectionImage[] = [
  { url: 'https://i.imgur.com/EvHoJPa.png', title: 'Static Noise', description: 'Abstract observations.', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/nI3GHU2.jpeg', title: 'Coastal Fade', description: 'Horizon studies.', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/riQAZZX.jpeg', title: 'Urban Geometry', description: 'Lines in the wild.', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/zNiUkhz.jpeg', title: 'Light Leak', description: 'Natural interference.', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/zeKbpZD.jpeg', title: 'Soft Focus', description: 'Emotional depth.', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/8W8N4Bf.jpeg', title: 'Industrial Still', description: 'The beauty of utility.', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/yws7S0L.jpeg', title: 'Vantage Point', description: 'Elevated perspective.', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/6r9vfwo.jpeg', title: 'Monochrome Drift', description: 'Tonal variations.', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/nAIEut2.jpeg', title: 'Structure I', description: 'Architectural honesty.', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/fFbzSUW.jpeg', title: 'Structure II', description: 'Form and function.', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/HdyVPeN.jpeg', title: 'Structure III', description: 'Concluding the study.', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/1GVxJDQ.jpeg', title: 'The Last Glimpse', description: 'Ending the archive.', size: 'small', offset: 'none' }
];

const FLYNN_KOHUT_IMAGES: CollectionImage[] = [
  { url: 'https://i.imgur.com/ZAmV1aL.jpeg', title: 'Quiet Rebellion', description: 'A moment of stillness.', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/nUMubKh.jpeg', title: 'Hidden Valley', description: 'Nature’s secrecy.', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/c2DsJs0.jpeg', title: 'Shattered Mirror', description: 'Reflective chaos.', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/ys6wNFG.jpeg', title: 'The Watcher', description: 'Silent observation.', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/nz8SRth.jpeg', title: 'Woven Threads', description: 'Connecting life.', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/T4tkbCW.jpeg', title: 'Dusk Patrol', description: 'Guarding the peace.', size: 'medium', offset: 'top' },
  { url: 'https://i.imgur.com/cWFC5i7.jpeg', title: 'Verdant Hush', description: 'Greens in silence.', size: 'medium', offset: 'bottom' },
  { url: 'https://i.imgur.com/pzRadjb.jpeg', title: 'Stone Cold', description: 'Solid foundations.', size: 'large', offset: 'none' },
  { url: 'https://i.imgur.com/wtIIMNI.jpeg', title: 'Gilded Cage', description: 'Beautiful restraint.', size: 'small', offset: 'none' },
  { url: 'https://i.imgur.com/ZxyzUZ8.jpeg', title: 'Final Resolution', description: 'The search for peace.', size: 'medium', offset: 'top' }
];

const FEATURED_PHOTOGRAPHERS: Photographer[] = [
  {
    id: 'nico-bowers',
    name: 'Nico Bowers',
    description: 'Focused on creating calm, intentional images that emphasize atmosphere, composition, and honesty. Seeking the quiet moments between the spectacle.',
    collectionTitle: 'Jazz Cafe Night',
    images: NICO_BOWERS_IMAGES
  },
  {
    id: 'paxton-hope',
    name: 'Paxton Hope',
    description: 'An exploration of the ephemeral and the discarded. His work captures the fleeting beauty found in industrial decay and natural transitions.',
    collectionTitle: 'The Transient Archive',
    images: PAXTON_HOPE_IMAGES
  },
  {
    id: 'flynn-kohut',
    name: 'Flynn Kohut',
    description: 'Flynn’s work is a direct response to modern dissonance. He captures scenes that demand a pause, finding profound peace in a world of hate.',
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
              Archive Registry
            </p>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">Exeter • New Hampshire</p>
          </div>
          <div className="flex justify-center gap-6 items-center opacity-30">
             <div className="h-[1px] w-12 bg-gray-400"></div>
             <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600">© 2026 Nico Bowers Collective</p>
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
    <div className="mb-24 space-y-6">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.6em] text-gray-400">The Featured Archive</h2>
        <div className="h-[1px] w-16 bg-black/10 mx-auto"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-items-center max-w-6xl mx-auto">
      {FEATURED_PHOTOGRAPHERS.map((photographer) => (
        <Link
          key={photographer.id}
          to={`/photographer/${photographer.id}`}
          className="group border border-black/5 p-20 min-w-[280px] w-full text-[12px] uppercase tracking-[0.4em] text-black transition-all hover:bg-black hover:text-white flex flex-col items-center justify-center relative overflow-hidden h-64"
        >
          <span className="relative z-10 text-center">{photographer.name}</span>
          <span className="relative z-10 mt-4 text-[8px] tracking-[0.5em] text-gray-400 group-hover:text-white/40 opacity-0 group-hover:opacity-100 transition-all duration-700 uppercase">View Collection</span>
          <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-[800ms] cubic-bezier(0.19, 1, 0.22, 1)"></div>
        </Link>
      ))}
    </div>
  </section>
);

const About: React.FC = () => (
  <section className="max-w-2xl mx-auto px-4 reveal space-y-24">
    <header className="text-center space-y-6">
        <h2 className="text-[10px] uppercase tracking-[0.8em] text-gray-300">Curator Statement</h2>
        <h3 className="text-5xl serif italic text-gray-900">Nico Bowers</h3>
    </header>

    <div className="space-y-12 text-xl leading-[2] text-gray-700 font-light text-justify serif">
      <p>
        I am passionate about creating a space for freedom of expression through photography.
        Based in <span className="text-black font-normal not-italic">Exeter, New Hampshire</span>, this archive began as a vessel to share 
        visual narratives in a clean, intentional environment.
      </p>

      <p>
        I believe in the quiet power of observation. My work—and the work of my collaborators—seeks to find resonance in the mundane,
        prioritizing atmosphere and composition over the noise of the spectacle. 
        This platform is designed to evolve into a collective for like-minded observers.
      </p>

      <div className="pt-12 border-t border-gray-100 text-center">
          <p className="italic text-2xl text-gray-400 leading-relaxed max-w-md mx-auto">
            "Seeking the quiet moments between the spectacle."
          </p>
      </div>
    </div>
  </section>
);

const Contact: React.FC = () => (
  <section className="max-w-2xl mx-auto px-4 reveal text-center py-24">
    <div className="space-y-6 mb-24">
        <h2 className="text-[10px] uppercase tracking-[0.8em] text-gray-300">Correspondence</h2>
        <h3 className="text-5xl serif italic">Inquiries</h3>
    </div>

    <div className="space-y-20">
      <p className="text-xl text-gray-500 font-light leading-relaxed max-w-lg mx-auto serif italic">
        For archival prints, collaborative editorial projects, or collection inquiries, 
        please reach out via the channels below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-gray-50">
        <div className="space-y-3">
          <span className="block text-[9px] uppercase tracking-[0.5em] text-gray-400">Digital Archive</span>
          <a href="mailto:nbowers@exeter.edu" className="text-lg text-black hover:opacity-40 transition-opacity font-light tracking-wide border-b border-black/5 pb-2">
            nbowers@exeter.edu
          </a>
        </div>

        <div className="space-y-3">
          <span className="block text-[9px] uppercase tracking-[0.5em] text-gray-400">Social Index</span>
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
            <span className="text-[10px] uppercase tracking-[1em] text-gray-300 block mb-10">Selected Works // Vol I</span>
            <h2 className="text-8xl md:text-[11rem] font-light uppercase tracking-tighter mb-10 leading-[0.8] text-black">
              {photographer.name.split(' ')[0]}<br/>{photographer.name.split(' ')[1]}
            </h2>
        </div>
        
        <div className="flex items-center justify-center gap-10 mb-20">
            <div className="h-[1px] w-20 bg-black/10"></div>
            <span className="text-[12px] uppercase tracking-[0.5em] font-medium text-gray-400 italic serif">{photographer.collectionTitle}</span>
            <div className="h-[1px] w-20 bg-black/10"></div>
        </div>

        <p className="text-2xl md:text-3xl leading-relaxed text-gray-500 font-light max-w-2xl mx-auto italic serif px-6">
          "{photographer.description}"
        </p>
      </section>

      <section className="space-y-[20rem] mb-96">
        {photographer.images.map((image, index) => {
          const containerClasses = `relative flex flex-col ${
            image.size === 'large' ? 'md:w-full' : 
            image.size === 'medium' ? 'md:w-[85%] mx-auto' : 
            'md:w-[65%] mx-auto'
          } ${
            image.offset === 'top' ? 'md:-mt-64' : 
            image.offset === 'bottom' ? 'md:mt-64' : ''
          } ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`;

          return (
            <div key={index} className={containerClasses}>
              <div className="group relative overflow-hidden bg-gray-50 w-full shadow-2xl shadow-black/[0.03]">
                <img 
                  src={image.url} 
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-auto grayscale brightness-[1.03] contrast-[1.01] transition-all duration-[3000ms] cubic-bezier(0.19, 1, 0.22, 1) group-hover:grayscale-0 group-hover:scale-[1.04]"
                />
                
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex items-end p-16 pointer-events-none">
                   <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-[1200ms] ease-out">
                      <h4 className="text-white text-5xl serif italic mb-4 drop-shadow-lg">{image.title}</h4>
                      <p className="text-white/90 text-[11px] uppercase tracking-[0.6em] font-medium drop-shadow-sm">{image.description}</p>
                   </div>
                </div>
              </div>

              <div className={`mt-16 max-w-sm ${index % 2 === 0 ? 'text-left pl-2' : 'text-right md:ml-auto pr-2'}`}>
                <div className={`flex items-center gap-6 mb-6 text-[10px] uppercase tracking-[0.8em] text-gray-300 ${index % 2 !== 0 && 'flex-row-reverse'}`}>
                    <span className="font-bold text-black/30">0{index + 1}</span>
                    <div className="h-[1px] w-12 bg-gray-200"></div>
                    <span className="opacity-60">Plate</span>
                </div>
                <p className="text-lg text-gray-900 font-light uppercase tracking-[0.3em] serif italic">{image.title}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="max-w-3xl mx-auto text-center py-56 border-t border-gray-100">
          <div className="space-y-16">
            <h3 className="text-5xl serif italic text-gray-900">Collection Inquiry</h3>
            <p className="text-xl text-gray-400 tracking-wide leading-[2] font-light italic serif max-w-xl mx-auto">
              "To capture is to preserve a silence that speaks louder than the world around it."
            </p>
            <div className="pt-12">
                <Link to="/contact" className="inline-block border-b border-black/20 py-6 px-12 text-[11px] uppercase tracking-[0.6em] hover:text-gray-400 hover:border-gray-200 transition-all duration-1000">
                    Request Archive Entry
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
