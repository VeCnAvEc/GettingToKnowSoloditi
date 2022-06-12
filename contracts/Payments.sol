// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Payments {
    // require
    // revert
    // assert
    address owner;
    
    event Paid(address indexed _from, uint amount, uint timestamp);

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        pay();
    }

    modifier onlyOwner(address _to) {
        require(msg.sender == owner, "you are not an owner!");
        require(_to != address(0), "incorrect address!");
        _;
        // require(...);
    }

    function pay() public payable {
        emit Paid(msg.sender, msg.value, block.timestamp);
    }

    function withdraw(address payable _to) external onlyOwner(_to) {
        require(msg.sender == owner, "you are not an owner!");
        _to.transfer(address(this).balance);
    }
}