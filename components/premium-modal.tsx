import React from "react";

interface PremiumModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const PremiumModal = ({ title, onClose, children }: PremiumModalProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col animate-fade-in">
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-blue-900/80 to-indigo-900/80">
          <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-white hover:text-blue-200 transition text-2xl font-bold px-2 focus:outline-none">×</button>
        </div>
        <div className="p-6 bg-gradient-to-br from-white via-blue-50 to-indigo-50 text-base md:text-lg overflow-y-auto max-h-[70vh]">
          {children}
        </div>
        <div className="p-4 border-t bg-gray-50 text-right">
          <button
            onClick={onClose}
            className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-6 rounded-lg transition shadow"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
