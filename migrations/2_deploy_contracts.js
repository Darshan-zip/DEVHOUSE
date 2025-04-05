const CertVerifier = artifacts.require("CertVerifier");

module.exports = async function (deployer, network, accounts) {
  // Deploy the contract using the first account
  await deployer.deploy(CertVerifier, { from: accounts[0] });

  // Optionally log the deployed contract address
  const instance = await CertVerifier.deployed();
  console.log("✅ CertVerifier deployed at address:", instance.address);
};
