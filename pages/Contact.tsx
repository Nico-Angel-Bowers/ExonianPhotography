
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="max-w-2xl mx-auto px-4">
      <h2 className="text-center text-lg md:text-2xl font-light uppercase letter-spacing-wide mb-12">
        Contact
      </h2>

      <div className="space-y-8 text-base leading-relaxed text-gray-800">
        <p>
          I’d love to hear from you. Whether you have a question, want to collaborate,
          or are interested in sharing your work on this platform, feel free to reach out.
        </p>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div>
            <strong className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Email</strong>
            <a href="mailto:nbowers@exeter.edu" className="text-black hover:underline decoration-1 underline-offset-4">
              nbowers@exeter.edu
            </a>
          </div>

          <div>
            <strong className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Instagram</strong>
            <a 
              href="https://www.instagram.com/nicobowers2010/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:underline decoration-1 underline-offset-4"
            >
              @nicobowers2010
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
