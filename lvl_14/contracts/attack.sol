pragma solidity ^0.6.0;

import "./default.sol";

contract Attack {
    constructor(address _gate) public {
        GatekeeperTwo gate = GatekeeperTwo(_gate);

        bytes8 key = bytes8(
            uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^
                (uint64(0) - 1)
        );

        gate.enter(key);
    }
}
