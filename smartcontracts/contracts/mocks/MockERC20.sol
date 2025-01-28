// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable  {
    constructor(string memory name,string memory symbol,address initialOwner,uint256 initialValue)
        ERC20(name, symbol)
        Ownable(initialOwner)
    {
        _mint(msg.sender, initialValue);
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
