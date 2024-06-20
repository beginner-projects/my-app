'use client'


import Web3 from 'web3'
import './index.css'
import Image from 'next/image'
import { useMetaMask } from '@/context/useMetaMask'
import { useState } from 'react'
// contract ABI
import PresaleABI from "@/lib/PresaleABI.json";


export default function SwapCard() {
    const PresaleContractAddress = "0xA69C01bFEB6A9De2344939B52edAe0a95C9e8236";
    const { wallet, connectMetaMask } = useMetaMask();
    const [inputAmount, setInputAmount] = useState<number>(0);
    const [inputBNBAmount, setInputBNBAmount] = useState<number>(0);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const typedBNBamount = parseFloat(event.target.value);
        setInputBNBAmount(typedBNBamount);
        console.log(typedBNBamount); // Log the updated BNB amount

        // Calculate RamiCoin amount using the updated BNB amount
        const spdTokenAmountInInputField = typedBNBamount * (1 / 0.00004);
        setInputAmount(spdTokenAmountInInputField);
    };

    const handleSwap = async () => {
        const connectedAddress = wallet.accounts[0];
        if (connectedAddress) {
            try {
                const web3 = new Web3((window as any).ethereum);
                const contract = new web3.eth.Contract(PresaleABI, PresaleContractAddress);

                // Convert BNB amount to Wei
                const amountInWei = web3.utils.toWei(inputBNBAmount.toFixed(18), 'ether');

                // Call the buy function of your contract
                const tx = await contract.methods.buy().send({
                    from: connectedAddress,
                    value: amountInWei // Send BNB with the transaction
                });

                console.log("Transaction successful:", tx);
            } catch (error) {
                console.error("Error occurred during transaction:", error);
            }
        } else {
            console.log("Please connect your wallet.");
        }
    };



    return (
        <div className='swapWrapper'>
            <div className="divInsideSwapWrapper divInsideSwapWrapper2">
                <main className="fbGwtx">
                    <div className="bkiIsG">
                        <div className="dKubqp cPCYrp bIFEzi fjIrrY"></div>
                        <div>
                            <div className=" fKwfyP">
                                <div className=" fBZtXQ">
                                    <div className=" fEGIOV">
                                        <span data-disable-theme="true" className="font_body _fontFamily-299667014 _display-inline _boxSizing-border-box _wordWrap-break-word _whiteSpace-pre-wrap _mt-0px _mr-0px _mb-0px _ml-0px _color-843135005 _fontSize-14px _lineHeight-20px _fontWeight-400 _userSelect-none">
                                            You pay
                                        </span>
                                        <div className=" eDFLAS">
                                            <div id="style-Y3Pre" className="style-Y3Pre">
                                                <input onChange={handleInputChange} className=" bSkNre jvoGun" type="number" placeholder="00" />
                                            </div>
                                            <div>
                                                <div className="hgzrpu">
                                                    <button className="bbWEFp jVtbiJ kwyzSH gJLcAE"><span className="ithpwO">
                                                        <div className="dKubqp cPCYrp haLsDq">
                                                            <div className="hfSgdu style-mifhj" id="style-mifhj">
                                                                <div className=" ikhZjv">
                                                                    <div className=" efSqJh">
                                                                        <Image src="/bnb.svg" alt="token-logo" width={24} height={24} />
                                                                    </div>
                                                                </div>
                                                            </div><span className=" kyuoPa ">BNB</span>
                                                        </div>
                                                    </span>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="  iLrmxP iwDrPg">
                                            <div className="  dKubqp cPCYrp bIFEzi">
                                                <div className=" fSifYV"></div><span>1 BNB = 25,000 RAMI</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" dwsYYt">
                                <div color="#222222" className="gsVPlC">
                                    <Image src="/swapArrow.svg" alt='swap-arrow-icon' width={16} height={16} />
                                </div>
                            </div>
                        </div>
                        <div className=" fKwfyP">
                            <div className=" fBZtXQ">
                                <div className=" fEGIOV">
                                    <span data-disable-theme="true" className="font_body _fontFamily-299667014 _display-inline _boxSizing-border-box _wordWrap-break-word _whiteSpace-pre-wrap _mt-0px _mr-0px _mb-0px _ml-0px _color-843135005 _fontSize-14px _lineHeight-20px _fontWeight-400 _userSelect-none">You get</span>
                                    <div className=" eDFLAS">
                                        <div id="style-Y3Pre" className="style-Y3Pre">
                                            <input className="bSkNre jvoGun" type="text" placeholder="00" value={isNaN(inputAmount) || inputAmount.toString() === "" ? "00" : inputAmount.toFixed(3)} />
                                        </div>
                                        <div>
                                            <div className=" hgzrpu"><button className="bbWEFp jVtbiJ kwyzSH gJLcAE"><span className="ithpwO">
                                                <div className="dKubqp cPCYrp haLsDq">
                                                    <div className="hfSgdu style-mifhj" id="style-mifhj">
                                                        <div className=" ikhZjv">
                                                            <div className=" efSqJh">
                                                                <Image src="/rami.svg" alt="token-logo" width={50} height={50} />
                                                            </div>
                                                        </div>
                                                    </div><span className=" kyuoPa ">RAMI</span>
                                                </div>
                                            </span>
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="iLrmxP iwDrPg">
                                        <div className="dKubqp cPCYrp bIFEzi">
                                            <div className="fSifYV"></div><span>1 RAMI = 0.00004 BNB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {!wallet.accounts.length && (
                                <button
                                    onClick={connectMetaMask}
                                    font-weight="535"
                                    className="hCFFB jVtbiJ bVSwXO"
                                >
                                    Connect Wallet
                                </button>
                            )}
                            {wallet.accounts.length > 0 && (
                                <button
                                    font-weight="535"
                                    className="hCFFB jVtbiJ bVSwXO"
                                    onClick={handleSwap}
                                >
                                    Swap
                                </button>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
