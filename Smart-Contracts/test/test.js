// Hardhat Test Script: test/PumpFun.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PumpFun Contract", function () {
    let PumpFun, pumpFun;
    let token, tokenAddress;

    beforeEach(async function () {
      const [owner] = await ethers.getSigners();
      PumpFun = await ethers.deployContract("PumpFunClone")
      pumpFun = PumpFun.target
    });

    it("Should create a new pump event", async function () {
        let TokenName1 = "USDT"
        let TokenSymbol1 = "USDTether"
        let TokenURL1 = 'https://tymbox.mypinata.cloud/files/bafkreifyri2j4ja7gxza2pdvpotyc5jz2zkvkvs3gjjwzwmsl2xq53zpsa?X-Algorithm=PINATA1&X-Date=1737524944&X-Expires=30&X-Method=GET&X-Signature=9fe78588ef48759579b5357e1e4d683fa81b68244f4125b0486ef686d5aee1d0'
        let TokenDescription1 = 'This is my first token'
        const [owner] = await ethers.getSigners();
        const targetPrice = ethers.parseEther("2.0");
        const tx = await PumpFun.connect(owner).createToken(TokenName1, TokenSymbol1, TokenURL1, TokenDescription1 ,{
            value: hre.ethers.parseEther("0.0001")
        });
        let txn = await tx.wait();
        // const event = await PumpFun.pumpEvents(0);
        console.log("event",txn)
        // expect(event.token).to.equal(token);
        // expect(event.startTime).to.equal(startTime);
        // expect(event.endTime).to.equal(endTime);
        // expect(event.targetPrice).to.equal(targetPrice);
    });

    // it("Should allow contributions to a pump event", async function () {
    //     const startTime = (await ethers.provider.getBlock("latest")).timestamp + 60;
    //     const endTime = startTime + 3600;
    //     const targetPrice = ethers.parseEther("2.0");
    //     const [owner] = await ethers.getSigners();
    //     await PumpFun.createPumpEvent(tokenAddress, startTime, endTime, targetPrice);

    //     // Move forward in time
    //     await ethers.provider.send("evm_increaseTime", [120]);
    //     await ethers.provider.send("evm_mine", []);

    //     await tokenAddress.transfer(owner.address, ethers.parseEther("100"));
    //     await tokenAddress.connect(owner).approve(pumpFun, ethers.parseEther("100"));

    //     const tx = await PumpFun.connect(owner).contribute(0, ethers.parseEther("50"));
    //     await tx.wait();

    //     const event = await PumpFun.pumpEvents(0);
    //     expect(event.totalContributed).to.equal(ethers.parseEther("49.5")); // 1% fee deducted
    // });

    // it("Should complete a pump event", async function () {
    //     const startTime = (await ethers.provider.getBlock("latest")).timestamp + 60;
    //     const endTime = startTime + 3600;
    //     const targetPrice = ethers.parseEther("2.0");

    //     await PumpFun.createPumpEvent(tokenAddress, startTime, endTime, targetPrice);

    //     // Move forward in time to after the event
    //     await ethers.provider.send("evm_increaseTime", [3700]);
    //     await ethers.provider.send("evm_mine", []);

    //     const tx = await PumpFun.completePumpEvent(0);
    //     await tx.wait();

    //     const event = await PumpFun.pumpEvents(0);
    //     expect(event.completed).to.equal(true);
    // });

    // it("Should allow reward claims", async function () {
    //     const [owner, user1] = await ethers.getSigners();
    //     const startTime = (await ethers.provider.getBlock("latest")).timestamp + 60;
    //     const endTime = startTime + 3600;
    //     const targetPrice = ethers.parseEther("2.0");

    //     await PumpFun.createPumpEvent(tokenAddress, startTime, endTime, targetPrice);

    //     // Move forward in time
    //     await ethers.provider.send("evm_increaseTime", [120]);
    //     await ethers.provider.send("evm_mine", []);

    //     await tokenAddress.transfer(owner.address, ethers.parseEther("100"));
    //     await tokenAddress.connect(owner).approve(PumpFun.target, ethers.parseEther("100"));
    //     await PumpFun.connect(owner).contribute(0, ethers.parseEther("50"));

    //     await tokenAddress.transfer(user1.address, ethers.parseEther("200"));
    //     await tokenAddress.connect(user1).approve(PumpFun.target, ethers.parseEther("200"));
    //     await PumpFun.connect(user1).contribute(0, ethers.parseEther("150"));

    //     // Complete the event
    //     await ethers.provider.send("evm_increaseTime", [3700]);
    //     await ethers.provider.send("evm_mine", []);
    //     await PumpFun.completePumpEvent(0);

    //     // Claim rewards
    //     const initialBalance = await tokenAddress.balanceOf(owner.address);
    //     const tx = await PumpFun.connect(owner).claimRewards(0);
    //     await tx.wait();

    //     const finalBalance = await tokenAddress.balanceOf(owner.address);
    //     expect(finalBalance).to.be.gt(initialBalance);
    // });
});
