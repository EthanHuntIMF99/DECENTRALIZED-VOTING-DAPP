---

# Decentralized Voting Application

## Overview
This project is a decentralized voting application that utilizes Solidity for smart contracts and Hedera Hashgraph for distributed consensus. The application features a full-stack web interface with Discord integration to facilitate user interaction. It's designed to ensure secure and transparent voting processes.

## Features
- **Smart Contracts:** Implemented using Solidity to manage voting processes including election creation, candidate registration, and vote casting.
- **Distributed Ledger:** Uses Hedera Hashgraph to store votes, ensuring integrity and transparency with a custom consensus mechanism.
- **Full-Stack Development:** A web-based interface that interacts with the smart contract through a web3 library like ethers.js.
- **Discord Bot:** A Discord bot for interacting with the voting system, allowing users to manage elections and vote directly through Discord commands.
- **Security:** Protection against common vulnerabilities like reentrancy attacks, and integer overflow/underflow.

## Prerequisites
To run this project, you will need:
- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Hardhat](https://hardhat.org/) (used for local Ethereum network simulation)
- A [Hedera Hashgraph](https://hedera.com/) account
- [Discord](https://discord.com/) account and a bot token
- [MetaMask](https://metamask.io/) (or another Ethereum wallet)

## Installation

### Clone the Repository
```bash
git clone https://github.com/EthanHuntIMF99/DECENTRALIZED-VOTING-DAPP.git
cd DECENTRALIZED-VOTING-DAPP
```

### Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Set up Environment Variables
Create a `.env` file in the project root and populate it with the necessary credentials:
```plaintext
DISCORD_TOKEN=your_discord_bot_token
CONTRACT_ADDRESS=deployed_smart_contract_address
PRIVATE_KEY=your_hedera_private_key
ACCOUNT_ID=your_hedera_account_id
```

### Smart Contract Deployment
Deploy your smart contracts using Truffle or Hardhat:
```bash
npx hardhat run scripts/deploy.js --network hederaTestnet
```

### Start the Frontend Application
```bash
cd frontend
npm start
```

## Architecture
This application is structured into several components:
- **Smart Contracts**: Handle the logic for elections, candidate registration, and voting.
- **Hedera Hashgraph**: Manages the distributed ledger that stores and validates the voting results.
- **Web Frontend**: Provides a user interface for interacting with the voting system.
- **Discord Bot**: Allows users to perform election-related activities through Discord commands.

## Discord Commands
- `!viewelections` - Displays all ongoing elections.
- `!register <name>` - Registers a new candidate.
- `!vote <election_id> <candidate_id>` - Casts a vote for a candidate in an election.

## Security Measures
The application incorporates various security practices to mitigate potential risks, including checks for reentrancy and proper handling of integer arithmetic to prevent overflows and underflows.

## Conclusion
This README provides an overview and setup instructions for the Decentralized Voting Application. The project integrates blockchain technology with modern web and Discord interfaces to create a secure, user-friendly voting platform.

---
