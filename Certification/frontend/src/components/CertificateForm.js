// frontend/src/components/CertificateForm.js

import React, { useState } from "react";
import { ethers } from "ethers";
import CertificateRegistryABI from "../abi/CertificateRegistry.json";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // <- replace this

const CertificateForm = () => {
  const [certificateHash, setCertificateHash] = useState("");
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [ecoFriendly, setEcoFriendly] = useState(false);

  const registerCertificate = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask first!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      CertificateRegistryABI.abi,
      signer
    );

    try {
      const tx = await contract.registerCertificate(
        certificateHash,
        name,
        issuer,
        ipfsHash,
        ecoFriendly
      );
      await tx.wait();
      alert("Certificate registered successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Check console for details.");
    }
  };

  return (
    <div>
      <h2>Register Certificate</h2>
      <input
        type="text"
        placeholder="Certificate Hash"
        value={certificateHash}
        onChange={(e) => setCertificateHash(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Issuer"
        value={issuer}
        onChange={(e) => setIssuer(e.target.value)}
      />
      <input
        type="text"
        placeholder="IPFS Hash"
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
      />
      <label>
        Eco Friendly?{" "}
        <input
          type="checkbox"
          checked={ecoFriendly}
          onChange={(e) => setEcoFriendly(e.target.checked)}
        />
      </label>
      <button onClick={registerCertificate}>Register</button>
    </div>
  );
};

export default CertificateForm;
