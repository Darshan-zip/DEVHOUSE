import Web3 from "web3";
import ContractABI from "./CertificateABI.json"; // Save the ABI JSON here

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

let web3;
let contract;

export const initWeb3 = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(ContractABI, CONTRACT_ADDRESS);
    } else {
        alert("MetaMask not found!");
    }
};

export const hashCertificate = async (jsonData) => {
    const jsonString = JSON.stringify(jsonData);
    const hash = web3.utils.sha3(jsonString);
    return hash;
};

export const registerCertificate = async (hash) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.registerCertificate(hash).send({ from: accounts[0] });
};

export const checkCertificate = async (hash) => {
    return await contract.methods.isRegistered(hash).call();
};
