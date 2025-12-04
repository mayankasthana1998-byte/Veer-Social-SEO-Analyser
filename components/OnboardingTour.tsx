
import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOUR_STEPS = [
  {
    targetId: 'tour-step-1-modes',
    title: '1. Select Your Mode',
    content: 'Start by choosing your objective. Each mode configures the AI with a unique strategic brain.',
    position: 'bottom',
  },
  {
    targetId: 'tour-step-2-platforms',
    title: '2. Choose a Platform',
    content: 'Select your destination. The AI adapts its strategy based on the specific algorithm of each platform (e.g., TikTok vs. LinkedIn).',
    position: 'right',
  },
  {
    targetId: 'tour-step-3-upload',
    title: '3. Upload Your Media',
    content: 'Drop in videos, images, or PDFs. The AI analyzes visual content to understand the context and "vibe."',
    position: 'left',
  },
  {
    targetId: 'tour-step-4-targeting',
    title: '4. Hyper-Target Your Strategy',
    content: 'Refine the AI\'s output by selecting Tones, Goals, and defining your audience. The more context, the better the result.',
    position: 'left',
  },
  {
    targetId: 'tour-step-5-analyze',
    title: '5. Launch The Engine',
    content: 'Once configured, click here to run the analysis. The AI will generate a complete viral blueprint for you.',
    position: 'top',
  },
];

const OnboardingTour: React.FC<OnboardingTourProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updateTargetRect = () => {
    const targetElement = document.getElementById(TOUR_STEPS[currentStep].targetId);
    if (targetElement) {
      setTargetRect(targetElement.getBoundingClientRect());
    } else {
      // If element not found, maybe it's on another view. Skip tour.
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateTargetRect();
      window.addEventListener('resize', updateTargetRect);
    } else {
      window.removeEventListener('resize', updateTargetRect);
    }

    return () => window.removeEventListener('resize', updateTargetRect);
  }, [isOpen, currentStep]);
  
  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen || !targetRect) {
    return null;
  }
  
  const step = TOUR_STEPS[currentStep];

  const tooltipPosition = () => {
    if (!tooltipRef.current) return {};
    const { width: tooltipW, height: tooltipH } = tooltipRef.current.getBoundingClientRect();

    switch (step.position) {
      case 'top':
        return {
          top: targetRect.top - tooltipH - 20,
          left: targetRect.left + targetRect.width / 2 - tooltipW / 2,
        };
      case 'bottom':
        return {
          top: targetRect.bottom + 20,
          left: targetRect.left + targetRect.width / 2 - tooltipW / 2,
        };
      case 'left':
        return {
          top: targetRect.top + targetRect.height / 2 - tooltipH / 2,
          left: targetRect.left - tooltipW - 20,
        };
      case 'right':
        return {
          top: targetRect.top + targetRect.height / 2 - tooltipH / 2,
          left: targetRect.right + 20,
        };
      default:
        return {};
    }
  };

  return (
    <div className="fixed inset-0 z-[1000]">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        style={{
          clipPath: `path('${`
            M 0 0 H ${window.innerWidth} V ${window.innerHeight} H 0 Z
            M ${targetRect.x - 8} ${targetRect.y - 8} 
            h ${targetRect.width + 16} 
            a 40 40 0 0 1 40 40
            v ${targetRect.height + 16 - 80}
            a 40 40 0 0 1 -40 40
            h -${targetRect.width + 16}
            a 40 40 0 0 1 -40 -40
            v -${targetRect.height + 16 - 80}
            a 40 40 0 0 1 40 -40
            Z
          `}')`
        }}
      ></div>

      <div
        ref={tooltipRef}
        className="absolute w-72 bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl animate-fade-in transition-all duration-300 ease-in-out"
        style={tooltipPosition()}
      >
        <h3 className="text-lg font-black text-white mb-2">{step.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">{step.content}</p>

        <div className="flex justify-between items-center">
          <button onClick={onClose} className="text-xs text-slate-500 hover:text-white">Skip</button>
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button onClick={handlePrev} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700">
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>
            )}
            <button onClick={handleNext} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-bold">
              {currentStep === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;
