"use client";

import Image from "next/image";
import { Tabs } from "@/components/ui/tabs";
import SwapCard from "@/components/SwapCard/SwapCard";
import Join from "../Buttons/Join/Join";
import Wallet from "../Wallet/Wallet";

export default function TabsDemo() {
  const tabs = [
    // {
    //   title: "Stake",
    //   value: "services",
    //   content: (
    //     <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-2xl md:text-4xl font-bold text-white stake-tab">
    //       <div className="flex justify-center mb-5">
    //           <Wallet />
    //         </div>
    //       <p className="flex justify-center items-center text-white">Stake $RamiCoin</p>
    //     </div>
    //   ),
    // },
    {
      title: "Mine",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-2xl md:text-4xl font-bold text-white mine-tab">
          <div className="flex justify-center mb-5">
              <Wallet />
            </div>
          <p className="flex justify-center items-center text-white">Mine $RamiCoin</p>
          <div className="flex justify-center">
          <Image src="./rami.svg" alt="logo" width={200} height={200} />
          </div>
        </div>
      ),
    },
    {
      title: "Play",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-2xl md:text-4xl font-bold text-white play-tab">
          <main className="main-line">
            <div className="headline">
              <h2 className="flex justify-center welcome-tag">Welcome</h2>
              <h1 className="text-yellow-300 font-bold text-4xl ramicoiners">RamiCoiners</h1>
            </div>
            <Image className="truck-image" src="./truck.svg" alt="truck" width={300} height={300} />
          </main>
          <div className="flex-col justify-center mt-11">
            <Join />
          </div>
        </div>
      ),
    },
    {
      title: "Buy",
      value: "product",
      content: (
        <>
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-2xl md:text-4xl font-bold text-white buy-tab">
            <div className="flex justify-center mb-5">
              <Wallet />
            </div>
            <p className="flex justify-center items-center text-white">Buy $RamiCoin</p>
            <SwapCard />
            <h3 className="flex justify-center text-yellow-300 text-sm font-light mt-5">1 $Rami = $0.005</h3>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="h-[50rem] md:h-[50rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-center justify-center my-11">
      <Tabs tabs={tabs} />
    </div>
  );
}