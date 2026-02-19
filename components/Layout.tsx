import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
      <header className="py-12 px-8 sticky top-0 bg-[#fcfcfc]/90 backdrop-blur-md z-50 border-b border-gray-50">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="group">
            <h1 className="text-2xl font-light uppercase tracking-[0.5em] transition-all group-hover:opacity-50 text-black">
              Nico Bowers
            </h1>
            <div className="h-[1px] w-0 bg-black group-hover:w-full transition-all duration-700"></div>
          </Link>

          <nav className="flex gap-8 md:gap-12">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[10px] uppercase tracking-[0.4em] transition-colors relative pb-1 ${
                  location.pathname === item.path 
                  ? 'text-black font-medium' 
                  : 'text-gray-400 hover:text-black'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black"></span>
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

      <footer className="py-20 px-8 border-t border-gray-50 text-center">
        <div className="max-w-screen-sm mx-auto space-y-6">
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-300">
            Est. 2026 — New Hampshire
          </p>
          <div className="flex justify-center gap-6">
             <div className="h-[1px] w-12 bg-gray-100 self-center"></div>
             <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">© Nico Photography Archive</p>
             <div className="h-[1px] w-12 bg-gray-100 self-center"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;