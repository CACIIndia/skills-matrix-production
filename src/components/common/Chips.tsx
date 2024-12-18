import React, { useState } from "react";

interface ChipsProps {
  label: string; 
  showCloseIcon?: boolean; 
  onClose?: () => void; 
}

const Chips: React.FC<ChipsProps> = ({ label, showCloseIcon = true, onClose }) => {
  const [visible, setVisible] = useState(true);


  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null; 

  return (
    <div className="inline-flex items-center px-3 py-1 bg-gray-200 rounded-full text-gray-800 text-sm font-medium">
      <span>{label}</span>
      {showCloseIcon && (
        <button
          onClick={handleClose}
          className="ml-2 w-4 h-4 text-gray-600 hover:text-gray-800"
          aria-label="Close chip"
        >
          &#10005; {/* Close icon as an "X" */}
        </button>
      )}
    </div>
  );
};

export default Chips;
