module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",    // Ganache CLI host
      port: 8545,           // Ganache CLI port (NOT 7545)
      network_id: "*",   // Network ID Ganache CLI shows
    },
  },

  compilers: {
    solc: {
      version: "0.8.21",    // Match your Solidity version
    },
  },
};
