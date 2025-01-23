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
        await tx.wait();
    });

    it("Should allow a user to purchase the token", async function() {
        const tx1 = await PumpFun.createToken("Test", "TEST", "img://img.png", "hello there", {
            value: hre.ethers.parseEther("0.0001")
        });
        const TokenAddress = await PumpFun.PumpTokenAddresses(0)
        const tx2 = await PumpFun.buyToken(TokenAddress, 100, {
            value: hre.ethers.parseEther("1")
        });
        const coins = await PumpFun.getAllTokens();
        console.log("coins ", coins)
    })

});
