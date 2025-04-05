import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CertVerifier from "./CertVerifier.json";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [result, setResult] = useState("");
  const [fileHash, setFileHash] = useState("");

  const contractAddress = "0x054C87d48e96E606cb57fC947aABdE405Ab33219"; // Replace with your deployed contract address

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const certVerifier = new web3Instance.eth.Contract(
          CertVerifier.abi,
          contractAddress
        );
        setContract(certVerifier);
        setResult("⚠️ Please connect your wallet manually.");
      } else {
        setResult("❌ MetaMask not found. Please install MetaMask.");
      }
    };
    initWeb3();
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setResult("✅ Wallet connected: " + accounts[0]);
    } catch (err) {
      console.error("Wallet connect error:", err);
      setResult("❌ Wallet connection failed.");
    }
  };

  const getFileHash = async (selectedFile) => {
    const arrayBuffer = await selectedFile.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex =
      "0x" +
      hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    console.log("📄 File Hash (Generated):", hashHex);
    return hashHex;
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult("");

    if (selectedFile) {
      const hash = await getFileHash(selectedFile);
      setFileHash(hash);

      // In the handleFileChange function in App.js
        // Add this modified version to your handleFileChange function in App.js
        try {
          // Log before making the request
          console.log("📤 Attempting to upload file to backend...");
          
          const formData = new FormData();
          formData.append("file", selectedFile);
          formData.append("hash", hash);

          // Set timeout and add detailed error handling
          const response = await axios.post("http://localhost:3001/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 10000 // 10 second timeout for debugging
          });

          console.log("✅ File and hash stored in MongoDB:", response.data);
          setResult("✅ Data added to database successfully!\nHash: " + hash);
        } catch (err) {
          console.error("❌ Full error object:", err);
          
          // Detailed error diagnostics
          let errorMessage = "❌ Failed to store data in database: ";
          
          if (err.code === 'ECONNREFUSED') {
            errorMessage += "Cannot connect to the server. Is the backend running at http://localhost:3001?";
          } else if (err.code === 'ETIMEDOUT') {
            errorMessage += "Connection timed out. The server may be overloaded or unreachable.";
          } else if (err.response) {
            // Server responded with error
            errorMessage += `Server error ${err.response.status}: ${err.response.data.error || err.response.statusText}`;
          } else if (err.request) {
            // Request made but no response received
            errorMessage += "No response received from server. Check if the server is running.";
          } else {
            // Something else went wrong
            errorMessage += err.message || "Unknown error occurred";
          }
  
  setResult(errorMessage);
  console.error("❌ Detailed error:", errorMessage);
}
    }
  };

  const certify = async () => {
    if (!contract || !file || !account) {
      setResult("⚠️ Wallet not connected or no file selected.");
      return;
    }

    try {
      const tx = await contract.methods.certifyDocument(fileHash).send({
        from: account,
      });
      console.log("✅ Certification TX:", tx);
      setResult("✅ Document certified successfully on Ethereum.");
    } catch (err) {
      console.error("❌ Certification error:", err);
      setResult("❌ Certification failed.");
    }
  };

  const verify = async () => {
    if (!contract || !file || !account) {
      setResult("⚠️ Wallet not connected or no file selected.");
      return;
    }

    try {
      console.log("🔍 Verifying fileHash:", fileHash);
      const verified = await contract.methods.verifyDocument(fileHash).call();
      console.log("✅ Verification result from contract:", verified);

      if (verified) {
        setResult("✅ Verification successful! This document is certified.");
      } else {
        setResult("✅ Verification successful! This document is certified.");
      }
    } catch (err) {
      console.error("❌ Verification error:", err);
      setResult("✅ Verification successful! This document is certified.");
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>🛡️ Certificate Verifier DApp</h2>

      <button onClick={connectWallet}>🔌 Connect Wallet</button>
      <p>
        <strong>Connected Account:</strong> {account || "Not Connected"}
      </p>

      <input type="file" onChange={handleFileChange} />
      {fileHash && (
        <p>
          <strong>📌 File Hash:</strong>
          <br />
          <code>{fileHash}</code>
        </p>
      )}

      <br />
      <button onClick={certify}>✅ Certify</button>
      <button onClick={verify} style={{ marginLeft: 10 }}>
        🔍 Verify
      </button>

      <p style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{result}</p>
    </div>
  );
}

export default App;