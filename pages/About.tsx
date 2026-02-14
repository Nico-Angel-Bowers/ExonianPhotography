
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="max-w-2xl mx-auto px-4">
      <h2 className="text-center text-lg md:text-2xl font-light uppercase letter-spacing-wide mb-12">
        About
      </h2>

      <div className="space-y-8 text-base leading-relaxed text-gray-800">
        <p>
          I am passionate about creating a space for freedom of expression through photography.
          Based in Exeter, New Hampshire, this site began as a way to share my own work in a
          clean and intentional environment.
        </p>

        <p>
          I hope Nico’s Photography grows into more than just a personal portfolio — becoming
          a platform where other photographers can share their perspectives and creative work.
        </p>

        <p>
          I was born in New York City above my parents’ restaurant, Corner Social.
          In 2026, I created this site to give photography a space that feels calm,
          honest, and thoughtfully curated.
        </p>
      </div>
    </section>
  );
};

export default About;
