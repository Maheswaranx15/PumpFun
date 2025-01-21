const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("LockModule", (m) => {
  // const initialTokenOwner = m.getParameter("initialOwner", "0xE678e0faEe40ffCF078854bac2ED20fA8dA8C4B0");
  // const MockERC20 = m.contract("MockERC20",[initialTokenOwner]);
  const _feeRecipient = m.getParameter("_feeRecipient", "0xa7e793bc4D5BEBE56739f89994316Ed9850E3aF2"); 
  const _platformFee = m.getParameter("_platformFee", 100);
  const PumpFun = m.contract("PumpFun",[_feeRecipient,_platformFee]);

  return { PumpFun };
});

//token -- 0xa7e793bc4D5BEBE56739f89994316Ed9850E3aF2
//pumpFun -- 0xDDCA982C2f64626d0776c1487ccCAa874275E0df