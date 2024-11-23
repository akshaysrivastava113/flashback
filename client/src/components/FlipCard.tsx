import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

const FlipCard = (props: any) => {


  return (
    <div className="flex items-center justify-center min-h-[400px] bg-white p-8">
      {/* Card Container */}
      <div className="w-96 h-96 relative perspective-1000">
        {/* The flip animation is controlled by rotating the inner container */}
        <div
          className={`relative w-full h-full transition-transform duration-200 transform-style-3d ${
            props.isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center">
            <div className="text-4xl mb-4">👋</div>
            <h2 className="text-2xl font-bold mb-4">{props.ask}</h2>
            <PrimaryButton execFunc={props.handleFlip} text="Reveal" />
          </div>

          {/* Back of card */}
          <div className="absolute w-full h-full backface-hidden bg-red-400 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center rotate-y-180">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-white mb-4">{props.isFlipped&&props.answer}</h2>
            <SecondaryButton execFunc={props.handleFlip} text="Hide" />
             
          </div>
          
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default FlipCard;