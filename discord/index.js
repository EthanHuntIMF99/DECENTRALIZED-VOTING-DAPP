require('dotenv').config();
const { Client, Intents } = require('discord.js');
const { ethers } = require('ethers');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Configure Ethereum provider and smart contract
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, JSON.parse(process.env.CONTRACT_ABI), provider);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'viewelections':
            try {
                // Assuming `getElections` is a contract function that returns all elections
                const elections = await contract.getElections();
                const formattedElections = elections.map((e, index) => `ID: ${index}, Name: ${e}`).join('\n');
                message.reply(`Current elections:\n${formattedElections}`);
            } catch (error) {
                console.error(error);
                message.reply('Failed to fetch elections.');
            }
            break;

        case 'register':
            if (args.length < 1) {
                message.reply('Please provide a name for the candidate. Usage: `!register <name>`');
            } else {
                try {
                    const name = args.join(' ');
                    // Assuming `registerCandidate` is a contract function
                    const tx = await contract.registerCandidate(name);
                    await tx.wait();
                    message.reply(`Candidate ${name} registered successfully.`);
                } catch (error) {
                    console.error(error);
                    message.reply('Failed to register candidate.');
                }
            }
            break;

        case 'vote':
            if (args.length < 2) {
                message.reply('Please provide election ID and candidate ID. Usage: `!vote <election_id> <candidate_id>`');
            } else {
                try {
                    const electionId = args[0];
                    const candidateId = args[1];
                    // Assuming `castVote` is a contract function
                    const tx = await contract.castVote(electionId, candidateId);
                    await tx.wait();
                    message.reply(`Voted for candidate ${candidateId} in election ${electionId} successfully.`);
                } catch (error) {
                    console.error(error);
                    message.reply('Failed to cast vote.');
                }
            }
            break;

        default:
            message.reply('Unknown command.');
    }
});

client.login(process.env.DISCORD_TOKEN);
