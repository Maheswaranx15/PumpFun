const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("PumpFunContractModule", (m) => {
  const PumpFunClone = m.contract("PumpFunClone");

  return { PumpFunClone };
});

//PumpFunClone -- 0x527355EA6300113d31a32b3480d0d3e3c84eD608
//https://holesky.etherscan.io/address/0x527355EA6300113d31a32b3480d0d3e3c84eD608#code