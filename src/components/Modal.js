import React, { useEffect } from 'react';

const Modal = ({ children, onClose, title }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
