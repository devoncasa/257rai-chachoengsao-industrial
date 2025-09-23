import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TranslationSet } from './types';

interface LightboxProps {
  images: { src: string; caption: string }[];
  startIndex: number;
  onClose: () => void;
  t: TranslationSet;
}

export const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, onClose, t }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetTransform = useCallback(() => {
    setTransform({ scale: 1, x: 0, y: 0 });
  }, []);
  
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetTransform();
    }
  }, [currentIndex, images.length, resetTransform]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetTransform();
    }
  }, [currentIndex, resetTransform]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    // Fade in
    requestAnimationFrame(() => setIsVisible(true));
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleClose, goToNext, goToPrev]);
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleAmount = -e.deltaY * 0.001;
    let newScale = transform.scale + scaleAmount;
    newScale = Math.min(Math.max(0.5, newScale), 5); // Clamp scale
    
    if (newScale <= 1) {
        resetTransform();
    } else {
        setTransform(prev => ({...prev, scale: newScale }));
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isDragging.current = true;
    lastPosition.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || transform.scale <= 1) return;
    e.preventDefault();
    const dx = e.clientX - lastPosition.current.x;
    const dy = e.clientY - lastPosition.current.y;
    lastPosition.current = { x: e.clientX, y: e.clientY };
    setTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
  };
  
  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    isDragging.current = false;
    (e.target as HTMLElement).style.cursor = 'grab';
  };


  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isVisible && !isClosing ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <button
        aria-label={t.ariaClose}
        className="absolute top-4 right-4 z-10 p-2 text-white bg-black/30 rounded-full hover:bg-black/60 transition-colors"
        onClick={handleClose}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
        <button
          aria-label={t.ariaPrevious}
          className="absolute left-2 md:left-4 z-10 p-2 text-white bg-black/30 rounded-full hover:bg-black/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={goToPrev}
          disabled={currentIndex === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          className="w-full h-full flex items-center justify-center overflow-hidden"
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <img
            ref={imageRef}
            src={images[currentIndex].src}
            alt={images[currentIndex].caption}
            className={`max-w-full max-h-full object-contain transition-transform duration-300 ease-in-out select-none ${isClosing ? 'scale-90' : 'scale-100'}`}
            style={{ 
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                cursor: transform.scale > 1 ? 'grab' : 'auto',
                touchAction: 'none'
            }}
          />
        </div>

        <button
          aria-label={t.ariaNext}
          className="absolute right-2 md:right-4 z-10 p-2 text-white bg-black/30 rounded-full hover:bg-black/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={goToNext}
          disabled={currentIndex === images.length - 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div 
        id="lightbox-caption"
        className="absolute bottom-0 left-0 right-0 p-4 text-center text-white bg-gradient-to-t from-black/50 to-transparent"
      >
        <p className="text-lg font-semibold">{images[currentIndex].caption}</p>
        <p className="text-sm opacity-80">{`${currentIndex + 1} / ${images.length}`}</p>
      </div>
    </div>
  );
};
