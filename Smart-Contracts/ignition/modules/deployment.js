const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("EventContractModule", (m) => {
  const PumpFunClone = m.contract("PumpFunClone");

  return { PumpFunClone };
});

//PumpFunClone -- 0xAB0Ee22F38f09e9F6a3a121C5375f46Eb7a49A70