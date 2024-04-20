import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
//require('dotenv').config();

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = JSON.parse(process.env.CONTRACT_ABI);
function ElectionBoard() {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    async function loadElections() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // Assuming `electionContract` is already deployed and you have the ABI & address
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const data = await contract.getElections();
      setElections(data);
    }

    if (window.ethereum) {
      loadElections();
    } else {
      console.error("Please install MetaMask to interact with this app.");
    }
  }, []);

  return (
    <div>
      <h1>Ongoing Elections</h1>
      <ul>
        {elections.map((election, index) => (
          <li key={index}>{election.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ElectionBoard;
