import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in"
      style={{ animationDuration: '200ms' }}
    >
      <div
        ref={modalRef}
        className={`w-full ${sizeClasses[size]} bg-cream-50 rounded-2xl shadow-2xl animate-scale-in overflow-hidden`}
        style={{ animationDuration: '200ms' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cream-300">
          <h2 className="font-display text-xl font-semibold text-charcoal-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-charcoal-500 hover:text-charcoal-700 hover:bg-charcoal-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}
