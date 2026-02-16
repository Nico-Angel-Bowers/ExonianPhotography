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
  scatterX?: string; 
  scatterY?: string;
  rotation?: string; // Added for Aaleya's cool layout
}

interface Photographer {
  id: string;
  name: string;
  description: string;
  collectionTitle: string;
  profileImage: string;
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

const AALEYA_GANGULY_IMAGES: CollectionImage[] = [
  { url: 'https://i.imgur.com/O7QFHMz.jpeg', title: '01', description: '', size: 'small', offset: 'none', scatterX: '-5%', scatterY: '20px', rotation: '-2deg' },
  { url: 'https://i.imgur.com/QzsXnBW.jpeg', title: '02', description: '', size: 'medium', offset: 'none', scatterX: '10%', scatterY: '-40px', rotation: '1deg' },
  { url: 'https://i.imgur.com/pBAwkyy.jpeg', title: '03', description: '', size: 'small', offset: 'none', scatterX: '-15%', scatterY: '60px', rotation: '3deg' },
  { url: 'https://i.imgur.com/fXcT3Xg.jpeg', title: '04', description: '', size: 'medium', offset: 'none', scatterX: '5%', scatterY: '0', rotation: '-1deg' },
  { url: 'https://i.imgur.com/kKv6Vgy.jpeg', title: '05', description: '', size: 'small', offset: 'none', scatterX: '-8%', scatterY: '-50px', rotation: '-4deg' },
  { url: 'https://i.imgur.com/dzG3N06.jpeg', title: '06', description: '', size: 'medium', offset: 'none', scatterX: '12%', scatterY: '80px', rotation: '2deg' },
  { url: 'https://i.imgur.com/YVsxcux.jpeg', title: '07', description: '', size: 'small', offset: 'none', scatterX: '-20%', scatterY: '-20px', rotation: '-2deg' },
  { url: 'https://i.imgur.com/Q14Dhyc.jpeg', title: '08', description: '', size: 'medium', offset: 'none', scatterX: '8%', scatterY: '30px', rotation: '1deg' },
  { url: 'https://i.imgur.com/lYSMYaT.jpeg', title: '09', description: '', size: 'small', offset: 'none', scatterX: '-10%', scatterY: '100px', rotation: '5deg' },
  { url: 'https://i.imgur.com/aA6nhov.jpeg', title: '10', description: '', size: 'medium', offset: 'none', scatterX: '15%', scatterY: '-10px', rotation: '-1deg' }
];

const FEATURED_PHOTOGRAPHERS: Photographer[] = [
  {
    id: 'flynn-kohut',
    name: 'Flynn Kohut',
    description: 'Scenes that demand a pause, finding profound peace in a world of hate.',
    collectionTitle: 'Peace in a World of Hate',
    profileImage: 'https://i.imgur.com/de5Jzhw.png',
    images: FLYNN_KOHUT_IMAGES
  },
  {
    id: 'paxton-hope',
    name: 'Paxton Hope',
    description: 'An exploration of the ephemeral and the discarded.',
    collectionTitle: '',
    profileImage: 'https://i.imgur.com/Jw3OYdG.jpeg',
    images: PAXTON_HOPE_IMAGES
  },
  {
    id: 'aaleya-ganguly',
    name: 'Aaleya Ganguly',
    description: 'A cinematic perspective on the mundane, capturing light and shadow in motion.',
    collectionTitle: '',
    profileImage: 'https://i.imgur.com/fXY4l0G.png',
    images: AALEYA_GANGULY_IMAGES
  },
  {
    id: 'nico-bowers',
    name: 'Nico Bowers',
    description: 'Focused on creating calm, intentional images that emphasize atmosphere, composition, and honesty.',
    collectionTitle: 'Jazz Cafe Night',
    profileImage: 'https://i.imgur.com/RYXwCGo.jpeg',
    images: NICO_BOWERS_IMAGES
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
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
      <header className="py-4 px-8 sticky top-0 bg-[#fcfcfc]/95 backdrop-blur-md z-50 border-b border-gray-100/50">
        <div className={`max-w-screen-xl mx-auto flex flex-col md:flex-row items-center ${isHome ? 'justify-center' : 'justify-between'} gap-2 md:gap-4`}>
          {!isHome && (
            <Link to="/" className="group text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-light uppercase tracking-[0.5em] transition-all group-hover:opacity-60 leading-tight">
                Exonian Photography
              </h1>
              <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mt-1 font-medium">
                (hosted by nico bowers)
              </p>
            </Link>
          )}

          <nav className={`flex gap-6 md:gap-12 ${isHome ? 'mt-0' : 'mt-2 md:mt-0'}`}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[10px] uppercase tracking-[0.4em] transition-all relative pb-1 ${
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
    {/* Explicitly centered hero container */}
    <div className="flex-grow flex flex-col items-center justify-center w-full px-4 text-center">
      <div className="mb-8 w-full">
          <h1 className="text-[14vw] md:text-[8rem] lg:text-[10rem] serif font-light uppercase tracking-tighter leading-[0.85] mx-auto text-center w-full">
            <span className="block">Exonian</span>
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

    {/* Featured photographers at the bottom */}
    <div className="w-full pb-12 px-8">
      <div className="mb-10 space-y-2 pt-6 border-t border-gray-100 max-w-md mx-auto flex flex-col items-center justify-center">
          <h2 className="text-[9px] font-medium uppercase tracking-[0.6em] text-gray-400 text-center">This month's photographers</h2>
          <div className="h-[1px] w-12 bg-black/10 mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 justify-items-center max-w-6xl mx-auto w-full">
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
    </div>
  </section>
);

const About: React.FC = () => (
  <section className="max-w-3xl mx-auto px-8 reveal space-y-6 py-6 flex-grow flex flex-col justify-center">
    <header className="text-center space-y-4">
        <h2 className="text-[9px] uppercase tracking-[0.6em] text-gray-300">Mission Statement</h2>
        <h3 className="text-4xl md:text-5xl serif italic text-gray-900">Exonian Photography</h3>
    </header>

    <div className="text-xl md:text-2xl leading-[1.7] text-gray-500 font-light text-center serif italic max-w-2xl mx-auto">
      <p>
        Exonian Photography is an archive for students around the world to share the world through their own lenses. 
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

const PhotographerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const photographer = FEATURED_PHOTOGRAPHERS.find(p => p.id === id);

  if (!photographer) {
    return <Navigate to="/" />;
  }

  const isAaleya = id === 'aaleya-ganguly';

  return (
    <div className="reveal w-full px-8 pb-20">
      <section className="max-w-5xl mx-auto mb-16 text-center">
        <div className="mb-4">
            <span className="text-[9px] uppercase tracking-[0.8em] text-gray-300 block mb-2">Exonian Archive // {id === 'flynn-kohut' ? 'VOL I' : id === 'paxton-hope' ? 'VOL II' : id === 'aaleya-ganguly' ? 'VOL III' : 'VOL IV'}</span>
            <h2 className="text-6xl md:text-[8rem] font-light uppercase tracking-tighter mb-2 leading-[0.85] text-black text-center">
              <span className="block">{photographer.name.split(' ')[0]}</span>
              <span className="block">{photographer.name.split(' ')[1]}</span>
            </h2>
        </div>
        
        {photographer.collectionTitle && (
          <div className="flex items-center justify-center gap-6 mb-4">
              <div className="h-[1px] w-12 bg-black/10"></div>
              <span className="text-[11px] uppercase tracking-[0.4em] font-medium text-gray-400 italic serif">{photographer.collectionTitle}</span>
              <div className="h-[1px] w-12 bg-black/10"></div>
          </div>
        )}
      </section>

      {/* Conditional Gallery Layout */}
      {isAaleya ? (
        <section className="max-w-6xl mx-auto relative pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 items-start">
            {photographer.images.map((image, index) => (
              <div 
                key={index} 
                className="relative z-10 transition-transform duration-700 hover:z-20"
                style={{ 
                    transform: `translate(${image.scatterX || '0'}, ${image.scatterY || '0'}) rotate(${image.rotation || '0deg'})`,
                }}
              >
                <div className="group relative overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-700 cursor-zoom-in">
                   <img 
                    src={image.url} 
                    alt={`Archival Plate ${index + 1}`}
                    loading="lazy"
                    className="w-full h-auto brightness-[1.02] contrast-[1.01] transition-all duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Chic Labeling */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 border border-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-black">A.G. Plate {image.title}</span>
                  </div>

                  <div className="absolute inset-0 border border-black/0 group-hover:border-black/5 transition-all duration-700 pointer-events-none"></div>
                </div>
                
                {/* Secondary Meta Information */}
                <div className="mt-4 flex items-center gap-3 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="h-[1px] w-6 bg-black"></div>
                    <span className="text-[7px] uppercase tracking-[0.5em] font-medium">Archival Entry // NYC</span>
                </div>
              </div>
            ))}
          </div>

          {/* Abstract background text for Aaleya's 'cool' layout */}
          <div className="fixed inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-[0.02]">
              <h2 className="text-[25vw] serif italic font-black uppercase whitespace-nowrap">Cinematic Motion</h2>
          </div>
        </section>
      ) : (
        <section className="space-y-4 mb-8">
          {photographer.images.map((image, index) => {
            const containerClasses = `relative flex flex-col ${
              image.size === 'large' ? 'md:w-full' : 
              image.size === 'medium' ? 'md:w-[80%] mx-auto' : 
              'md:w-[55%] mx-auto'
            } items-center`;

            return (
              <div key={index} className={containerClasses}>
                <div className="group relative overflow-hidden bg-gray-50 w-full shadow-md">
                  <img 
                    src={image.url} 
                    alt={`Archival Plate ${index + 1}`}
                    loading="lazy"
                    className="w-full h-auto brightness-[1.02] contrast-[1.01] transition-all duration-[2000ms] cubic-bezier(0.19, 1, 0.22, 1) group-hover:scale-[1.02]"
                  />
                  
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex items-end p-4 pointer-events-none">
                     <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-[800ms] ease-out">
                        <h4 className="text-white text-2xl serif italic drop-shadow-lg">0{index + 1}</h4>
                     </div>
                  </div>
                </div>

                <div className="mt-2 text-center w-full">
                  <div className="flex items-center justify-center gap-2 mb-1 text-[8px] uppercase tracking-[0.4em] text-gray-300">
                      <span className="font-bold text-black/10">0{index + 1}</span>
                      <div className="h-[1px] w-4 bg-gray-100"></div>
                      <span className="opacity-30">Entry</span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      <section className="max-w-3xl mx-auto text-center py-12 border-t border-gray-100 mt-20">
          <div className="space-y-4">
            <div className="pt-2">
                <Link to="/contact" className="inline-block border-b border-black/20 py-2 px-12 text-[10px] uppercase tracking-[0.4em] hover:text-gray-400 hover:border-gray-200 transition-all duration-1000 font-medium">
                    Contact Nico Bowers
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
