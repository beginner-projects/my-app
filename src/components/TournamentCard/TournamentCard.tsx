'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './index.css';
import FeeBtn from '@/components/Buttons/Join/FeeBtn';
import EntryClosedBtn from '@/components/Buttons/EntryClosed/EntryClosed';
import Web3 from 'web3';
import ContractABI from '@/lib/ContractABI.json';
import { useMetaMask } from '@/context/useMetaMask';
import Wallet from '@/components/Wallet/Wallet';
import GetRoomId from '@/components/Buttons/RoomId/GetRoomId';
import Link from 'next/link';
const contractAddress = '0xAFfAc0C0779c995AD9E5b193433B55EFAeCC8b0e';
const maxParticipants = 100; // The maximum number of participants

const TournamentCard: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const [totalParticipants, setTotalParticipants] = useState<number>(0);
    const { wallet } = useMetaMask();
    const [isParticipant, setIsParticipant] = useState<boolean>(false); // State to track participant status

    useEffect(() => {
        const getTimeUntilNextHour = () => {
            const now = new Date();
            const currentISTTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
            const nextHour = new Date(currentISTTime);
            nextHour.setHours(currentISTTime.getHours() + 1, 0, 0, 0);
            const timeDifference = Math.floor((nextHour.getTime() - currentISTTime.getTime()) / 1000);
            return timeDifference;
        };

        setTime(getTimeUntilNextHour());

        const timer = setInterval(() => {
            setTime(prevTime => (prevTime > 0 ? prevTime - 1 : getTimeUntilNextHour()));
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        const loadContractData = async () => {
            try {
                const web3 = new Web3('https://bsc-testnet-dataseed.bnbchain.org'); // Replace with your preferred read-only provider
                const contract = new web3.eth.Contract(ContractABI as any, contractAddress);
                const participants = await contract.methods.totalParticipants().call();
                setTotalParticipants(Number(participants));

                // Check if connected wallet address is available
                if (wallet.accounts.length > 0) {
                    try {
                        const isParticipantResult: boolean = await contract.methods.participants(wallet.accounts[0]).call();
                        setIsParticipant(isParticipantResult);
                    } catch (error) {
                        console.error('Error checking participant status:', error);
                    }
                }
            } catch (error) {
                console.error('Error loading contract data:', error);
            }
        };

        // Load initial data
        loadContractData();

        // Fetch participants every 5 seconds
        const interval = setInterval(() => {
            loadContractData();
        }, 5000);

        return () => clearInterval(interval);
    }, [wallet.accounts]); // Reload data when wallet account changes


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const calculateProgress = () => {
        return (totalParticipants / maxParticipants) * 100;
    };

    return (
        <div className='flex-col justify-center items-center mt-11 tournament-container'>
            <Link className='flex justify-center' href="/">
                <Image src="./home.svg" alt="home" width={40} height={40} />
            </Link>
            <div className='flex justify-center mt-8'>
                {wallet.accounts.length > 0 ? (
                    isParticipant ? (
                        <div>
                            <GetRoomId />
                        </div>
                    ) : (
                        time < 700 || totalParticipants === 100 ? <EntryClosedBtn /> : <FeeBtn />
                    )
                ) : (
                    <Wallet />
                )}
            </div>
            <Image src="/trophy.svg" alt="Trophy" width={350} height={100} />
            <div>
                <span className='text-black flex justify-center text-xl'>Match starts in:</span>
                <strong className='flex justify-center text-black text-2xl'>{formatTime(time)}</strong>
            </div>
            <div className='flex-col justify-center mt-5'>
                <div className="flex justify-center mb-1 text-base font-medium text-black">{totalParticipants} Players Joined</div>
                <div className="w-full bg-blue-900 rounded-full h-2.5 mb-4 mt-3">
                    <div className="bg-white h-2.5 rounded-full yello-class-style" style={{ width: `${calculateProgress()}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default TournamentCard;
