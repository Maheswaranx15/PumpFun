const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("EventContractModule", (m) => {
  // const initialTokenOwner = m.getParameter("initialOwner", "0xE678e0faEe40ffCF078854bac2ED20fA8dA8C4B0");
  // const MockERC20 = m.contract("MockERC20",[initialTokenOwner]);
  const _feeRecipient = m.getParameter("_feeRecipient", '0x16e9090A785c63E7Ed0C8a2D6d722e73bAac5E8B'); 
  const _platformFee = m.getParameter("_platformFee", 100);
  const PumpFun = m.contract("PumpFun",[_feeRecipient,_platformFee]);

  return { PumpFun };
});

//token -- 0x16e9090A785c63E7Ed0C8a2D6d722e73bAac5E8B
//pumpFun -- 0xAB0Ee22F38f09e9F6a3a121C5375f46Eb7a49A70