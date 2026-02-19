import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { FEATURED_PHOTOGRAPHERS } from '../constants';
import { JAZZ_CAFE_IMAGES } from '../gallery';

const PhotographerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const photographer = FEATURED_PHOTOGRAPHERS.find(p => p.id === id);

  if (!photographer) {
    return <Navigate to="/" />;
  }

  // We use JAZZ_CAFE_IMAGES metadata directly for Nico to enable the editorial layout
  const isNico = id === 'nico-bowers';
  const displayImages = isNico ? JAZZ_CAFE_IMAGES : [];

  return (
    <div className="reveal">
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto mb-32 text-center">
        <h2 className="text-5xl md:text-8xl font-light uppercase tracking-[-0.05em] mb-8 leading-tight text-black">
          {photographer.name}
        </h2>
        
        <div className="flex items-center justify-center gap-4 mb-12">
            <span className="h-[1px] w-8 bg-black"></span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-gray-500">Selected Archive</span>
            <span className="h-[1px] w-8 bg-black"></span>
        </div>
      </section>

      {/* Editorial Grid System */}
      <section className="space-y-32 mb-40">
        {displayImages.map((image, index) => {
          // Dynamic classes based on size and offset
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
              <div className="group relative overflow-hidden bg-gray-100 w-full shadow-2xl shadow-black/5">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-auto brightness-[1.05] contrast-[1.02] transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.04]"
                />
              </div>
            </div>
          );
        })}
      </section>

      {/* Placeholder for others */}
      {!isNico && (
        <div className="text-center py-40 border-y border-gray-100">
          <p className="text-xs uppercase tracking-[1em] text-gray-300">Awaiting Entry</p>
        </div>
      )}

      {/* Contact Section Preview */}
      <footer className="max-w-xl mx-auto text-center pt-20 border-t border-gray-100">
          <h3 className="text-2xl serif italic mb-8">Inquiries & Commissions</h3>
          <p className="text-sm text-gray-500 tracking-wide leading-loose mb-10">
            Currently accepting bookings for live events and intimate sessions. 
            For collaboration or prints, please reach out via the contact archive.
          </p>
          <a href="#/contact" className="inline-block border border-black px-12 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all">
            Open Correspondence
          </a>
      </footer>
    </div>
  );
};

export default PhotographerDetail;