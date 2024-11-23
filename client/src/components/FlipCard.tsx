import React, { useState } from 'react';

const FlipCard = (props: any) => {


  return (
    <div className="flex items-center justify-center min-h-[400px] bg-white p-8">
      {/* Card Container */}
      <div className="w-96 h-96 relative perspective-1000">
        {/* The flip animation is controlled by rotating the inner container */}
        <div
          className={`relative w-full h-full transition-transform duration-900 transform-style-3d ${
            props.isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center">
            <div className="text-4xl mb-4">👋</div>
            <h2 className="text-2xl font-bold mb-4">{props.ask}</h2>
            <button
              onClick={props.handleFlip}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reveal
            </button>
          </div>

          {/* Back of card */}
          <div className="absolute w-full h-full backface-hidden bg-blue-500 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center rotate-y-180">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-white mb-4">{props.handleFlip&&props.answer}</h2>
            <button
              onClick={props.handleFlip}   
              className="px-6 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Hide
            </button>
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