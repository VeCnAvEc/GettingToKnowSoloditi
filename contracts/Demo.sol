// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ILogger.sol";

contract Demo {
    ILogger logger;
    
    constructor(address _Logger) {
        logger = ILogger(_Logger);
    }

    function payment(address _from, uint _number) public view returns(uint) {
        return logger.getEntry(_from, _number);
    }

    receive() external payable {
        logger.log(msg.sender, msg.value);
    }
}