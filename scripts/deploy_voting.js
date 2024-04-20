const { ethers } = require("hardhat");

async function main() {
    try {
        const Voting = await ethers.getContractFactory("Voting");
        const voting = await Voting.deploy({ gasLimit: 5000000 });
        await voting.deployed();
        console.log("Voting deployed to:", voting.address);
    } catch (error) {
        console.error("Deployment failed:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

