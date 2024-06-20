import React from 'react';
import './index.css';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <p className='text-white font-semibold text-xl'>Are you sure you want to Disconnect Wallet ?</p>
      <Image className='flex justify-center items-center' src="./offline.svg" alt="disconnect" width={250} height={250} />
      <div className='flex justify-center items-center mt-11'>
        <button type="button" onClick={onConfirm} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-2xl px-11 py-3 text-center me-2 mb-2">Yes</button>
        <button type="button" onClick={onClose} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-2xl px-11 py-3 text-center me-2 mb-2">No</button>
      </div>
    </div>

  );
};

export default Modal;
