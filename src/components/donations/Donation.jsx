import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

const connectWallet = async ({ setError, setTxs }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");

  } catch (err) {
    setError(err.message);
  }
};


export default function Donation() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const addr = "0x88E7F20AD805d7E56186d9E7911873a17336E5E3";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: addr
    });
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    await connectWallet({
      setError,
      setTxs
    });
  }

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      {/* <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white"> */}
      <div className="pb-3 text-center card "  >
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Etherium donations: 
          </h1>
          <div className="my-2">
            <input
              name="ether"
              type="text"
              
              placeholder="Amount in ETH"
            />
          </div>
        </main>
        <footer>
          <div >
            <button
              onClick={handleConnect}
              className="btn btn-primary connect-button "
            >
              Connect to MetaMask
            </button>
          </div>
          <div style={{padding: '10px 10px' , textAlign:'center' }}>
            <button
              type="submit"
              className="btn btn-primary submit-button "
            >
              Donate
            </button>
          </div>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}
