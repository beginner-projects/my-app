import './index.css'
import TournamentCard from "@/components/TournamentCard/TournamentCard";
import Image from 'next/image';
import Join from '@/components/Buttons/Join/Join';
import NotifyAlert from '@/components/AlertBanner/NotifyAlert';
const Home = () => {
    return (
        <>
            <NotifyAlert />
            <div className="flex justify-center">
                <TournamentCard />
            </div>
        </>
    )
}

export default Home;