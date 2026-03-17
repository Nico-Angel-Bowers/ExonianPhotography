import React from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_PHOTOGRAPHERS } from '../constants';

const Home: React.FC = () => {
  return (
    <section className="text-center">
      <h2 className="text-lg md:text-2xl font-light uppercase tracking-widest mb-12 md:mb-20 text-black">
        Featured Photographers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {FEATURED_PHOTOGRAPHERS.map((photographer) => (
          photographer.isPlaceholder ? (
            <div 
              key={photographer.id}
              className="border border-gray-200 p-8 md:p-12 min-w-[220px] w-full h-[300px] flex items-center justify-center text-gray-300 text-[12px] uppercase tracking-widest select-none"
            >
              {photographer.name}
            </div>
          ) : (
            <Link
              key={photographer.id}
              to={`/photographer/${photographer.id}`}
              className="group relative border border-black min-w-[220px] w-full h-[300px] overflow-hidden flex items-center justify-center"
            >
              {photographer.profileImage ? (
                <>
                  <img 
                    src={photographer.profileImage} 
                    alt={photographer.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white text-left">
                    <span className="text-[12px] uppercase tracking-widest font-medium">
                      {photographer.name}
                    </span>
                  </div>
                </>
              ) : (
                <span className="text-[12px] uppercase tracking-widest text-black group-hover:text-white z-10 transition-colors">
                  {photographer.name}
                </span>
              )}
              
              {!photographer.profileImage && (
                <div className="absolute inset-0 bg-white group-hover:bg-black transition-colors duration-300 -z-0" />
              )}
            </Link>
          )
        ))}
      </div>
    </section>
  );
};

export default Home;