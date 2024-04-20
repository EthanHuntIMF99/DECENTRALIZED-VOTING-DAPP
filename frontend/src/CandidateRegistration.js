import React, { useState } from 'react';
import { ethers } from 'ethers';


const contractAddress = process.env.CONTRACT_ADDRESS;
//const contractABI = JSON.parse(process.env.CONTRACT_ABI);
const contractABI = process.env.REACT_APP_CONTRACT_ABI ? JSON.parse(process.env.REACT_APP_CONTRACT_ABI) : null;

function CandidateRegistration() {
  const [name, setName] = useState('');

  async function registerCandidate(e) {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    await contract.registerCandidate(name);
    console.log('Candidate registered:', name);
  }

  return (
    <form onSubmit={registerCandidate}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

export default CandidateRegistration;
