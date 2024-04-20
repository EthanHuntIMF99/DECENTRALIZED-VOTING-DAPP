// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title A voting contract for decentralized elections
/// @dev This contract uses ReentrancyGuard to prevent reentrancy attacks
contract Voting is ReentrancyGuard {
    using Math for uint256;

    struct Candidate {
        uint id; // Unique identifier for a candidate
        string name; // Name of the candidate
        uint voteCount; // Total votes received by the candidate
    }

    struct Election {
        uint id; // Unique identifier for an election
        string name; // Name of the election
        mapping(uint => Candidate) candidates; // Mapping of candidate IDs to candidates
        uint candidatesCount; // Number of candidates in the election
        mapping(address => bool) voters; // Mapping to track whether an address has voted
    }

    uint public electionsCount; // Total number of elections created
    mapping(uint => Election) public elections; // Mapping of election IDs to Election structs

    event ElectionCreated(uint electionId, string name);
    event CandidateRegistered(uint electionId, uint candidateId, string name);
    event Voted(uint electionId, uint candidateId, address voter);

    /// @notice Creates a new election with a given name
    /// @param _name The name of the election
    /// @dev Increments the electionsCount and initializes the new election
    function createElection(string memory _name) public {
        electionsCount = electionsCount+1;
        Election storage newElection = elections[electionsCount];
        newElection.id = electionsCount;
        newElection.name = _name;
        newElection.candidatesCount = 0;
        emit ElectionCreated(newElection.id, _name);
    }

    /// @notice Registers a new candidate in a specified election
    /// @param _electionId The election ID to register the candidate in
    /// @param _name The name of the candidate
    /// @dev Throws if the election ID does not exist

    function registerCandidate(uint _electionId, string memory _name) public {
        require(_electionId <= electionsCount, "Election does not exist.");
        Election storage election = elections[_electionId];
        election.candidatesCount = election.candidatesCount+1;
        election.candidates[election.candidatesCount] = Candidate(election.candidatesCount, _name, 0);
        emit CandidateRegistered(_electionId, election.candidatesCount, _name);
    }

    /// @notice Casts a vote for a specific candidate in a specific election
    /// @param _electionId The ID of the election to vote in
    /// @param _candidateId The ID of the candidate to vote for
    /// @dev Protects against reentrant calls and ensures the voter hasn't voted before

    function castVote(uint _electionId, uint _candidateId) public nonReentrant {
        require(_electionId <= electionsCount, "Election does not exist.");
        Election storage election = elections[_electionId];
        require(!election.voters[msg.sender], "Already voted.");
        require(_candidateId <= election.candidatesCount, "Candidate does not exist.");

        election.voters[msg.sender] = true;
        election.candidates[_candidateId].voteCount = election.candidates[_candidateId].voteCount+1;
        emit Voted(_electionId, _candidateId, msg.sender);
    }
}
