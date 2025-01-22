const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("EventContractModule", (m) => {
  const _initialPrice = m.getParameter("_initialPrice",30000000000000)
  const PumpFunClone = m.contract("PumpFunClone",[_initialPrice]);

  return { PumpFunClone };
});

//PumpFunClone -- 0xAB0Ee22F38f09e9F6a3a121C5375f46Eb7a49A70