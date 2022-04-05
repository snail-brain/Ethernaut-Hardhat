pragma solidity <0.7.0;

import "@openzeppelin/contracts/proxy/Initializable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract kmsMyself is Initializable {
    bool public alive;

    function _kms() external {
        selfdestruct(0x182Af69fB08b4D08c42B68cc0d9f50b14bCbFd7a);
    }

    function checkAlive(address impl) public returns (bool) {
        if (Address.isContract(impl)) {
            alive = true;
        } else {
            alive = false;
        }
    }
}
