import React, { useEffect } from "react";
import { X } from "lucide-react";

const Toast = ({
  isOpen,
  onClose,
  message,
  icon: Icon,
  iconColor = "text-blue-500",
  duration = 3000,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="flex items-center gap-3 bg-white border rounded-lg shadow-lg px-4 py-3 min-w-[250px] relative">
        {Icon && <Icon className={`${iconColor} w-6 h-6`} />}
        <span className="text-gray-800 font-medium">{message}</span>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
