const { getClient } = require('./client');
const { FileCreateTransaction, FileAppendTransaction, ContractCreateTransaction, Hbar, FileId } = require("@hashgraph/sdk");
require('dotenv').config();
// Function to upload bytecode to Hedera File Service

const bytecode = process.env.CONTRACT_BYTECODE;
async function uploadBytecode(client, bytecode) {
    // Create a file to store the bytecode
    let fileCreateTx = new FileCreateTransaction()
        .setContents(bytecode.slice(0, 4000)) // Upload the first part of the bytecode
        .setMaxTransactionFee(new Hbar(2));  // Set a max fee of 2 Hbars

    let fileCreateSubmit = await fileCreateTx.execute(client);
    let fileCreateReceipt = await fileCreateSubmit.getReceipt(client);
    let fileId = fileCreateReceipt.fileId;

    // If the bytecode is longer than 4000 bytes, append additional parts
    let startPosition = 4000;
    while (startPosition < bytecode.length) {
        let chunk = bytecode.slice(startPosition, Math.min(startPosition + 4000, bytecode.length));
        let fileAppendTx = new FileAppendTransaction()
            .setFileId(fileId)
            .setContents(chunk)
            .setMaxTransactionFee(new Hbar(2)); // Set a max fee of 2 Hbars

        await fileAppendTx.execute(client);
        startPosition += 4000;
    }

    return fileId;
}

// Function to create the smart contract instance
async function createContractInstance(client, bytecodeFileId) {
    let contractTx = new ContractCreateTransaction()
        .setBytecodeFileId(bytecodeFileId)
        .setGas(1000000) // Set sufficient gas for the contract creation
        .setMaxTransactionFee(new Hbar(10)); // Set a max fee of 10 Hbars

    let contractResponse = await contractTx.execute(client);
    let contractReceipt = await contractResponse.getReceipt(client);
    return contractReceipt.contractId;
}

// Main deployment function
async function deployContract(bytecode) {
    const client = getClient();
    const fileId = await uploadBytecode(client, bytecode);
    const contractId = await createContractInstance(client, fileId);
    console.log("Contract deployed at:", contractId.toString());
    return contractId;
}

module.exports = { deployContract };
