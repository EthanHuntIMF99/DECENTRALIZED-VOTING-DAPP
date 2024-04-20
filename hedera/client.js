require('dotenv').config();
const { Client, PrivateKey, AccountId } = require("@hashgraph/sdk");

function getClient() {
    const client = Client.forTestnet(); // Use Client.forMainnet() for production
    client.setOperator(
        AccountId.fromString(process.env.MY_ACCOUNT_ID),
        PrivateKey.fromString(process.env.MY_PRIVATE_KEY)
    );
    return client;
}
