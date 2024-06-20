'use client'

import { useState } from 'react';
import { useMetaMask } from '@/context/useMetaMask';
import { formatAddress } from '@/utils';
import RedBtn from '../Buttons/Red/RedBtn';
import Modal from '@/components/Modal/Modal';

export default function Wallet() {
  const { wallet, connectMetaMask, disconnectMetaMask } = useMetaMask();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDisconnect = () => {
    disconnectMetaMask();
    setIsModalOpen(false);
  };

  return (
    <>
      {!wallet.accounts.length ? (
        <div onClick={connectMetaMask}>
          <RedBtn text="Connect Wallet" />
        </div>
      ) : (
        <div onClick={() => setIsModalOpen(true)}>
          <RedBtn text={formatAddress(wallet.accounts[0])} />
        </div>
      )}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleDisconnect} 
      />
    </>
  );
}





