import PrimaryButton from '../common/PrimaryButton';
import SecondaryButton from '../common/SecondaryButton';

const FlipCard = (props: any) => {


  return (
    <div className="flex items-center justify-center min-h-[200px] md:min-h-[300px] lg:min-h-[400px] bg-white p-2 md:p-6 lg:p-8 ">
      {/* Card Container */}
      <div className="w-72 md:w-[450px] lg:w-[650px] h-72 md:h-[450px] lg:h-[650px] relative perspective-1000">
        {/* The flip animation is controlled by rotating the inner container */}
        <div
          className={`relative w-full h-full transition-transform duration-200 transform-style-3d ${
            props.isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center border border-gray-100  overflow-x-scroll">
            <h2 className="text-md md:text-2xl lg:text-2xl font-bold mb-4">{props.ask}</h2>
            <PrimaryButton execFunc={props.handleFlip} text="Reveal" />
          </div>

          {/* Back of card */}
          <div className="absolute w-full min-h-[600px] backface-hidden bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center rotate-y-180 border border-red-100 overflow-x-scroll">
            {/* <h2 className="text-md md:text-2xl lg:text-2xl font-bold text-white mb-4 overflow-auto">{props.isFlipped&&props.answer}</h2> */}
            <div dangerouslySetInnerHTML={{ __html: props.isFlipped&&props.answer }} />
            <SecondaryButton execFunc={props.handleFlip} text="Hide" />
             
          </div>
          
        </div>
      </div>

      <style>{`
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