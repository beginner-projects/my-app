import './index.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className='flex-col justify-center mt-32'>
            <div className='flex justify-center items-center mt-8 mb-8'>
                <Link href="https://twitter.com/ramicoin_bnb" target='blank'>
                    <Image className='mr-2' src="./twitter.svg" alt='twitter' width={40} height={40} />
                </Link>
                <Link href="https://t.me/ramicoinbnb" target='blank'>
                    <Image className='mr-2' src="./telegram.svg" alt='twitter' width={40} height={40} />
                </Link>
                <Link href="https://whatsapp.com/channel/0029VaboMKGCsU9MXPpB260T" target='blank'>
                    <Image src="./whatsapp.svg" alt='twitter' width={40} height={40} />
                </Link>
            </div>
            <p className='flex justify-center text-black mb-5'>&copy; RamiTeam</p>
            <div>.</div>
        </div>
    )
}