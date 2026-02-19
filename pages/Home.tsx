import React from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_PHOTOGRAPHERS } from '../constants';

const Home: React.FC = () => {
  return (
    <section className="text-center">
      <h2 className="text-lg md:text-2xl font-light uppercase letter-spacing-wide mb-12 md:mb-20 text-black">
        This Month’s Featured Photographers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {FEATURED_PHOTOGRAPHERS.map((photographer) => (
          photographer.isPlaceholder ? (
            <div 
              key={photographer.id}
              className="border border-gray-200 p-8 md:p-12 min-w-[220px] w-full flex items-center justify-center text-gray-300 text-[12px] uppercase letter-spacing-slim select-none"
            >
              {photographer.name}
            </div>
          ) : (
            <Link
              key={photographer.id}
              to={`/photographer/${photographer.id}`}
              className="border border-black p-8 md:p-12 min-w-[220px] w-full text-[12px] uppercase letter-spacing-slim text-black transition-all hover:bg-black hover:text-white flex items-center justify-center"
            >
              {photographer.name}
            </Link>
          )
        ))}
      </div>
    </section>
  );
};

export default Home;